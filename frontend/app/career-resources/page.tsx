"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  GraduationCap,
  Newspaper,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const categories = [
  {
    title: "Resume Builder",
    description:
      "Create a professional, ATS-friendly resume and improve your chances of getting shortlisted.",
    icon: FileText,
    color: "blue",
    href: "/career-resources/resume-builder",
    resources: "Resume Templates & Guides",
  },
  {
    title: "Interview Preparation",
    description:
      "Prepare for HR, technical, DSA and core Computer Science interviews with useful resources.",
    icon: Target,
    color: "green",
    href: "/career-resources/interview-preparation",
    resources: "Interview Notes & Questions",
  },
  {
    title: "Career Roadmaps",
    description:
      "Follow structured learning paths and understand what to learn for your dream career.",
    icon: TrendingUp,
    color: "purple",
    href: "/career-resources/career-roadmaps",
    resources: "Step-by-Step Roadmaps",
  },
  {
    title: "Government Exam Preparation",
    description:
      "Find preparation material, notes and useful resources for various government examinations.",
    icon: GraduationCap,
    color: "indigo",
    href: "/career-resources/government-exams",
    resources: "Notes & Study Material",
  },
  {
    title: "Career News & Updates",
    description:
      "Stay updated with hiring news, company updates, career trends and important announcements.",
    icon: Newspaper,
    color: "rose",
    href: "/career-resources/career-news",
    resources: "Latest Career Updates",
  },
  {
    title: "Study Notes & Materials",
    description:
      "Access useful PDFs, notes and study material for technical subjects and competitive exams.",
    icon: BookOpen,
    color: "orange",
    href: "/career-resources/study-material",
    resources: "PDFs & Study Notes",
  },
];

const colorClasses: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    button: string;
  }
> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    button: "bg-green-600 hover:bg-green-700",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    button: "bg-purple-600 hover:bg-purple-700",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    button: "bg-indigo-600 hover:bg-indigo-700",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-600",
    border: "border-rose-200",
    button: "bg-rose-600 hover:bg-rose-700",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    button: "bg-orange-600 hover:bg-orange-700",
  },
};

export default function CareerResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 py-20 text-white">

        {/* Background Decoration */}

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="mx-auto mt-14 max-w-4xl text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-200 backdrop-blur">
              <Sparkles size={16} />
              Learn. Prepare. Grow.
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">
              Career Resources
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Everything you need to build your skills, prepare for
              opportunities and move closer to your career goals.
            </p>

            {/* Search */}

            <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-2 shadow-2xl">

              <Search
                size={22}
                className="ml-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search resources, notes, roadmaps..."
                className="w-full bg-transparent px-2 py-3 text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700">
                Search
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-blue-600">
              6+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Resource Categories
            </p>

          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-green-600">
              100+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Resources
            </p>

          </div>

          <div className="p-6 text-center">

            <div className="text-3xl font-black text-purple-600">
              Free
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Career Guidance
            </p>

          </div>

        </div>

      </section>


      {/* RESOURCE CATEGORIES */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Explore Resources
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Choose what you want to learn
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Explore carefully organized resources to prepare smarter and
              build a successful career.
            </p>

          </div>

        </div>


        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {

            const Icon = category.icon;
            const colors = colorClasses[category.color];

            return (

              <Link
                key={category.title}
                href={category.href}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${colors.border}`}
              >

                {/* Icon */}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} transition duration-300 group-hover:scale-110`}
                >
                  <Icon
                    size={31}
                    className={colors.text}
                  />
                </div>


                {/* Content */}

                <h3 className="mt-7 text-2xl font-black text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                  {category.description}
                </p>


                {/* Resource Type */}

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500">

                  <FolderOpen size={17} />

                  {category.resources}

                </div>


                {/* CTA */}

                <div
                  className={`mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition group-hover:gap-4 ${colors.button}`}
                >

                  Explore Now

                  <ArrowRight size={18} />

                </div>


                {/* Decoration */}

                <div
                  className={`absolute -bottom-20 -right-20 h-48 w-48 rounded-full ${colors.bg} opacity-0 blur-3xl transition duration-500 group-hover:opacity-70`}
                />

              </Link>

            );

          })}

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Simple & Useful
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Your learning journey starts here
            </h2>

          </div>


          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-black text-blue-600">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Choose Your Goal
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Select the resource that matches your career goal and current
                preparation needs.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-2xl font-black text-green-600">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Learn & Prepare
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Explore notes, PDFs, roadmaps and other useful career
                resources.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-2xl font-black text-purple-600">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Take the Next Step
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Apply your knowledge and move closer to your dream job and
                career.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-2xl md:p-14">

          <div className="relative z-10 max-w-2xl">

            <div className="flex items-center gap-2 text-sm font-bold text-blue-200">
              <Sparkles size={17} />
              Build your future
            </div>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Your next opportunity starts with better preparation.
            </h2>

            <p className="mt-5 leading-7 text-blue-100">
              Learn new skills, prepare for interviews, explore career
              paths and discover the right opportunities for you.
            </p>

            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-blue-700 transition hover:scale-105 hover:bg-blue-50"
            >
              Explore Jobs
              <ArrowRight size={18} />
            </Link>

          </div>


          {/* Decorative Circles */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

          <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full border-[40px] border-white/5" />

        </div>

      </section>

    </main>
  );
}