"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Tip = {
  _id: string;
  title: string;
  category: string;
  thumbnailImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  viewCount: number;
};

export default function ResumeTipsListPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/resume-tips/admin/all`);

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Resume tips API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tips");
        }

        setTips(data.tips || []);
      } catch (error) {
        console.error("Fetch Resume Tips Error:", error);
        setError(error instanceof Error ? error.message : "Failed to load tips");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleDelete = async (tipId: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(tipId);

      const response = await fetch(`${API_URL}/api/resume-tips/${tipId}`, {
        method: "DELETE",
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Delete API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete tip");
      }

      setTips((previous) => previous.filter((tip) => tip._id !== tipId));
    } catch (error) {
      console.error("Delete Resume Tip Error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete tip");
    } finally {
      setDeletingId("");
    }
  };

  const filteredTips = tips.filter((tip) =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading tips...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/admin/career-resources/resume-builder"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Resume Builder
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <FileText size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                Resume Tips & Guides
              </h1>
              <p className="mt-3 text-indigo-100">
                Publish writing tips and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              {tips.length} {tips.length === 1 ? "Tip" : "Tips"}
            </p>
            <h2 className="text-2xl font-black text-slate-900">All Tips</h2>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tips..."
                className="rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <Link
              href="/admin/career-resources/resume-builder/tips/new"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Tip
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {filteredTips.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <FileText size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No tips added yet
            </h3>

            <p className="mt-2 text-slate-500">Add your first resume tip.</p>

            <Link
              href="/admin/career-resources/resume-builder/tips/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-black text-white transition hover:bg-indigo-700"
            >
              <Plus size={20} />
              Add First Tip
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {filteredTips.map((tip) => (
              <div
                key={tip._id}
                className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900">
                      {tip.title}
                    </span>

                    {tip.isFeatured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                        <Star size={11} />
                        Featured
                      </span>
                    )}

                    {!tip.isPublished && (
                      <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">
                        Draft
                      </span>
                    )}
                  </div>

                  <p className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span>{tip.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Eye size={12} />
                      {tip.viewCount || 0} views
                    </span>
                  </p>
                </div>

                <div className="flex shrink-0 gap-3">
                  <Link
                    href={`/admin/career-resources/resume-builder/tips/edit/${tip._id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(tip._id, tip.title)}
                    disabled={deletingId === tip._id}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === tip._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
