import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'REPLACE_ME' });
function makePrompt(text: string, targetRole: string){
  return `You are an expert resume reviewer following the Enlightened Resume Framework.
Rules:
- Professional Summary structure.
- Exactly 24 Core Competencies; mark market-added items with ==highlight==.
- WHO achievements: titles 4–5 words; ≤75 words; bold key impact phrases.
- Experience bullets begin with a bold label; enforce recent(8–10)/prev(6–8)/third(4).
- Provide a prioritized list of suggestions and role-specific keyword gaps.
Target role: ${targetRole}

Resume:
${text}`;
}
export async function POST(req: NextRequest) {
  try {
    const { text, targetRole } = await req.json();
    const messages = [ { role: 'system', content: makePrompt(text, targetRole||'') } as const ];
    const chat = await client.chat.completions.create({ model: 'gpt-4.1', messages, temperature: 0.3 });
    const roleSkills: Record<string,string[]> = {
      'product manager': ['Roadmap Ownership','Customer Discovery','A/B Testing','OKRs','Product Analytics','API Integrations'],
      'customer success manager': ['NPS','Churn Reduction','Playbooks','Onboarding','Health Scores','QBRs'],
      'data analyst': ['SQL','Python','Dashboards','A/B Testing','Experimentation','ETL']
    };
    const missingSkills = roleSkills[(targetRole||'').toLowerCase()] || ['Communication','Stakeholder Management'];
    const textOut = chat.choices?.[0]?.message?.content || '';
    const insights = textOut.split('\n').filter(l=>/insight|strength|good|solid/i.test(l)).slice(0,5);
    const suggestions = textOut.split('\n').filter(l=>/suggest|improve|add|consider|increase/i.test(l)).slice(0,8);
    return NextResponse.json({
      insights: insights.length? insights : ["Summary may be short; consider adding outcomes with metrics.", "Make experience bullets impact-first (verb→scope→outcome)."],
      suggestions: suggestions.length? suggestions : ["Quantify achievements (%, $, time saved).","Front-load relevant experience for the target role.","Group skills into Core • Tools • Platforms."],
      missingSkills
    });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'Analyze failed' }, { status: 500 });
  }
}
