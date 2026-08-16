"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

export default function EditResumeTipPage() {
  const params = useParams();
  const router = useRouter();
  const tipId = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [newThumbnailFile, setNewThumbnailFile] = useState<File | null>(null);
  const [newThumbnailPreview, setNewThumbnailPreview] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // =====================================
  // FETCH EXISTING TIP
  // =====================================
  useEffect(() => {
    const fetchTip = async () => {
      try {
        setLoading(true);

        // NOTE: this endpoint also increments view count — same trade-off
        // as the career-news edit page, acceptable for now
        const response = await fetch(`${API_URL}/api/resume-tips/${tipId}`);

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Tip API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tip");
        }

        const tip = data.tip;

        setTitle(tip.title || "");
        setCategory(tip.category || "General");
        setExcerpt(tip.excerpt || "");
        setContent(tip.content || "");
        setExistingThumbnail(tip.thumbnailImage || "");
        setIsFeatured(Boolean(tip.isFeatured));
        setIsPublished(tip.isPublished !== false);
      } catch (error) {
        console.error("Fetch Tip Error:", error);
        setError(error instanceof Error ? error.message : "Failed to load tip");
      } finally {
        setLoading(false);
      }
    };

    if (tipId) {
      fetchTip();
    }
  }, [tipId]);

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    setNewThumbnailFile(file);
    setNewThumbnailPreview(URL.createObjectURL(file));
  };

  const removeNewThumbnail = () => {
    if (newThumbnailPreview) URL.revokeObjectURL(newThumbnailPreview);
    setNewThumbnailFile(null);
    setNewThumbnailPreview("");
  };

  const uploadThumbnail = async () => {
    if (!newThumbnailFile) return "";

    const formData = new FormData();
    formData.append("image", newThumbnailFile);

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

      const uploadedThumbnailUrl = newThumbnailFile
        ? await uploadThumbnail()
        : undefined;

      const body: Record<string, unknown> = {
        title: title.trim(),
        category: category.trim() || "General",
        excerpt: excerpt.trim(),
        content,
        isFeatured,
        isPublished,
      };

      if (uploadedThumbnailUrl) {
        body.thumbnailImage = uploadedThumbnailUrl;
      }

      const response = await fetch(`${API_URL}/api/resume-tips/${tipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Update tip API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to update tip");
      }

      alert("Tip updated successfully");

      router.push("/admin/career-resources/resume-builder/tips");
      router.refresh();
    } catch (error) {
      console.error("Update Resume Tip Error:", error);
      setError(error instanceof Error ? error.message : "Failed to update tip");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading tip...</p>
        </div>
      </main>
    );
  }

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
              <h1 className="text-4xl font-black md:text-5xl">Edit Tip</h1>
              <p className="mt-3 text-indigo-100">
                Update the tip content or thumbnail.
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
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* THUMBNAIL */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="mb-5 font-black text-slate-900">Thumbnail Image</h2>

            {existingThumbnail && !newThumbnailFile && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-bold text-slate-600">
                  Current Thumbnail
                </p>
                <img
                  src={getFullImageUrl(existingThumbnail)}
                  alt="Current thumbnail"
                  className="h-48 w-full rounded-2xl border border-slate-200 object-cover"
                />
              </div>
            )}

            {newThumbnailPreview ? (
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src={newThumbnailPreview}
                  alt="New preview"
                  className="h-48 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeNewThumbnail}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-lg"
                >
                  <X size={19} />
                </button>
              </div>
            ) : (
              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-indigo-400 hover:bg-indigo-50">
                <Upload size={26} className="text-indigo-600" />
                <span className="mt-2 font-black text-slate-700">
                  Upload a new thumbnail (optional)
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  Leave empty to keep the current one
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
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
