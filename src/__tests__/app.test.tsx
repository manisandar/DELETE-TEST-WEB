import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Job Portal Dual-Agent Collaboration App', () => {
  it('renders application navigation and active agent banner', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'CareerSphere' })).toBeDefined();
    expect(screen.getByText(/Dual-Agent Pipeline Active/i)).toBeDefined();
    expect(screen.getByText(/Agent Alpha: @account-a/i)).toBeDefined();
    expect(screen.getByText(/Agent Beta: @account-b/i)).toBeDefined();
  });

  it('renders initial job postings and filters', () => {
    render(<App />);
    expect(screen.getByText(/Explore Open Opportunities/i)).toBeDefined();
    expect(screen.getByRole('heading', { name: /Senior Frontend Engineer/i })).toBeDefined();
    expect(screen.getByRole('heading', { name: /AI Platform Engineer/i })).toBeDefined();
  });

  it('filters job postings when search query is entered', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search by job title/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });

    expect(screen.getByRole('heading', { name: /Senior Frontend Engineer/i })).toBeDefined();
    expect(screen.queryByRole('heading', { name: /AI Platform Engineer/i })).toBeNull();
  });

  it('switches to Application Tracker and displays kanban stages', () => {
    render(<App />);
    const trackerTab = screen.getByRole('button', { name: /Application Tracker/i });
    fireEvent.click(trackerTab);

    expect(screen.getByText(/Application Pipeline & Tracker/i)).toBeDefined();
    expect(screen.getByText(/Saved Roles/i)).toBeDefined();
    expect(screen.getByText(/Applied/i)).toBeDefined();
    expect(screen.getByText(/Interviewing/i)).toBeDefined();
  });

  it('toggles Remote Only filter to display only remote opportunities', () => {
    render(<App />);
    const remoteButton = screen.getByRole('button', { name: /Remote/i });
    fireEvent.click(remoteButton);

    expect(screen.getByRole('heading', { name: /Senior Frontend Engineer/i })).toBeDefined();
    expect(screen.queryByRole('heading', { name: /Staff Cloud Infrastructure Architect/i })).toBeNull();
  });
});

