"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  MapPin,
  Trash2,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";

type SavedJob = {
  jobId: string;
  title: string;
  company: string;
  slug: string;
  savedAt?: string;
};

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs/saved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSavedJobs(data.savedJobs || []);

      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveJob = async (jobId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setRemovingJobId(jobId);

      const response = await fetch(
        `http://localhost:5000/api/jobs/save/${jobId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to remove job");
        return;
      }

      setSavedJobs((previousJobs) =>
        previousJobs.filter((job) => job.jobId !== jobId)
      );

    } catch (error) {
      console.error("Failed to remove saved job:", error);

      alert("Unable to connect to server.");

    } finally {
      setRemovingJobId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 py-12 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"
          >
            <ArrowLeft size={18} />

            Back to Jobs

          </Link>

          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

              <Bookmark size={28} />

            </div>

            <div>

              <h1 className="text-3xl font-bold md:text-4xl">

                Saved Jobs

              </h1>

              <p className="mt-2 text-blue-100">

                Keep track of the opportunities you are interested in.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Content */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

              <p className="mt-4 text-slate-500">

                Loading saved jobs...

              </p>

            </div>

          </div>

        ) : savedJobs.length === 0 ? (

          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">

              <Bookmark size={38} />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">

              No saved jobs yet

            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-500">

              Start exploring jobs and save the opportunities that match your
              career goals.

            </p>

            <Link
              href="/jobs"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >

              <BriefcaseBusiness size={18} />

              Explore Jobs

            </Link>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {savedJobs.map((job) => (

              <div
                key={job.jobId}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Company Icon */}

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">

                    {job.company.charAt(0)}

                  </div>

                  <Bookmark
                    size={21}
                    className="fill-blue-600 text-blue-600"
                  />

                </div>


                {/* Job Info */}

                <h2 className="mt-6 text-xl font-bold text-slate-900">

                  {job.title}

                </h2>

                <div className="mt-3 flex items-center gap-2 text-slate-600">

                  <Building2 size={17} />

                  {job.company}

                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                  <MapPin size={16} />

                  Explore job details

                </div>


                {/* Actions */}

                <div className="mt-6 flex gap-3">

                  <Link
                    href={`/jobs/${job.slug}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >

                    View Job

                    <ExternalLink size={17} />

                  </Link>


                  {/* Delete Button */}

                  <button
                    onClick={() => handleRemoveJob(job.jobId)}
                    disabled={removingJobId === job.jobId}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Remove saved job"
                  >

                    {removingJobId === job.jobId ? (

                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                    ) : (

                      <Trash2 size={18} />

                    )}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}