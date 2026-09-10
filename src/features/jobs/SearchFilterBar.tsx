import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, Globe } from 'lucide-react';
import type { FilterState } from '../../types';

interface SearchFilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  availableTags: string[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  setFilters,
  onReset,
  availableTags,
}) => {
  const activeFilterCount = [
    Boolean(filters.search),
    Boolean(filters.type),
    Boolean(filters.level),
    filters.minSalary > 0,
    Boolean(filters.selectedTag),
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3.5">
      {/* Primary search & quick filters row */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by job title, skill, company or keyword..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
          <select
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
            <option value="Part-time">Part-time</option>
          </select>

          <select
            value={filters.level}
            onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value }))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">All Seniorities</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid-Level</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead / Staff</option>
          </select>

          {/* Quick Remote Filter Button */}
          <button
            type="button"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                type: prev.type === 'Remote' ? '' : 'Remote',
              }))
            }
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              filters.type === 'Remote'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Globe size={13} className={filters.type === 'Remote' ? 'text-emerald-600' : 'text-slate-400'} />
            <span>Remote</span>
          </button>
        </div>
      </div>

      {/* Salary Slider & Filter Controls */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <SlidersHorizontal size={13} className="text-slate-400" />
            <span>Min Salary:</span>
          </div>
          <input
            type="range"
            min="0"
            max="200000"
            step="10000"
            value={filters.minSalary}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minSalary: Number(e.target.value) }))
            }
            className="w-24 sm:w-32 accent-blue-600 cursor-pointer"
          />
          <span className="font-mono font-semibold text-slate-800 min-w-[50px]">
            {filters.minSalary > 0 ? `$${(filters.minSalary / 1000).toFixed(0)}k+` : 'Any'}
          </span>
        </div>

        {/* Reset and Active Filter Badge */}
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
              {activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}
            </span>
          )}

          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Popular Skills Tag Pills */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-500 font-medium mr-1">Popular Skills:</span>
        {availableTags.map((tag) => {
          const isSelected = filters.selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  selectedTag: isSelected ? '' : tag,
                }))
              }
              className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 font-medium shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
