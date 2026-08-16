import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";

import ShareJob from "@/components/ShareJob";
import SaveJobButton from "@/components/SaveJobButton";
import ReferralCard from "@/components/ReferralCard";
import ReferralMessage from "@/components/ReferralMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ReferralContact = {
  name: string;
  role: string;
  linkedinUrl: string;
  verified?: boolean;
};

type Job = {
  _id: string;
  title: string;
  company: string;
  companyImage?: string;
  slug: string;
  category: string;
  sector: string;
  location: string;
  experience: string;
  jobType: string;
  salary: string;
  description: string;
  eligibility: string[];
  skills: string[];
  lastDate: string;
  applyUrl?: string;
  verified: boolean;
  referralContacts?: ReferralContact[];
  notificationPdf?: string;
  totalVacancies?: string;
  applicationFee?: string;
  examDate?: string;
};

// Colorful gradients used when a company/organization has no uploaded image
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

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JobDetailsPage({ params }: Props) {
  const { slug } = await params;

  // Fetch job from MongoDB

  const response = await fetch(`${API_URL}/api/jobs/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  const job: Job = data.job;

  if (!job) {
    notFound();
  }

  const isGovernment = job.sector === "Government";
  const companyReferrals = isGovernment ? [] : job.referralContacts || [];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center">
            {job.companyImage ? (
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-3xl border border-white/20 shadow-lg">
                <img
                  src={job.companyImage}
                  alt={job.company}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br text-3xl font-bold text-white shadow-lg ${getCompanyGradient(
                  job.company
                )}`}
              >
                {getCompanyInitials(job.company)}
              </div>
            )}

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  {job.category}
                </span>

                {isGovernment && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
                    Government
                  </span>
                )}

                {job.verified && (
                  <span className="flex items-center gap-1 text-sm text-green-300">
                    <BadgeCheck size={17} />
                    Verified
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold md:text-5xl">{job.title}</h1>

              <p className="mt-3 text-lg text-blue-100">{job.company}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* LEFT */}

          <div className="space-y-8">
            {/* JOB INFO */}

            <div className="grid gap-4 sm:grid-cols-2">
              {!isGovernment && (
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin size={20} />
                    <span>Location</span>
                  </div>

                  <p className="mt-3 font-bold text-slate-900">{job.location}</p>
                </div>
              )}

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-slate-500">
                  <BriefcaseBusiness size={20} />
                  <span>{isGovernment ? "Eligibility Level" : "Experience"}</span>
                </div>

                <p className="mt-3 font-bold text-slate-900">{job.experience}</p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-slate-500">
                  <CalendarDays size={20} />
                  <span>Last Date</span>
                </div>

                <p className="mt-3 font-bold text-red-600">{job.lastDate}</p>
              </div>

              {!isGovernment && (
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Users size={20} />
                    <span>Job Type</span>
                  </div>

                  <p className="mt-3 font-bold text-slate-900">{job.jobType}</p>
                </div>
              )}

              {isGovernment && job.totalVacancies && (
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Users size={20} />
                    <span>Total Vacancies</span>
                  </div>

                  <p className="mt-3 font-bold text-slate-900">{job.totalVacancies}</p>
                </div>
              )}

              {isGovernment && job.applicationFee && (
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500">
                    <IndianRupee size={20} />
                    <span>Application Fee</span>
                  </div>

                  <p className="mt-3 font-bold text-slate-900">{job.applicationFee}</p>
                </div>
              )}

              {isGovernment && job.examDate && (
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-500">
                    <CalendarDays size={20} />
                    <span>Exam Date</span>
                  </div>

                  <p className="mt-3 font-bold text-slate-900">{job.examDate}</p>
                </div>
              )}
            </div>

            {/* NOTIFICATION PDF (Government only) */}

            {isGovernment && job.notificationPdf && (
              <div className="flex items-center justify-between rounded-3xl border border-red-100 bg-red-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Official Notification</h3>
                    <p className="text-sm text-slate-500">
                      Download the full PDF notification for this recruitment.
                    </p>
                  </div>
                </div>

                <a
                  href={job.notificationPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  <Download size={17} />
                  Download PDF
                </a>
              </div>
            )}

            {/* DESCRIPTION / ARTICLE */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                {isGovernment ? "Notification Details" : "Job Description"}
              </h2>

              {isGovernment ? (
                <div
                  className="prose prose-sm mt-5 max-w-none leading-8 text-slate-600 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-indigo-600 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              ) : (
                <p className="mt-5 leading-8 text-slate-600">{job.description}</p>
              )}
            </div>

            {/* ELIGIBILITY */}

            {job.eligibility?.length > 0 && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Eligibility</h2>

                <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-600">
                  {job.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SKILLS (Private jobs only) */}

            {!isGovernment && job.skills?.length > 0 && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Required Skills</h2>

                <div className="mt-6 flex flex-wrap gap-3">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* REFERRAL (Private jobs only) */}

            {!isGovernment && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Users size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Get a Referral at {job.company}
                    </h2>

                    <p className="mt-2 leading-7 text-slate-600">
                      Connect with professionals working at {job.company} and reach
                      out to them for career guidance or a referral.
                    </p>
                  </div>
                </div>

                {companyReferrals.length > 0 ? (
                  <>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {companyReferrals.map((referral, index) => (
                        <ReferralCard
                          key={index}
                          name={referral.name}
                          role={referral.role}
                          company={job.company}
                          linkedinUrl={referral.linkedinUrl}
                          verified={referral.verified}
                        />
                      ))}
                    </div>

                    <ReferralMessage
                      name={companyReferrals[0].name}
                      jobTitle={job.title}
                      company={job.company}
                    />
                  </>
                ) : (
                  <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
                    <Users size={30} className="mx-auto text-slate-400" />

                    <p className="mt-3 font-semibold text-slate-700">
                      No referral contacts available yet
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-6">
            {/* APPLY CARD */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              {!isGovernment && (
                <>
                  <p className="text-sm text-slate-500">Salary</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{job.salary}</p>
                </>
              )}

              {isGovernment && job.salary && (
                <>
                  <p className="text-sm text-slate-500">Salary / Pay Level</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{job.salary}</p>
                </>
              )}

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
              >
                Apply on Official Website
                <ExternalLink size={18} />
              </a>

              {isGovernment && job.notificationPdf && (
                <a
                  href={job.notificationPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 font-bold text-red-700 transition hover:bg-red-100"
                >
                  <Download size={17} />
                  Download Notification
                </a>
              )}

              <div className="mt-3">
                <SaveJobButton
                  jobId={job._id}
                  title={job.title}
                  company={job.company}
                  slug={job.slug}
                />
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                You will be redirected to the official {isGovernment ? "" : "company "}website
                to complete your application.
              </p>
            </div>

            {/* SHARE */}

            <ShareJob title={job.title} />

            {/* REFERRAL TIP (Private jobs only) */}

            {!isGovernment && (
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Users size={20} />
                  </div>

                  <h3 className="font-bold text-blue-900">Referral Tip</h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-blue-800">
                  Be polite and personalized when reaching out to someone for a
                  referral.
                </p>
              </div>
            )}

            {/* VERIFIED */}

            <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-600" />
                <h3 className="font-bold text-green-700">
                  Verified {isGovernment ? "Notification" : "Job"}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-green-700">
                {isGovernment
                  ? "Always cross-check details with the official notification PDF before applying."
                  : "Always verify job details and apply through the official company website."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
