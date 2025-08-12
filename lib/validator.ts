export const RESUME_RUBRIC = [
  { id: 'clarity', label: 'Clarity & Readability' },
  { id: 'impact', label: 'Impact & Metrics' },
  { id: 'relevance', label: 'Role Relevance' },
  { id: 'structure', label: 'Structure & Ordering' },
  { id: 'formatting', label: 'Formatting & ATS' },
];
export function naiveScore(text: string) {
  const len = text.length; const clarity = Math.min(100, Math.round((len/1200)*100));
  const impact = /%|\b\d{2,}\b/.test(text) ? 85 : 55;
  const formatting = /(led|built|designed|launched|improved|reduced|increased|optimized|created|implemented)/i.test(text) ? 80 : 60;
  const relevance = 70, structure = 75;
  const total = Math.round((clarity + impact + relevance + structure + formatting)/5);
  return { clarity, impact, relevance, structure, formatting, total };
}
