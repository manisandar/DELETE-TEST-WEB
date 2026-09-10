import React from 'react';
import { useJobs } from '../../context/JobContext';
import type { ApplicationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Clock, Award, XCircle, Bookmark, ArrowRight, Building2, Calendar } from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const { jobs, applications, savedJobIds, updateApplicationStatus, addApplication } = useJobs();

  const statuses: { key: ApplicationStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'saved', label: 'Saved Roles', icon: <Bookmark size={15} />, color: 'border-slate-300' },
    { key: 'applied', label: 'Applied', icon: <Clock size={15} />, color: 'border-blue-400' },
    { key: 'interviewing', label: 'Interviewing', icon: <Clock size={15} />, color: 'border-amber-400' },
    { key: 'offered', label: 'Offered', icon: <Award size={15} />, color: 'border-emerald-400' },
    { key: 'rejected', label: 'Closed / Rejected', icon: <XCircle size={15} />, color: 'border-rose-400' },
  ];

  // Combine saved jobs that haven't been applied yet into the 'saved' bucket
  const getJobsInStatus = (status: ApplicationStatus) => {
    if (status === 'saved') {
      const appliedJobIds = new Set(applications.map((a) => a.jobId));
      return savedJobIds
        .filter((id) => !appliedJobIds.has(id))
        .map((id) => {
          const job = jobs.find((j) => j.id === id);
          return { job, app: undefined };
        })
        .filter((item): item is { job: NonNullable<typeof item.job>; app: undefined } => Boolean(item.job));
    }

    return applications
      .filter((app) => app.status === status)
      .map((app) => {
        const job = jobs.find((j) => j.id === app.jobId);
        return { job, app };
      })
      .filter((item): item is { job: NonNullable<typeof item.job>; app: typeof item.app } => Boolean(item.job));
  };

  const advanceStatus = (jobId: string, currentStatus?: ApplicationStatus) => {
    if (!currentStatus || currentStatus === 'saved') {
      addApplication(jobId, 'applied');
    } else if (currentStatus === 'applied') {
      updateApplicationStatus(jobId, 'interviewing');
    } else if (currentStatus === 'interviewing') {
      updateApplicationStatus(jobId, 'offered');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Application Pipeline & Tracker</h2>
        <p className="text-xs text-slate-500">
          Track your active recruitment stages, upcoming interviews, and offers in one organized dashboard.
        </p>
      </div>

      {/* Kanban Board columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        {statuses.map(({ key, label, icon, color }) => {
          const items = getJobsInStatus(key);

          return (
            <div
              key={key}
              className={`bg-slate-50/70 border-t-4 ${color} border-x border-b border-slate-200 rounded-xl p-3 flex flex-col min-h-[350px] shadow-2xs`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-3">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-700">
                  {icon}
                  <span>{label}</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full">
                  {items.length}
                </span>
              </div>

              {/* Column Items */}
              <div className="space-y-3 flex-1">
                {items.length > 0 ? (
                  items.map(({ job, app }) => (
                    <div
                      key={job.id}
                      className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-blue-300 transition-all text-left space-y-2"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-semibold text-xs text-slate-900 leading-snug line-clamp-1">
                          {job.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Building2 size={12} /> {job.company}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        <Badge variant="primary" className="text-[10px] px-1.5 py-0">
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {job.level}
                        </Badge>
                      </div>

                      {app?.notes && (
                        <p className="text-[11px] text-slate-500 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                          "{app.notes}"
                        </p>
                      )}

                      {app?.appliedDate && (
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar size={10} /> {app.appliedDate}
                        </p>
                      )}

                      {/* Quick stage advance button */}
                      {key !== 'offered' && key !== 'rejected' && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => advanceStatus(job.id, app?.status || 'saved')}
                            className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>Move Next</span>
                            <ArrowRight size={11} />
                          </button>

                          {key === 'interviewing' && (
                            <button
                              onClick={() => updateApplicationStatus(job.id, 'rejected')}
                              className="text-[11px] text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              Close
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg">
                    <span>No entries</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
