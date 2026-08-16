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
import { ChangeEvent, FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CreateNotePage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.id as string;
  const subjectId = params.subjectId as string;

  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file");
      return;
    }

    setPdfFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPdfPreviewUrl(previewUrl);
  };

  const removePdf = () => {
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
    }
    setPdfFile(null);
    setPdfPreviewUrl("");
  };

  const uploadPdf = async () => {
    if (!pdfFile) return "";

    const formData = new FormData();
    formData.append("pdf", pdfFile);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Topic name is required");
      return;
    }

    if (!pdfFile) {
      setError("Please upload a PDF");
      return;
    }

    try {
      setSubmitting(true);

      const pdfUrl = await uploadPdf();

      const response = await fetch(
        `${API_URL}/api/government-notes/${categoryId}/subjects/${subjectId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            pdf: pdfUrl,
            isPublished: true,
          }),
        }
      );

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Create Note API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to create note");
      }

      alert("Note created successfully");

      router.push(
        `/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subjectId}/notes`
      );

      router.refresh();
    } catch (error) {
      console.error("Create Note Error:", error);
      setError(error instanceof Error ? error.message : "Failed to create note");
    } finally {
      setSubmitting(false);
    }
  };

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
              <h1 className="text-4xl font-black md:text-5xl">Add New Note</h1>
              <p className="mt-3 text-indigo-100">
                Add topic name and upload PDF study material.
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
                  Upload the PDF for this topic.
                </p>
              </div>
            </div>

            {!pdfFile ? (
              <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-red-400 hover:bg-red-50">
                <Upload size={34} className="text-red-500" />
                <span className="mt-4 font-black text-slate-700">
                  Click to upload PDF
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  PDF files only
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
                      {pdfFile.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={removePdf}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow"
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className="flex gap-3">
                  <a href={pdfPreviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                    <Eye size={16} />
                    View PDF
                  </a>

                  <a href={pdfPreviewUrl} download={pdfFile.name} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700">
                    <Download size={16} />
                    Download
                  </a>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <iframe src={pdfPreviewUrl} className="h-64 w-full" title="PDF Preview" />
                </div>
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
              {submitting ? "Creating Note..." : "Create Note"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}