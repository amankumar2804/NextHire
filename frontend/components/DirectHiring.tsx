"use client";

import {
  Mail,
  MapPin,
  ArrowRight,
  UserCheck,
  BriefcaseBusiness,
  Loader2,
  BadgeCheck,
  Sparkles,
  FileSearch,
  Send,
  IndianRupee,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

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

const STEPS = [
  {
    icon: FileSearch,
    title: "Browse Openings",
    text: "Companies and HRs post real vacancies here directly.",
  },
  {
    icon: BadgeCheck,
    title: "Check the Details",
    text: "Open a job to see eligibility, skills and the HR's email.",
  },
  {
    icon: Send,
    title: "Email Your Resume",
    text: "Skip the forms — attach your resume and send it straight to HR.",
  },
];

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

export default function DirectHiring() {
  const [jobs, setJobs] = useState<HiringJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirectHiringJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/direct-hiring`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Failed to fetch direct hiring jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectHiringJobs();
  }, []);

  const previewJobs = jobs.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-slate-50 py-24">
      {/* DECORATIVE BLURS */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            <UserCheck size={17} />
            Direct Hiring Opportunities
          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Send Your Resume{" "}
            <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Directly to HR
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            No long application process. Find active hiring opportunities,
            check the job details and send your resume directly to the
            provided recruiter email — no accounts, no forms.
          </p>
        </div>

        {/* HOW IT WORKS */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-purple-100 bg-white p-5 text-center shadow-sm"
            >
              <div className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-purple-600 text-xs font-black text-white">
                {index + 1}
              </div>
              <div className="mx-auto mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <step.icon size={20} />
              </div>
              <p className="mt-3 font-bold text-slate-900">{step.title}</p>
              <p className="mt-1 text-xs text-slate-500">{step.text}</p>
            </div>
          ))}
        </div>

        {/* IMPORTANT MESSAGE */}
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-purple-200 bg-purple-50 p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Mail size={24} className="text-purple-600" />
            <p className="font-semibold text-purple-900">
              Find a job you like?
              <span className="ml-1 text-purple-700">
                View the details and send your resume directly to HR.
              </span>
            </p>
          </div>
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

        {/* NO JOBS */}
        {!loading && jobs.length === 0 && (
          <div className="mt-16 rounded-3xl bg-white p-12 text-center shadow-sm">
            <BriefcaseBusiness size={42} className="mx-auto text-slate-400" />
            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No Direct Hiring Opportunities Yet
            </h3>
            <p className="mt-3 text-slate-500">
              New direct hiring opportunities will be added soon.
            </p>
          </div>
        )}

        {/* JOB CARDS */}
        {!loading && previewJobs.length > 0 && (
          <>
            <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {previewJobs.map((job) => (
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
                    {/* TITLE */}
                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>

                    <p className="mt-2 font-semibold text-purple-600">{job.company}</p>

                    {/* DETAILS */}
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
                        <span className="font-semibold text-purple-600">
                          Resume directly to HR
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/direct-hiring/${job.slug}`}
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-bold text-white transition hover:bg-purple-700"
                    >
                      View Job Details
                      <ArrowRight size={18} />
                    </Link>

                    <p className="mt-4 text-center text-xs text-slate-400">
                      Check eligibility before sending your resume
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* VIEW ALL */}
            <div className="mt-12 text-center">
              <Link
                href="/direct-hiring"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-purple-600 bg-white px-8 py-3.5 font-bold text-purple-700 shadow-sm transition hover:bg-purple-600 hover:text-white"
              >
                <Sparkles size={18} />
                View All {jobs.length > 3 ? `${jobs.length} ` : ""}Jobs
                <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
