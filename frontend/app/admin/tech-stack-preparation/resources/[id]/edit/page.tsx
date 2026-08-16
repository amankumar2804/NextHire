"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type ResourceType =
  | "PDF"
  | "JPG"
  | "JPEG"
  | "PNG"
  | "ARTICLE";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Resource = {
  _id: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  article?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
};

export default function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [categories, setCategories] = useState<Category[]>([]);
  const [resource, setResource] = useState<Resource | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] =
    useState<ResourceType>("ARTICLE");

  const [categoryId, setCategoryId] = useState("");
  const [article, setArticle] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // FETCH RESOURCE + CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [resourceResponse, categoriesResponse] =
          await Promise.all([
            fetch(
              `${API_URL}/api/tech-stack-resources/single/${id}`
            ),
            fetch(
              `${API_URL}/api/tech-stack-categories`
            ),
          ]);

        // Safely parse JSON
        const resourceText =
          await resourceResponse.text();

        const categoriesText =
          await categoriesResponse.text();

        let resourceData: any = {};
        let categoriesData: any = {};

        try {
          resourceData = resourceText
            ? JSON.parse(resourceText)
            : {};
        } catch {
          throw new Error(
            "Resource API did not return valid JSON."
          );
        }

        try {
          categoriesData = categoriesText
            ? JSON.parse(categoriesText)
            : {};
        } catch {
          throw new Error(
            "Categories API did not return valid JSON."
          );
        }

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

        const currentResource =
          resourceData.resource;

        if (!currentResource) {
          throw new Error(
            "Resource not found"
          );
        }

        setResource(currentResource);

        setTitle(
          currentResource.title || ""
        );

        setDescription(
          currentResource.description || ""
        );

        setResourceType(
          currentResource.resourceType || "ARTICLE"
        );

        setArticle(
          currentResource.article || ""
        );

        setCategoryId(
          currentResource.category?._id || ""
        );

        setCategories(
          categoriesData.categories || []
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

    fetchData();
  }, [id]);

  // =====================================================
  // SUBMIT UPDATE
  // =====================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!title.trim()) {
        throw new Error(
          "Resource title is required"
        );
      }

      if (!categoryId) {
        throw new Error(
          "Please select a category"
        );
      }

      if (
        resourceType === "ARTICLE" &&
        !article.trim()
      ) {
        throw new Error(
          "Please write article content"
        );
      }

      const formData = new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "resourceType",
        resourceType
      );

      formData.append(
        "category",
        categoryId
      );

      // ARTICLE
      if (resourceType === "ARTICLE") {
        formData.append(
          "article",
          article
        );
      }

      // NEW FILE
      if (file) {
        formData.append(
          "file",
          file
        );
      }

      const response = await fetch(
        `${API_URL}/api/tech-stack-resources/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      // Read response as text first
      const responseText =
        await response.text();

      let data: any = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        throw new Error(
          `Server returned an invalid response. Status: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update resource"
        );
      }

      setSuccess(
        "Resource updated successfully!"
      );

      if (data.resource) {
        setResource(
          data.resource
        );
      }

      setFile(null);

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update resource"
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            size={45}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">
            Loading resource...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !resource) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
          <h1 className="text-2xl font-black text-red-800">
            Resource Not Found
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

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/tech-stack-preparation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Tech Stack Admin
          </Link>

          <h1 className="mt-8 text-4xl font-black md:text-5xl">
            Edit Resource
          </h1>

          <p className="mt-3 text-indigo-100">
            Update article, PDF or image resource.
          </p>

        </div>

      </section>

      {/* =====================================================
          FORM
      ===================================================== */}

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

          {/* =====================================================
              TITLE
          ===================================================== */}

          <div>

            <label className="text-sm font-bold text-slate-700">
              Resource Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter resource title"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />

          </div>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Enter resource description"
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* =====================================================
              CATEGORY + TYPE
          ===================================================== */}

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* CATEGORY */}

            <div>

              <label className="text-sm font-bold text-slate-700">
                Category
              </label>

              <select
                value={categoryId}
                onChange={(event) =>
                  setCategoryId(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              >

                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* RESOURCE TYPE */}

            <div>

              <label className="text-sm font-bold text-slate-700">
                Resource Type
              </label>

              <select
                value={resourceType}
                onChange={(event) => {

                  setResourceType(
                    event.target.value as ResourceType
                  );

                  setFile(null);

                }}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              >

                <option value="ARTICLE">
                  Article
                </option>

                <option value="PDF">
                  PDF
                </option>

                <option value="JPG">
                  Image JPG
                </option>

                <option value="JPEG">
                  Image JPEG
                </option>

                <option value="PNG">
                  Image PNG
                </option>

              </select>

            </div>

          </div>

          {/* =====================================================
              ARTICLE EDITOR
          ===================================================== */}

          {resourceType === "ARTICLE" && (

            <div className="mt-6">

              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <FileText size={17} />
                Article Content
              </label>

              <textarea
                value={article}
                onChange={(event) =>
                  setArticle(
                    event.target.value
                  )
                }
                placeholder="Write your article here..."
                rows={18}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <p className="mt-2 text-sm text-slate-500">
                You can write HTML content here.
              </p>

            </div>

          )}

          {/* =====================================================
              FILE UPLOAD
          ===================================================== */}

          {resourceType !== "ARTICLE" && (

            <div className="mt-6">

              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">

                {resourceType === "PDF" ? (
                  <FileText size={17} />
                ) : (
                  <ImageIcon size={17} />
                )}

                Upload New{" "}
                {resourceType === "PDF"
                  ? "PDF"
                  : "Image"}

              </label>

              <div className="mt-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                <Upload
                  size={35}
                  className="mx-auto text-indigo-500"
                />

                <p className="mt-3 font-semibold text-slate-700">

                  {file
                    ? file.name
                    : "Choose a new file"}

                </p>

                <input
                  type="file"
                  onChange={(event) =>
                    setFile(
                      event.target.files?.[0] ||
                        null
                    )
                  }
                  className="mx-auto mt-4 block max-w-full text-sm"
                  accept={
                    resourceType === "PDF"
                      ? "application/pdf"
                      : "image/*"
                  }
                />

                {/* CURRENT FILE */}

                {resource?.fileName &&
                  !file && (

                    <p className="mt-3 text-sm text-slate-500">

                      Current file:{" "}

                      <span className="font-semibold">
                        {resource.fileName}
                      </span>

                    </p>

                  )}

                <p className="mt-2 text-xs text-slate-500">
                  Leave empty to keep the current file.
                </p>

              </div>

            </div>

          )}

          {/* =====================================================
              SAVE
          ===================================================== */}

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