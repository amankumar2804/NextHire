"use client";

import {
  ShieldCheck,
  Building2,
  Mail,
  ExternalLink,
  BellRing,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Job Listings",
    description:
      "Every job is carefully verified before publishing to reduce fake or misleading opportunities.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Building2,
    title: "Government & Private Jobs",
    description:
      "Find Government and Private sector opportunities in one platform without switching websites.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Mail,
    title: "Direct Hiring",
    description:
      "Apply directly by sending your resume to recruiters and HRs whenever official application links are unavailable.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: ExternalLink,
    title: "Official Apply Links",
    description:
      "We redirect candidates only to official company or government websites for trusted applications.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: BellRing,
    title: "Latest Job Updates",
    description:
      "Stay updated with the newest openings, notifications and hiring drives before they expire.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Sparkles,
    title: "Career Growth",
    description:
      "Access career resources, interview preparation, resume guidance and future AI-powered recommendations.",
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
      {/* Background */}
      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60" />
      <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-100 blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            WHY CHOOSE NEXTHIRE
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Built for Every Job Seeker
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Whether you're preparing for Government exams, looking for your
            first software job, or searching for direct recruiter hiring,
            NextHire helps you discover verified opportunities in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold">
            Your Career Journey Starts Here
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Thousands of verified opportunities. One trusted platform.
            Government Jobs, Private Jobs, Direct Hiring and Career Resources —
            all in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:scale-105">
              Explore Jobs
            </button>

            <button className="rounded-xl border border-white/40 px-7 py-3 font-semibold transition hover:bg-white/10">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}