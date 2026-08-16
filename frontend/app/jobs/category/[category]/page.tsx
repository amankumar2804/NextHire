import Link from "next/link";
import { notFound } from "next/navigation";
import JobCard from "@/components/JobCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const categoryNames: Record<string, string> = {
  government: "Government Jobs",
  private: "Private Jobs",
  "direct-hiring": "Direct Hiring Jobs",
  internship: "Internship Opportunities",
};

// Only Private / Government map to the live "sector" field on the Job model.
// Direct Hiring has its own dedicated page/model, so it isn't wired here.
const sectorValues: Record<string, string> = {
  government: "Government",
  private: "Private",
};

type Job = {
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
  verified: boolean;
  createdAt: string;
};

const getPostedText = (createdAt: string) => {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};

async function getJobsForCategory(categoryKey: string): Promise<Job[]> {
  const sector = sectorValues[categoryKey];

  if (!sector) {
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/api/jobs?sector=${sector}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Failed to fetch category jobs:", error);
    return [];
  }
}

export default async function CategoryJobsPage({ params }: Props) {
  const { category } = await params;

  const categoryKey = category.toLowerCase();

  if (!categoryNames[categoryKey]) {
    notFound();
  }

  const filteredJobs = await getJobsForCategory(categoryKey);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 py-16 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <Link
            href="/jobs"
            className="text-sm text-blue-200 hover:text-white"
          >
            ← Back to All Jobs
          </Link>

          <h1 className="mt-8 text-4xl font-bold md:text-6xl">
            {categoryNames[categoryKey]}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-blue-100">
            Explore the latest verified {categoryNames[categoryKey].toLowerCase()}
            and find your next career opportunity.
          </p>

        </div>

      </section>

      {/* Jobs */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {categoryNames[categoryKey]}
            </h2>

            <p className="mt-1 text-slate-500">
              {filteredJobs.length} jobs available
            </p>
          </div>

        </div>

        {filteredJobs.length === 0 ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No Jobs Available
            </h2>

            <p className="mt-3 text-slate-500">
              There are currently no jobs available in this category.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse All Jobs
            </Link>

          </div>

        ) : (

          <div className="grid gap-6">

            {filteredJobs.map((job) => (

              <JobCard
                key={job._id}
                id={job._id}
                slug={job.slug}
                title={job.title}
                company={job.company}
                companyImage={job.companyImage}
                location={job.location}
                salary={job.salary}
                type={job.jobType}
                experience={job.experience}
                posted={getPostedText(job.createdAt)}
                lastDate={job.lastDate}
                verified={job.verified}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}
