"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  ImagePlus,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function AddArticlePage() {
  const params = useParams();

  const router = useRouter();

  const categoryId =
    params.id as string;

  const examId =
    params.examId as string;

  const [saving, setSaving] =
    useState(false);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [form, setForm] =
    useState({
      title: "",
      slug: "",
      description: "",
      content: "",
      isPublished: true,
    });

  // ===============================
  // AUTO SLUG
  // ===============================

  const handleTitleChange = (
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      title: value,

      slug: value
        .toLowerCase()
        .trim()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        ),
    }));
  };

  // ===============================
  // SELECT IMAGE
  // ===============================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select a valid image"
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image size must be less than 5 MB"
      );

      return;
    }

    setImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(
      previewUrl
    );
  };

  // ===============================
  // REMOVE IMAGE
  // ===============================

  const removeImage = () => {
    setImageFile(null);

    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImagePreview("");
  };

  // ===============================
  // UPLOAD IMAGE
  // ===============================

  const uploadImage =
    async () => {
      if (!imageFile) {
        return "";
      }

      const imageFormData =
        new FormData();

      imageFormData.append(
        "image",
        imageFile
      );

      const response =
        await fetch(
          `${API_URL}/api/upload/image`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result =
          JSON.parse(text);
      } catch {
        throw new Error(
          "Image upload API returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Image upload failed"
        );
      }

      return (
        result.imageUrl ||
        result.url ||
        result.image ||
        ""
      );
    };

  // ===============================
  // CREATE ARTICLE
  // ===============================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        !form.title.trim() ||
        !form.slug.trim() ||
        !form.description.trim() ||
        !form.content.trim()
      ) {
        alert(
          "Title, slug, description and article content are required"
        );

        return;
      }

      try {
        setSaving(true);

        const uploadedImage =
          await uploadImage();

        const response =
          await fetch(
            `${API_URL}/api/exam-articles`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                exam: examId,

                title:
                  form.title.trim(),

                slug:
                  form.slug.trim(),

                description:
                  form.description.trim(),

                content:
                  form.content,

                image:
                  uploadedImage,

                contentType:
                  uploadedImage
                    ? "image-and-article"
                    : "article",

                isPublished:
                  form.isPublished,
              }),
            }
          );

        const text =
          await response.text();

        let result;

        try {
          result =
            JSON.parse(text);
        } catch {
          throw new Error(
            "Backend returned HTML instead of JSON. Check the Exam Articles route."
          );
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to create article"
          );
        }

        alert(
          "Article created successfully"
        );

        router.push(
          `/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles`
        );

        router.refresh();

      } catch (error) {
        console.error(
          "Create Article Error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to create article"
        );

      } finally {
        setSaving(false);
      }
    };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="mx-auto max-w-5xl px-6 py-10">

          <Link
            href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles`}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Back to Articles

          </Link>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

              <FileText
                size={31}
              />

            </div>

            <div>

              <h1 className="text-4xl font-black">

                Add Article

              </h1>

              <p className="mt-2 text-indigo-100">

                Create a new article and upload an image directly.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-10">

        <form
          onSubmit={
            handleSubmit
          }
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >

          <div className="space-y-6">

            {/* TITLE */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Article Title

              </label>

              <input
                type="text"
                value={
                  form.title
                }
                onChange={(e) =>
                  handleTitleChange(
                    e.target.value
                  )
                }
                placeholder="SSC CGL Exam Pattern"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

            {/* SLUG */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Article Slug

              </label>

              <input
                type="text"
                value={
                  form.slug
                }
                onChange={(e) =>
                  setForm({
                    ...form,

                    slug:
                      e.target.value,
                  })
                }
                placeholder="ssc-cgl-exam-pattern"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Short Description

              </label>

              <textarea
                rows={3}
                value={
                  form.description
                }
                onChange={(e) =>
                  setForm({
                    ...form,

                    description:
                      e.target.value,
                  })
                }
                placeholder="Write a short article description..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

            {/* ARTICLE CONTENT */}

            <div>

              <div className="mb-2">

                <label className="block font-bold text-slate-700">

                  Article Content

                </label>

                <p className="mt-1 text-sm text-slate-500">

                  Write content with headings, paragraphs, lists and line breaks.
                  The same line formatting will be shown on the frontend.

                </p>

              </div>

              <textarea
                rows={18}
                value={
                  form.content
                }
                onChange={(e) =>
                  setForm({
                    ...form,

                    content:
                      e.target.value,
                  })
                }
                placeholder={`SSC CGL Exam Pattern

Tier 1 Exam

The Tier 1 examination consists of:

1. General Intelligence
2. General Awareness
3. Quantitative Aptitude
4. English Comprehension

Important Notes

• The exam is conducted online.
• Each question carries 2 marks.`}
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

            {/* DIRECT IMAGE UPLOAD */}

            <div>

              <label className="mb-2 flex items-center gap-2 font-bold text-slate-700">

                <ImagePlus
                  size={18}
                />

                Article Image

              </label>

              <p className="mb-4 text-sm text-slate-500">

                Upload JPG, JPEG, PNG or WEBP image. Maximum size: 5 MB.

              </p>

              {!imagePreview ? (

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-6 py-10 transition hover:border-indigo-400 hover:bg-indigo-50">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">

                    <Upload
                      size={25}
                    />

                  </div>

                  <span className="mt-4 font-bold text-slate-800">

                    Click to upload image

                  </span>

                  <span className="mt-1 text-sm text-slate-500">

                    JPG, PNG or WEBP up to 5 MB

                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

              ) : (

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                  <img
                    src={
                      imagePreview
                    }
                    alt="Article preview"
                    className="max-h-[400px] w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={
                      removeImage
                    }
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                    title="Remove image"
                  >

                    <X size={19} />

                  </button>

                  <div className="border-t border-slate-200 bg-white px-4 py-3">

                    <p className="truncate text-sm font-semibold text-slate-700">

                      {imageFile?.name}

                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* PUBLISH */}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

              <input
                type="checkbox"
                checked={
                  form.isPublished
                }
                onChange={(e) =>
                  setForm({
                    ...form,

                    isPublished:
                      e.target.checked,
                  })
                }
                className="h-5 w-5 accent-indigo-600"
              />

              <span className="font-semibold text-slate-700">

                Publish article immediately

              </span>

            </label>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">

              <Link
                href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles`}
                className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >

                Cancel

              </Link>

              <button
                type="submit"
                disabled={
                  saving
                }
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {saving && (

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                )}

                <Save size={18} />

                {saving
                  ? "Creating..."
                  : "Create Article"}

              </button>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}