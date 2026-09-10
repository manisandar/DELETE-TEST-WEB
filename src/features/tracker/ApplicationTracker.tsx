import React, { useState, useMemo } from 'react';
import { useJobs } from '../../context/JobContext';
import type { ApplicationStatus, Application } from '../../types';
import { Badge } from '../../components/ui/Badge';
import {
  Clock,
  Award,
  XCircle,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Building2,
  Calendar,
  Search,
  Trash2,
  Edit3,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const {
    jobs,
    applications,
    savedJobIds,
    updateApplicationStatus,
    addApplication,
    deleteApplication,
    updateApplicationNotes,
    updateApplicationDetails,
  } = useJobs();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesJobId, setEditingNotesJobId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [dateDraft, setDateDraft] = useState('');

  const statuses: { key: ApplicationStatus; label: string; icon: React.ReactNode; color: string; badgeBg: string }[] = [
    { key: 'saved', label: 'Saved Roles', icon: <Bookmark size={15} />, color: 'border-slate-300', badgeBg: 'bg-slate-100 text-slate-700' },
    { key: 'applied', label: 'Applied', icon: <Clock size={15} />, color: 'border-blue-400', badgeBg: 'bg-blue-50 text-blue-700' },
    { key: 'interviewing', label: 'Interviewing', icon: <Clock size={15} />, color: 'border-amber-400', badgeBg: 'bg-amber-50 text-amber-700' },
    { key: 'offered', label: 'Offered', icon: <Award size={15} />, color: 'border-emerald-400', badgeBg: 'bg-emerald-50 text-emerald-700' },
    { key: 'rejected', label: 'Closed / Rejected', icon: <XCircle size={15} />, color: 'border-rose-400', badgeBg: 'bg-rose-50 text-rose-700' },
  ];

  // Combine saved jobs that haven't been applied yet into the 'saved' bucket
  const getJobsInStatus = (status: ApplicationStatus) => {
    let list: { job: (typeof jobs)[0]; app?: Application }[] = [];

    if (status === 'saved') {
      const appliedJobIds = new Set(applications.map((a) => a.jobId));
      list = savedJobIds
        .filter((id) => !appliedJobIds.has(id))
        .map((id) => ({
          job: jobs.find((j) => j.id === id)!,
          app: undefined,
        }))
        .filter((item) => Boolean(item.job));
    } else {
      list = applications
        .filter((app) => app.status === status)
        .map((app) => ({
          job: jobs.find((j) => j.id === app.jobId)!,
          app,
        }))
        .filter((item) => Boolean(item.job));
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      ({ job, app }) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        (app?.notes && app.notes.toLowerCase().includes(q))
    );
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

  const regressStatus = (jobId: string, currentStatus: ApplicationStatus) => {
    if (currentStatus === 'offered') {
      updateApplicationStatus(jobId, 'interviewing');
    } else if (currentStatus === 'interviewing') {
      updateApplicationStatus(jobId, 'applied');
    } else if (currentStatus === 'rejected') {
      updateApplicationStatus(jobId, 'applied');
    }
  };

  const handleMoveTo = (jobId: string, newStatus: ApplicationStatus, currentStatus?: ApplicationStatus) => {
    if (!currentStatus || currentStatus === 'saved') {
      addApplication(jobId, newStatus);
    } else {
      updateApplicationStatus(jobId, newStatus);
    }
  };

  const startEditNotes = (jobId: string, currentNotes = '', currentDate = '') => {
    setEditingNotesJobId(jobId);
    setNoteDraft(currentNotes);
    setDateDraft(currentDate);
  };

  const saveNotes = (jobId: string) => {
    if (updateApplicationDetails) {
      updateApplicationDetails(jobId, {
        notes: noteDraft,
        interviewDate: dateDraft || undefined,
      });
    } else if (updateApplicationNotes) {
      updateApplicationNotes(jobId, noteDraft);
    }
    setEditingNotesJobId(null);
  };

  const handleDelete = (jobId: string) => {
    if (deleteApplication) {
      deleteApplication(jobId);
    }
  };

  const totalTracked = useMemo(() => {
    const appliedCount = applications.length;
    const unappliedSaved = savedJobIds.filter((id) => !applications.some((a) => a.jobId === id)).length;
    return appliedCount + unappliedSaved;
  }, [applications, savedJobIds]);

  const activeInterviews = useMemo(() => {
    return applications.filter((a) => a.status === 'interviewing').length;
  }, [applications]);

  const totalOffers = useMemo(() => {
    return applications.filter((a) => a.status === 'offered').length;
  }, [applications]);

  const interviewRate = useMemo(() => {
    if (applications.length === 0) return 0;
    const inOrPastInterview = applications.filter(
      (a) => a.status === 'interviewing' || a.status === 'offered'
    ).length;
    return Math.round((inOrPastInterview / applications.length) * 100);
  }, [applications]);

  return (
    <div className="space-y-6">
      {/* Header with Title & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Application Pipeline & Tracker</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-normal">
              TASK-02
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your recruitment stages, interview dates, and notes with interactive status flow.
          </p>
        </div>

        {/* Search Bar within Tracker */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter tracker jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Pipeline KPI Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Total Tracked Roles</span>
          <p className="text-lg font-bold text-slate-900 mt-0.5">{totalTracked}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Active Interviews</span>
          <p className="text-lg font-bold text-amber-600 mt-0.5">{activeInterviews}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Offers Extended</span>
          <p className="text-lg font-bold text-emerald-600 mt-0.5">{totalOffers}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Interview Conversion</span>
          <p className="text-lg font-bold text-blue-600 mt-0.5">{interviewRate}%</p>
        </div>
      </div>

      {/* Kanban Board columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        {statuses.map(({ key, label, icon, color, badgeBg }) => {
          const items = getJobsInStatus(key);

          return (
            <div
              key={key}
              className={`bg-slate-50/80 border-t-4 ${color} border-x border-b border-slate-200 rounded-xl p-3 flex flex-col min-h-[380px] shadow-2xs transition-all`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-3">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-700">
                  {icon}
                  <span>{label}</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full font-medium ${badgeBg}`}>
                  {items.length}
                </span>
              </div>

              {/* Column Items */}
              <div className="space-y-3 flex-1">
                {items.length > 0 ? (
                  items.map(({ job, app }) => {
                    const isEditing = editingNotesJobId === job.id;

                    return (
                      <div
                        key={job.id}
                        className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all text-left space-y-2.5"
                      >
                        {/* Title & Actions */}
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-xs text-slate-900 leading-snug line-clamp-1">
                            {job.title}
                          </h4>
                          {app && (
                            <button
                              onClick={() => handleDelete(job.id)}
                              title="Delete from tracker"
                              className="text-slate-300 hover:text-rose-500 p-0.5 rounded transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>

                        {/* Company & Location */}
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <Building2 size={12} className="text-slate-400" /> {job.company}
                          </span>
                          <span className="text-[10px] text-slate-400">{job.location}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="primary" className="text-[10px] px-1.5 py-0">
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {job.level}
                          </Badge>
                          {key === 'offered' && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              <Sparkles size={10} /> Offer Received
                            </span>
                          )}
                        </div>

                        {/* Notes Section or Inline Editor */}
                        {isEditing ? (
                          <div className="p-2 bg-slate-50 rounded-md border border-blue-200 space-y-2 text-xs">
                            <div>
                              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                                Notes & Interview Details
                              </label>
                              <textarea
                                value={noteDraft}
                                onChange={(e) => setNoteDraft(e.target.value)}
                                placeholder="Add notes, recruiter contacts, or feedback..."
                                rows={2}
                                className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                                Interview / Key Date
                              </label>
                              <input
                                type="date"
                                value={dateDraft}
                                onChange={(e) => setDateDraft(e.target.value)}
                                className="w-full text-xs p-1 bg-white border border-slate-200 rounded"
                              />
                            </div>
                            <div className="flex items-center justify-end gap-1 pt-1">
                              <button
                                onClick={() => setEditingNotesJobId(null)}
                                className="px-2 py-0.5 text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-0.5"
                              >
                                <X size={11} /> Cancel
                              </button>
                              <button
                                onClick={() => saveNotes(job.id)}
                                className="px-2.5 py-0.5 text-[11px] bg-blue-600 text-white rounded hover:bg-blue-700 font-medium flex items-center gap-0.5"
                              >
                                <Check size={11} /> Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {app?.notes ? (
                              <div
                                onClick={() => startEditNotes(job.id, app.notes, app.interviewDate || '')}
                                title="Click to edit notes"
                                className="text-[11px] text-slate-600 italic bg-slate-50/90 hover:bg-slate-100 p-1.5 rounded border border-slate-100 cursor-pointer flex items-start justify-between gap-1 group"
                              >
                                <span className="line-clamp-2">"{app.notes}"</span>
                                <Edit3 size={11} className="text-slate-400 group-hover:text-blue-500 shrink-0 mt-0.5" />
                              </div>
                            ) : (
                              app && (
                                <button
                                  onClick={() => startEditNotes(job.id, '', app.interviewDate || '')}
                                  className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                                >
                                  <Edit3 size={10} /> Add notes...
                                </button>
                              )
                            )}

                            {app?.interviewDate && (
                              <p className="text-[10px] font-medium text-amber-600 flex items-center gap-1">
                                <Calendar size={10} /> Interview: {app.interviewDate}
                              </p>
                            )}

                            {app?.appliedDate && !app.interviewDate && (
                              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Calendar size={10} /> {app.appliedDate}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Interactive Status Transition Controls */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
                          {/* Backward transition (if not saved/applied) */}
                          {key !== 'saved' && key !== 'applied' && (
                            <button
                              onClick={() => regressStatus(job.id, key)}
                              title="Move to previous stage"
                              className="font-medium text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer transition-colors"
                            >
                              <ArrowLeft size={11} />
                              <span>Back</span>
                            </button>
                          )}

                          {/* Forward transition */}
                          {key !== 'offered' && key !== 'rejected' && (
                            <button
                              onClick={() => advanceStatus(job.id, app?.status || 'saved')}
                              className="font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer ml-auto transition-colors"
                            >
                              <span>{key === 'saved' ? 'Apply Now' : 'Move Next'}</span>
                              <ArrowRight size={11} />
                            </button>
                          )}

                          {/* Quick Stage Selector Dropdown */}
                          <div className="relative">
                            <select
                              aria-label={`Change stage for ${job.title}`}
                              value={key}
                              onChange={(e) => handleMoveTo(job.id, e.target.value as ApplicationStatus, app?.status)}
                              className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 hover:border-slate-300 cursor-pointer focus:outline-hidden"
                            >
                              <option value="saved">Stage: Saved</option>
                              <option value="applied">Stage: In Review</option>
                              <option value="interviewing">Stage: Phone Screen</option>
                              <option value="offered">Stage: Offer Extended</option>
                              <option value="rejected">Stage: Not Selected</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg">
                    <span>{searchQuery ? 'No matching roles' : 'No entries'}</span>
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
