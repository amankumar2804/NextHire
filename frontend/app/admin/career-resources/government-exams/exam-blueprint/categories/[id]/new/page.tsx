"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function AddExamPage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.id as string;

  const [category, setCategory] =
    useState<Category | null>(null);

  const [loadingCategory, setLoadingCategory] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
  });

  // ===============================
  // FETCH CATEGORY
  // ===============================

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoadingCategory(true);

        const response = await fetch(
          `${API_URL}/api/government-exam-categories`
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch categories"
          );
        }

        const foundCategory =
          result.categories?.find(
            (item: Category) =>
              item._id === categoryId
          );

        setCategory(
          foundCategory || null
        );
      } catch (error) {
        console.error(
          "Fetch Category Error:",
          error
        );
      } finally {
        setLoadingCategory(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  // ===============================
  // AUTO SLUG
  // ===============================

  const handleNameChange = (
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      name: value,

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
  // UPLOAD IMAGE
  // ===============================

  const uploadImage = async () => {
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

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Image upload failed"
      );
    }

    return result.imageUrl;
  };

  // ===============================
  // CREATE EXAM
  // ===============================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.slug.trim() ||
      !form.description.trim()
    ) {
      alert(
        "Exam name, slug and description are required"
      );

      return;
    }

    try {
      setSaving(true);

      // Upload image first
      const imageUrl =
        await uploadImage();

      const response =
        await fetch(
          `${API_URL}/api/exam-categories`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: form.name,
              slug: form.slug,
              description:
                form.description,
              image: imageUrl,
              isActive:
                form.isActive,
              governmentCategory: categoryId,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create exam"
        );
      }

      alert(
        "Exam added successfully 🎉"
      );

      router.push(
        `/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`
      );
    } catch (error) {
      console.error(
        "Create Exam Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to connect with backend"
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // LOADING
  // ===============================

  if (loadingCategory) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2
          size={40}
          className="animate-spin text-indigo-600"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-10">

          <Link
            href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to {category?.name || "Category"}
          </Link>

          <div className="mt-10">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

              <Sparkles size={16} />

              Add New Government Exam

            </div>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">

              Add Exam

            </h1>

            <p className="mt-4 text-lg text-indigo-100">

              Add an exam under{" "}

              <span className="font-bold text-white">

                {category?.name || "this category"}

              </span>

            </p>

          </div>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >

          {/* EXAM NAME */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Exam Name

            </label>

            <input
              value={form.name}
              onChange={(e) =>
                handleNameChange(
                  e.target.value
                )
              }
              placeholder="SSC CGL"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* SLUG */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Exam Slug

            </label>

            <input
              value={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
              placeholder="ssc-cgl"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-500">

              Example: ssc-cgl, ssc-chsl, ssc-mts

            </p>

          </div>


          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Description

            </label>

            <textarea
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
              rows={5}
              placeholder="Staff Selection Commission Combined Graduate Level Examination..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* IMAGE */}

          <div className="mt-6">

            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">

              <ImageIcon size={17} />

              Exam Image

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files?.[0] ||
                  null;

                setImageFile(file);
              }}
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-semibold file:text-white"
            />

            {imageFile && (

              <p className="mt-2 text-sm font-medium text-green-600">

                ✓ {imageFile.name}

              </p>

            )}

          </div>


          {/* ACTIVE */}

          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

            <input
              type="checkbox"
              checked={
                form.isActive
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive:
                    e.target.checked,
                })
              }
              className="h-5 w-5 accent-indigo-600"
            />

            <span className="text-sm font-semibold text-slate-700">

              Exam is active

            </span>

          </label>


          {/* ACTIONS */}

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">

            <Link
              href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
            >

              Cancel

            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (

                <Loader2
                  size={18}
                  className="animate-spin"
                />

              ) : (

                <Save size={18} />

              )}

              {saving
                ? "Saving..."
                : "Save Exam"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}
