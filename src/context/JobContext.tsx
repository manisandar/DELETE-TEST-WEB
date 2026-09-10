import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Job, FilterState, Application, ApplicationStatus } from '../types';
import { INITIAL_JOBS } from '../data/mockJobs';

interface JobContextType {
  jobs: Job[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applications: Application[];
  updateApplicationStatus: (jobId: string, status: ApplicationStatus) => void;
  addApplication: (jobId: string, status?: ApplicationStatus) => void;
  filteredJobs: Job[];
  resetFilters: () => void;
  deleteApplication?: (jobId: string) => void;
  updateApplicationNotes?: (jobId: string, notes: string) => void;
  updateApplicationDetails?: (jobId: string, details: Partial<Application>) => void;
}

const defaultFilters: FilterState = {
  search: '',
  type: '',
  level: '',
  minSalary: 0,
  selectedTag: '',
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs] = useState<Job[]>(INITIAL_JOBS);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-1',
      jobId: 'job-1',
      status: 'applied',
      appliedDate: '2026-09-08',
      notes: 'Submitted resume and portfolio link.',
    },
    {
      id: 'app-2',
      jobId: 'job-2',
      status: 'interviewing',
      appliedDate: '2026-09-05',
      notes: 'Initial technical chat scheduled with engineering lead.',
    },
  ]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const addApplication = (jobId: string, status: ApplicationStatus = 'applied') => {
    setApplications((prev) => {
      const exists = prev.find((a) => a.jobId === jobId);
      if (exists) {
        return prev.map((a) => (a.jobId === jobId ? { ...a, status } : a));
      }
      return [
        ...prev,
        {
          id: `app-${Date.now()}`,
          jobId,
          status,
          appliedDate: new Date().toISOString().split('T')[0],
        },
      ];
    });
  };

  const updateApplicationStatus = (jobId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.jobId === jobId ? { ...app, status } : app))
    );
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const deleteApplication = (jobId: string) => {
    setApplications((prev) => prev.filter((app) => app.jobId !== jobId));
  };

  const updateApplicationNotes = (jobId: string, notes: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.jobId === jobId ? { ...app, notes } : app))
    );
  };

  const updateApplicationDetails = (jobId: string, details: Partial<Application>) => {
    setApplications((prev) =>
      prev.map((app) => (app.jobId === jobId ? { ...app, ...details } : app))
    );
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search text match
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Type match
      if (filters.type && job.type !== filters.type) {
        return false;
      }

      // Level match
      if (filters.level && job.level !== filters.level) {
        return false;
      }

      // Salary match
      if (filters.minSalary > 0 && job.salaryMax < filters.minSalary) {
        return false;
      }

      // Tag match
      if (filters.selectedTag && !job.tags.includes(filters.selectedTag)) {
        return false;
      }

      return true;
    });
  }, [jobs, filters]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        filters,
        setFilters,
        savedJobIds,
        toggleSaveJob,
        applications,
        updateApplicationStatus,
        addApplication,
        filteredJobs,
        resetFilters,
        deleteApplication,
        updateApplicationNotes,
        updateApplicationDetails,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
