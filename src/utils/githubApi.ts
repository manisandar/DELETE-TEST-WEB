import type { ActivityEvent } from '../types/showcase';

interface RawGitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  author?: {
    login: string;
  };
}

interface RawGitHubPR {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  merged_at?: string | null;
  user: {
    login: string;
  };
  head: {
    ref: string;
  };
}

export async function fetchLiveGitHubEvents(): Promise<ActivityEvent[]> {
  try {
    const [commitsRes, pullsRes] = await Promise.allSettled([
      fetch('https://api.github.com/repos/manisandar/DELETE-TEST-WEB/commits?per_page=5', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
      fetch('https://api.github.com/repos/manisandar/DELETE-TEST-WEB/pulls?state=all&per_page=5', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
    ]);

    const events: ActivityEvent[] = [];

    // Process PRs
    if (pullsRes.status === 'fulfilled' && pullsRes.value.ok) {
      const pulls: RawGitHubPR[] = await pullsRes.value.json();
      pulls.forEach((pr) => {
        const isAlpha = pr.head.ref.startsWith('agent-alpha') || pr.user.login.toLowerCase().includes('manisandar');
        const isMerged = Boolean(pr.merged_at);

        events.push({
          id: `gh-pr-${pr.number}`,
          timeAgo: formatTimeAgo(pr.created_at),
          agentId: isAlpha ? 'alpha' : 'beta',
          type: isMerged ? 'pr_merged' : 'pr_opened',
          title: `PR #${pr.number}: ${pr.title}`,
          description: isMerged
            ? `Merged into main with green CI checks! 🚀 (${pr.head.ref})`
            : `Open on GitHub awaiting review (${pr.head.ref})`,
          cuteEmoji: isMerged ? '🎉' : '🎁',
          linkUrl: pr.html_url,
          linkLabel: `View PR #${pr.number} on GitHub`,
        });
      });
    }

    // Process Commits
    if (commitsRes.status === 'fulfilled' && commitsRes.value.ok) {
      const commits: RawGitHubCommit[] = await commitsRes.value.json();
      commits.forEach((c) => {
        const isAlpha = (c.author?.login || c.commit.author.name).toLowerCase().includes('manisandar') ||
                        (c.author?.login || '').toLowerCase().includes('alpha');
        const shortSha = c.sha.substring(0, 7);
        const title = c.commit.message.split('\n')[0];

        events.push({
          id: `gh-commit-${c.sha}`,
          timeAgo: formatTimeAgo(c.commit.author.date),
          agentId: isAlpha ? 'alpha' : 'beta',
          type: 'commit',
          title: `Commit [${shortSha}]: ${title}`,
          description: `Authored by ${c.commit.author.name} on manisandar/DELETE-TEST-WEB`,
          cuteEmoji: '📦',
          linkUrl: c.html_url,
          linkLabel: `View Commit ${shortSha}`,
        });
      });
    }

    return events;
  } catch {
    // Gracefully handle rate limits or offline network
    return [];
  }
}

function formatTimeAgo(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  } catch {
    return 'Recent';
  }
}
