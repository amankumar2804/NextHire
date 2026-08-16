"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  ListChecks,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

type PageProps = {
  params: Promise<{
    category: string;
    exam: string;
  }>;
};

type PublishedArticle = {
  _id: string;
  title: string;
  content: string;
  contentType: "article" | "image-and-article";
  image?: string;
};

type PublicExam = { name: string; description: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const examData: Record<
  string,
  {
    name: string;
    category: string;
    description: string;
    icon: string;
    gradient: string;
  }
> = {
  "ssc-cgl": {
    name: "SSC CGL",
    category: "SSC Exams",
    description:
      "Complete SSC CGL exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "📊",
    gradient: "from-blue-500 to-indigo-600",
  },

  "ssc-chsl": {
    name: "SSC CHSL",
    category: "SSC Exams",
    description:
      "Complete SSC CHSL exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "📚",
    gradient: "from-indigo-500 to-violet-600",
  },

  "ibps-po": {
    name: "IBPS PO",
    category: "Banking Exams",
    description:
      "Complete IBPS PO exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "🏦",
    gradient: "from-emerald-500 to-teal-600",
  },

  "sbi-po": {
    name: "SBI PO",
    category: "Banking Exams",
    description:
      "Complete SBI PO exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "🏦",
    gradient: "from-cyan-500 to-blue-600",
  },

  "dsssb-tgt": {
    name: "DSSSB TGT",
    category: "Teaching Exams",
    description:
      "Complete DSSSB TGT exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "🎓",
    gradient: "from-purple-500 to-violet-600",
  },

  ctet: {
    name: "CTET",
    category: "Teaching Exams",
    description:
      "Complete CTET exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "📖",
    gradient: "from-pink-500 to-rose-600",
  },

  "rrb-ntpc": {
    name: "RRB NTPC",
    category: "Railway Exams",
    description:
      "Complete RRB NTPC exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "🚆",
    gradient: "from-orange-500 to-red-600",
  },

  "ssc-gd": {
    name: "SSC GD",
    category: "Defence Exams",
    description:
      "Complete SSC GD exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "🛡️",
    gradient: "from-slate-600 to-slate-900",
  },
};

function formatExamName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.toUpperCase())
    .join(" ");
}

