"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

type Exam = {
  name: string;
  slug: string;
  description: string;
  icon: string;
};

const categoryData: Record<
  string,
  {
    name: string;
    description: string;
    exams: Exam[];
  }
> = {
  ssc: {
    name: "SSC Exams",
    description:
      "Explore complete exam patterns, syllabus and preparation information for SSC examinations.",
    exams: [
      {
        name: "SSC CGL",
        slug: "ssc-cgl",
        description:
          "Combined Graduate Level examination conducted by SSC.",
        icon: "📊",
      },
      {
        name: "SSC CHSL",
        slug: "ssc-chsl",
        description:
          "Combined Higher Secondary Level examination conducted by SSC.",
        icon: "📚",
      },
      {
        name: "SSC GD",
        slug: "ssc-gd",
        description:
          "General Duty Constable examination for various forces.",
        icon: "🛡️",
      },
      {
        name: "SSC MTS",
        slug: "ssc-mts",
        description:
          "Multi Tasking Staff examination conducted by SSC.",
        icon: "📝",
      },
    ],
  },

  banking: {
    name: "Banking Exams",
    description:
      "Explore complete exam patterns, syllabus and preparation information for banking examinations.",
    exams: [
      {
        name: "SBI PO",
        slug: "sbi-po",
        description:
          "Probationary Officer examination conducted by State Bank of India.",
        icon: "🏦",
      },
      {
        name: "IBPS PO",
        slug: "ibps-po",
        description:
          "Probationary Officer examination conducted through IBPS.",
        icon: "💼",
      },
      {
        name: "SBI Clerk",
        slug: "sbi-clerk",
        description:
          "Junior Associate examination conducted by State Bank of India.",
        icon: "📈",
      },
    ],
  },

  teaching: {
    name: "Teaching Exams",
    description:
      "Explore complete exam patterns, syllabus and preparation information for teaching examinations.",
    exams: [
      {
        name: "DSSSB TGT",
        slug: "dsssb-tgt",
        description:
          "Teacher recruitment examination conducted by DSSSB.",
        icon: "🎓",
      },
      {
        name: "CTET",
        slug: "ctet",
        description:
          "Central Teacher Eligibility Test conducted by CBSE.",
        icon: "📖",
      },
      {
        name: "TET",
        slug: "tet",
        description:
          "Teacher Eligibility Test examinations conducted by different states.",
        icon: "✏️",
      },
    ],
  },

  railway: {
    name: "Railway Exams",
    description:
      "Explore complete exam patterns, syllabus and preparation information for railway examinations.",
    exams: [
      {
        name: "RRB NTPC",
        slug: "rrb-ntpc",
        description:
          "Non-Technical Popular Categories examination conducted by RRB.",
        icon: "🚆",
      },
      {
        name: "RRB Group D",
        slug: "rrb-group-d",
        description:
          "Level 1 railway recruitment examination.",
        icon: "🛤️",
      },
    ],
  },

  defence: {
    name: "Defence Exams",
    description:
      "Explore complete exam patterns, syllabus and preparation information for defence examinations.",
    exams: [
      {
        name: "NDA",
        slug: "nda",
        description:
          "National Defence Academy examination conducted by UPSC.",
        icon: "🛡️",
      },
      {
        name: "CDS",
        slug: "cds",
        description:
          "Combined Defence Services examination conducted by UPSC.",
        icon: "🎖️",
      },
      {
        name: "AFCAT",
        slug: "afcat",
        description:
          "Air Force Common Admission Test.",
        icon: "✈️",
      },
    ],
  },

  upsc: {
    name: "UPSC Exams",
    description:
      "Explore complete exam patterns, syllabus and preparation information for UPSC examinations.",
    exams: [
      {
        name: "UPSC Civil Services",
        slug: "upsc-civil-services",
        description:
          "Civil Services examination conducted by UPSC.",
        icon: "🏛️",
      },
    ],
  },
};

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

type DynamicCategory = {
  _id: string;
  name: string;
  slug: string;
  description: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CategoryPage({ params }: PageProps) {
  const { category } = use(params);
  const [dynamicData, setDynamicData] = useState<{
    name: string;
    description: string;
    exams: Exam[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndExams = async () => {
      try {
        const categoriesResponse = await fetch(`${API_URL}/api/government-exam-categories`);
        const { categories = [] } = await categoriesResponse.json();
        const matchedCategory = categories.find(
          (item: DynamicCategory) => item.slug === category
        );

        if (!categoriesResponse.ok || !matchedCategory) return;

        const examsResponse = await fetch(
          `${API_URL}/api/exam-categories/${matchedCategory._id}/exams`
        );
        const { exams = [] } = await examsResponse.json();

        if (examsResponse.ok) {
          setDynamicData({
            ...matchedCategory,
            exams: exams.filter((exam: Exam & { isActive?: boolean }) => exam.isActive !== false),
          });
        }
      } catch (error) {
        console.error("Fetch exam category error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndExams();
  }, [category]);

  const data = dynamicData || categoryData[category];

  if (loading && !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading category...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Category Not Found
          </h1>

          <Link
            href="/career-resources/government-exams/exam-blueprint"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1020] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />
          <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[130px]" />
          <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* BREADCRUMB */}
          <div className="mb-12 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link
              href="/career-resources"
              className="transition hover:text-white"
            >
              Career Resources
            </Link>

            <ChevronRight size={15} />

            <Link
              href="/career-resources/government-exams"
              className="transition hover:text-white"
            >
              Government Exams
            </Link>

            <ChevronRight size={15} />

            <Link
              href="/career-resources/government-exams/exam-blueprint"
              className="transition hover:text-white"
            >
              Exam Blueprint
            </Link>

            <ChevronRight size={15} />

            <span className="text-white">{data.name}</span>
          </div>

          {/* HEADER */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-indigo-300 backdrop-blur-xl">
              <Sparkles size={16} />
              Explore {data.name}
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight text-white sm:text-6xl">
              {data.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* EXAM LIST */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Available examinations
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Choose your exam
            </h2>

            <p className="mt-2 text-slate-600">
              Select an exam to explore its complete preparation blueprint.
            </p>
          </div>

          {/* LINE-WISE EXAM LIST */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {data.exams.map((exam, index) => (
              <Link
                key={exam.slug}
                href={`/career-resources/government-exams/exam-blueprint/${category}/${exam.slug}`}
                className={`group flex items-center justify-between gap-4 p-5 transition-all duration-300 hover:bg-slate-50 sm:p-7 ${
                  index !== data.exams.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                    {exam.icon}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                      {exam.name}
                    </h3>

                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
                      {exam.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-indigo-600">
                      <FileText size={14} />
                      Complete Exam Blueprint
                    </div>
                  </div>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <BookOpen className="text-indigo-600" size={28} />

            <h3 className="mt-4 font-bold text-slate-900">
              Complete Information
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Read complete exam-related information in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <FileText className="text-violet-600" size={28} />

            <h3 className="mt-4 font-bold text-slate-900">
              Exam Blueprint
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Understand the exam before starting your preparation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <GraduationCap className="text-fuchsia-600" size={28} />

            <h3 className="mt-4 font-bold text-slate-900">
              Prepare Better
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Make your preparation more structured and focused.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
