"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  gradient?: string;
  image?: string;
  isActive?: boolean;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ExamBlueprintPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ===============================
  // FETCH CATEGORIES FROM BACKEND
  // ===============================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/government-exam-categories`
        );

        const result = await response.json();

        if (response.ok) {
          setCategories(result.categories || []);
        }
      } catch (error) {
        console.error(
          "Fetch Government Exam Categories Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ===============================
  // SEARCH FILTER
  // ===============================

  const filteredCategories = categories.filter((category) => {
    const searchText = search.toLowerCase();

    return (
      category.name.toLowerCase().includes(searchText) ||
      category.description
        .toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* ===============================
          HERO
      =============================== */}

      <section className="relative overflow-hidden bg-[#0b1020] px-4 pb-20 pt-8 sm:px-6 lg:px-8">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />

          <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />

        </div>


        <div className="relative mx-auto max-w-7xl">

          {/* BREADCRUMB */}

          <div className="mb-12 flex items-center gap-2 text-sm text-slate-400">

            <Link
              href="/career-resources"
              className="transition-colors hover:text-white"
            >
              Career Resources
            </Link>

            <ChevronRight size={15} />

            <Link
              href="/career-resources/government-exams"
              className="transition-colors hover:text-white"
            >
              Government Exams
            </Link>

            <ChevronRight size={15} />

            <span className="text-slate-200">
              Exam Blueprint
            </span>

          </div>


          {/* HERO CONTENT */}

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">

              <Sparkles size={16} />

              Know the exam before you prepare

            </div>


            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">

              Exam Pattern &{" "}

              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">

                Syllabus

              </span>

            </h1>


            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">

              Explore detailed exam patterns, syllabus, eligibility,
              selection process and everything you need to plan your government
              exam preparation.

            </p>

          </div>


          {/* SEARCH */}

          <div className="mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur-xl">

            <Search
              className="ml-3 shrink-0 text-slate-500"
              size={20}
            />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search SSC, Banking, Railway, CTET..."
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div>

      </section>


      {/* ===============================
          MAIN CONTENT
      =============================== */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">

                Explore by category

              </p>


              <h2 className="text-3xl font-bold text-slate-900">

                Choose your exam category

              </h2>


              <p className="mt-2 text-slate-600">

                Select a category to explore available government exams.

              </p>

            </div>


            <Link
              href="/career-resources/government-exams"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
            >

              <ArrowLeft size={16} />

              Back to Government Exams

            </Link>

          </div>


          {/* ===============================
              LOADING
          =============================== */}

          {loading && (

            <div className="flex min-h-[300px] items-center justify-center">

              <Loader2
                size={38}
                className="animate-spin text-indigo-600"
              />

            </div>

          )}


          {/* ===============================
              NO CATEGORY
          =============================== */}

          {!loading &&
            filteredCategories.length === 0 && (

              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

                <FileText
                  size={45}
                  className="mx-auto text-slate-400"
                />


                <h3 className="mt-5 text-xl font-bold text-slate-900">

                  No exam categories found

                </h3>


                <p className="mt-2 text-slate-500">

                  Exam categories will appear here once they are added.

                </p>

              </div>

            )}


          {/* ===============================
              CATEGORY LIST
          =============================== */}

          {!loading &&
            filteredCategories.length > 0 && (

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                {filteredCategories.map(
                  (category, index) => (

                    <Link
                      key={category._id}
                      href={`/career-resources/government-exams/exam-blueprint/${category.slug}`}
                      className={`group flex items-center justify-between gap-4 p-5 transition-all duration-300 hover:bg-slate-50 sm:p-6 ${
                        index !==
                        filteredCategories.length - 1
                          ? "border-b border-slate-200"
                          : ""
                      }`}
                    >

                      {/* LEFT CONTENT */}

                      <div className="flex min-w-0 items-center gap-4 sm:gap-5">

                        {/* IMAGE / ICON */}

                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${
                            category.gradient ||
                            "from-blue-500 to-indigo-600"
                          } text-2xl shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20 sm:text-3xl`}
                        >

                          {category.image ? (

                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            category.icon || "📚"

                          )}

                        </div>


                        {/* DETAILS */}

                        <div className="min-w-0">

                          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">

                            {category.name}

                          </h3>


                          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">

                            {category.description}

                          </p>


                          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-indigo-600">

                            <FileText size={14} />

                            Explore Exams

                          </div>

                        </div>

                      </div>


                      {/* ARROW */}

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">

                        <ArrowRight
                          size={19}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />

                      </div>

                    </Link>

                  )
                )}

              </div>

            )}

        </div>

      </section>


      {/* ===============================
          INFO SECTION
      =============================== */}

      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 p-6">

            <BookOpen
              className="text-indigo-600"
              size={26}
            />


            <h3 className="mt-4 font-bold text-slate-900">

              Detailed Syllabus

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-slate-500">

              Understand every subject and topic included in your target exam.

            </p>

          </div>


          <div className="rounded-2xl border border-slate-200 p-6">

            <FileText
              className="text-violet-600"
              size={26}
            />


            <h3 className="mt-4 font-bold text-slate-900">

              Exam Pattern

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-slate-500">

              Get clear information about sections, marks, duration and
              question pattern.

            </p>

          </div>


          <div className="rounded-2xl border border-slate-200 p-6">

            <Sparkles
              className="text-fuchsia-600"
              size={26}
            />


            <h3 className="mt-4 font-bold text-slate-900">

              Preparation Guide

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-slate-500">

              Build a better preparation strategy with organized exam
              information.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}