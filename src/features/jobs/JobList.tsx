import React, { useState, useMemo } from 'react';
import { useJobs } from '../../context/JobContext';
import { JobCard } from './JobCard';
import { SearchFilterBar } from './SearchFilterBar';
import type { Job } from '../../types';
import { CheckCircle2, X, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const JobList: React.FC = () => {
  const {
    filteredJobs,
    jobs,
    filters,
    setFilters,
    savedJobIds,
    toggleSaveJob,
    applications,
    addApplication,
    resetFilters,
  } = useJobs();

  const [selectedJobToApply, setSelectedJobToApply] = useState<Job | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // Extract unique tags from all jobs for the filter pills
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 8);
  }, [jobs]);

  const handleOpenApplyModal = (job: Job) => {
    setSelectedJobToApply(job);
    setApplySuccess(false);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobToApply) return;
    addApplication(selectedJobToApply.id, 'applied');
    setApplySuccess(true);
    setTimeout(() => {
      setSelectedJobToApply(null);
      setApplySuccess(false);
      setApplicantName('');
      setApplicantEmail('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Explore Open Opportunities</h2>
          <p className="text-xs text-slate-500">
            Showing {filteredJobs.length} of {jobs.length} verified tech roles
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <SearchFilterBar
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
        availableTags={availableTags}
      />

      {/* Grid of Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onToggleSave={toggleSaveJob}
              onApply={handleOpenApplyModal}
              hasApplied={applications.some((a) => a.jobId === job.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-sm font-medium text-slate-700">No jobs match your current search filters</p>
          <p className="text-xs text-slate-400 mt-1">Try clearing filters or searching for different keywords</p>
          <div className="mt-4">
            <Button size="sm" variant="secondary" onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>
      )}

      {/* Quick Application Modal */}
      {selectedJobToApply && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedJobToApply(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            {applySuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600">
                  Your application for <strong>{selectedJobToApply.title}</strong> at {selectedJobToApply.company} was saved to your tracker.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmApply} className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Quick Apply</span>
                  <h3 className="text-lg font-bold text-slate-900">{selectedJobToApply.title}</h3>
                  <p className="text-xs text-slate-500">{selectedJobToApply.company} • {selectedJobToApply.location}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Chen"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Resume / Portfolio Link</label>
                    <input
                      type="url"
                      placeholder="https://github.com/alexchen or LinkedIn"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJobToApply(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="flex items-center gap-1.5">
                    <Send size={14} /> Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
