"use client";

import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";

const searches = [
  "Software Engineer",
  "Government Jobs",
  "SSC CGL",
  "Bank PO",
  "Railway Jobs",
  "Remote Jobs",
  "Java Developer",
  "Frontend Developer",
  "Data Analyst",
  "MERN Stack",
  "Internships",
  "Work From Home",
];

export default function TrendingSearches() {
  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

          {/* Left */}
          <div className="flex items-center gap-3 whitespace-nowrap">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <TrendingUp className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Trending Searches
              </h2>

              <p className="text-sm text-slate-500">
                Popular searches by job seekers
              </p>
            </div>

          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-3">

            {searches.map((item) => (

              <Link
                key={item}
                href="/jobs"
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                {item}
              </Link>

            ))}
          </div>

        </div>

        <div className="mt-8 flex items-center justify-end">

          <Link
            href="/jobs"
            className="flex items-center gap-2 font-semibold text-blue-600 hover:gap-3 transition-all"
          >
            Explore All Jobs
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}