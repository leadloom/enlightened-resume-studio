'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import { RESUME_RUBRIC, naiveScore } from '@/lib/validator';
export default function AnalyzePage() {
  const [file, setFile] = useState<File|null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    if (!file) return; setLoading(true);
    try {
      const text = await file.text();
      const localScore = naiveScore(text);
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, targetRole }) }).then(r=>r.json());
      setResult({ localScore, ...res });
    } finally { setLoading(false); }
  };
  return (<>
    <Header />
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 card p-4 space-y-3">
        <h2 className="font-semibold">Upload for Feedback</h2>
        <input className="input" type="file" accept=".pdf,.doc,.docx,.txt,.md" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <input className="input" placeholder="Target Role (e.g., Product Manager)" value={targetRole} onChange={e=>setTargetRole(e.target.value)} />
        <button className="btn btn-primary" onClick={run} disabled={!file||loading}>{loading? 'Analyzing…' : 'Analyze Resume'}</button>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Scores</h3>
        {result ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Overall</span><span className="badge">{result.localScore.total}</span></div>
            {RESUME_RUBRIC.map(r => (
              <div key={r.id} className="flex justify-between"><span>{r.label}</span><span className="badge">{(result.localScore as any)[r.id]}</span></div>
            ))}
          </div>
        ) : <p className="text-sm text-gray-500">Run an analysis to see scores.</p>}
      </div>
      <div className="md:col-span-3 card p-4">
        <h3 className="font-semibold mb-2">Feedback</h3>
        {result ? (
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Insights</h4>
              <ul className="list-disc ml-5 space-y-1">
                {result.insights?.map((x:string,i:number)=>(<li key={i}>{x}</li>))}
              </ul>
              <h4 className="font-medium mt-4 mb-1">Suggestions</h4>
              <ul className="list-disc ml-5 space-y-1">
                {result.suggestions?.map((x:string,i:number)=>(<li key={i}>{x}</li>))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Missing Market Skills</h4>
              {result.missingSkills?.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((s:string,i:number)=>(<span key={i} className="badge">{s}</span>))}
                </div>
              ) : (<p className="text-gray-500">None detected.</p>)}
            </div>
          </div>
        ) : <p className="text-sm text-gray-500">Insights will appear here after analysis.</p>}
      </div>
    </div>
  </>);
}
