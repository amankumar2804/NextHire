"use client";

import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isPublished: boolean;
};

export default function EditCoreSubjectCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.id as string;

  const [category, setCategory] =
    useState<Category | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH CATEGORY
  // ==========================================

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/core-subject-categories/id/${categoryId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch category"
          );
        }

        const fetchedCategory =
          data.category;

        setCategory(fetchedCategory);

        setName(
          fetchedCategory.name || ""
        );

        setSlug(
          fetchedCategory.slug || ""
        );

        setDescription(
          fetchedCategory.description || ""
        );

        setIsPublished(
          fetchedCategory.isPublished
        );

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch category"
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  // ==========================================
  // UPDATE CATEGORY
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append(
        "description",
        description
      );

      formData.append(
        "isPublished",
        String(isPublished)
      );

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `${API_URL}/api/core-subject-categories/${categoryId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update category"
        );
      }

      alert(
        "Core subject category updated successfully"
      );

      router.push(
        "/admin/core-subjects"
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update category"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-bold text-slate-600">
          Loading category...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-purple-950 to-fuchsia-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-4xl">

          <Link
            href="/admin/core-subjects"
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Core Subjects
          </Link>

          <h1 className="mt-8 text-4xl font-black">
            Edit Subject Category
          </h1>

          <p className="mt-3 text-purple-100">
            Update subject category details and image.
          </p>

        </div>

      </section>

      {/* FORM */}

      <section className="mx-auto max-w-4xl px-6 py-12">

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
        >

          {/* NAME */}

          <div>
            <label className="font-bold text-slate-800">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* SLUG */}

          <div className="mt-6">

            <label className="font-bold text-slate-800">
              Slug
            </label>

            <input
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(event.target.value)
              }
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500"
            />

            <p className="mt-2 text-sm text-slate-500">
              Example: computer-networks
            </p>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="font-bold text-slate-800">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              rows={5}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>

          {/* CURRENT IMAGE */}

          {category?.imageUrl && (

            <div className="mt-6">

              <p className="font-bold text-slate-800">
                Current Image
              </p>

              <img
                src={category.imageUrl}
                alt={category.name}
                className="mt-3 h-48 w-full rounded-2xl object-cover"
              />

            </div>

          )}

          {/* NEW IMAGE */}

          <div className="mt-6">

            <label className="font-bold text-slate-800">
              Replace Image
            </label>

            <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 p-5 transition hover:border-purple-500">

              <Upload
                size={22}
                className="text-purple-600"
              />

              <span className="text-sm font-semibold text-slate-600">
                {image
                  ? image.name
                  : "Choose a new image"}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setImage(
                    event.target.files?.[0] ||
                      null
                  )
                }
                className="hidden"
              />

            </label>

          </div>

          {/* PUBLISHED */}

          <label className="mt-6 flex items-center gap-3">

            <input
              type="checkbox"
              checked={isPublished}
              onChange={(event) =>
                setIsPublished(
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />

            <span className="font-semibold text-slate-700">
              Published
            </span>

          </label>

          {/* UPDATE BUTTON */}

          <button
            type="submit"
            disabled={saving}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Save size={19} />

            {saving
              ? "Updating..."
              : "Update Category"}

          </button>

        </form>

      </section>

    </main>
  );
}