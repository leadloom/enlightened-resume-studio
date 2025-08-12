export function Progress({ value }: { value: number }) {
  return (<div className="progress"><div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>);
}