export default function ExamArticlePage({ params }: PageProps) {
  const { category, exam } = use(params);
  const [articles, setArticles] = useState<PublishedArticle[]>([]);
  const [publicExam, setPublicExam] = useState<PublicExam | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/exam-articles/public/${encodeURIComponent(category)}/${encodeURIComponent(exam)}`
        );
        if (!response.ok) return;
        const result = await response.json();
        setPublicExam(result.exam || null);
        setArticles(result.articles || []);
      } catch (error) {
        console.error("Fetch public exam articles error:", error);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [category, exam]);

  const currentExam = examData[exam] || {
    name: formatExamName(exam),
    category: category.toUpperCase(),
    description:
      "Complete exam pattern, syllabus, eligibility, selection process and preparation strategy.",
    icon: "📘",
    gradient: "from-indigo-500 to-violet-600",
  };

  if (articles.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link href={`/career-resources/government-exams/exam-blueprint/${category}`} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white">
              <ArrowLeft size={17} /> Back to Exams
            </Link>
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">{publicExam?.name || currentExam.name}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{publicExam?.name || currentExam.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-indigo-100">{publicExam?.description || currentExam.description}</p>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">{article.contentType === "article" ? "Article" : "Image Article"}</p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">{article.title}</h2>
                {article.image && <img src={article.image} alt={article.title} className="mt-7 max-h-[480px] w-full rounded-2xl object-cover" />}
                <div className="prose prose-slate mt-8 max-w-none whitespace-pre-wrap leading-8"><ReactMarkdown>{article.content}</ReactMarkdown></div>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#080b16] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-150px] top-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]" />

          <div className="absolute right-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

          <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* BREADCRUMB */}
          <div className="mb-12 flex flex-wrap items-center gap-2 text-sm text-slate-400">
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

            <Link
              href="/career-resources/government-exams/exam-blueprint"
              className="transition-colors hover:text-white"
            >
              Exam Blueprint
            </Link>

            <ChevronRight size={15} />

            <span className="text-slate-200">{currentExam.name}</span>
          </div>

          {/* HERO CONTENT */}
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_360px]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
                <Sparkles size={16} className="text-indigo-400" />
                {currentExam.category}
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {currentExam.name}{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Exam Blueprint
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                {currentExam.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/career-resources/government-exams/exam-blueprint"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <ArrowLeft size={17} />
                  All Exams
                </Link>

                <Link
                  href="/career-resources/government-exams"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Explore Resources
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* EXAM VISUAL CARD */}
            <div className="relative">
              <div
                className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${currentExam.gradient} p-8 shadow-2xl`}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />

                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-5xl backdrop-blur-xl">
                    {currentExam.icon}
                  </div>

                  <p className="mt-8 text-sm font-medium text-white/70">
                    Government Exam
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">
                    {currentExam.name}
                  </h2>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-xl">
                      <FileText size={20} className="text-white" />
                      <p className="mt-3 text-xs text-white/70">Pattern</p>
                      <p className="mt-1 font-semibold text-white">
                        Detailed
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-xl">
                      <BookOpen size={20} className="text-white" />
                      <p className="mt-3 text-xs text-white/70">Syllabus</p>
                      <p className="mt-1 font-semibold text-white">
                        Complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK OVERVIEW */}
      <section className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FileText,
              title: "Exam Pattern",
              text: "Know the complete structure",
            },
            {
              icon: BookOpen,
              title: "Complete Syllabus",
              text: "Subject-wise topics",
            },
            {
              icon: Clock,
              title: "Exam Duration",
              text: "Understand time limits",
            },
            {
              icon: Target,
              title: "Preparation Guide",
              text: "Prepare with a strategy",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_320px]">
          {/* MAIN ARTICLE */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-10 border-b border-slate-200 pb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Complete Exam Guide
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                {currentExam.name} Exam Pattern & Syllabus
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                This complete guide will help you understand the examination
                structure, important subjects, syllabus and preparation
                strategy for {currentExam.name}.
              </p>
            </div>

            {/* SECTION 1 */}
            <section className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <FileText size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  1. Exam Pattern
                </h2>
              </div>

              <p className="leading-relaxed text-slate-600">
                The exam pattern provides important information about the
                number of sections, questions, marks and duration of the
                examination. Candidates should understand the complete pattern
                before starting their preparation.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 p-4 font-semibold text-slate-700">
                  <span>Particular</span>
                  <span>Details</span>
                </div>

                {[
                  ["Exam Name", currentExam.name],
                  ["Mode", "Online / Computer Based Test"],
                  ["Question Type", "Objective Type Questions"],
                  ["Subjects", "Multiple Subjects"],
                  ["Negative Marking", "As per official notification"],
                ].map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-2 border-b border-slate-100 p-4 text-sm last:border-b-0"
                  >
                    <span className="font-medium text-slate-700">{key}</span>

                    <span className="text-slate-500">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2 */}
            <section className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <BookOpen size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  2. Complete Syllabus
                </h2>
              </div>

              <p className="leading-relaxed text-slate-600">
                The syllabus is divided into different subjects and topics.
                Candidates should prepare each topic systematically and revise
                regularly.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "General Awareness",
                  "Quantitative Aptitude",
                  "Reasoning Ability",
                  "English Language",
                  "Computer Awareness",
                  "Current Affairs",
                ].map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-emerald-500"
                    />

                    <span className="font-medium text-slate-700">
                      {subject}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3 */}
            <section className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <ListChecks size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  3. Selection Process
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  "Written Examination",
                  "Skill Test / Descriptive Test (if applicable)",
                  "Document Verification",
                  "Final Selection",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                      {index + 1}
                    </div>

                    <span className="font-medium text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4 */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Target size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  4. Preparation Strategy
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  "Understand the complete syllabus first.",
                  "Create a realistic daily study schedule.",
                  "Practice previous year question papers.",
                  "Take regular mock tests.",
                  "Revise important topics regularly.",
                ].map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-3 rounded-xl bg-violet-50 p-4"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-violet-600"
                    />

                    <p className="text-sm leading-relaxed text-slate-700">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* TABLE OF CONTENTS */}
            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <ListChecks size={20} />
                </div>

                <h3 className="font-bold text-slate-900">On this page</h3>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Exam Pattern",
                  "Complete Syllabus",
                  "Selection Process",
                  "Preparation Strategy",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <span className="font-semibold text-indigo-500">
                      0{index + 1}
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5">
                <Trophy className="text-white" size={26} />

                <h3 className="mt-4 font-bold text-white">
                  Prepare consistently
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-indigo-100">
                  Small daily improvements can take you closer to your dream
                  government job.
                </p>

                <Link
                  href="/career-resources/government-exams"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Explore Resources
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
        <GraduationCap className="mx-auto text-indigo-600" size={42} />

        <h2 className="mt-5 text-3xl font-bold text-slate-900">
          Ready to start your preparation?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Explore more resources and build a structured preparation strategy
          for your target exam.
        </p>

        <Link
          href="/career-resources/government-exams"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
        >
          Explore Government Exam Resources
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
