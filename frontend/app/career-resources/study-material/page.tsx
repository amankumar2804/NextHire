"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  FileText,
  FolderOpen,
  Bell,
  Clock,
} from "lucide-react";

export default function StudyMaterialComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-orange-950 to-amber-950 text-white">
      {/* DECORATIVE BLURS */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 animate-pulse rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-400/10 blur-3xl" />

      {/* FLOATING ICONS (decorative) */}
      <FileText
        size={40}
        className="pointer-events-none absolute left-[12%] top-[22%] rotate-[-12deg] text-white/10 md:block"
      />
      <BookOpen
        size={54}
        className="pointer-events-none absolute right-[14%] top-[30%] rotate-[10deg] text-white/10 md:block"
      />
      <FolderOpen
        size={44}
        className="pointer-events-none absolute bottom-[18%] left-[18%] rotate-[8deg] text-white/10 md:block"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/career-resources"
          className="inline-flex items-center gap-2 text-sm font-medium text-orange-200 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Career Resources
        </Link>

        <div className="mx-auto mt-20 max-w-2xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-2xl shadow-orange-500/30">
            <BookOpen size={44} />
          </div>

          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-200 backdrop-blur">
            <Clock size={15} />
            Coming Soon
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Study Notes{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-300 bg-clip-text text-transparent">
              & Materials
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-orange-100/90">
            We&apos;re putting together useful PDFs, notes and study
            material for technical subjects and competitive exams. This
            section will be live shortly — thanks for your patience.
          </p>

          {/* WHAT TO EXPECT */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
              <FileText size={22} className="text-orange-300" />
              <p className="mt-3 text-sm font-bold text-white">
                Downloadable PDFs
              </p>
              <p className="mt-1 text-xs text-orange-100/70">
                Organized notes ready to save and study offline.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
              <FolderOpen size={22} className="text-orange-300" />
              <p className="mt-3 text-sm font-bold text-white">
                Subject-wise Material
              </p>
              <p className="mt-1 text-xs text-orange-100/70">
                Core CS subjects and competitive exam topics, organized.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
              <Sparkles size={22} className="text-orange-300" />
              <p className="mt-3 text-sm font-bold text-white">
                Regularly Updated
              </p>
              <p className="mt-1 text-xs text-orange-100/70">
                Fresh material added as we build this section out.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/career-resources"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-orange-700 shadow-lg transition hover:scale-105 hover:bg-orange-50"
            >
              Explore Other Resources
            </Link>

            <Link
              href="/career-resources/government-exams/notes"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
            >
              <Bell size={17} />
              Browse Government Notes
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
