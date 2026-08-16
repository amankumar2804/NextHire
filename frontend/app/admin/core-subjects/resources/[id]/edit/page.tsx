"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Resource = {
  _id: string;
  title: string;
  description?: string;
  resourceType: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  isPublished: boolean;
  category?: Category;
};

export default function EditCoreSubjectResourcePage() {
  const params = useParams();
  const router = useRouter();

  const resourceId = params.id as string;

  const [resource, setResource] =
    useState<Resource | null>(null);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // FETCH RESOURCE + CATEGORIES
  // ==========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          resourceResponse,
          categoriesResponse,
        ] = await Promise.all([
          fetch(
            `${API_URL}/api/core-subject-resources/id/${resourceId}`
          ),

          fetch(
            `${API_URL}/api/core-subject-categories`
          ),
        ]);

        const resourceData =
          await resourceResponse.json();

        const categoriesData =
          await categoriesResponse.json();

        if (!resourceResponse.ok) {
          throw new Error(
            resourceData.message ||
              "Failed to fetch resource"
          );
        }

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData.message ||
              "Failed to fetch categories"
          );
        }

        const fetchedResource =
          resourceData.resource;

        setResource(fetchedResource);

        setTitle(
          fetchedResource.title || ""
        );

        setDescription(
          fetchedResource.description || ""
        );

        setCategory(
          fetchedResource.category?._id || ""
        );

        setIsPublished(
          fetchedResource.isPublished
        );

        setCategories(
          categoriesData.categories || []
        );

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (resourceId) {
      fetchData();
    }
  }, [resourceId]);

  // ==========================================
  // UPDATE RESOURCE
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "isPublished",
        String(isPublished)
      );

      if (file) {
        formData.append(
          "file",
          file
        );
      }

      const response = await fetch(
        `${API_URL}/api/core-subject-resources/${resourceId}`,
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
            "Failed to update resource"
        );
      }

      alert(
        "Core subject resource updated successfully"
      );

      router.push(
        "/admin/core-subjects"
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update resource"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-bold text-slate-600">
          Loading resource...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ==========================================
          HEADER
      ========================================== */}

      <section className="bg-gradient-to-br from-slate-950 via-fuchsia-950 to-purple-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-4xl">

          <Link
            href="/admin/core-subjects"
            className="inline-flex items-center gap-2 text-sm font-bold text-fuchsia-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />

            Back to Core Subjects
          </Link>

          <h1 className="mt-8 text-4xl font-black">
            Edit Subject Resource
          </h1>

          <p className="mt-3 text-fuchsia-100">
            Update resource details, category and study file.
          </p>

        </div>

      </section>

      {/* ==========================================
          FORM
      ========================================== */}

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

          {/* TITLE */}

          <div>

            <label className="font-bold text-slate-800">
              Resource Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-fuchsia-500"
            />

          </div>

          {/* CATEGORY */}

          <div className="mt-6">

            <label className="font-bold text-slate-800">
              Subject Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
              required
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-fuchsia-500"
            >

              <option value="">
                Select a category
              </option>

              {categories.map(
                (item) => (

                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>

                )
              )}

            </select>

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
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-fuchsia-500"
            />

          </div>

          {/* CURRENT FILE */}

          {resource && (

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-600">

                  <FileText size={24} />

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-bold text-slate-500">
                    Current File
                  </p>

                  <p className="truncate font-bold text-slate-900">
                    {resource.fileName ||
                      "Current resource file"}
                  </p>

                </div>

              </div>

              {resource.fileUrl && (

                <a
                  href={resource.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex font-bold text-fuchsia-600 hover:underline"
                >
                  View Current File
                </a>

              )}

            </div>

          )}

          {/* NEW FILE */}

          <div className="mt-6">

            <label className="font-bold text-slate-800">
              Replace File
            </label>

            <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 p-5 transition hover:border-fuchsia-500">

              <Upload
                size={22}
                className="text-fuchsia-600"
              />

              <span className="text-sm font-semibold text-slate-600">

                {file
                  ? file.name
                  : "Choose a new PDF, JPG, PNG or JPEG file"}

              </span>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) =>
                  setFile(
                    event.target.files?.[0] ||
                      null
                  )
                }
                className="hidden"
              />

            </label>

            <p className="mt-2 text-sm text-slate-500">
              Leave empty if you do not want to replace the current file.
            </p>

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
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-fuchsia-600 px-6 py-3 font-bold text-white transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Save size={19} />

            {saving
              ? "Updating..."
              : "Update Resource"}

          </button>

        </form>

      </section>

    </main>
  );
}