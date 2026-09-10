import { Briefcase, CheckSquare, BarChart2, GitPullRequest, Clock } from 'lucide-react';
import { GithubIcon } from './Icons';

interface NavbarProps {
  activeTab: 'jobs' | 'tracker' | 'insights' | 'collab';
  setActiveTab: (tab: 'jobs' | 'tracker' | 'insights' | 'collab') => void;
  savedCount: number;
  appliedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  appliedCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top micro-banner indicating Dual-Agent Status */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-white">Dual-Agent Pipeline Active</span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Clock size={12} /> 30m Interleaved Turns (Offset: 30m)
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-blue-400 font-mono">Agent Alpha: @account-a</span>
          <span className="text-purple-400 font-mono">Agent Beta: @account-b</span>
          <a
            href="https://github.com/manisandar/DELETE-TEST-WEB"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors underline"
          >
            <GithubIcon size={12} /> DELETE-TEST-WEB
          </a>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">CareerSphere</h1>
            <p className="text-xs text-slate-500 font-medium">Collaborative Multi-Agent Job Portal</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase size={16} />
            <span>Browse Jobs</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-blue-200 text-blue-800 text-xs rounded-full font-semibold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckSquare size={16} />
            <span>Application Tracker</span>
            {appliedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-slate-200 text-slate-800 text-xs rounded-full font-semibold">
                {appliedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart2 size={16} />
            <span>Market Insights</span>
          </button>

          <button
            onClick={() => setActiveTab('collab')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'collab'
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitPullRequest size={16} className="text-purple-600" />
            <span>Agent Protocol</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
