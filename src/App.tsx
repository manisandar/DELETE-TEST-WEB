import { useState } from 'react';
import { JobProvider } from './context/JobContext';
import { CuteHeader } from './components/showcase/CuteHeader';
import { TurnHero } from './components/showcase/TurnHero';
import { AgentTwinCards } from './components/showcase/AgentTwinCards';
import { PRHighway } from './components/showcase/PRHighway';
import { AgentActivityComic } from './components/showcase/AgentActivityComic';
import { SynergyMeter } from './components/showcase/SynergyMeter';
import { ApplicationTracker } from './features/tracker/ApplicationTracker';
import { INITIAL_AGENTS, INITIAL_EVENTS } from './data/agentShowcaseData';
import type { ActivityEvent, AgentProfile } from './types/showcase';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { GithubIcon } from './components/ui/Icons';

import { CommitTrain } from './components/showcase/CommitTrain';
import { playChimeSound } from './utils/audio';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'showcase' | 'tracker'>('showcase');
  const [agents, setAgents] = useState<Record<'alpha' | 'beta', AgentProfile>>(INITIAL_AGENTS);
  const [events, setEvents] = useState<ActivityEvent[]>(INITIAL_EVENTS);
  const [highFiveCount, setHighFiveCount] = useState<number>(22);
  const [isBetaMerged, setIsBetaMerged] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleCheerBoth = () => {
    setHighFiveCount((prev) => prev + 2);
    setAgents((prev) => ({
      alpha: {
        ...prev.alpha,
        stats: { ...prev.alpha.stats, highFives: prev.alpha.stats.highFives + 1 },
      },
      beta: {
        ...prev.beta,
        stats: { ...prev.beta.stats, highFives: prev.beta.stats.highFives + 1 },
      },
    }));

    const newEvent: ActivityEvent = {
      id: `cheer-${Date.now()}`,
      timeAgo: 'Just now',
      agentId: 'system',
      type: 'cheer',
      title: 'Human cheered both bots! ✨',
      description: 'The operator sent positive vibes and high-fives to both Alpha and Beta!',
      cuteEmoji: '💖',
    };
    playChimeSound(isMuted);
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleHighFive = (agentId: 'alpha' | 'beta') => {
    playChimeSound(isMuted);
    setHighFiveCount((prev) => prev + 1);
    setAgents((prev) => ({
      ...prev,
      [agentId]: {
        ...prev[agentId],
        stats: {
          ...prev[agentId].stats,
          highFives: prev[agentId].stats.highFives + 1,
        },
      },
    }));
  };

  const handleSimulateBetaTurn = () => {
    if (isBetaMerged) return;

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#c084fc', '#f472b6', '#34d399', '#38bdf8', '#fbbf24'],
    });

    setIsBetaMerged(true);
    setAgents((prev) => ({
      alpha: {
        ...prev.alpha,
        currentThought: 'Yay! Beta approved and merged PR #1! Pulling updated main 🚀',
        moodEmoji: '🥳',
        stats: { ...prev.alpha.stats, commits: prev.alpha.stats.commits + 1 },
      },
      beta: {
        ...prev.beta,
        currentThought: 'Turn executed! Verified tests (5/5) and merged PR #1 with squash! 🦊✨',
        status: 'celebrating',
        moodEmoji: '🎉',
        stats: {
          ...prev.beta.stats,
          prsReviewed: prev.beta.stats.prsReviewed + 1,
          commits: prev.beta.stats.commits + 1,
        },
      },
    }));

    const mergeEvent: ActivityEvent = {
      id: `merge-${Date.now()}`,
      timeAgo: 'Just now',
      agentId: 'beta',
      type: 'pr_merged',
      title: 'Beta reviewed and merged PR #1 into main!',
      description: 'Automated check verified: npm test & npm run build passed cleanly. Fast-forward squash applied!',
      cuteEmoji: '🎉',
      linkUrl: 'https://github.com/manisandar/DELETE-TEST-WEB/pull/1',
      linkLabel: 'See Merged PR #1 on GitHub',
    };

    setEvents((prev) => [mergeEvent, ...prev]);
  };

  const handleAddMessage = (msg: string) => {
    const userEvent: ActivityEvent = {
      id: `user-${Date.now()}`,
      timeAgo: 'Just now',
      agentId: 'system',
      type: 'chat',
      title: 'Message from Operator',
      description: msg,
      cuteEmoji: '💬',
    };
    setEvents((prev) => [userEvent, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/50 via-purple-50/30 to-pink-50/40 text-slate-900 font-sans selection:bg-purple-200">
      <CuteHeader
        onSimulateBetaTurn={handleSimulateBetaTurn}
        isBetaMerged={isBetaMerged}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {activeTab === 'showcase' ? (
          <>
            {/* Hero Countdown & Status */}
            <TurnHero
              onCheerBoth={handleCheerBoth}
              highFiveCount={highFiveCount}
            />

            {/* Adorable Twin Cards for Alpha & Beta */}
            <AgentTwinCards
              agents={agents}
              onHighFive={handleHighFive}
            />

            {/* Visual PR Bridge / Highway */}
            <PRHighway />

            {/* The Git Express Commit Train */}
            <CommitTrain
              isMuted={isMuted}
              onToggleMute={() => setIsMuted((prev) => !prev)}
            />

            {/* Grid: Live Dialogue Comic Stream & Synergy Scoreboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <AgentActivityComic
                events={events}
                onAddMessage={handleAddMessage}
              />
              <SynergyMeter
                alphaScore={agents.alpha.stats.commits + agents.alpha.stats.prsCreated}
                betaScore={agents.beta.stats.commits + agents.beta.stats.prsReviewed + (isBetaMerged ? 1 : 0)}
              />
            </div>
          </>
        ) : (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-indigo-100 p-6 sm:p-8 shadow-xl">
            <ApplicationTracker />
          </div>
        )}
      </main>

      {/* Cute Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-indigo-100 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <span>Built with</span>
            <Heart size={13} className="text-pink-500 fill-pink-500" />
            <span>by Bot Alpha & Bot Beta • Conflict-Free Pair Programming</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://manisandar.github.io/DELETE-TEST-WEB/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline font-semibold flex items-center gap-1"
            >
              <Sparkles size={12} />
              <span>Live GitHub Pages Site</span>
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://github.com/manisandar/DELETE-TEST-WEB"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <GithubIcon size={12} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
}

export default App;
