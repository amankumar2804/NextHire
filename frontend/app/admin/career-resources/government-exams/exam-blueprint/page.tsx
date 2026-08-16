"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

const blueprintSections = [
  {
    title: "Exam Categories",
    subtitle: "SSC, Banking, DSSSB & More",
    description:
      "Create and manage government exam categories such as SSC, Banking, Railway, Teaching and more.",
    href: "/admin/career-resources/government-exams/exam-blueprint/categories",
    icon: BookOpen,
    badge: "Manage Categories",
    gradient: "from-indigo-500 to-violet-600",
  },
];

export default function ExamBlueprintAdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">

          <Link
            href="/admin/career-resources/government-exams"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Government Exams
          </Link>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

                <Sparkles size={16} />

                Exam Blueprint Management

              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">

                Exam Blueprint

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                Create categories and exams, then manage articles directly
                inside each exam.

              </p>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">

              <FileText
                size={38}
                className="text-indigo-200"
              />

            </div>

          </div>

        </div>

      </section>


      {/* MAIN CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

            Blueprint Management

          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900">

            Manage Exam Information

          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">

            First create categories, add exams inside them, then manage each
                exam&apos;s articles from its own page.

          </p>

        </div>


        {/* MANAGEMENT CARDS */}

        <div className="grid gap-6 md:grid-cols-1">

          {blueprintSections.map((section) => {

            const Icon = section.icon;

            return (

              <Link
                key={section.title}
                href={section.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-50 transition duration-500 group-hover:scale-150" />

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} text-white shadow-lg`}
                    >

                      <Icon size={30} />

                    </div>


                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">

                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />

                    </div>

                  </div>


                  <p className="mt-7 text-xs font-bold uppercase tracking-widest text-indigo-600">

                    {section.badge}

                  </p>


                  <h3 className="mt-3 text-2xl font-black text-slate-900">

                    {section.title}

                  </h3>


                  <p className="mt-2 font-semibold text-slate-500">

                    {section.subtitle}

                  </p>


                  <p className="mt-4 min-h-[96px] leading-7 text-slate-600">

                    {section.description}

                  </p>


                  <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition group-hover:bg-indigo-600">

                    Manage Section

                    <ArrowRight size={17} />

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </section>


      {/* WORKFLOW INFO */}

      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-7">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">

                <Plus size={24} />

              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-900">

                  Recommended Workflow

                </h3>

                <p className="mt-2 leading-7 text-slate-600">

                  First create a category like SSC or Banking. Then create an
                  exam such as SSC CGL and use its Manage Articles button.

                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-indigo-700">

                  <span className="rounded-lg bg-white px-4 py-2 shadow-sm">
                    1. Create Category
                  </span>

                  <ArrowRight size={16} />

                  <span className="rounded-lg bg-white px-4 py-2 shadow-sm">
                    2. Create Exam
                  </span>

                  <ArrowRight size={16} />

                  <span className="rounded-lg bg-white px-4 py-2 shadow-sm">
                    3. Manage Articles
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
