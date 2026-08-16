"use client";

import {
  Mail,
  MapPin,
  ArrowRight,
  UserCheck,
  BriefcaseBusiness,
  Loader2,
  BadgeCheck,
  IndianRupee,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type HiringJob = {
  _id: string;
  title: string;
  company: string;
  companyImage?: string;
  slug: string;
  location: string;
  experience: string;
  jobType: string;
  salary: string;
  hiringEmail: string;
  isVerified: boolean;
};

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];

// Colorful gradients used when a company has no uploaded image
const BANNER_GRADIENTS = [
  "from-purple-500 to-fuchsia-500",
  "from-blue-500 to-cyan-400",
  "from-orange-500 to-pink-500",
  "from-emerald-500 to-teal-400",
  "from-rose-500 to-orange-400",
  "from-indigo-500 to-purple-500",
];

const getCompanyGradient = (company: string) => {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BANNER_GRADIENTS[Math.abs(hash) % BANNER_GRADIENTS.length];
};

const getCompanyInitials = (company: string) =>
  company
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function DirectHiringListingPage() {
  const [jobs, setJobs] = useState<HiringJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/direct-hiring`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Failed to fetch direct hiring jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const experienceOptions = useMemo(() => {
    const unique = Array.from(new Set(jobs.map((j) => j.experience).filter(Boolean)));
    return ["All", ...unique];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const typeMatch = jobTypeFilter === "All" || job.jobType === jobTypeFilter;
      const expMatch = experienceFilter === "All" || job.experience === experienceFilter;
      return typeMatch && expMatch;
    });
  }, [jobs, jobTypeFilter, experienceFilter]);

  const hasActiveFilters = jobTypeFilter !== "All" || experienceFilter !== "All";

  const clearFilters = () => {
    setJobTypeFilter("All");
    setExperienceFilter("All");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-slate-50 py-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            <UserCheck size={17} />
            Direct Hiring Opportunities
          </div>
          <h1 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            All Direct Hiring{" "}
            <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Jobs
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            {loading
              ? "Loading opportunities..."
              : `${filteredJobs.length} active ${
                  filteredJobs.length === 1 ? "opportunity" : "opportunities"
                } — send your resume straight to the recruiter.`}
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <SlidersHorizontal size={16} />
            Filters
          </div>

          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-purple-400"
          >
            <option value="All">All Job Types</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-purple-400"
          >
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>
                {exp === "All" ? "All Experience Levels" : exp}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-2 text-sm font-bold text-purple-600 hover:bg-purple-100"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-16 flex items-center justify-center">
            <div className="flex items-center gap-3 text-slate-500">
              <Loader2 size={22} className="animate-spin" />
              Loading hiring opportunities...
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredJobs.length === 0 && (
          <div className="mt-16 rounded-3xl bg-white p-12 text-center shadow-sm">
            <BriefcaseBusiness size={42} className="mx-auto text-slate-400" />
            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              {jobs.length === 0 ? "No Direct Hiring Opportunities Yet" : "No Jobs Match These Filters"}
            </h3>
            <p className="mt-3 text-slate-500">
              {jobs.length === 0
                ? "New direct hiring opportunities will be added soon."
                : "Try changing or clearing your filters."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-purple-600 px-6 py-2.5 font-bold text-white hover:bg-purple-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* GRID */}
        {!loading && filteredJobs.length > 0 && (
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* COMPANY IMAGE / COLORFUL BANNER */}
                <div className="relative h-36 w-full overflow-hidden">
                  {job.companyImage ? (
                    <img
                      src={job.companyImage}
                      alt={job.company}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getCompanyGradient(
                        job.company
                      )}`}
                    >
                      <span className="text-4xl font-black tracking-wide text-white/90">
                        {getCompanyInitials(job.company)}
                      </span>
                    </div>
                  )}

                  <span className="absolute right-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 shadow">
                    Actively Hiring
                  </span>

                  {job.isVerified && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 shadow">
                      <BadgeCheck size={12} />
                      Verified
                    </span>
                  )}
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                  <p className="mt-2 font-semibold text-purple-600">{job.company}</p>

                  <div className="mt-6 space-y-3 text-sm text-slate-600">
                    {job.location && (
                      <div className="flex items-center gap-3">
                        <MapPin size={17} className="text-slate-400" />
                        {job.location}
                      </div>
                    )}
                    {job.experience && (
                      <div className="flex items-center gap-3">
                        <BriefcaseBusiness size={17} className="text-slate-400" />
                        {job.experience}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-3">
                        <IndianRupee size={17} className="text-slate-400" />
                        {job.salary}
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Mail size={17} className="text-purple-500" />
                      <span className="font-semibold text-purple-600">Resume directly to HR</span>
                    </div>
                  </div>

                  <Link
                    href={`/direct-hiring/${job.slug}`}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-bold text-white transition hover:bg-purple-700"
                  >
                    View Job Details
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
