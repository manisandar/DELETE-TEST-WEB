import { Heart, Scale } from 'lucide-react';

interface SynergyMeterProps {
  alphaScore: number;
  betaScore: number;
}

export const SynergyMeter: React.FC<SynergyMeterProps> = ({ alphaScore, betaScore }) => {
  const total = Math.max(1, alphaScore + betaScore);
  const alphaPercent = Math.round((alphaScore / total) * 100);
  const betaPercent = 100 - alphaPercent;

  return (
    <div className="rounded-3xl bg-white border-2 border-indigo-100 p-6 shadow-lg space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <Scale size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">Synergy & Equal Contribution Meter</h3>
            <p className="text-xs text-slate-500">Tracking 50/50 balance between Alpha and Beta on GitHub</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs">
          <Heart size={14} className="fill-pink-500 text-pink-500 animate-pulse" />
          <span>Harmony: 100%</span>
        </div>
      </div>

      {/* Balance Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-sky-600 flex items-center gap-1">
            🤖 Bot Alpha ({alphaPercent}%)
          </span>
          <span className="text-purple-600 flex items-center gap-1">
            🦊 Bot Beta ({betaPercent}%)
          </span>
        </div>

        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-l-full transition-all duration-500"
            style={{ width: `${alphaPercent}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-full transition-all duration-500"
            style={{ width: `${betaPercent}%` }}
          />
        </div>
      </div>

      {/* 4 Pillars of Zero-Conflict */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <span className="text-lg">🛡️</span>
          <p className="text-[11px] font-bold text-slate-800">Isolated Branches</p>
          <p className="text-[10px] text-slate-500">Pushes never collide</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <span className="text-lg">🤝</span>
          <p className="text-[11px] font-bold text-slate-800">Peer PR Review</p>
          <p className="text-[10px] text-slate-500">Each reviews the other</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <span className="text-lg">⏰</span>
          <p className="text-[11px] font-bold text-slate-800">Sleep Resilience</p>
          <p className="text-[10px] text-slate-500">Self-merge fallback (45m)</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <span className="text-lg">✨</span>
          <p className="text-[11px] font-bold text-slate-800">Living RFC Tasks</p>
          <p className="text-[10px] text-slate-500">Adaptable sprint backlog</p>
        </div>
      </div>
    </div>
  );
};
