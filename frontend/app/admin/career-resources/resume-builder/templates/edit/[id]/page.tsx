"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Layers,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

const LAYOUT_OPTIONS = [
  { value: "classic", label: "Classic — traditional single column" },
  { value: "modern", label: "Modern — sidebar with accent color" },
  { value: "minimal", label: "Minimal — clean and spacious" },
  { value: "creative", label: "Creative — bold headers and icons" },
];

export default function EditResumeTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [layoutKey, setLayoutKey] = useState("classic");
  const [gradient, setGradient] = useState("from-indigo-500 to-violet-600");
  const [isActive, setIsActive] = useState(true);

  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [newThumbnailFile, setNewThumbnailFile] = useState<File | null>(null);
  const [newThumbnailPreview, setNewThumbnailPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/resume-templates/${templateId}`
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Template API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch template");
        }

        const template = data.template;

        setName(template.name || "");
        setDescription(template.description || "");
        setLayoutKey(template.layoutKey || "classic");
        setGradient(template.gradient || "from-indigo-500 to-violet-600");
        setExistingThumbnail(template.thumbnailImage || "");
        setIsActive(template.isActive !== false);
      } catch (error) {
        console.error("Fetch Template Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load template"
        );
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

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

    if (!name.trim()) {
      setError("Template name is required");
      return;
    }

    try {
      setSubmitting(true);

      const uploadedThumbnailUrl = newThumbnailFile
        ? await uploadThumbnail()
        : undefined;

      const body: Record<string, unknown> = {
        name: name.trim(),
        description: description.trim(),
        layoutKey,
        gradient: gradient.trim() || "from-indigo-500 to-violet-600",
        isActive,
      };

      if (uploadedThumbnailUrl) {
        body.thumbnailImage = uploadedThumbnailUrl;
      }

      const response = await fetch(
        `${API_URL}/api/resume-templates/${templateId}`,
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
        throw new Error("Update template API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to update template");
      }

      alert("Template updated successfully");

      router.push("/admin/career-resources/resume-builder/templates");
      router.refresh();
    } catch (error) {
      console.error("Update Resume Template Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update template"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading template...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/admin/career-resources/resume-builder/templates"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Templates
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Layers size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">Edit Template</h1>
              <p className="mt-3 text-indigo-100">
                Update the design theme details.
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

          {/* DETAILS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  Layout Style <span className="text-red-500">*</span>
                </label>
                <select
                  value={layoutKey}
                  onChange={(event) => setLayoutKey(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                >
                  {LAYOUT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-700">
                  Accent Gradient
                </label>
                <input
                  type="text"
                  value={gradient}
                  onChange={(event) => setGradient(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 font-mono text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
                <div
                  className={`mt-3 h-10 w-full rounded-xl bg-gradient-to-r ${gradient}`}
                />
              </div>
            </div>
          </div>

          {/* THUMBNAIL */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="mb-5 font-black text-slate-900">
              Preview Thumbnail
            </h2>

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

          {/* SETTINGS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-semibold text-slate-700">
                Active (visible to users)
              </span>
            </label>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col-reverse justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <Link
              href="/admin/career-resources/resume-builder/templates"
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
