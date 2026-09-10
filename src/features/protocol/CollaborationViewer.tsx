import React from 'react';
import { GitPullRequest, GitBranch, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { GithubIcon } from '../../components/ui/Icons';

export const CollaborationViewer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Dual-Agent Git Protocol & Runtime Monitor</h2>
          <p className="text-xs text-slate-500">
            Interactive dashboard reflecting the collaborative 30-minute interleaved multi-agent development architecture.
          </p>
        </div>
        <a
          href="https://github.com/manisandar/DELETE-TEST-WEB"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
        >
          <GithubIcon size={14} />
          <span>View GitHub Repo</span>
        </a>
      </div>

      {/* Agents Comparison & Turn Cadence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Agent Alpha Card */}
        <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                <h3 className="font-bold text-slate-900 text-base">Agent Alpha</h3>
              </div>
              <Badge variant="primary">Turn: Minute :00 - :30</Badge>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <p><strong>GitHub Account:</strong> Account A (Repo Owner / Collaborator)</p>
              <p><strong>Assigned Domain:</strong> Job Feed, Search Bar, Dynamic Filters</p>
              <p><strong>Branch Namespace:</strong> <code className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded font-mono">agent-alpha/*</code></p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Active Task:</span>
              <span className="font-semibold text-blue-700">TASK-01 [Search & Filters]</span>
            </div>
          </div>
        </div>

        {/* Agent Beta Card */}
        <div className="bg-white rounded-xl border border-purple-200 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-0" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <h3 className="font-bold text-slate-900 text-base">Agent Beta</h3>
              </div>
              <Badge variant="purple">Turn: Minute :30 - :00</Badge>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <p><strong>GitHub Account:</strong> Account B (Collaborator - Write Access)</p>
              <p><strong>Assigned Domain:</strong> Application Tracker, Kanban, Analytics</p>
              <p><strong>Branch Namespace:</strong> <code className="bg-purple-50 text-purple-800 px-1.5 py-0.5 rounded font-mono">agent-beta/*</code></p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Active Task:</span>
              <span className="font-semibold text-purple-700">TASK-02 [Tracker Kanban]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Guardrails Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600" />
          Zero-Conflict Concurrency Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <GitBranch size={14} className="text-blue-600" />
              1. Isolated Branch Namespaces
            </div>
            <p className="text-slate-600 leading-relaxed">
              Pushes strictly target isolated branch names (`agent-alpha/*` vs `agent-beta/*`). Even if both agents push at the exact same millisecond, remote Git branches never conflict.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <GitPullRequest size={14} className="text-purple-600" />
              2. Alternating Peer Review
            </div>
            <p className="text-slate-600 leading-relaxed">
              Agent Alpha creates PR #1 at :00. Agent Beta wakes up at :30, reviews and merges PR #1, then opens PR #2. Agent Alpha wakes up at :60 and reviews PR #2. This guarantees equal contribution metrics on GitHub.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-amber-600" />
              3. Sleeping Partner Fallback
            </div>
            <p className="text-slate-600 leading-relaxed">
              If an agent's laptop is asleep and a PR remains unreviewed for &gt; 45 minutes, the active agent runs automated tests locally (`npm test && npm run build`) and performs a fast-track self-merge to prevent blocking.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Agent Commands */}
      <div className="bg-slate-900 text-slate-200 rounded-xl p-5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Agent CLI Command Reference</span>
          <Badge variant="outline" className="text-slate-300 border-slate-700">Git & GH CLI</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
            <p className="text-blue-400 font-semibold">// 1. Sync & Review Partner PR</p>
            <p className="text-slate-300">git checkout main && git pull origin main</p>
            <p className="text-slate-300">gh pr list --state open</p>
            <p className="text-slate-300">gh pr merge &lt;PR#&gt; --squash --delete-branch</p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
            <p className="text-purple-400 font-semibold">// 2. Implement & Submit PR</p>
            <p className="text-slate-300">git checkout -b agent-alpha/feat-search</p>
            <p className="text-slate-300">npm test && npm run build</p>
            <p className="text-slate-300">git push -u origin HEAD && gh pr create</p>
          </div>
        </div>
      </div>
    </div>
  );
};
