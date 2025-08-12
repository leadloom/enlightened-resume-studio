'use client';
import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import { Progress } from '@/components/Progress';
type Section = { id: string; title: string; hint?: string; required?: boolean; content: string };
const DEFAULT_SECTIONS: Section[] = [
  { id: 'summary', title: 'Impact Summary', required: true, hint: '2–3 lines. Who you are, the value you deliver, proof with metrics, and the role you are targeting.', content: '' },
  { id: 'competencies', title: 'Core Competencies (24 items)', required: true, hint: 'Exactly 24 items; mark market-added with ==highlight==.', content: '' },
  { id: 'achievements', title: 'Selected Achievements (WHO)', required: true, hint: '4–6 WHO achievements; titles 4–5 words; ≤75 words each.', content: '' },
  { id: 'experience', title: 'Experience (Labeled Bullets)', required: true, hint: 'Recent role 8–10 bullets; previous 6–8; third 4. Start bullets with a bold focus label.', content: '' },
  { id: 'education', title: 'Education & Certifications', content: '' },
  { id: 'optional', title: 'Optional (Publications/Volunteer/Awards)', content: '' }
];
export default function BuildPage() {
  const [fullName, setFullName] = useState('Alex Morgan');
  const [headline, setHeadline] = useState('Customer Success Manager • Hospitality');
  const [contact, setContact] = useState('alex@email.com | 555-123-4567');
  const [location, setLocation] = useState('Bahrain (Open to Relocation)');
  const [links, setLinks] = useState('linkedin.com/in/alex | portfolio.me/alex');
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [markdown, setMarkdown] = useState('');
  const filled = useMemo(() => [fullName, headline, contact].filter(Boolean).length + sections.filter(s=>s.content.trim()).length, [fullName, headline, contact, sections]);
  const update = (id: string, content: string) => setSections(prev => prev.map(s => s.id===id? { ...s, content } : s));
  const generate = () => {
    const lines: string[] = [];
    lines.push(`# ${fullName}`);
    if (headline) lines.push(`**${headline}**`);
    lines.push(`${contact} • ${location}`);
    if (links) lines.push(links);
    lines.push('');
    sections.forEach(sec => {
      if (!sec.content.trim()) return;
      lines.push(`## ${sec.title}`);
      if (sec.id === 'experience') {
        const bullets = sec.content.split(/\n+/).map(b => b.replace(/^[-•]\s*/, '').trim()).filter(Boolean);
        bullets.forEach(b => lines.push(`- ${b}`));
      } else {
        lines.push(sec.content.trim());
      }
      lines.push('');
    });
    setMarkdown(lines.join('\n'));
  };
  const download = (name: string, data: string, mime: string) => {
    const blob = new Blob([data], { type: mime }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
  };
  return (<>
    <Header />
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card p-4 space-y-3">
        <h2 className="font-semibold">Build with the Enlightened Framework</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full Name" />
          <input className="input" value={headline} onChange={e=>setHeadline(e.target.value)} placeholder="Headline (Target Role)" />
          <input className="input" value={contact} onChange={e=>setContact(e.target.value)} placeholder="Contact" />
          <input className="input" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" />
          <input className="input md:col-span-2" value={links} onChange={e=>setLinks(e.target.value)} placeholder="Links" />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">Progress</div>
          <div className="text-xs text-gray-500">{filled} fields filled</div>
        </div>
        <Progress value={(filled/(3+sections.length))*100} />
        <div className="space-y-5">
          {sections.map(sec => (<div key={sec.id}>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium">{sec.title}</label>
              <span className="badge">{sec.required? 'Required':'Optional'}</span>
            </div>
            {sec.hint && <p className="text-xs text-gray-500 mb-2">{sec.hint}</p>}
            <textarea className="textarea" value={sec.content} onChange={e=>update(sec.id, e.target.value)} placeholder={sec.id==='experience'? '• Led X to achieve Y using Z, resulting in N% improvement\n• Designed A which reduced B by C%\n…':''} />
          </div>))}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={()=>{setSections(DEFAULT_SECTIONS); setMarkdown('');}}>Reset</button>
          <button className="btn btn-primary" onClick={generate}>Generate Resume</button>
        </div>
      </div>
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Live Preview</h3>
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={()=>download('resume.md', markdown, 'text/markdown')}>Export Markdown</button>
            <button className="btn btn-outline" onClick={()=>download('resume.txt', markdown, 'text/plain')}>Export TXT</button>
          </div>
        </div>
        {!markdown? <p className="text-sm text-gray-500">Click “Generate Resume” to render your content here.</p> : (
          <article className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed">{markdown}</article>
        )}
      </div>
    </div>
  </>);
}
