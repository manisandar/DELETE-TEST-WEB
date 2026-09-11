import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw } from 'lucide-react';
import { playRobotChirp, playWhooshSound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface TerminalLog {
  id: string;
  agent: 'alpha' | 'beta' | 'system';
  cmd: string;
  output: string;
  timestamp: string;
  isSuccess: boolean;
}

const INITIAL_LOGS: TerminalLog[] = [
  {
    id: 'log-1',
    agent: 'alpha',
    cmd: 'git checkout main && git pull origin main',
    output: 'Already up to date. Switched to clean branch main.',
    timestamp: '00:00:02',
    isSuccess: true,
  },
  {
    id: 'log-2',
    agent: 'alpha',
    cmd: 'npm test && npm run build',
    output: '✓ 19/19 tests passed (3 test suites) • Built in 178ms',
    timestamp: '00:00:15',
    isSuccess: true,
  },
  {
    id: 'log-3',
    agent: 'alpha',
    cmd: 'gh pr create --title "feat: TwinBots mascot costume customizer"',
    output: '→ https://github.com/manisandar/DELETE-TEST-WEB/pull/7',
    timestamp: '00:00:45',
    isSuccess: true,
  },
  {
    id: 'log-4',
    agent: 'beta',
    cmd: 'gh pr review 7 --approve && gh pr merge 7 --squash',
    output: '✓ PR #7 approved and squash-merged to main without conflicts.',
    timestamp: '00:30:10',
    isSuccess: true,
  },
  {
    id: 'log-5',
    agent: 'system',
    cmd: 'npm run deploy',
    output: 'Published live to https://manisandar.github.io/DELETE-TEST-WEB/',
    timestamp: '00:30:25',
    isSuccess: true,
  },
];

export const TwinBotsTerminal: React.FC<{
  onCheer?: (title: string, emoji: string) => void;
}> = ({ onCheer }) => {
  const [logs, setLogs] = useState<TerminalLog[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<'all' | 'alpha' | 'beta'>('all');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    return log.agent === filter || log.agent === 'system';
  });

  const handleSimulateCommand = () => {
    if (isRunning) return;
    setIsRunning(true);
    playWhooshSound(false);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    setTimeout(() => {
      playRobotChirp(false);
      const newLog: TerminalLog = {
        id: `log-${Date.now()}`,
        agent: 'alpha',
        cmd: 'git commit -m "feat(collab): autonomous pair cycle completed" && git push',
        output: '✓ To origin/main • Automated green build verified',
        timestamp: timeStr,
        isSuccess: true,
      };

      setLogs((prev) => [...prev, newLog]);
      setIsRunning(false);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#34d399'],
      });

      if (onCheer) {
        onCheer('Triggered live pair-programming cycle in Terminal! 💻', '⚡');
      }
    }, 600);
  };

  const handleCopyCommands = () => {
    const text = logs.map((l) => `${l.agent}$ ${l.cmd}\n${l.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-slate-900 border-2 border-slate-800 p-5 sm:p-6 shadow-2xl text-slate-100 font-mono space-y-4">
      {/* Top terminal bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Mac dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-2xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-2xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-2xs inline-block" />
          </div>

          <div className="flex items-center gap-2">
            <Terminal size={15} className="text-sky-400" />
            <span className="text-xs font-bold text-slate-300">
              twinbots-pair-terminal: ~ (conflict-free zsh)
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Agent Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl text-[11px]">
            <button
              onClick={() => setFilter('all')}
              aria-label="Filter terminal all"
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('alpha')}
              aria-label="Filter terminal by Alpha"
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'alpha' ? 'bg-sky-900/80 text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Alpha 🤖
            </button>
            <button
              onClick={() => setFilter('beta')}
              aria-label="Filter terminal by Beta"
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'beta' ? 'bg-purple-900/80 text-purple-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Beta 🦊
            </button>
          </div>

          {/* Copy logs */}
          <button
            onClick={handleCopyCommands}
            aria-label="Copy terminal logs"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Copy terminal session"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          {/* Simulate pair run */}
          <button
            onClick={handleSimulateCommand}
            disabled={isRunning}
            aria-label="Simulate pair sync command"
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isRunning ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
            <span>Run Pair-Sync ⚡</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs leading-relaxed">
        {filteredLogs.map((log) => (
          <div key={log.id} className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">[{log.timestamp}]</span>
              <span
                className={`font-bold ${
                  log.agent === 'alpha'
                    ? 'text-sky-400'
                    : log.agent === 'beta'
                    ? 'text-purple-400'
                    : 'text-amber-400'
                }`}
              >
                {log.agent === 'alpha' ? 'alpha@twinbots' : log.agent === 'beta' ? 'beta@twinbots' : 'system@ci'}:~$
              </span>
              <span className="text-slate-200 font-semibold">{log.cmd}</span>
            </div>
            <div className="pl-6 text-slate-400 text-[11px] font-sans flex items-center gap-1.5">
              <span className="text-emerald-400">↳</span>
              <span>{log.output}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status bar */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Git Protocol: Conflict-Free Namespacing</span>
          </span>
          <span>•</span>
          <span>Automated CI: 19 Passing Tests</span>
        </div>
        <span className="text-slate-500 font-mono">Total Commands: {logs.length}</span>
      </div>
    </div>
  );
};
