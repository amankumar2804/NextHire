"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CreateResumeTipPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(null);
    setThumbnailPreview("");
  };

  const uploadThumbnail = async () => {
    if (!thumbnailFile) return "";

    const formData = new FormData();
    formData.append("image", thumbnailFile);

    const response = await fetch(`${API_URL}/api/upload/image`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Image upload API returned an invalid response");
    }

    if (!response.ok) {
      throw new Error(result.message || "Failed to upload image");
    }

    const imageUrl = result.imageUrl || result.url;
    if (!imageUrl) {
      throw new Error("Image URL was not returned by the server");
    }

    return imageUrl;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const plainTextContent = content.replace(/<[^>]*>/g, "").trim();
    if (!plainTextContent) {
      setError("Content is required");
      return;
    }

    try {
      setSubmitting(true);

      const thumbnailUrl = await uploadThumbnail();

      const response = await fetch(`${API_URL}/api/resume-tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim() || "General",
          excerpt: excerpt.trim(),
          content,
          thumbnailImage: thumbnailUrl,
          isFeatured,
          isPublished,
        }),
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Create tip API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to create tip");
      }

      alert("Tip created successfully");

      router.push("/admin/career-resources/resume-builder/tips");
      router.refresh();
    } catch (error) {
      console.error("Create Resume Tip Error:", error);
      setError(error instanceof Error ? error.message : "Failed to create tip");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/admin/career-resources/resume-builder/tips"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Resume Tips
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <FileText size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">Add Tip</h1>
              <p className="mt-3 text-indigo-100">
                Publish a resume writing tip or guide.
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

          {/* BASIC DETAILS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-bold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: 5 Tips to Make Your Resume ATS-Friendly"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Example: Writing Tips"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-bold text-slate-700">
                  Short Excerpt
                </label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="Small summary shown on the tip card..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* THUMBNAIL */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="mb-5 font-black text-slate-900">Thumbnail Image</h2>

            {thumbnailPreview ? (
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="h-56 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-lg"
                >
                  <X size={19} />
                </button>
              </div>
            ) : (
              <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-indigo-400 hover:bg-indigo-50">
                <Upload size={30} className="text-indigo-600" />
                <span className="mt-3 font-black text-slate-700">
                  Click to upload thumbnail
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* CONTENT */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="mb-1 font-black text-slate-900">Full Guide</h2>
            <p className="mb-5 text-sm text-slate-500">
              Use the toolbar for bold, headings and lists.
            </p>

            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write the full tip or guide here..."
            />
          </div>

          {/* SETTINGS */}
          <div className="flex flex-wrap gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(event) => setIsFeatured(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-semibold text-slate-700">
                Featured (shown as main headline)
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(event) => setIsPublished(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-semibold text-slate-700">Published</span>
            </label>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col-reverse justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <Link
              href="/admin/career-resources/resume-builder/tips"
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
              {submitting ? "Publishing..." : "Publish Tip"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
