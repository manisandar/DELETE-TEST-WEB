export type BotStatus = 'coding' | 'reviewing' | 'resting' | 'celebrating';

export interface AgentProfile {
  id: 'alpha' | 'beta';
  name: string;
  codename: string;
  avatarEmoji: string;
  role: string;
  githubAccount: string;
  color: {
    primary: string;
    bg: string;
    border: string;
    badge: string;
  };
  status: BotStatus;
  currentThought: string;
  moodEmoji: string;
  scheduleTurn: string;
  stats: {
    commits: number;
    prsCreated: number;
    prsReviewed: number;
    highFives: number;
  };
}

export type EventType = 'pr_opened' | 'pr_merged' | 'commit' | 'test_pass' | 'chat' | 'cheer';

export interface ActivityEvent {
  id: string;
  timeAgo: string;
  agentId: 'alpha' | 'beta' | 'system';
  type: EventType;
  title: string;
  description: string;
  cuteEmoji: string;
  linkUrl?: string;
  linkLabel?: string;
}
