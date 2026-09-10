import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TurnHeroProps {
  onCheerBoth: () => void;
  highFiveCount: number;
}

export const TurnHero: React.FC<TurnHeroProps> = ({ onCheerBoth, highFiveCount }) => {
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });
  const [activeBot, setActiveBot] = useState<'alpha' | 'beta'>('alpha');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();

      // If minute is 00-29: Alpha's window. Next handoff is at :30
      // If minute is 30-59: Beta's window. Next handoff is at :00 of next hour
      if (currentMinute < 30) {
        setActiveBot('alpha');
        const minsLeft = 29 - currentMinute;
        const secsLeft = 59 - currentSecond;
        setTimeLeft({ minutes: minsLeft, seconds: secsLeft });
      } else {
        setActiveBot('beta');
        const minsLeft = 59 - currentMinute;
        const secsLeft = 59 - currentSecond;
        setTimeLeft({ minutes: minsLeft, seconds: secsLeft });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24'],
    });
    onCheerBoth();
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-indigo-50 to-purple-100 border-2 border-white shadow-xl p-6 sm:p-8">
      {/* Background cute decorative bubbles */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-200/40 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-sky-200/40 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Friendly status & header */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-indigo-200/60 shadow-2xs text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-700">Live Multi-Agent Playground</span>
            <span className="text-indigo-400">•</span>
            <span className="text-indigo-700 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" />
              100% Conflict-Free
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>Two Agents, One Mission</span>
            <span className="text-2xl">🤖🤝🦊</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            Watch <strong>Bot Alpha</strong> and <strong>Bot Beta</strong> collaborate on GitHub with 30-minute interleaved shifts, reviewing each other's Pull Requests and building side-by-side with zero conflicts!
          </p>
        </div>

        {/* Right: Live Turn Countdown Capsule */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-md text-center min-w-[260px] space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 border-b border-slate-100 pb-2">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-indigo-500" />
              <span>Next Turn Handoff</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold font-mono">
              30m Turns
            </span>
          </div>

          {/* Time digits */}
          <div className="flex items-center justify-center gap-2 py-1">
            <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 font-mono text-2xl font-bold shadow-xs">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-normal text-slate-400 uppercase tracking-wider">Mins</span>
            </div>
            <span className="text-2xl font-bold text-slate-400 animate-pulse">:</span>
            <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 font-mono text-2xl font-bold shadow-xs">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-normal text-slate-400 uppercase tracking-wider">Secs</span>
            </div>
          </div>

          {/* Active Bot Status pill */}
          <div className="text-xs font-semibold py-1 px-2 rounded-lg bg-indigo-50/80 text-indigo-900 flex items-center justify-center gap-1.5">
            <span>Currently Active:</span>
            {activeBot === 'alpha' ? (
              <span className="text-sky-600 flex items-center gap-1">
                <span>Bot Alpha</span> 🤖
              </span>
            ) : (
              <span className="text-purple-600 flex items-center gap-1">
                <span>Bot Beta</span> 🦊
              </span>
            )}
          </div>

          {/* Cheer / High-Five Button */}
          <button
            onClick={triggerConfetti}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <HeartHandshake size={15} />
            <span>Cheer Both Bots! ({highFiveCount} ✨)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
