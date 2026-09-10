import React, { useState } from 'react';
import {
  playChimeSound,
  playWhistleSound,
  playRobotChirp,
  playFanfareSound,
  playWhooshSound,
  playBubblePopSound,
} from '../../utils/audio';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface SoundboardProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onCheerSound?: (title: string, emoji: string) => void;
}

interface SoundItem {
  id: string;
  label: string;
  description: string;
  emoji: string;
  gradient: string;
  play: (muted: boolean) => void;
}

export const TwinBotsSoundboard: React.FC<SoundboardProps> = ({
  isMuted,
  onToggleMute,
  onCheerSound,
}) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const sounds: SoundItem[] = [
    {
      id: 'robot',
      label: 'Robot Chirp',
      description: "Alpha's 8-bit celebration beep",
      emoji: '🤖',
      gradient: 'from-sky-50 to-blue-100/80 border-sky-200 text-sky-900',
      play: (m) => playRobotChirp(m),
    },
    {
      id: 'whistle',
      label: 'Fox Whistle',
      description: "Beta's high-spirited dual train whistle",
      emoji: '🦊',
      gradient: 'from-amber-50 to-orange-100/80 border-amber-200 text-amber-900',
      play: (m) => playWhistleSound(m),
    },
    {
      id: 'fanfare',
      label: 'Merge Fanfare',
      description: 'Triumphant brass chord for merged PRs',
      emoji: '🎺',
      gradient: 'from-purple-50 to-indigo-100/80 border-purple-200 text-purple-900',
      play: (m) => playFanfareSound(m),
    },
    {
      id: 'whoosh',
      label: 'Push Whoosh',
      description: 'Rocket whoosh for git push commits',
      emoji: '🚀',
      gradient: 'from-emerald-50 to-teal-100/80 border-emerald-200 text-emerald-900',
      play: (m) => playWhooshSound(m),
    },
    {
      id: 'chimes',
      label: 'Synergy Chimes',
      description: 'Ascending 4-note harmony chord',
      emoji: '✨',
      gradient: 'from-pink-50 to-rose-100/80 border-pink-200 text-pink-900',
      play: (m) => playChimeSound(m),
    },
    {
      id: 'bubble',
      label: 'Bubble Pop',
      description: 'Playful pitch-bent bubble pop',
      emoji: '🫧',
      gradient: 'from-cyan-50 to-sky-100/80 border-cyan-200 text-cyan-900',
      play: (m) => playBubblePopSound(m),
    },
  ];

  const handleTrigger = (item: SoundItem) => {
    item.play(isMuted);
    setActiveSound(item.id);
    if (onCheerSound) {
      onCheerSound(`Played ${item.label} synth sound!`, item.emoji);
    }
    setTimeout(() => {
      setActiveSound(null);
    }, 500);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-indigo-100 p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-xs">
            <Music size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
              <span>TwinBots Soundboard & Synth FX</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                Web Audio
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Pure mathematical oscillator chimes & sound bites — zero external files needed!
            </p>
          </div>
        </div>

        {/* Audio Mute / Unmute Button */}
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute soundboard' : 'Mute soundboard'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            isMuted
              ? 'bg-rose-50 text-rose-600 border-rose-200'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
          }`}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isMuted ? 'Muted' : 'Audio On'}</span>
        </button>
      </div>

      {/* Soundboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {sounds.map((item) => {
          const isPlaying = activeSound === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTrigger(item)}
              className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden bg-gradient-to-b ${
                item.gradient
              } ${
                isPlaying
                  ? 'scale-105 ring-2 ring-indigo-400 shadow-md -translate-y-0.5'
                  : 'hover:shadow-xs hover:-translate-y-0.5'
              }`}
            >
              <span className="text-2xl mb-1.5 animate-pulse">{item.emoji}</span>
              <span className="font-extrabold text-xs tracking-tight">{item.label}</span>
              <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {item.description}
              </span>

              {isPlaying && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-indigo-500 rounded-full animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
