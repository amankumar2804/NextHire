"use client";

import { ArrowUpRight, BadgeCheck, Briefcase, MapPin } from "lucide-react";

const jobs = [
  {
    company: "Google",
    role: "Software Engineer",
    location: "Bangalore",
    salary: "₹28 LPA",
    color: "bg-blue-500",
  },
  {
    company: "Amazon",
    role: "SDE I",
    location: "Hyderabad",
    salary: "₹24 LPA",
    color: "bg-orange-500",
  },
  {
    company: "TCS",
    role: "System Engineer",
    location: "Pune",
    salary: "₹7 LPA",
    color: "bg-indigo-500",
  },
  {
    company: "SSC CGL",
    role: "Government Job",
    location: "India",
    salary: "Level 7",
    color: "bg-green-500",
  },
];

export default function HeroDashboard() {
  return (
    <div className="relative">

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Live Opportunities
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Hiring Now
            </h2>
          </div>

          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            ● Live
          </div>

        </div>

        <div className="space-y-4">

          {jobs.map((job) => (

            <div
              key={job.company}
              className="group rounded-2xl border border-slate-200 p-4 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${job.color} text-lg font-bold text-white`}
                  >
                    {job.company.charAt(0)}
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {job.role}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {job.company}
                    </p>

                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">

                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.salary}
                      </span>

                    </div>

                  </div>

                </div>

                <ArrowUpRight
                  className="text-slate-400 transition group-hover:text-blue-600"
                  size={20}
                />

              </div>

            </div>

          ))}

        </div>

        <div className="mt-6 rounded-2xl bg-blue-50 p-4">

          <div className="flex items-center gap-3">

            <BadgeCheck className="text-blue-600" />

            <div>

              <h4 className="font-semibold text-slate-900">
                Verified Jobs Only
              </h4>

              <p className="text-sm text-slate-500">
                Every listing is reviewed before publishing.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}