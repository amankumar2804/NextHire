"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Loader2,
  Eye,
  Download,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Note = {
  _id: string;
  title: string;
  pdf: string;
  isPublished?: boolean;
  createdAt?: string;
};

export default function NotesListPage() {
  const params = useParams();

  const categoryId = params.id as string;
  const subjectId = params.subjectId as string;

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState("");

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

        setNotes(data.notes || data.data || []);
      } catch (error) {
        console.error("Fetch Notes Error:", error);
        setError(error instanceof Error ? error.message : "Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subjectId) {
      fetchNotes();
    }
  }, [categoryId, subjectId]);

  // =====================================
  // DELETE NOTE
  // =====================================
  const handleDelete = async (noteId: string, noteTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${noteTitle}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(noteId);

      const response = await fetch(
        `${API_URL}/api/government-notes/${categoryId}/subjects/${subjectId}/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Delete API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      // remove from local state so UI updates instantly
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== noteId)
      );
    } catch (error) {
      console.error("Delete Note Error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete note");
    } finally {
      setDeletingId("");
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link
            href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Subjects
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">
            Manage Study Notes
          </p>

          <h1 className="mt-1 text-4xl font-black md:text-5xl">
            Add and manage notes, PDFs and study materials for this subject.
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              {notes.length} {notes.length === 1 ? "Note" : "Notes"}
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              All Topics
            </h2>
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
                placeholder="Search notes..."
                className="rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <Link
              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes/new`}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Note
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <BookOpen size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No notes added yet
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first note for this subject.
            </p>

            <Link
              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes/new`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-black text-white transition hover:bg-indigo-700"
            >
              <Plus size={20} />
              Add First Note
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {filteredNotes.map((note, index) => (
              <div
                key={note._id}
                className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* SEQUENCE NUMBER + TITLE */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-black text-indigo-600">
                    {index + 1}
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText size={20} className="shrink-0 text-red-500" />
                    <span className="font-bold text-slate-900">
                      {note.title}
                    </span>
                  </div>
                </div>

                {/* VIEW + DOWNLOAD + EDIT + DELETE */}
                <div className="flex shrink-0 flex-wrap gap-3">
                  <a
                    href={note.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <a
                    href={note.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Download size={16} />
                    Download
                  </a>

                  <Link
                    href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes/edit/${note._id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(note._id, note.title)}
                    disabled={deletingId === note._id}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === note._id ? (
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
