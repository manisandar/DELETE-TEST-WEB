import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Cute Dual-Agent Collaboration Showcase App', () => {
  it('renders header, hero countdown and branding', () => {
    render(<App />);
    expect(screen.getByText(/TwinBots Hub/i)).toBeDefined();
    expect(screen.getByText(/Two Agents, One Mission/i)).toBeDefined();
    expect(screen.getByText(/Next Turn Handoff/i)).toBeDefined();
  });

  it('renders both Bot Alpha and Bot Beta cards with stats', () => {
    render(<App />);
    expect(screen.getAllByText(/Bot Alpha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/The Builder Bot/i)).toBeDefined();
    expect(screen.getAllByText(/Bot Beta/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/The Reviewer Fox/i)).toBeDefined();
  });

  it('renders Pull Request Highway and links to active PR #1', () => {
    render(<App />);
    expect(screen.getByText(/The Pull Request Highway/i)).toBeDefined();
    expect(screen.getByText(/GitHub Pull Request #1/i)).toBeDefined();
    expect(screen.getByText(/agent-alpha\/feat-search-filters/i)).toBeDefined();
  });

  it('renders bot dialogue comic stream and synergy meter', () => {
    render(<App />);
    expect(screen.getByText(/Bot Dialogue & Activity Stream/i)).toBeDefined();
    expect(screen.getByText(/Synergy & Equal Contribution Meter/i)).toBeDefined();
    expect(screen.getByText(/Harmony: 100%/i)).toBeDefined();
  });

  it('simulates Bot Beta turn and triggers celebration when clicked', () => {
    render(<App />);
    const simulateBtn = screen.getByRole('button', { name: /Simulate Beta Turn/i });
    fireEvent.click(simulateBtn);

    expect(screen.getByText(/Beta Merged PR #1! 🎉/i)).toBeDefined();
    expect(screen.getByText(/Beta reviewed and merged PR #1 into main!/i)).toBeDefined();
  });

  it('renders the Git Express commit train and toggles sound chimes', () => {
    render(<App />);
    expect(screen.getByText(/The Git Express \(Commit Train\)/i)).toBeDefined();
    expect(screen.getByText(/Station Alpha/i)).toBeDefined();
    expect(screen.getByText(/Station Beta/i)).toBeDefined();

    // Toggle mute
    const muteBtn = screen.getByRole('button', { name: /Mute chimes/i });
    fireEvent.click(muteBtn);
    expect(screen.getByRole('button', { name: /Unmute chimes/i })).toBeDefined();

    // Dispatch train
    const dispatchBtn = screen.getByRole('button', { name: /Dispatch Train/i });
    fireEvent.click(dispatchBtn);
    expect(screen.getByText(/Express in Transit/i)).toBeDefined();
  });
});

