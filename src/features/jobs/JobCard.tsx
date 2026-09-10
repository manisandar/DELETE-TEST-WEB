import React from 'react';
import type { Job } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MapPin, DollarSign, Bookmark, BookmarkCheck, Building2, Calendar } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onApply: (job: Job) => void;
  hasApplied: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onApply,
  hasApplied,
}) => {
  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency} ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Card Header: Company, Location, Save Button */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Building2 size={13} className="text-slate-400" />
                  {job.company}
                </span>
                {job.isFeatured && (
                  <Badge variant="purple">Featured</Badge>
                )}
              </div>
              <h3 className="font-semibold text-base text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onToggleSave(job.id)}
            aria-label={isSaved ? 'Remove from saved' : 'Save job'}
            className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {isSaved ? (
              <BookmarkCheck size={20} className="text-blue-600 fill-blue-600" />
            ) : (
              <Bookmark size={20} />
            )}
          </button>
        </div>

        {/* Details row: location, type, level, salary */}
        <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-slate-400" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <DollarSign size={13} className="text-emerald-600" />
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} className="text-slate-400" />
            {job.postedDate}
          </span>
        </div>

        {/* Short description */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge variant="primary">{job.type}</Badge>
          <Badge variant="default">{job.level}</Badge>
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">ID: {job.id}</span>
        {hasApplied ? (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            ✓ Application Submitted
          </span>
        ) : (
          <Button size="sm" onClick={() => onApply(job)}>
            Quick Apply
          </Button>
        )}
      </div>
    </div>
  );
};
