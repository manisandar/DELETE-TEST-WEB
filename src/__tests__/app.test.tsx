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

  it('renders live GitHub sync controls and status badge', () => {
    render(<App />);
    expect(screen.getByText(/Live GitHub Connected/i)).toBeDefined();
    const syncBtn = screen.getByRole('button', { name: /Refresh live GitHub activity/i });
    expect(syncBtn).toBeDefined();
    fireEvent.click(syncBtn);
  });

  it('renders TwinBots synth soundboard and triggers audio FX', () => {
    render(<App />);
    expect(screen.getByText(/TwinBots Soundboard & Synth FX/i)).toBeDefined();
    expect(screen.getByText(/Robot Chirp/i)).toBeDefined();
    expect(screen.getByText(/Fox Whistle/i)).toBeDefined();
    expect(screen.getByText(/Merge Fanfare/i)).toBeDefined();
    expect(screen.getByText(/Push Whoosh/i)).toBeDefined();

    // Trigger Robot Chirp button
    const robotChirpBtn = screen.getByRole('button', { name: /Robot Chirp/i });
    fireEvent.click(robotChirpBtn);

    // Should create a cheer event in dialogue stream
    expect(screen.getByText(/Played Robot Chirp synth sound!/i)).toBeDefined();

    // Toggle mute
    const soundboardMuteBtn = screen.getByRole('button', { name: /Mute soundboard/i });
    fireEvent.click(soundboardMuteBtn);
    expect(screen.getByRole('button', { name: /Unmute soundboard/i })).toBeDefined();
  });

  it('renders TwinBots mascot costume selector and customizes accessories', () => {
    render(<App />);
    expect(screen.getByText(/Alpha's Costume:/i)).toBeDefined();
    expect(screen.getByText(/Beta's Costume:/i)).toBeDefined();

    // Select Shades for Alpha
    const shadesBtn = screen.getByRole('button', { name: /Select Shades for Alpha/i });
    expect(shadesBtn).toBeDefined();
    fireEvent.click(shadesBtn);
    expect(screen.getAllByText(/Shades/i).length).toBeGreaterThan(0);

    // Select Ribbon for Beta
    const ribbonBtn = screen.getByRole('button', { name: /Select Ribbon for Beta/i });
    expect(ribbonBtn).toBeDefined();
    fireEvent.click(ribbonBtn);
    expect(screen.getAllByText(/Ribbon/i).length).toBeGreaterThan(0);
  });
});

