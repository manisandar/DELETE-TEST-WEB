import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Job Explorer & Bot Alpha Matchmaker', () => {
  it('navigates to Job Explorer tab and displays open jobs', () => {
    render(<App />);

    const jobsTabBtn = screen.getByRole('button', { name: /Job Explorer/i });
    expect(jobsTabBtn).toBeDefined();
    fireEvent.click(jobsTabBtn);

    expect(screen.getByText(/Explore Open Opportunities/i)).toBeDefined();
    expect(screen.getByText(/verified tech roles/i)).toBeDefined();
  });

  it('renders Bot Alpha AI Matchmaker badge and advice on job cards', () => {
    render(<App />);

    const jobsTabBtn = screen.getByRole('button', { name: /Job Explorer/i });
    fireEvent.click(jobsTabBtn);

    // Alpha match score pill
    const matchPills = screen.getAllByText(/% Match/i);
    expect(matchPills.length).toBeGreaterThan(0);

    // Alpha advice snippet
    const adviceElements = screen.getAllByText(/Alpha says:/i);
    expect(adviceElements.length).toBeGreaterThan(0);
  });

  it('filters job listings by search term', () => {
    render(<App />);

    const jobsTabBtn = screen.getByRole('button', { name: /Job Explorer/i });
    fireEvent.click(jobsTabBtn);

    const searchInput = screen.getByPlaceholderText(/Search by job title/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });

    // Should still show matching Frontend roles
    expect(screen.getAllByText(/Frontend/i).length).toBeGreaterThan(0);
  });

  it('filters job listings by remote toggle button', () => {
    render(<App />);

    const jobsTabBtn = screen.getByRole('button', { name: /Job Explorer/i });
    fireEvent.click(jobsTabBtn);

    const remoteBtn = screen.getByRole('button', { name: /^Remote$/i });
    expect(remoteBtn).toBeDefined();
    fireEvent.click(remoteBtn);
  });

  it('allows saving and unsaving jobs', () => {
    render(<App />);

    const jobsTabBtn = screen.getByRole('button', { name: /Job Explorer/i });
    fireEvent.click(jobsTabBtn);

    const saveButtons = screen.getAllByRole('button', { name: /Save job/i });
    expect(saveButtons.length).toBeGreaterThan(0);

    fireEvent.click(saveButtons[0]);
    // Should now indicate saved
    expect(screen.getAllByRole('button', { name: /Remove from saved/i }).length).toBeGreaterThan(0);
  });
});
