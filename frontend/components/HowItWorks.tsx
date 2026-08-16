"use client";

import {
  Search,
  FileText,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Jobs",
    description:
      "Browse verified Government, Private and Direct Hiring opportunities updated daily.",
  },
  {
    icon: FileText,
    title: "Read Complete Details",
    description:
      "Check eligibility, salary, important dates, required skills and application process.",
  },
  {
    icon: ExternalLink,
    title: "Apply on Official Website",
    description:
      "Apply directly through the official company or government website for a secure process.",
  },
  {
    icon: CheckCircle2,
    title: "Track Your Career",
    description:
      "Save jobs, receive alerts and never miss new opportunities that match your profile.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            HOW NEXTHIRE WORKS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Find Your Dream Job in 4 Simple Steps
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            A simple, transparent and trusted process designed for every job seeker.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>

                {/* Arrow (Desktop Only) */}
                {index !== steps.length - 1 && (
                  <ArrowRight
                    size={28}
                    className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-20 rounded-3xl border border-blue-100 bg-blue-50 p-10 text-center">

          <h3 className="text-2xl font-bold text-slate-900">
            100% Free for Job Seekers
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            NextHire never charges candidates for applying to jobs.
            We always redirect you to the official company or government website
            for a safe and trusted application experience.
          </p>

        </div>

      </div>
    </section>
  );
}