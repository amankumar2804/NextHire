"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Loader2,
  Sparkles,
  Download,
  Target,
  Clock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  gradient: string;
  subjects?: unknown[];
  isActive?: boolean;
  isFeatured?: boolean;
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
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "Curated by Experts",
    description: "Handpicked notes that actually matter for your exam.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Download,
    title: "Free PDF Downloads",
    description: "Download once, study anytime — even offline.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Exam-wise Organized",
    description: "Everything sorted by exam and subject, zero clutter.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Updated Regularly",
    description: "Fresh material added as exam patterns evolve.",
    color: "from-sky-500 to-indigo-500",
  },
];

export default function GovernmentNotesCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/government-notes-categories`
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Categories API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch categories");
        }

        const activeCategories = (data.categories || []).filter(
          (category: Category) => category.isActive !== false
        );

        setCategories(activeCategories);
      } catch (error) {
        console.error("Fetch Categories Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading notes...</p>
        </div>
      </main>
    );
  }

  const totalSubjects = categories.reduce(
    (sum, category) => sum + (category.subjects?.length || 0),
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <Link
            href="/career-resources/government-exams"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Government Exams
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-200 backdrop-blur">
            <Sparkles size={14} className="text-amber-300" />
            Learn Better, Score Higher
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Government{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              Notes
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-indigo-100">
            Handpicked notes and study material, organized subject-wise so you
            can prep smarter, not harder.
          </p>

          {/* STATS STRIP */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-3xl font-black text-white">
                {categories.length}+
              </p>
              <p className="text-sm text-indigo-200">Exam Categories</p>
            </div>

            <div>
              <p className="text-3xl font-black text-white">
                {totalSubjects}+
              </p>
              <p className="text-sm text-indigo-200">Subjects Covered</p>
            </div>

            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-sm text-indigo-200">Free to Access</p>
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

      {/* CATEGORIES GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <RevealOnScroll>
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Choose Your Exam
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
              Browse All Categories
            </h2>
          </div>
        </RevealOnScroll>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <BookOpen size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Notes coming soon
            </h3>

            <p className="mt-2 text-slate-500">
              We&apos;re preparing study material for you. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <RevealOnScroll key={category._id} delay={(index % 3) * 100}>
                <Link
                  href={`/career-resources/government-exams/notes/${category._id}`}
                  className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {category.isFeatured && (
                    <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-amber-950 shadow">
                      <Sparkles size={12} />
                      Popular
                    </span>
                  )}

                  {/* IMAGE OR ICON BANNER */}
                  {category.image ? (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={getFullImageUrl(category.image)}
                        alt={category.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div
                      className={`relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${category.gradient}`}
                    >
                      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/20" />
                      <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
                      <span className="text-5xl transition duration-300 group-hover:scale-110">
                        {category.icon}
                      </span>
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-7">
                    <h2 className="text-xl font-black text-slate-900 transition group-hover:text-indigo-600">
                      {category.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
                      Explore Notes
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

      {/* BOTTOM CTA */}
      <RevealOnScroll>
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 px-8 py-14 text-center text-white shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <h3 className="relative text-2xl font-black md:text-3xl">
              Can&apos;t find your exam?
            </h3>

            <p className="relative mx-auto mt-3 max-w-xl text-indigo-100">
              We&apos;re adding new categories every week. Explore our other
              career resources while you wait.
            </p>

            <Link
              href="/career-resources/government-exams"
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-black text-indigo-700 shadow-lg transition hover:scale-105 hover:bg-indigo-50"
            >
              Explore All Resources
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  );
}
