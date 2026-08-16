"use client";

import { useEffect, useMemo, useState } from "react";
import JobCard from "@/components/JobCard";
import JobFilter from "@/components/JobFilter";

type Job = {
  _id: string;
  title: string;
  company: string;
  slug: string;
  category: string;
  location: string;
  experience: string;
  jobType: string;
  salary: string;
  verified: boolean;
  createdAt?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [experience, setExperience] = useState("Any");
  const [jobType, setJobType] = useState("All");
  const [salary, setSalary] = useState("Any");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        if (data.jobs) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || job.category === category;

      const matchesExperience =
        experience === "Any" || job.experience === experience;

      const matchesJobType =
        jobType === "All" || job.jobType === jobType;

      let matchesSalary = true;

      if (salary === "0-5 LPA") {
        matchesSalary =
          job.salary.includes("1") ||
          job.salary.includes("2") ||
          job.salary.includes("3") ||
          job.salary.includes("4") ||
          job.salary.includes("5");
      }

      if (salary === "5-10 LPA") {
        matchesSalary =
          job.salary.includes("5") ||
          job.salary.includes("6") ||
          job.salary.includes("7") ||
          job.salary.includes("8") ||
          job.salary.includes("9") ||
          job.salary.includes("10");
      }

      if (salary === "10-20 LPA") {
        matchesSalary =
          job.salary.includes("10") ||
          job.salary.includes("12") ||
          job.salary.includes("15") ||
          job.salary.includes("18") ||
          job.salary.includes("20");
      }

      if (salary === "20+ LPA") {
        matchesSalary =
          job.salary.includes("20") ||
          job.salary.includes("24") ||
          job.salary.includes("25") ||
          job.salary.includes("28") ||
          job.salary.includes("30");
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesExperience &&
        matchesJobType &&
        matchesSalary
      );
    });
  }, [
    jobs,
    search,
    category,
    experience,
    jobType,
    salary,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setExperience("Any");
    setJobType("All");
    setSalary("Any");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 py-16 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
            🚀 Live Opportunities
          </span>

          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Find Your Next Opportunity
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-blue-100">
            Browse verified Government Jobs, Private Jobs,
            Direct Hiring, Internships and Remote opportunities.
          </p>

        </div>

      </section>


      {/* MAIN CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

          {/* FILTER */}

          <JobFilter
            search={search}
            category={category}
            experience={experience}
            jobType={jobType}
            salary={salary}
            setSearch={setSearch}
            setCategory={setCategory}
            setExperience={setExperience}
            setJobType={setJobType}
            setSalary={setSalary}
            resetFilters={resetFilters}
          />


          {/* JOB RESULTS */}

          <div>

            <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Available Jobs
                </h2>

                <p className="mt-1 text-slate-500">
                  {loading
                    ? "Loading jobs..."
                    : `${filteredJobs.length} jobs found`}
                </p>

              </div>

              <button
                onClick={resetFilters}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Clear Filters
              </button>

            </div>


            {/* LOADING */}

            {loading ? (

              <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

                <p className="mt-5 text-slate-500">
                  Loading latest jobs...
                </p>

              </div>

            ) : filteredJobs.length === 0 ? (

              <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

                <div className="text-5xl">
                  🔍
                </div>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  No Jobs Found
                </h3>

                <p className="mt-3 text-slate-500">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Reset Filters
                </button>

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
                    location={job.location}
                    salary={job.salary}
                    type={job.category}
                    experience={job.experience}
                    posted="Recently Posted"
                    verified={job.verified}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}