import Header from '@/components/Header';
import { Progress } from '@/components/Progress';
export default function Page() {
  return (<>
    <Header />
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 card p-4">
        <h2 className="font-semibold mb-2">Get Started</h2>
        <p className="text-sm text-gray-600">Upload your resume for instant feedback or build a new one using the Enlightened framework.</p>
        <div className="flex gap-2 mt-4">
          <a className="btn btn-primary" href="/analyze">Upload & Analyze</a>
          <a className="btn btn-outline" href="/build">Start Builder</a>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Progress</h3>
        <Progress value={42} />
        <p className="text-xs text-gray-500 mt-2">Demo progress based on filled sections.</p>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Recent Reviews</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span>PM — J. Rivera</span><span className="badge">82</span></li>
          <li className="flex justify-between"><span>Data — M. Chen</span><span className="badge">76</span></li>
          <li className="flex justify-between"><span>Ops — S. Al Khalifa</span><span className="badge">88</span></li>
        </ul>
      </div>
      <div className="card p-4 md:col-span-2">
        <h3 className="font-semibold mb-2">Starter Templates</h3>
        <div className="flex flex-wrap gap-2">
          {["Customer Success","Product Manager","Data Analyst","Software Engineer","Sales","Hospitality"].map(t => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </>);
}
