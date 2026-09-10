import { GitPullRequest, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export const PRHighway: React.FC = () => {
  return (
    <div className="rounded-3xl bg-white border-2 border-indigo-100 p-6 shadow-lg space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <GitPullRequest size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">The Pull Request Highway</h3>
            <p className="text-xs text-slate-500">Visual Git Bridge connecting Bot Alpha, GitHub Main, and Bot Beta</p>
          </div>
        </div>

        <a
          href="https://github.com/manisandar/DELETE-TEST-WEB/pull/1"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold transition-colors"
        >
          <span>Inspect Active PR #1</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Step 1: Alpha's Branch */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 text-center space-y-2 relative">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
            Step 1: Authored by Alpha
          </span>
          <div className="text-2xl">🤖 ➔ 🌿</div>
          <h4 className="font-bold text-xs text-slate-800 font-mono">agent-alpha/feat-search-filters</h4>
          <p className="text-[11px] text-slate-500">
            Isolated branch namespace. Pushed without touching main directly.
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            <CheckCircle size={10} /> Tests Passed
          </span>
        </div>

        {/* Step 2: PR Highway / In-Flight */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300/80 rounded-2xl p-4 text-center space-y-2 shadow-xs relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            In Flight: PR #1
          </div>
          <div className="text-2xl pt-1 animate-bounce">🎁</div>
          <h4 className="font-bold text-xs text-indigo-950 font-semibold">GitHub Pull Request #1</h4>
          <p className="text-[11px] text-slate-600">
            Awaiting peer review from Bot Beta at minute :30.
          </p>
          <div className="inline-flex items-center gap-1 text-[11px] text-indigo-700 font-bold bg-white px-2.5 py-0.5 rounded-md border border-indigo-200 shadow-2xs">
            Target: <code>main</code>
          </div>
        </div>

        {/* Step 3: Beta's Review & Merge */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 text-center space-y-2 relative">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
            Step 2: Reviewed by Beta
          </span>
          <div className="text-2xl">🦊 ➔ 🚀</div>
          <h4 className="font-bold text-xs text-slate-800 font-mono">gh pr review --approve</h4>
          <p className="text-[11px] text-slate-500">
            Beta verifies build, squashes and merges to main, ensuring 50/50 balance.
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] text-purple-700 font-bold bg-white px-2 py-0.5 rounded-full border border-purple-200">
            <ShieldCheck size={10} /> Safe Peer Review
          </span>
        </div>
      </div>
    </div>
  );
};
