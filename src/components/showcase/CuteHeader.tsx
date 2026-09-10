import React from 'react';
import { GithubIcon } from '../ui/Icons';
import { GitPullRequest, Sparkles, CheckSquare, Briefcase } from 'lucide-react';

interface CuteHeaderProps {
  onSimulateBetaTurn: () => void;
  isBetaMerged: boolean;
  activeTab: 'showcase' | 'jobs' | 'tracker';
  setActiveTab: (tab: 'showcase' | 'jobs' | 'tracker') => void;
}

export const CuteHeader: React.FC<CuteHeaderProps> = ({
  onSimulateBetaTurn,
  isBetaMerged,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-indigo-100 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-pink-500 flex items-center justify-center text-xl shadow-md">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-800 text-base tracking-tight">TwinBots Hub</span>
              <span className="text-[10px] font-bold px-2 py-0.2 bg-gradient-to-r from-sky-100 to-pink-100 text-purple-700 rounded-full border border-purple-200">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Autonomous Dual-Agent Activity Showcase</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'showcase'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Showcase</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase size={13} className="text-sky-600" />
            <span>Job Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare size={13} className="text-purple-600" />
            <span>Application Tracker</span>
          </button>
        </nav>

        {/* Right action links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulate Beta Turn Button */}
          <button
            onClick={onSimulateBetaTurn}
            disabled={isBetaMerged}
            className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
              isBetaMerged
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <GitPullRequest size={13} />
            <span className="hidden sm:inline">
              {isBetaMerged ? 'Beta Merged PR #1! 🎉' : 'Simulate Beta Turn 🦊'}
            </span>
            <span className="sm:hidden">{isBetaMerged ? 'Merged 🎉' : 'Beta 🦊'}</span>
          </button>

          {/* GitHub Repo link */}
          <a
            href="https://github.com/manisandar/DELETE-TEST-WEB"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs"
          >
            <GithubIcon size={14} />
            <span className="hidden md:inline">DELETE-TEST-WEB</span>
          </a>
        </div>
      </div>
    </header>
  );
};
