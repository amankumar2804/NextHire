"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  ArrowUpRight,
  CheckCircle2,
  Send,
} from "lucide-react";

type Job = {
  _id: string;
  title: string;
  company: string;
  slug: string;
  location: string;
  salary: string;
  hiringType?: string;
  verified?: boolean;
};

export default function Hero() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        if (data.jobs) {
          setJobs(data.jobs.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (location) {
      params.set("location", location);
    }

    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="overflow-hidden bg-[#071126] text-white">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center">

        {/* LEFT SIDE */}

        <div>

          <h1 className="text-5xl font-extrabold leading-[1.05] md:text-7xl">

            Find Your

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dream Job
            </span>

            Faster.

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-100 md:text-xl">

            Discover verified Government Jobs, Private Jobs, Direct Hiring
            opportunities and internships — all in one trusted platform.

          </p>

          {/* SEARCH BOX */}

          <div className="mt-10 rounded-3xl bg-white p-4 shadow-2xl">

            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-4">

                <Search className="text-blue-600" size={22} />

                <input
                  type="text"
                  placeholder="Job title or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-slate-900 outline-none"
                />

              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-4">

                <MapPin className="text-blue-600" size={22} />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-slate-900 outline-none"
                />

              </div>

              <button
                onClick={handleSearch}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-bold text-white transition hover:scale-[1.02]"
              >
                Search
              </button>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              {[
                "Software Engineer",
                "Government Jobs",
                "Remote Jobs",
                "Java Developer",
                "SSC CGL",
                "Internships",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => {
                    setSearch(item);
                  }}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-100 hover:text-blue-700"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        </div>


        {/* RIGHT SIDE - LIVE OPPORTUNITIES */}

        <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl md:p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Live Opportunities
              </p>

              <h2 className="text-3xl font-bold">
                Hiring Now
              </h2>

            </div>

            <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">

              <span className="h-2 w-2 rounded-full bg-green-500" />

              Live

            </span>

          </div>


          {/* JOB LIST */}

          <div className="mt-6 space-y-4">

            {jobs.length > 0 ? (

              jobs.map((job) => (

                <Link
                  key={job._id}
                  href={`/jobs/${job.slug}`}
                  className="group block rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">

                      {job.company.charAt(0).toUpperCase()}

                    </div>


                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <h3 className="font-bold text-slate-900 group-hover:text-blue-600">

                            {job.title}

                          </h3>

                          <p className="mt-1 text-slate-500">

                            {job.company}

                          </p>

                        </div>

                        <ArrowUpRight
                          size={20}
                          className="shrink-0 text-slate-400 transition group-hover:text-blue-600"
                        />

                      </div>


                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

                        <span className="flex items-center gap-1">

                          <MapPin size={15} />

                          {job.location}

                        </span>

                        <span className="flex items-center gap-1">

                          <BriefcaseBusiness size={15} />

                          {job.salary}

                        </span>

                      </div>

                    </div>

                  </div>

                </Link>

              ))

            ) : (

              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

                <BriefcaseBusiness
                  className="mx-auto text-slate-400"
                  size={35}
                />

                <p className="mt-3 text-slate-500">
                  No live opportunities available
                </p>

              </div>

            )}

          </div>


          <Link
            href="/jobs"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-semibold text-blue-600 transition hover:bg-blue-100"
          >
            View All Jobs
            <ArrowUpRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}