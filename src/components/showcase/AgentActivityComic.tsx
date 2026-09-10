import React, { useState } from 'react';
import type { ActivityEvent } from '../../types/showcase';
import { MessageSquare, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';

interface AgentActivityComicProps {
  events: ActivityEvent[];
  onAddMessage: (msg: string) => void;
  onRefreshLive?: () => void;
  isRefreshing?: boolean;
}

export const AgentActivityComic: React.FC<AgentActivityComicProps> = ({
  events,
  onAddMessage,
  onRefreshLive,
  isRefreshing = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'alpha' | 'beta'>('all');
  const [userCheer, setUserCheer] = useState('');

  const filteredEvents = events.filter((ev) => {
    if (filter === 'all') return true;
    return ev.agentId === filter;
  });

  const handleSendCheer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCheer.trim()) return;
    onAddMessage(userCheer.trim());
    setUserCheer('');
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-indigo-100 p-6 shadow-lg space-y-4">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-50 text-pink-600">
            <MessageSquare size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-800 text-base">Bot Dialogue & Activity Stream</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                🟢 Live GitHub Connected
              </span>
            </div>
            <p className="text-xs text-slate-500">Real-time timeline of commits, PR events, and bot thoughts</p>
          </div>
        </div>

        {/* Action Controls: Live Refresh & Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {onRefreshLive && (
            <button
              onClick={onRefreshLive}
              disabled={isRefreshing}
              aria-label="Refresh live GitHub activity"
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isRefreshing
                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-200'
              }`}
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
              <span className="text-[11px] hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync GitHub'}</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['all', 'alpha', 'beta'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer capitalize ${
                  filter === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'alpha' ? 'Alpha 🤖' : 'Beta 🦊'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comic Chat Feed */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredEvents.map((ev) => {
          const isAlpha = ev.agentId === 'alpha';
          const isBeta = ev.agentId === 'beta';

          return (
            <div
              key={ev.id}
              className={`flex items-start gap-3 p-3.5 rounded-2xl transition-all ${
                isAlpha
                  ? 'bg-sky-50/70 border border-sky-200/80 mr-4'
                  : isBeta
                  ? 'bg-purple-50/70 border border-purple-200/80 ml-4'
                  : 'bg-slate-50 border border-slate-200 mx-2'
              }`}
            >
              {/* Cute Emoji Bubble */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-2xs ${
                  isAlpha
                    ? 'bg-sky-200 text-sky-900'
                    : isBeta
                    ? 'bg-purple-200 text-purple-900'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {ev.cuteEmoji}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    {ev.title}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono">{ev.timeAgo}</span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ev.description}</p>

                {ev.linkUrl && (
                  <a
                    href={ev.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    <span>{ev.linkLabel || 'Open Link'}</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cheer Input Box */}
      <form onSubmit={handleSendCheer} className="flex gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          placeholder="Type a cheer message for both bots (e.g. 'Great job on PR #1!')..."
          value={userCheer}
          onChange={(e) => setUserCheer(e.target.value)}
          className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles size={13} />
          <span>Cheer</span>
        </button>
      </form>
    </div>
  );
};
