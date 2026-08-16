"use client";

import Link from "next/link";
import {
  FileText,
  BookOpen,
  BriefcaseBusiness,
  Newspaper,
  GraduationCap,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const resources = [
  {
    title: "Resume Builder",
    shortTitle: "Build Your Resume",
    description:
      "Create an ATS-friendly resume that helps you stand out and get noticed by recruiters.",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/career-resources/resume-builder",
    tag: "Career Essential",
  },
  {
    title: "Interview Preparation",
    shortTitle: "Prepare With Confidence",
    description:
      "Prepare for HR, technical, DSA and core CS interviews with structured resources.",
    icon: BookOpen,
    gradient: "from-emerald-500 to-green-500",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    href: "/career-resources/interview-preparation",
    tag: "Most Popular",
  },
  {
    title: "Career Roadmaps",
    shortTitle: "Choose Your Career Path",
    description:
      "Follow step-by-step roadmaps for Software Development, MERN, AI, Data and more.",
    icon: BriefcaseBusiness,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    iconColor: "text-violet-600",
    href: "/career-resources/career-roadmaps",
    tag: "Learn & Grow",
  },
  {
    title: "Government Exam Preparation",
    shortTitle: "Prepare For Your Exam",
    description:
      "Access notes and study material for SSC, Banking, Railway, UPSC and other exams.",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-blue-600",
    lightBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    href: "/career-resources/government-exams",
    tag: "Exam Resources",
  },
  {
    title: "Career News & Updates",
    shortTitle: "Stay Ahead",
    description:
      "Stay updated with hiring news, company updates, career trends and important opportunities.",
    icon: Newspaper,
    gradient: "from-rose-500 to-red-500",
    lightBg: "bg-rose-50",
    iconColor: "text-rose-600",
    href: "/career-resources/career-news",
    tag: "Latest Updates",
  },
  {
    title: "Study Notes & Materials",
    shortTitle: "Learn Something New",
    description:
      "Explore useful notes, PDFs and study materials for technical subjects and competitive exams.",
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50",
    iconColor: "text-orange-600",
    href: "/career-resources/study-material",
    tag: "Study Materials",
  },
];

export default function CareerResources() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Decoration */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">

            <Sparkles
              size={16}
              className="text-blue-500"
            />

            Everything For Your Career

          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">

            Learn.
            <span className="text-blue-600"> Prepare.</span>
            <span className="block">
              Grow.
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Everything you need to build skills, prepare for opportunities
            and take the next step in your career.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {resources.map((resource) => {

            const Icon = resource.icon;

            return (

              <Link
                key={resource.title}
                href={resource.href}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >

                {/* Top Gradient Line */}

                <div
                  className={`absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r ${resource.gradient}`}
                />

                {/* Top Row */}

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${resource.lightBg} transition duration-300 group-hover:scale-110`}
                  >

                    <Icon
                      size={31}
                      className={resource.iconColor}
                    />

                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">

                    {resource.tag}

                  </span>

                </div>

                {/* Content */}

                <h3 className="mt-7 text-2xl font-extrabold text-slate-900">

                  {resource.title}

                </h3>

                <p className="mt-3 text-sm font-semibold text-blue-600">

                  {resource.shortTitle}

                </p>

                <p className="mt-4 min-h-[72px] leading-7 text-slate-600">

                  {resource.description}

                </p>

                {/* Bottom */}

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

                  <span className="font-bold text-slate-900">

                    Explore Resources

                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">

                    <ArrowUpRight
                      size={19}
                    />

                  </div>

                </div>

                {/* Hover Glow */}

                <div
                  className={`pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-r ${resource.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-10`}
                />

              </Link>

            );

          })}

        </div>

        {/* Bottom CTA */}

        <div className="relative mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-2xl md:p-12">

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">

            <div>

              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-200">

                <CheckCircle2
                  size={18}
                />

                Your career journey starts here

              </div>

              <h3 className="text-3xl font-black md:text-4xl">

                Ready to take the next step?

              </h3>

              <p className="mt-3 max-w-xl text-blue-100">

                Learn new skills, prepare smarter and discover opportunities
                that match your career goals.

              </p>

            </div>

            <Link
              href="/jobs"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-blue-700 shadow-lg transition hover:scale-105 hover:bg-blue-50"
            >

              Explore Jobs

              <ArrowUpRight
                size={19}
              />

            </Link>

          </div>

          {/* Decorative Circles */}

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full border-[40px] border-white/5" />

        </div>

      </div>

    </section>
  );
}