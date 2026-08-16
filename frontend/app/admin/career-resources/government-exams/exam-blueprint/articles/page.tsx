"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Edit3,
  FileText,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "SSC CGL Exam Pattern & Syllabus",
    slug: "ssc-cgl",
    category: "SSC Exams",
    status: "Published",
    updated: "Today",
  },
  {
    id: 2,
    title: "SBI PO Exam Pattern & Syllabus",
    slug: "sbi-po",
    category: "Banking Exams",
    status: "Draft",
    updated: "Yesterday",
  },
  {
    id: 3,
    title: "DSSSB TGT Exam Pattern & Syllabus",
    slug: "dsssb-tgt",
    category: "Teaching Exams",
    status: "Published",
    updated: "2 days ago",
  },
];

export default function ExamArticlesAdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">

          <Link
            href="/admin/career-resources/government-exams/exam-blueprint"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Exam Blueprint
          </Link>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

                <Sparkles size={16} />

                Article Management

              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">

                Exam Articles

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                Create and manage detailed government exam articles from one
                place.

              </p>

            </div>

            <Link
              href="/admin/career-resources/government-exams/exam-blueprint/articles/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-indigo-50"
            >
              <Plus size={19} />
              Add New Article
            </Link>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* TOP BAR */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              Content Management

            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">

              All Exam Articles

            </h2>

            <p className="mt-2 text-slate-600">

              Manage exam pattern, syllabus and preparation articles.

            </p>

          </div>


          {/* SEARCH */}

          <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:max-w-sm">

            <Search
              size={19}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />

          </div>

        </div>


        {/* ARTICLES */}

        <div className="space-y-4">

          {articles.map((article) => (

            <div
              key={article.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* ARTICLE DETAILS */}

                <div className="flex min-w-0 items-start gap-5">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">

                    <FileText size={29} />

                  </div>


                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-black text-slate-900">

                        {article.title}

                      </h3>


                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          article.status === "Published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >

                        {article.status}

                      </span>

                    </div>


                    <p className="mt-2 text-sm text-slate-500">

                      /{article.slug}

                    </p>


                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                      <span>

                        Category:{" "}

                        <strong className="text-slate-700">

                          {article.category}

                        </strong>

                      </span>


                      <span>

                        Updated:{" "}

                        <strong className="text-slate-700">

                          {article.updated}

                        </strong>

                      </span>

                    </div>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="flex items-center gap-3 lg:shrink-0">

                  <Link
                    href={`/admin/career-resources/government-exams/exam-blueprint/articles/${article.slug}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-indigo-600"
                  >

                    <ArrowRight size={18} />

                  </Link>


                  <button
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >

                    <Edit3 size={16} />

                    Edit

                  </button>


                  <button
                    className="inline-flex items-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                  >

                    <Trash2 size={16} />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* EMPTY FUTURE INFO */}

        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">

              <FileText size={22} />

            </div>

            <div>

              <h3 className="font-bold text-slate-900">

                Article Workflow

              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">

                Category alag se manage hogi. Article create karte waqt tum
                sirf existing category select karoge aur complete article
                content add karoge.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}