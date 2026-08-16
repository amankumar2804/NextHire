"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Loader2,
  Sparkles,
  FileText,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

type Subject = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  gradient: string;
  notes?: unknown[];
  isActive?: boolean;
};

type Category = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  gradient: string;
  subjects: Subject[];
};

// =====================================
// REVEAL ON SCROLL WRAPPER
// =====================================
function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const HIGHLIGHTS = [
  { icon: FileText, text: "Topic-wise PDF notes" },
  { icon: RefreshCw, text: "Updated per latest exam pattern" },
  { icon: Zap, text: "Concise & exam-focused content" },
  { icon: ShieldCheck, text: "100% free, no sign-up needed" },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Curated by Experts",
    description: "Handpicked notes that actually matter for your exam.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Well Organized",
    description: "Every subject broken into clear, scannable topics.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Quick to Revise",
    description: "Short, high-yield notes built for fast revision.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: RefreshCw,
    title: "Regularly Updated",
    description: "Fresh material added as exam patterns evolve.",
    color: "from-sky-500 to-indigo-500",
  },
];

export default function GovernmentNotesSubjectsPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/government-notes-categories/${categoryId}`
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Category API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch category");
        }

        setCategory(data.category);
      } catch (error) {
        console.error("Fetch Category Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load category"
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">
            Loading subjects...
          </p>
        </div>
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-black text-slate-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-slate-500">
            {error || "Category not found"}
          </p>
          <Link
            href="/career-resources/government-exams/notes"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Notes
          </Link>
        </div>
      </main>
    );
  }

  const activeSubjects = (category.subjects || []).filter(
    (subject) => subject.isActive !== false
  );

  const totalNotes = activeSubjects.reduce(
    (sum, subject) => sum + (subject.notes?.length || 0),
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-52 w-52 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <Link
            href="/career-resources/government-exams/notes"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            {/* LEFT: TITLE + STATS */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-200 backdrop-blur">
                <Sparkles size={14} className="text-amber-300" />
                Notes Category
              </div>

              <div className="mt-5 flex items-center gap-5">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-3xl shadow-lg`}
                >
                  {category.icon}
                </div>

                <div>
                  <h1 className="text-4xl font-black md:text-5xl">
                    {category.name}
                  </h1>
                </div>
              </div>

              {category.description && (
                <p className="mt-5 max-w-xl text-indigo-100">
                  {category.description}
                </p>
              )}

              {/* STATS STRIP */}
              <div className="mt-10 flex flex-wrap gap-8">
                <div>
                  <p className="text-3xl font-black text-white">
                    {activeSubjects.length}+
                  </p>
                  <p className="text-sm text-indigo-200">Subjects</p>
                </div>

                <div>
                  <p className="text-3xl font-black text-white">
                    {totalNotes}+
                  </p>
                  <p className="text-sm text-indigo-200">Notes Available</p>
                </div>

                <div>
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="text-sm text-indigo-200">Free to Access</p>
                </div>
              </div>
            </div>

            {/* RIGHT: HIGHLIGHTS CARD */}
            <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
                What You&apos;ll Get
              </p>

              <div className="mt-5 space-y-4">
                {HIGHLIGHTS.map((highlight) => (
                  <div key={highlight.text} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                      <highlight.icon size={16} />
                    </div>
                    <p className="text-sm font-semibold text-white/90">
                      {highlight.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 80}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md transition duration-300 group-hover:scale-110`}
                >
                  <feature.icon size={22} />
                </div>

                <h3 className="font-black text-slate-900">{feature.title}</h3>

                <p className="mt-1.5 text-sm text-slate-500">
                  {feature.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* SUBJECTS GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <RevealOnScroll>
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              {activeSubjects.length}{" "}
              {activeSubjects.length === 1 ? "Subject" : "Subjects"}
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
              Pick a Subject to Get Started
            </h2>
          </div>
        </RevealOnScroll>

        {activeSubjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <BookOpen size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Subjects coming soon
            </h3>

            <p className="mt-2 text-slate-500">
              We&apos;re adding subjects for this category. Check back
              shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeSubjects.map((subject, index) => (
              <RevealOnScroll key={subject._id} delay={(index % 3) * 100}>
                <Link
                  href={`/career-resources/government-exams/notes/${categoryId}/${subject._id}`}
                  className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {/* IMAGE OR ICON BANNER */}
                  {subject.image ? (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={getFullImageUrl(subject.image)}
                        alt={subject.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div
                      className={`relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${subject.gradient}`}
                    >
                      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/20" />
                      <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
                      <span className="text-5xl transition duration-300 group-hover:scale-110">
                        {subject.icon}
                      </span>
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-7">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-xl font-black text-slate-900 transition group-hover:text-indigo-600">
                        {subject.name}
                      </h2>

                      {(subject.notes?.length || 0) > 0 && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                          <Sparkles size={11} />
                          {subject.notes?.length}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {subject.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
                      View Notes
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1.5"
                      />
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
