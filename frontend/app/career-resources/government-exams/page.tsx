"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Layers,
  Loader2,
  PenLine,
  Search,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const resources = [
  {
    title: "Exam Blueprint",
    subtitle: "Pattern & Syllabus",
    description:
      "Complete exam pattern, syllabus, eligibility and selection process.",
    icon: FileText,
    href: "/career-resources/government-exams/exam-blueprint",
    gradient: "from-indigo-500 to-violet-600",
    tag: "Know Your Exam",
  },
  {
    title: "Government Notes",
    subtitle: "Notes & Study Material",
    description:
      "Important notes and study material organized according to your exam.",
    icon: BookOpen,
    href: "/career-resources/government-exams/notes",
    gradient: "from-emerald-500 to-teal-600",
    tag: "Learn Better",
  },
];

const popularExams = [
  { name: "SSC CGL", icon: "📊" },
  { name: "IBPS PO", icon: "🏦" },
  { name: "DSSSB TGT", icon: "🎓" },
  { name: "RRB NTPC", icon: "🚆" },
  { name: "CTET", icon: "📚" },
  { name: "SSC GD", icon: "🛡️" },
];

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

export default function GovernmentExamsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // =====================================
  // FETCH CATEGORIES FROM BACKEND
  // =====================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await fetch(
          `${API_URL}/api/government-exam-categories`
        );

        const result = await response.json();

        console.log(
          "Government Exam Categories:",
          result
        );

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch categories"
          );
        }

        setCategories(
          result.categories || []
        );

      } catch (error) {
        console.error(
          "Fetch Government Exam Categories Error:",
          error
        );

        setCategories([]);

      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================
  // SEARCH FILTER
  // =====================================

  const filteredCategories =
    categories.filter((category) => {
      const searchText =
        searchQuery.toLowerCase();

      return (
        category.name
          .toLowerCase()
          .includes(searchText) ||
        category.description
          .toLowerCase()
          .includes(searchText)
      );
    });

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="relative overflow-hidden bg-[#080b16] px-4 pb-24 pt-20 sm:px-6 lg:px-8">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-[-280px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />

          <div className="absolute -left-40 bottom-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

        </div>


        <div className="relative mx-auto max-w-7xl">

          <div className="flex justify-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">

              <Sparkles
                size={16}
                className="text-indigo-400"
              />

              Your Government Exam Preparation Hub

            </div>

          </div>


          <div className="mx-auto mt-8 max-w-4xl text-center">

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">

              Prepare Smart.

              <br />

              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">

                Crack Your Dream Exam.

              </span>

            </h1>


            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">

              Everything you need to prepare for government exams — from exam
              patterns and syllabus to notes, daily practice and more.

            </p>

          </div>


          {/* SEARCH */}

          <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl">

            <Search
              className="ml-4 shrink-0 text-slate-500"
              size={20}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              placeholder="Search SSC, Banking, Railway, Teaching..."
              className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Search
            </button>

          </div>


          {/* POPULAR EXAMS */}

          <div className="mx-auto mt-10 max-w-4xl">

            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

              Popular Exams

            </p>


            <div className="flex flex-wrap justify-center gap-3">

              {popularExams.map((exam) => (

                <button
                  key={exam.name}
                  type="button"
                  className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-slate-300 transition-all hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                >

                  <span>
                    {exam.icon}
                  </span>

                  <span>
                    {exam.name}
                  </span>

                  <ArrowRight
                    size={14}
                    className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400"
                  />

                </button>

              ))}

            </div>

          </div>


          {/* STATS */}

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">

            {[
              ["50+", "Government Exams"],
              ["1000+", "Study Resources"],
              ["Daily", "New Practice"],
              ["100%", "Focused Preparation"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl"
              >

                <p className="text-2xl font-bold text-white">

                  {value}

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  {label}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================
          RESOURCES SECTION
      ===================================== */}

      <section className="px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">

              Start your preparation

            </p>


            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">

              Everything you need in one place

            </h2>


            <p className="mt-3 max-w-2xl text-slate-600">

              Choose the right resource and make your government exam
              preparation more structured.

            </p>

          </div>


          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">

            {resources.map((resource) => {

              const Icon = resource.icon;

              return (

                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${resource.gradient} text-white shadow-lg`}
                  >

                    <Icon size={30} />

                  </div>


                  <p className="mt-7 text-xs font-bold uppercase tracking-widest text-indigo-600">

                    {resource.tag}

                  </p>


                  <h3 className="mt-2 text-2xl font-bold text-slate-900">

                    {resource.title}

                  </h3>


                  <p className="mt-1 font-medium text-slate-500">

                    {resource.subtitle}

                  </p>


                  <p className="mt-5 leading-relaxed text-slate-600">

                    {resource.description}

                  </p>


                  <div className="mt-7 flex items-center gap-2 font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">

                    Explore Now

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </div>


                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/5 transition-transform duration-500 group-hover:scale-150" />

                </Link>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================
          CATEGORY SECTION
      ===================================== */}

      <section className="border-y border-slate-200 bg-white px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">

                Explore by category

              </p>


              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">

                Find your exam

              </h2>


              <p className="mt-3 text-slate-600">

                Select a category and start your focused preparation.

              </p>

            </div>


            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">

              <Layers size={18} />

              Multiple exam categories

            </div>

          </div>


          {/* LOADING */}

          {loadingCategories ? (

            <div className="flex min-h-[220px] items-center justify-center">

              <Loader2
                size={36}
                className="animate-spin text-indigo-600"
              />

            </div>

          ) : filteredCategories.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">

              <Layers
                size={42}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 text-xl font-bold text-slate-900">

                No exam categories found

              </h3>


              <p className="mt-2 text-slate-500">

                {searchQuery
                  ? "Try searching with another keyword."
                  : "Government exam categories will appear here soon."}

              </p>

            </div>

          ) : (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {filteredCategories.map((category) => (

                <Link
                  key={category._id}
                  href={`/career-resources/government-exams/exam-blueprint/${category.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${
                        category.gradient ||
                        "from-blue-500 to-indigo-600"
                      } text-2xl shadow-md`}
                    >

                      {category.image ? (

                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        category.icon ||
                        "📚"

                      )}

                    </div>


                    <div>

                      <h3 className="font-bold text-slate-900">

                        {category.name}

                      </h3>


                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">

                        {category.description}

                      </p>

                    </div>

                  </div>


                  <ArrowRight
                    size={19}
                    className="ml-3 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-indigo-600"
                  />

                </Link>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          PREPARATION JOURNEY
      ===================================== */}

      <section className="px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-8 shadow-2xl shadow-orange-500/30 sm:p-12">

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-green-400/30 blur-3xl" />

            <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-yellow-200/20 blur-3xl" />


            <div className="relative grid items-center gap-12 lg:grid-cols-2">

              <div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 text-white shadow-lg backdrop-blur-xl">

                  <Trophy size={28} />

                </div>


                <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">

                  Your preparation journey starts here.

                </h2>


                <p className="mt-5 max-w-xl leading-relaxed text-white/90">

                  Understand your exam, follow the right syllabus, study
                  smarter and practice consistently. Every small step takes
                  you closer to your goal.

                </p>


                <Link
                  href="/career-resources/government-exams/exam-blueprint"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-orange-600 shadow-lg transition hover:bg-yellow-50"
                >

                  Explore Exam Blueprint

                  <ArrowRight size={18} />

                </Link>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {[
                  {
                    icon: Target,
                    title: "Know Your Exam",
                    text: "Understand pattern & syllabus",
                    bg: "bg-red-500/30",
                  },
                  {
                    icon: BookOpen,
                    title: "Study Smart",
                    text: "Learn with organized resources",
                    bg: "bg-green-500/30",
                  },
                  {
                    icon: PenLine,
                    title: "Practice Daily",
                    text: "Improve speed & accuracy",
                    bg: "bg-blue-500/30",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Track Progress",
                    text: "Move closer to your goal",
                    bg: "bg-purple-500/30",
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (

                    <div
                      key={item.title}
                      className={`rounded-2xl border border-white/20 ${item.bg} p-5 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/25`}
                    >

                      <Icon
                        className="text-white"
                        size={22}
                      />


                      <h3 className="mt-4 font-semibold text-white">

                        {item.title}

                      </h3>


                      <p className="mt-1 text-sm text-white/80">

                        {item.text}

                      </p>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section className="border-t border-slate-200 bg-white px-4 py-16 text-center sm:px-6 lg:px-8">

        <GraduationCap
          className="mx-auto text-indigo-600"
          size={40}
        />


        <h2 className="mt-5 text-3xl font-bold text-slate-900">

          Ready to start preparing?

        </h2>


        <p className="mx-auto mt-3 max-w-xl text-slate-600">

          Choose your exam category and begin your preparation journey today.

        </p>


        <Link
          href="/career-resources/government-exams/exam-blueprint"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
        >

          Start Preparing

          <ArrowRight size={18} />

        </Link>

      </section>

    </main>
  );
}
