"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  FolderOpen,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isPublished: boolean;
};

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [category, setCategory] =
    useState<Category | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ==================================================
  // FETCH CATEGORY BY ID
  // ==================================================

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/tech-stack-categories/id/${id}`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch category"
          );
        }

        const currentCategory =
          data.category;

        setCategory(currentCategory);

        setName(
          currentCategory.name || ""
        );

        setSlug(
          currentCategory.slug || ""
        );

        setDescription(
          currentCategory.description || ""
        );

        setIsPublished(
          currentCategory.isPublished ?? true
        );

      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchCategory();

  }, [id]);


  // ==================================================
  // SLUG GENERATOR
  // ==================================================

  const handleNameChange = (
    value: string
  ) => {
    setName(value);

    if (!slug) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };


  // ==================================================
  // UPDATE CATEGORY
  // ==================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!name.trim()) {
        throw new Error(
          "Category name is required"
        );
      }

      if (!slug.trim()) {
        throw new Error(
          "Category slug is required"
        );
      }

      const formData = new FormData();

      formData.append(
        "name",
        name.trim()
      );

      formData.append(
        "slug",
        slug.trim()
      );

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "isPublished",
        String(isPublished)
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      const response = await fetch(
        `${API_URL}/api/tech-stack-categories/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update category"
        );
      }

      setSuccess(
        "Category updated successfully!"
      );

      if (data.category) {
        setCategory(data.category);
      }

      setImage(null);

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update category"
      );

    } finally {
      setSaving(false);
    }
  };


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2
            size={45}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">
            Loading category...
          </p>

        </div>

      </main>
    );
  }


  // ==================================================
  // ERROR
  // ==================================================

  if (error && !category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <h1 className="text-2xl font-black text-red-800">
            Category Not Found
          </h1>

          <p className="mt-3 text-red-700">
            {error}
          </p>

          <Link
            href="/admin/tech-stack-preparation"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
          >
            <ArrowLeft size={18} />
            Back to Admin
          </Link>

        </div>

      </main>
    );
  }


  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <main className="min-h-screen bg-slate-50">


      {/* ==================================================
          HEADER
      ================================================== */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/tech-stack-preparation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Tech Stack Admin
          </Link>


          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

              <FolderOpen
                size={32}
                className="text-indigo-300"
              />

            </div>


            <div>

              <p className="font-bold uppercase tracking-widest text-indigo-300">
                Admin Panel
              </p>

              <h1 className="mt-1 text-4xl font-black md:text-5xl">
                Edit Category
              </h1>

            </div>

          </div>


          <p className="mt-5 text-indigo-100">
            Update your tech stack preparation category.
          </p>

        </div>

      </section>


      {/* ==================================================
          FORM
      ================================================== */}

      <section className="mx-auto max-w-5xl px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10"
        >


          {/* ERROR */}

          {error && (

            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 font-semibold text-green-700">
              {success}
            </div>

          )}


          {/* CATEGORY NAME */}

          <div>

            <label className="text-sm font-bold text-slate-700">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                handleNameChange(
                  event.target.value
                )
              }
              placeholder="Example: Java"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />

          </div>


          {/* SLUG */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">
              Slug
            </label>

            <input
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(
                  event.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(
                      /[^a-z0-9-]/g,
                      ""
                    )
                )
              }
              placeholder="Example: java"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />

            <p className="mt-2 text-sm text-slate-500">
              URL: /tech-stack/{slug}
            </p>

          </div>


          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Enter category description"
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>


          {/* CURRENT IMAGE */}

          {category?.imageUrl && (

            <div className="mt-6">

              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">

                <ImageIcon size={17} />

                Current Category Image

              </label>


              <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">

                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-40 w-full rounded-xl object-contain"
                />

              </div>

            </div>

          )}


          {/* UPLOAD NEW IMAGE */}

          <div className="mt-6">

            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">

              <Upload size={17} />

              Upload New Category Image

            </label>


            <div className="mt-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">

              <Upload
                size={36}
                className="mx-auto text-indigo-500"
              />


              <p className="mt-3 font-semibold text-slate-700">

                {image
                  ? image.name
                  : "Choose a new image"}

              </p>


              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(event) =>
                  setImage(
                    event.target.files?.[0] ||
                      null
                  )
                }
                className="mx-auto mt-4 block max-w-full text-sm"
              />


              <p className="mt-2 text-xs text-slate-500">
                Leave empty to keep the current image.
              </p>

            </div>

          </div>


          {/* PUBLISHED */}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                checked={isPublished}
                onChange={(event) =>
                  setIsPublished(
                    event.target.checked
                  )
                }
                className="h-5 w-5 rounded border-slate-300 text-indigo-600"
              />


              <div>

                <p className="font-bold text-slate-800">
                  Published
                </p>

                <p className="text-sm text-slate-500">
                  Published categories are visible to users.
                </p>

              </div>

            </label>

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              type="submit"
              disabled={saving}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (

                <>

                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Saving...

                </>

              ) : (

                <>

                  <Save size={20} />

                  Save Changes

                </>

              )}

            </button>


            <Link
              href="/admin/tech-stack-preparation"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

          </div>

        </form>

      </section>

    </main>
  );
}