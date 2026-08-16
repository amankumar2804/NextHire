"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Loader2,
  Eye,
  Download,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
  RefreshCw,
  FileWarning,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullPdfUrl = (pdfPath?: string) => {
  if (!pdfPath) return "";
  return pdfPath.startsWith("http") ? pdfPath : `${API_URL}${pdfPath}`;
};

type Note = {
  _id: string;
  title: string;
  pdf: string;
  isPublished?: boolean;
};

type Subject = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
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
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-[0.98] opacity-0"
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

export default function GovernmentNotesListPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const subjectId = params.subjectId as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/government-notes/${categoryId}/subjects/${subjectId}`
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Notes API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch notes");
        }

        setSubject(data.subject);

        const allNotes: Note[] = data.notes || data.data || [];

        const publishedNotes = allNotes.filter(
          (note) => note.isPublished !== false
        );

        setNotes(publishedNotes);
      } catch (error) {
        console.error("Fetch Notes Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load notes"
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subjectId) {
      fetchNotes();
    }
  }, [categoryId, subjectId]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HERO — INDIGO / PURPLE / ROSE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-rose-600 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-fuchsia-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-indigo-400/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-1/3 h-52 w-52 rounded-full bg-amber-300/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <Link
            href={`/career-resources/government-exams/notes/${categoryId}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Subjects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur">
                <Sparkles size={14} className="text-amber-200" />
                Study Material
              </div>

              <div className="mt-5 flex items-center gap-5">
                {subject?.icon && (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-lg">
                    {subject.icon}
                  </div>
                )}

                <h1 className="text-4xl font-black md:text-5xl">
                  {subject?.name || "Notes"}
                </h1>
              </div>

              {subject?.description && (
                <p className="mt-5 max-w-xl text-white/90">
                  {subject.description}
                </p>
              )}

              <div className="mt-10 flex flex-wrap gap-8">
                <div>
                  <p className="text-3xl font-black text-white">
                    {notes.length}+
                  </p>
                  <p className="text-sm text-white/80">Topics</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="text-sm text-white/80">Free PDFs</p>
                </div>
              </div>
            </div>

            {/* RIGHT: HIGHLIGHTS CARD */}
            <div className="relative rounded-3xl border border-white/20 bg-white/15 p-7 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-widest text-white/85">
                Why These Notes
              </p>

              <div className="mt-5 space-y-4">
                {HIGHLIGHTS.map((highlight) => (
                  <div
                    key={highlight.text}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <highlight.icon size={16} />
                    </div>
                    <p className="text-sm font-semibold text-white/95">
                      {highlight.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTES LIST */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <RevealOnScroll>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              {notes.length} {notes.length === 1 ? "Topic" : "Topics"} Available
            </p>

            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search topics..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-64"
              />
            </div>
          </div>
        </RevealOnScroll>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <BookOpen size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No notes available yet
            </h3>

            <p className="mt-2 text-slate-500">
              We&apos;re adding study material for this subject. Check back
              shortly.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {filteredNotes.map((note, index) => {
              const pdfUrl = getFullPdfUrl(note.pdf);
              const hasPdf = Boolean(pdfUrl);

              return (
                <RevealOnScroll key={note._id} delay={(index % 6) * 60}>
                  <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 transition hover:bg-indigo-50/40 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-rose-500 font-black text-white">
                        {index + 1}
                      </div>

                      <div className="flex items-center gap-3">
                        <FileText size={20} className="shrink-0 text-rose-500" />
                        <span className="font-bold text-slate-900">
                          {note.title}
                        </span>
                      </div>
                    </div>

                    {hasPdf ? (
                      <div className="flex shrink-0 gap-3">
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                          <Eye size={16} />
                          View
                        </a>

                        <a
                          href={pdfUrl}
                          download
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-500 px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      </div>
                    ) : (
                      <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-400">
                        <FileWarning size={16} />
                        PDF not available
                      </span>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <RevealOnScroll>
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-rose-600 px-8 py-14 text-center text-white shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <h3 className="relative text-2xl font-black md:text-3xl">
              Want to explore more subjects?
            </h3>

            <p className="relative mx-auto mt-3 max-w-xl text-white/85">
              Check out other subjects in this category or browse all exam
              categories for more free study material.
            </p>

            <div className="relative mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href={`/career-resources/government-exams/notes/${categoryId}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-black text-indigo-700 shadow-lg transition hover:scale-105 hover:bg-indigo-50"
              >
                More Subjects
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/career-resources/government-exams/notes"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-7 py-3.5 font-black text-white transition hover:bg-white/10"
              >
                All Categories
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  );
}
