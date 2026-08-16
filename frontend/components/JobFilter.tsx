"use client";

import { Search, RotateCcw } from "lucide-react";

type JobFilterProps = {
  search: string;
  category: string;
  experience: string;
  jobType: string;
  salary: string;

  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setExperience: (value: string) => void;
  setJobType: (value: string) => void;
  setSalary: (value: string) => void;

  resetFilters: () => void;
};

export default function JobFilter({
  search,
  category,
  experience,
  jobType,
  salary,
  setSearch,
  setCategory,
  setExperience,
  setJobType,
  setSalary,
  resetFilters,
}: JobFilterProps) {
  return (
    <div className="h-fit rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Filter Jobs
        </h2>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Search Job
        </label>

        <div className="flex items-center rounded-xl border border-slate-300 px-4 py-3">
          <Search size={18} className="mr-2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title or company"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none"
        >
          <option value="All">All Jobs</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Direct Hiring">Direct Hiring</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Experience
        </label>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none"
        >
          <option value="Any">Any Experience</option>
          <option value="Freshers">Freshers</option>
          <option value="0-2 Years">0-2 Years</option>
          <option value="2-5 Years">2-5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Job Type
        </label>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none"
        >
          <option value="All">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Salary */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Salary
        </label>

        <select
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none"
        >
          <option value="Any">Any Salary</option>
          <option value="0-5 LPA">0-5 LPA</option>
          <option value="5-10 LPA">5-10 LPA</option>
          <option value="10-20 LPA">10-20 LPA</option>
          <option value="20+ LPA">20+ LPA</option>
        </select>
      </div>

    </div>
  );
}