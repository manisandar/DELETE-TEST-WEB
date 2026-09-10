import React from 'react';
import { useJobs } from '../../context/JobContext';
import { TrendingUp, DollarSign, Award, Briefcase, Zap } from 'lucide-react';

export const JobStats: React.FC = () => {
  const { jobs, applications } = useJobs();

  // Calculate average salary by seniority
  const levels = ['Junior', 'Mid', 'Senior', 'Lead'] as const;
  const salaryByLevel = levels.map((lvl) => {
    const matching = jobs.filter((j) => j.level === lvl);
    if (matching.length === 0) return { level: lvl, avg: 0, count: 0 };
    const total = matching.reduce((acc, j) => acc + (j.salaryMin + j.salaryMax) / 2, 0);
    return { level: lvl, avg: Math.round(total / matching.length), count: matching.length };
  });

  // Calculate skill frequency
  const skillCount: Record<string, number> = {};
  jobs.forEach((j) => {
    j.tags.forEach((tag) => {
      skillCount[tag] = (skillCount[tag] || 0) + 1;
    });
  });

  const sortedSkills = Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Application conversion stats
  const totalApplied = applications.length;
  const interviewingCount = applications.filter((a) => a.status === 'interviewing').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Market Insights & Salary Analytics</h2>
        <p className="text-xs text-slate-500">
          Real-time compensation benchmarks and skill demand trends across the platform.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Postings</p>
            <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Avg Senior Comp</p>
            <p className="text-2xl font-bold text-slate-900">$172k</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Remote Roles</p>
            <p className="text-2xl font-bold text-slate-900">
              {Math.round((jobs.filter((j) => j.type === 'Remote').length / jobs.length) * 100)}%
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Interview Rate</p>
            <p className="text-2xl font-bold text-slate-900">
              {totalApplied > 0 ? Math.round((interviewingCount / totalApplied) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Benchmark by Seniority */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <DollarSign size={18} className="text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Salary Benchmark by Seniority (USD)</h3>
          </div>

          <div className="space-y-3">
            {salaryByLevel.map(({ level, avg, count }) => (
              <div key={level} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{level} Level ({count} roles)</span>
                  <span className="font-mono text-slate-900">${avg.toLocaleString()} / yr</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (avg / 220000) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Demanded Skills */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Zap size={18} className="text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900">Top In-Demand Tech Skills</h3>
          </div>

          <div className="space-y-3">
            {sortedSkills.map(([skill, count]) => (
              <div key={skill} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs font-semibold text-slate-800">{skill}</span>
                <span className="text-xs text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                  {count} job postings
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
