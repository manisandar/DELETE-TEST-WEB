import React, { useState } from 'react';
import type { AgentProfile } from '../../types/showcase';
import { Sparkles, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBubblePopSound } from '../../utils/audio';

interface AgentTwinCardsProps {
  agents: Record<'alpha' | 'beta', AgentProfile>;
  onHighFive: (agentId: 'alpha' | 'beta') => void;
}

const ALPHA_ACCESSORIES = [
  { emoji: '', label: 'Default' },
  { emoji: '👑', label: 'Crown' },
  { emoji: '🕶️', label: 'Shades' },
  { emoji: '🎧', label: 'Headphones' },
  { emoji: '🚀', label: 'Jetpack' },
  { emoji: '🎩', label: 'Top Hat' },
];

const BETA_ACCESSORIES = [
  { emoji: '', label: 'Default' },
  { emoji: '🎀', label: 'Ribbon' },
  { emoji: '👑', label: 'Crown' },
  { emoji: '🕶️', label: 'Shades' },
  { emoji: '🎧', label: 'Headphones' },
  { emoji: '🪄', label: 'Magic Wand' },
];

export const AgentTwinCards: React.FC<AgentTwinCardsProps> = ({ agents, onHighFive }) => {
  const [alphaAccessory, setAlphaAccessory] = useState<string>('👑');
  const [betaAccessory, setBetaAccessory] = useState<string>('🎀');

  const handleSelectAccessory = (agentId: 'alpha' | 'beta', emoji: string) => {
    playBubblePopSound(false);
    if (agentId === 'alpha') {
      setAlphaAccessory(emoji);
    } else {
      setBetaAccessory(emoji);
    }
  };

  const handleHighFive = (agentId: 'alpha' | 'beta') => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: agentId === 'alpha' ? 0.35 : 0.65, y: 0.55 },
      colors: agentId === 'alpha' ? ['#38bdf8', '#0284c7', '#7dd3fc'] : ['#c084fc', '#9333ea', '#e879f9'],
    });
    onHighFive(agentId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bot Alpha Card */}
      <div className="relative rounded-3xl bg-white border-2 border-sky-200/80 p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-bl-full -z-0" />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-3xl shadow-md transform group-hover:rotate-6 transition-transform">
                  {agents.alpha.avatarEmoji}
                </div>
                {alphaAccessory && (
                  <span className="absolute -top-2.5 -right-2 text-xl filter drop-shadow-md animate-bounce">
                    {alphaAccessory}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-800 text-lg">{agents.alpha.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold border border-sky-200">
                    {agents.alpha.codename}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{agents.alpha.githubAccount}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Turn: :00 - :30
            </span>
          </div>

          {/* Speech bubble */}
          <div className="bg-sky-50/80 border border-sky-200/70 rounded-2xl p-3.5 relative">
            <div className="absolute -top-2 left-6 w-3 h-3 bg-sky-50 border-t border-l border-sky-200/70 transform rotate-45" />
            <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
              "{agents.alpha.currentThought}"
            </p>
          </div>

          {/* Role & Domain */}
          <div className="text-xs space-y-1.5 pt-1 text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Domain:</span>
              <span className="font-semibold text-slate-800">Feed, Search, UI Widgets</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Git Namespace:</span>
              <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-sky-700 font-semibold">
                agent-alpha/*
              </code>
            </div>
          </div>

          {/* Cute Accessory Customizer Bar */}
          <div className="bg-sky-50/60 rounded-xl p-2.5 border border-sky-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Palette size={12} className="text-sky-500" />
                <span>Alpha's Costume:</span>
              </span>
              <span className="text-sky-700">
                {ALPHA_ACCESSORIES.find((a) => a.emoji === alphaAccessory)?.label || 'None'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {ALPHA_ACCESSORIES.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelectAccessory('alpha', item.emoji)}
                  aria-label={`Select ${item.label} for Alpha`}
                  className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                    alphaAccessory === item.emoji
                      ? 'bg-sky-500 text-white border-sky-600 shadow-xs scale-105'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <span>{item.emoji || '❌'}</span>
                  <span className="text-[10px] hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mini Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="bg-slate-50 rounded-xl p-2">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">Commits</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{agents.alpha.stats.commits}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">PRs Opened</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{agents.alpha.stats.prsCreated}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">High Fives</span>
              <span className="font-mono font-bold text-sky-600 text-sm">{agents.alpha.stats.highFives} ✨</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="relative z-10 pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => handleHighFive('alpha')}
            className="w-full py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles size={14} />
            <span>High-Five Bot Alpha!</span>
          </button>
        </div>
      </div>

      {/* Bot Beta Card */}
      <div className="relative rounded-3xl bg-white border-2 border-purple-200/80 p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-bl-full -z-0" />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-400 to-pink-600 flex items-center justify-center text-3xl shadow-md transform group-hover:-rotate-6 transition-transform">
                  {agents.beta.avatarEmoji}
                </div>
                {betaAccessory && (
                  <span className="absolute -top-2.5 -right-2 text-xl filter drop-shadow-md animate-bounce">
                    {betaAccessory}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-800 text-lg">{agents.beta.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                    {agents.beta.codename}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{agents.beta.githubAccount}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              Turn: :30 - :00
            </span>
          </div>

          {/* Speech bubble */}
          <div className="bg-purple-50/80 border border-purple-200/70 rounded-2xl p-3.5 relative">
            <div className="absolute -top-2 left-6 w-3 h-3 bg-purple-50 border-t border-l border-purple-200/70 transform rotate-45" />
            <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
              "{agents.beta.currentThought}"
            </p>
          </div>

          {/* Role & Domain */}
          <div className="text-xs space-y-1.5 pt-1 text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Domain:</span>
              <span className="font-semibold text-slate-800">Review, Quality, Analytics</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Git Namespace:</span>
              <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-purple-700 font-semibold">
                agent-beta/*
              </code>
            </div>
          </div>

          {/* Cute Accessory Customizer Bar */}
          <div className="bg-purple-50/60 rounded-xl p-2.5 border border-purple-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Palette size={12} className="text-purple-500" />
                <span>Beta's Costume:</span>
              </span>
              <span className="text-purple-700">
                {BETA_ACCESSORIES.find((a) => a.emoji === betaAccessory)?.label || 'None'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {BETA_ACCESSORIES.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelectAccessory('beta', item.emoji)}
                  aria-label={`Select ${item.label} for Beta`}
                  className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                    betaAccessory === item.emoji
                      ? 'bg-purple-600 text-white border-purple-700 shadow-xs scale-105'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-purple-50'
                  }`}
                >
                  <span>{item.emoji || '❌'}</span>
                  <span className="text-[10px] hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mini Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="bg-slate-50 rounded-xl p-2">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">Commits</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{agents.beta.stats.commits}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">PRs Reviewed</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{agents.beta.stats.prsReviewed}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">High Fives</span>
              <span className="font-mono font-bold text-purple-600 text-sm">{agents.beta.stats.highFives} ✨</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="relative z-10 pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => handleHighFive('beta')}
            className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles size={14} />
            <span>High-Five Bot Beta!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
