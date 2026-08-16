"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Loader2,
  Save,
  Upload,
  X,
  Eye,
  Download,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullPdfUrl = (pdfPath: string) => {
  if (!pdfPath) return "";
  return pdfPath.startsWith("http") ? pdfPath : `${API_URL}${pdfPath}`;
};

type Note = {
  _id: string;
  title: string;
  pdf: string;
};

export default function EditNotePage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.id as string;
  const subjectId = params.subjectId as string;
  const noteId = params.noteId as string;

  const [title, setTitle] = useState("");

  const [existingPdfUrl, setExistingPdfUrl] = useState("");
  const [newPdfFile, setNewPdfFile] = useState<File | null>(null);
  const [newPdfPreviewUrl, setNewPdfPreviewUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // =====================================
  // FETCH EXISTING NOTE
  // =====================================
  useEffect(() => {
    const fetchNote = async () => {
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
          throw new Error(data.message || "Failed to fetch note");
        }

        const notes: Note[] = data.notes || data.data || [];

        const foundNote = notes.find((note) => note._id === noteId);

        if (!foundNote) {
          throw new Error("Note not found");
        }

        setTitle(foundNote.title);
        setExistingPdfUrl(foundNote.pdf || "");
      } catch (error) {
        console.error("Fetch Note Error:", error);
        setError(error instanceof Error ? error.message : "Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subjectId && noteId) {
      fetchNote();
    }
  }, [categoryId, subjectId, noteId]);

  // =====================================
  // NEW PDF SELECT (optional replacement)
  // =====================================
  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file");
      return;
    }

    setNewPdfFile(file);
    setNewPdfPreviewUrl(URL.createObjectURL(file));
  };

  const removeNewPdf = () => {
    if (newPdfPreviewUrl) {
      URL.revokeObjectURL(newPdfPreviewUrl);
    }
    setNewPdfFile(null);
    setNewPdfPreviewUrl("");
  };

  // =====================================
  // UPLOAD NEW PDF (if selected)
  // =====================================
  const uploadPdf = async () => {
    if (!newPdfFile) return "";

    const formData = new FormData();
    formData.append("pdf", newPdfFile);

    const response = await fetch(`${API_URL}/api/upload/pdf`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("PDF upload API returned an invalid response");
    }

    if (!response.ok) {
      throw new Error(result.message || "Failed to upload PDF");
    }

    const pdfUrl = result.pdfUrl || result.url;

    if (!pdfUrl) {
      throw new Error("PDF URL was not returned by the server");
    }

    return pdfUrl;
  };

  // =====================================
  // UPDATE NOTE
  // =====================================
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Topic name is required");
      return;
    }

    try {
      setSubmitting(true);

      // only upload a new pdf if the user picked a replacement,
      // otherwise keep the existing one
      const uploadedPdfUrl = newPdfFile ? await uploadPdf() : undefined;

      const body: Record<string, unknown> = {
        title: title.trim(),
      };

      if (uploadedPdfUrl) {
        body.pdf = uploadedPdfUrl;
      }

      const response = await fetch(
        `${API_URL}/api/government-notes/${categoryId}/subjects/${subjectId}/notes/${noteId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Update Note API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to update note");
      }

      alert("Note updated successfully");

      router.push(
        `/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes`
      );

      router.refresh();
    } catch (error) {
      console.error("Update Note Error:", error);
      setError(error instanceof Error ? error.message : "Failed to update note");
    } finally {
      setSubmitting(false);
    }
  };

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
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <BookOpen size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">Edit Note</h1>
              <p className="mt-3 text-indigo-100">
                Update topic name or replace the PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
              {error}
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <label className="mb-2 block font-bold text-slate-700">
              Topic Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: SSC CGL Quantitative Aptitude"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <FileText size={21} />
              </div>
              <div>
                <h2 className="font-black text-slate-900">Study PDF</h2>
                <p className="text-sm text-slate-500">
                  Current PDF is shown below. Upload a new file only if you
                  want to replace it.
                </p>
              </div>
            </div>

            {/* CURRENT PDF */}
            {existingPdfUrl && !newPdfFile && (
              <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-3 text-sm font-bold text-slate-600">
                  Current PDF
                </p>

                <div className="flex gap-3">
                  <a
                    href={getFullPdfUrl(existingPdfUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <a
                    href={getFullPdfUrl(existingPdfUrl)}
                    download
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </div>
            )}

            {/* REPLACE PDF */}
            {!newPdfFile ? (
              <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-red-400 hover:bg-red-50">
                <Upload size={30} className="text-red-500" />
                <span className="mt-3 font-black text-slate-700">
                  Click to upload a new PDF (optional)
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  Leave empty to keep the current PDF
                </span>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={22} className="text-red-500" />
                    <span className="max-w-xs truncate font-bold text-slate-700">
                      {newPdfFile.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={removeNewPdf}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow"
                  >
                    <X size={17} />
                  </button>
                </div>

                <a
                  href={newPdfPreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  <Eye size={16} />
                  Preview New PDF
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <Link
              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-7 py-3.5 font-black text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
