"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Library,
  Plus,
  Sparkles,
} from "lucide-react";

export default function GovernmentNotesAdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* =========================
          HEADER
      ========================= */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <Link
            href="/admin/career-resources/government-exams"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />

            Government Exams
          </Link>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">

                <Sparkles size={16} />

                STUDY RESOURCES

              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">

                Notes & Study Material

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">

                Manage exam-wise notes, PDFs, study materials and important
                learning resources for government exam aspirants.

              </p>

            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">

              <BookOpen size={40} />

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

            CONTENT MANAGEMENT

          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900">

            Choose what you want to manage

          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">

            Organize your study material category-wise and exam-wise so
            students can easily find the right resources.

          </p>

        </div>


        {/* =========================
            MANAGEMENT CARDS
        ========================= */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


          {/* =========================
              CATEGORIES
          ========================= */}

          <Link
            href="/admin/career-resources/government-exams/notes/categories"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-50 transition duration-500 group-hover:scale-125" />

            <div className="relative">

              <div className="mb-7 flex items-start justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm">

                  <FolderOpen size={32} />

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">

                  <ArrowRight size={20} />

                </div>

              </div>

              <p className="text-sm font-black uppercase tracking-widest text-indigo-600">

                ORGANIZE CONTENT

              </p>

              <h3 className="mt-3 text-2xl font-black text-slate-900">

                Manage Categories

              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">

                Create and manage categories such as SSC Exams, Banking Exams,
                Railway Exams and more.

              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition group-hover:bg-indigo-600">

                Manage Categories

                <ArrowRight size={18} />

              </div>

            </div>

          </Link>


          {/* =========================
              EXAM NOTES
          ========================= */}

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 transition duration-500 group-hover:scale-125" />

            <div className="relative">

              <div className="mb-7 flex items-start justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm">

                  <FileText size={32} />

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400">

                  <ArrowRight size={20} />

                </div>

              </div>

              <p className="text-sm font-black uppercase tracking-widest text-emerald-600">

                EXAM-WISE CONTENT

              </p>

              <h3 className="mt-3 text-2xl font-black text-slate-900">

                Study Notes

              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">

                Add and manage notes, PDFs and important study materials for
                individual government exams.

              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700">

                Coming Next

                <ArrowRight size={18} />

              </div>

            </div>

          </div>


          {/* =========================
              MEDIA RESOURCES
          ========================= */}

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-50 transition duration-500 group-hover:scale-125" />

            <div className="relative">

              <div className="mb-7 flex items-start justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm">

                  <ImageIcon size={32} />

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400">

                  <ArrowRight size={20} />

                </div>

              </div>

              <p className="text-sm font-black uppercase tracking-widest text-orange-600">

                VISUAL RESOURCES

              </p>

              <h3 className="mt-3 text-2xl font-black text-slate-900">

                PDFs & Images

              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">

                Manage important PDFs, images, charts and other useful
                resources for exam preparation.

              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700">

                Coming Next

                <ArrowRight size={18} />

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            WORKFLOW INFO
        ========================= */}

        <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 text-white md:p-10">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-3 flex items-center gap-2 text-indigo-300">

                <Library size={20} />

                <span className="text-sm font-bold uppercase tracking-widest">

                  RESOURCE WORKFLOW

                </span>

              </div>

              <h2 className="text-2xl font-black md:text-3xl">

                Category → Exam → Study Material

              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-indigo-100">

                First create an exam category, then organize exams inside it,
                and finally add useful study resources for each exam.

              </p>

            </div>

            <div className="flex shrink-0 items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

                <FolderOpen size={24} />

              </div>

              <ArrowRight className="text-indigo-300" size={22} />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

                <FileText size={24} />

              </div>

              <ArrowRight className="text-indigo-300" size={22} />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

                <BookOpen size={24} />

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            QUICK ACTION
        ========================= */}

        <div className="mt-8 flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">

          <div>

            <h3 className="text-xl font-black text-slate-900">

              Ready to organize your study resources?

            </h3>

            <p className="mt-1 text-slate-500">

              Start by creating your first notes category.

            </p>

          </div>

          <Link
            href="/admin/career-resources/government-exams/notes/categories"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >

            <Plus size={18} />

            Add Category

          </Link>

        </div>

      </section>

    </main>
  );
}