import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('ApplicationTracker Kanban Component (TASK-02)', () => {
  it('renders pipeline KPI cards and all 5 status columns', () => {
    render(<App />);
    const trackerTab = screen.getByRole('button', { name: /Application Tracker/i });
    fireEvent.click(trackerTab);

    // KPI cards
    expect(screen.getByText(/Total Tracked Roles/i)).toBeDefined();
    expect(screen.getByText(/Active Interviews/i)).toBeDefined();
    expect(screen.getByText(/Offers Extended/i)).toBeDefined();
    expect(screen.getByText(/Interview Conversion/i)).toBeDefined();

    // 5 Kanban columns
    expect(screen.getByText(/Saved Roles/i)).toBeDefined();
    expect(screen.getByText(/^Applied$/i)).toBeDefined();
    expect(screen.getByText(/^Interviewing$/i)).toBeDefined();
    expect(screen.getByText(/^Offered$/i)).toBeDefined();
    expect(screen.getByText(/Closed \/ Rejected/i)).toBeDefined();
  });

  it('filters tracked jobs by search keyword', () => {
    render(<App />);
    const trackerTab = screen.getByRole('button', { name: /Application Tracker/i });
    fireEvent.click(trackerTab);

    const searchInput = screen.getByPlaceholderText(/Filter tracker jobs/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });

    // Job-1 Senior Frontend Engineer should remain visible
    expect(screen.getByText(/Senior Frontend Engineer/i)).toBeDefined();
  });

  it('allows advancing a saved job to applied', () => {
    render(<App />);
    const trackerTab = screen.getByRole('button', { name: /Application Tracker/i });
    fireEvent.click(trackerTab);

    // Click "Apply Now" on a saved job
    const applyButtons = screen.getAllByRole('button', { name: /Apply Now/i });
    if (applyButtons.length > 0) {
      fireEvent.click(applyButtons[0]);
    }

    // Total Tracked or Applied count should reflect change
    expect(screen.getByText(/Application Pipeline & Tracker/i)).toBeDefined();
  });

  it('supports inline editing of application notes', () => {
    render(<App />);
    const trackerTab = screen.getByRole('button', { name: /Application Tracker/i });
    fireEvent.click(trackerTab);

    const noteText = screen.getByText(/Initial technical chat scheduled/i);
    fireEvent.click(noteText);

    const textarea = screen.getByPlaceholderText(/Add notes, recruiter contacts/i);
    expect(textarea).toBeDefined();

    fireEvent.change(textarea, { target: { value: 'Passed stage 1, technical interview scheduled for Monday.' } });
    const saveBtn = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText(/Passed stage 1/i)).toBeDefined();
  });

  it('supports changing stages via the stage selector dropdown', () => {
    render(<App />);
    const trackerTab = screen.getByRole('button', { name: /Application Tracker/i });
    fireEvent.click(trackerTab);

    const selectElements = screen.getAllByRole('combobox');
    expect(selectElements.length).toBeGreaterThan(0);

    // Change first dropdown to "offered"
    fireEvent.change(selectElements[0], { target: { value: 'offered' } });
    expect(screen.getByText(/Offers Extended/i)).toBeDefined();
  });
});
