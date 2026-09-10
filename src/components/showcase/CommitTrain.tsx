import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Sparkles } from 'lucide-react';
import { playWhistleSound, playChimeSound } from '../../utils/audio';

interface CommitTrainProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const CommitTrain: React.FC<CommitTrainProps> = ({ isMuted, onToggleMute }) => {
  const [isChugging, setIsChugging] = useState(false);
  const [trainPosition, setTrainPosition] = useState(0);

  const wagons = [
    { hash: 'PR #1', label: 'Search & Filters', author: '🤖 Alpha', color: 'bg-sky-100 border-sky-300 text-sky-800' },
    { hash: 'PR #2', label: 'Kanban Tracker', author: '🦊 Beta', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    { hash: 'HEAD', label: '10/10 Tests Green', author: '✨ Both', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
  ];

  const handleDispatchTrain = () => {
    if (isChugging) return;
    setIsChugging(true);
    playWhistleSound(isMuted);

    // Animate train moving across track
    let pos = 0;
    const interval = setInterval(() => {
      pos += 4;
      if (pos >= 100) {
        clearInterval(interval);
        setTrainPosition(100);
        playChimeSound(isMuted);
        setTimeout(() => {
          setIsChugging(false);
          setTrainPosition(0);
        }, 1200);
      } else {
        setTrainPosition(pos);
      }
    }, 40);
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-indigo-100 p-6 shadow-lg space-y-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-2xs">
            🚂
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-800 text-base">The Git Express (Commit Train)</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                TASK-03
              </span>
            </div>
            <p className="text-xs text-slate-500">Autonomous delivery of verified commits between Bot Alpha & Bot Beta</p>
          </div>
        </div>

        {/* Controls: Mute Toggle & Dispatch Train Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute chimes' : 'Mute chimes'}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              isMuted
                ? 'bg-slate-100 text-slate-500 border-slate-200'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="text-[11px] hidden sm:inline">{isMuted ? 'Muted' : 'Chimes On'}</span>
          </button>

          <button
            onClick={handleDispatchTrain}
            disabled={isChugging}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              isChugging
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white active:scale-95'
            }`}
          >
            {isChugging ? <Sparkles size={14} className="animate-spin" /> : <Play size={14} />}
            <span>{isChugging ? 'Express in Transit... 💨' : 'Dispatch Train 🚂'}</span>
          </button>
        </div>
      </div>

      {/* Train Track & Station Stage */}
      <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 relative space-y-4">
        {/* Station Labels */}
        <div className="flex items-center justify-between text-xs font-bold px-2">
          <span className="text-sky-700 flex items-center gap-1">
            <span>🚉 Station Alpha (Local Dev)</span>
          </span>
          <span className="text-slate-400 font-mono text-[11px]">Git Rebase Rails</span>
          <span className="text-purple-700 flex items-center gap-1">
            <span>🚉 Station Beta (Peer Review)</span>
          </span>
        </div>

        {/* Animated Track Container */}
        <div className="relative h-20 bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl border border-slate-300 overflow-hidden flex items-center shadow-inner px-2">
          {/* Railway Tracks / Sleepers */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #64748b 0, #64748b 3px, transparent 3px, transparent 18px)',
            }}
          />
          <div className="absolute inset-x-0 h-1 bg-slate-400 top-1/2 -translate-y-1 shadow-xs" />

          {/* The Train with Wagons */}
          <div
            className="relative z-10 flex items-center gap-1.5 transition-all ease-linear"
            style={{
              transform: `translateX(${trainPosition * 3.5}px)`,
              transitionDuration: isChugging ? '40ms' : '300ms',
            }}
          >
            {/* Locomotive Engine */}
            <div className="bg-amber-500 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-lg border-2 border-amber-600 shadow-md flex items-center gap-1">
              <span className="text-base animate-pulse">🚂</span>
              <span className="font-mono text-[10px]">GIT-01</span>
              {isChugging && <span className="text-[10px] animate-bounce">💨</span>}
            </div>

            {/* Cargo Wagons */}
            {wagons.map((wagon, idx) => (
              <div
                key={idx}
                className={`border rounded-lg px-2 py-1 text-[10px] font-bold shadow-xs flex flex-col items-center min-w-[85px] ${wagon.color}`}
              >
                <div className="flex items-center gap-1">
                  <span>📦</span>
                  <span className="font-mono">{wagon.hash}</span>
                </div>
                <span className="text-[9px] truncate max-w-[80px] font-normal">{wagon.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Train Delivery Status */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
          <span>
            {isChugging
              ? '🚂 Git Express chugging across branches with verified commits...'
              : '✅ Ready on track: Both PR #1 and PR #2 delivered cleanly to main!'}
          </span>
          <span className="font-mono text-emerald-600 font-bold">100% On Time</span>
        </div>
      </div>
    </div>
  );
};
