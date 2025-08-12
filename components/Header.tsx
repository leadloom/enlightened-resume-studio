'use client';
import { Sparkles } from 'lucide-react';
export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-brand-100"><Sparkles className="w-5 h-5 text-brand-700"/></div>
        <div>
          <h1 className="text-2xl font-semibold">Enlightened Resume Studio</h1>
          <p className="text-sm text-gray-500">Instant feedback or build with the Enlightened framework.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a href="/analyze" className="btn btn-outline">New Review</a>
        <a href="/build" className="btn btn-primary">Build Resume</a>
      </div>
    </div>
  );
}
