"use client";

import {
  Mail,
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  BadgeCheck,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Send,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  lastDate: string;
  description: string;
  whoCanApply: string[];
  requiredSkills: string[];
  hiringEmail: string;
  originalPostUrl: string;
  isVerified: boolean;
};

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

// Small inline brand icons (kept local so we don't depend on lucide having them)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
    <path d="M12 2.1C6.5 2.1 2.1 6.5 2.1 12c0 1.8.5 3.5 1.4 5L2 21.9l5-1.3c1.5.8 3.1 1.2 4.9 1.2 5.5 0 9.9-4.4 9.9-9.9S17.5 2.1 12 2.1zm0 17.8c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3c-.9-1.4-1.4-3-1.4-4.6 0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.7 8.4-8.4 8.4z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M22 4.1L2.5 11.6c-1.3.5-1.3 1.2-.2 1.6l5 1.6 1.9 5.8c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.1-2 4.4 3.2c.8.5 1.4.2 1.6-.7l2.9-13.6c.3-1.2-.4-1.7-1-1.7zM8.3 13.4l9.2-5.8c.4-.3.8-.1.5.3l-7.6 6.9-.3 3.4z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7 20.4H3.6V9H7v11.4z" />
  </svg>
);

export default function DirectHiringDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [job, setJob] = useState<HiringJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const [moreJobs, setMoreJobs] = useState<HiringJob[]>([]);
  const [moreJobsLoading, setMoreJobsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_URL}/api/direct-hiring/slug/${slug}`);
        const data = await res.json();
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        setJob(data.job);
      } catch (err) {
        console.error("Failed to fetch job:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  // Fetch other active jobs for the "More Direct Hiring Jobs" section
  useEffect(() => {
    if (!job) return;
    const fetchMoreJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/direct-hiring`);
        const data = await res.json();
        if (!res.ok) return;
        const others = (data.jobs || []).filter((j: HiringJob) => j._id !== job._id);
        setMoreJobs(others.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch more jobs:", err);
      } finally {
        setMoreJobsLoading(false);
      }
    };
    fetchMoreJobs();
  }, [job]);

  const handleCopyEmail = () => {
    if (!job) return;
    navigator.clipboard.writeText(job.hiringEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPageUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const getShareText = () => {
    if (!job) return "";
    const bits = [`🚀 ${job.title} opening at ${job.company}!`];
    const meta = [job.salary, job.location].filter(Boolean).join(" | ");
    if (meta) bits.push(meta);
    bits.push("\nSend your resume directly to HR — no forms, no waiting.");
    bits.push(`\nFound via NextHire Direct Hiring 👉`);
    return bits.join("\n");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPageUrl());
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `${getShareText()} ${getPageUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareOnTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(getPageUrl())}&text=${encodeURIComponent(
        getShareText()
      )}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getPageUrl())}`,
      "_blank"
    );
  };

  const mailtoLink = job
    ? `mailto:${job.hiringEmail}?subject=${encodeURIComponent(
        `Application for ${job.title} at ${job.company}`
      )}&body=${encodeURIComponent(
        `Hi,\n\nI'm interested in the ${job.title} role at ${job.company}. Please find my resume attached.\n\nThanks,\n`
      )}`
    : "#";

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-purple-50 via-white to-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 size={22} className="animate-spin" />
          Loading job details...
        </div>
      </section>
    );
  }

  if (notFound || !job) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-gradient-to-b from-purple-50 via-white to-slate-50 px-6 text-center">
        <BriefcaseBusiness size={42} className="text-slate-400" />
        <h1 className="text-2xl font-bold text-slate-900">Job Not Found</h1>
        <p className="text-slate-500">This opportunity may have been filled or removed.</p>
        <Link
          href="/direct-hiring"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white hover:bg-purple-700"
        >
          <ArrowLeft size={18} />
          Back to All Jobs
        </Link>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-slate-50 py-16">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Link
          href="/direct-hiring"
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-900"
        >
          <ArrowLeft size={16} />
          Back to All Jobs
        </Link>

        {/* HEADER CARD */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* COMPANY IMAGE / COLORFUL BANNER */}
          <div className="relative h-44 w-full overflow-hidden sm:h-52">
            {job.companyImage ? (
              <img
                src={job.companyImage}
                alt={job.company}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getCompanyGradient(
                  job.company
                )}`}
              >
                <span className="text-5xl font-black tracking-wide text-white/90">
                  {getCompanyInitials(job.company)}
                </span>
              </div>
            )}

            <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 shadow">
              Actively Hiring
            </span>

            {job.isVerified && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 shadow">
                <BadgeCheck size={12} />
                Verified
              </span>
            )}
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{job.title}</h1>
                <p className="mt-1 font-semibold text-purple-600">{job.company}</p>
              </div>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
              >
                {linkCopied ? <Check size={16} /> : <Share2 size={16} />}
                {linkCopied ? "Link Copied!" : "Share"}
              </button>
            </div>

            {/* QUICK FACTS */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {job.location && (
                <span className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 font-semibold text-slate-600">
                  <MapPin size={15} className="text-slate-400" /> {job.location}
                </span>
              )}
              <span className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 font-semibold text-slate-600">
                <BriefcaseBusiness size={15} className="text-slate-400" /> {job.jobType}
              </span>
              {job.experience && (
                <span className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 font-semibold text-slate-600">
                  <BadgeCheck size={15} className="text-slate-400" /> {job.experience}
                </span>
              )}
              {job.salary && (
                <span className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 font-semibold text-slate-600">
                  <IndianRupee size={15} className="text-slate-400" /> {job.salary}
                </span>
              )}
              {job.lastDate && (
                <span className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 font-semibold text-red-600">
                  <Calendar size={15} /> Apply by {job.lastDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-3">
          {/* LEFT: DETAILS */}
          <div className="space-y-7 lg:col-span-2">
            {job.description && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">About the Role</h2>
                <p className="mt-3 whitespace-pre-line text-slate-600">{job.description}</p>
              </div>
            )}

            {job.whoCanApply?.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Who Can Apply</h2>
                <ul className="mt-3 space-y-2">
                  {job.whoCanApply.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-purple-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requiredSkills?.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Required Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-purple-50 px-4 py-1.5 text-sm font-semibold text-purple-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.originalPostUrl && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <FileText size={19} className="text-purple-500" />
                  Original Job Post
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Proof of the original hiring post shared by the company/HR.
                </p>
                <a
                  href={job.originalPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-purple-600 px-5 py-2.5 font-bold text-purple-700 hover:bg-purple-600 hover:text-white"
                >
                  View Original Post
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>

          {/* RIGHT: APPLY + SHARE */}
          <div className="space-y-6 lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* APPLY CARD */}
              <div className="rounded-3xl border border-purple-200 bg-purple-50 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <Send size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-purple-900">Ready to Apply?</h3>
                <p className="mt-2 text-sm text-purple-700">
                  Skip the forms. Attach your resume and email it directly to the recruiter.
                </p>

                <a
                  href={mailtoLink}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-bold text-white transition hover:bg-purple-700"
                >
                  <Mail size={18} />
                  Email Your Resume
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white py-3 text-sm font-bold text-purple-700 hover:bg-purple-100"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Email Copied!" : job.hiringEmail}
                </button>

                <p className="mt-4 text-center text-xs text-purple-600">
                  Always double-check job details before sending your resume.
                </p>
              </div>

              {/* SHARE CARD */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Share2 size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Know Someone Who'd Fit?</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Share this opportunity directly — with a note that it's a verified Direct Hiring listing on NextHire.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={shareOnWhatsApp}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </button>

                  <button
                    onClick={shareOnTelegram}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#26A5E4] py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    <TelegramIcon />
                    Telegram
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                    {linkCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MORE DIRECT HIRING JOBS */}
        {!moreJobsLoading && moreJobs.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                More Direct Hiring{" "}
                <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h2>
              <Link
                href="/direct-hiring"
                className="hidden items-center gap-1.5 text-sm font-bold text-purple-700 hover:text-purple-900 sm:flex"
              >
                View All
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-3">
              {moreJobs.map((moreJob) => (
                <Link
                  key={moreJob._id}
                  href={`/direct-hiring/${moreJob.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-28 w-full overflow-hidden">
                    {moreJob.companyImage ? (
                      <img
                        src={moreJob.companyImage}
                        alt={moreJob.company}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getCompanyGradient(
                          moreJob.company
                        )}`}
                      >
                        <span className="text-3xl font-black tracking-wide text-white/90">
                          {getCompanyInitials(moreJob.company)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-1 font-bold text-slate-900">{moreJob.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-purple-600">
                      {moreJob.company}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-purple-600">
                      View Details
                      <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
