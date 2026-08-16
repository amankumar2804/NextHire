"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Edit,
  Eye,
  FileText,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isPublished: boolean;
};

type Resource = {
  _id: string;
  title: string;
  description?: string;
  resourceType: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  article?: string;
  isPublished: boolean;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
};

export default function TechStackPreparationAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        categoriesResponse,
        resourcesResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/api/tech-stack-categories`),
        fetch(`${API_URL}/api/tech-stack-resources`),
      ]);

      const categoriesData =
        await categoriesResponse.json();

      const resourcesData =
        await resourcesResponse.json();

      if (!categoriesResponse.ok) {
        throw new Error(
          categoriesData.message ||
            "Failed to fetch categories"
        );
      }

      if (!resourcesResponse.ok) {
        throw new Error(
          resourcesData.message ||
            "Failed to fetch resources"
        );
      }

      setCategories(
        categoriesData.categories || []
      );

      setResources(
        resourcesData.resources || []
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

  useEffect(() => {
    fetchData();
  }, []);

  // ===============================
  // DELETE CATEGORY
  // ===============================

  const deleteCategory = async (
    id: string,
    name: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/tech-stack-categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete category"
        );
      }

      setCategories((previous) =>
        previous.filter(
          (category) =>
            category._id !== id
        )
      );

      alert(
        "Tech stack category deleted successfully"
      );

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete category"
      );
    }
  };

  // ===============================
  // DELETE RESOURCE
  // ===============================

  const deleteResource = async (
    id: string,
    title: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/tech-stack-resources/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete resource"
        );
      }

      setResources((previous) =>
        previous.filter(
          (resource) =>
            resource._id !== id
        )
      );

      alert(
        "Tech stack resource deleted successfully"
      );

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete resource"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-16 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="font-bold uppercase tracking-widest text-indigo-300">
                Admin Panel
              </p>

              <h1 className="mt-3 text-4xl font-black md:text-5xl">
                Tech Stack Preparation
              </h1>

              <p className="mt-4 max-w-2xl text-indigo-100">
                Manage technology categories and learning resources for NextHire.
              </p>

            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20"
            >
              Admin Dashboard
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        {error && (

          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 font-semibold text-red-700">
            {error}
          </div>

        )}

        {/* STATS */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Total Categories
                </p>

                <p className="mt-3 text-4xl font-black text-slate-900">
                  {loading
                    ? "..."
                    : categories.length}
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <FolderOpen size={28} />
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Total Resources
                </p>

                <p className="mt-3 text-4xl font-black text-slate-900">
                  {loading
                    ? "..."
                    : resources.length}
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <BookOpen size={28} />
              </div>

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <Link
            href="/admin/tech-stack-preparation/categories/new"
            className="group flex items-center justify-between rounded-3xl bg-indigo-600 p-7 text-white shadow-lg transition hover:-translate-y-1 hover:bg-indigo-700"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Plus size={28} />
              </div>

              <div>

                <h2 className="text-xl font-black">
                  Add New Category
                </h2>

                <p className="mt-1 text-sm text-indigo-100">
                  Add Java, React, Python, Node.js, etc.
                </p>

              </div>

            </div>

            <ArrowRight
              size={24}
              className="transition group-hover:translate-x-1"
            />

          </Link>

          <Link
            href="/admin/tech-stack-preparation/resources/new"
            className="group flex items-center justify-between rounded-3xl bg-purple-600 p-7 text-white shadow-lg transition hover:-translate-y-1 hover:bg-purple-700"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Plus size={28} />
              </div>

              <div>

                <h2 className="text-xl font-black">
                  Add New Resource
                </h2>

                <p className="mt-1 text-sm text-purple-100">
                  Upload PDF, images or create articles.
                </p>

              </div>

            </div>

            <ArrowRight
              size={24}
              className="transition group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* CATEGORIES */}

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                Manage
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                Tech Stack Categories
              </h2>

            </div>

            <FolderOpen
              size={28}
              className="text-indigo-500"
            />

          </div>

          <div className="mt-6 space-y-4">

            {categories.length === 0 &&
              !loading && (

                <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
                  No categories found.
                </div>

              )}

            {categories.map((category) => (

              <div
                key={category._id}
                className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 p-5 md:flex-row md:items-center"
              >

                <div className="min-w-0">

                  <h3 className="text-lg font-black text-slate-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-indigo-600">
                    /{category.slug}
                  </p>

                  {category.description && (

                    <p className="mt-2 text-sm text-slate-500">
                      {category.description}
                    </p>

                  )}

                </div>

                <div className="flex flex-wrap gap-2">

                  <Link
                    href={`/career-resources/interview-preparation/tech-stack/${category.slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 font-bold text-blue-600 transition hover:bg-blue-100"
                  >
                    <Eye size={17} />
                    View
                  </Link>

                  <Link
                    href={`/admin/tech-stack-preparation/categories/${category._id}/edit`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 font-bold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Edit size={17} />
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteCategory(
                        category._id,
                        category.name
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* RESOURCES */}

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
                Manage
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                Tech Stack Resources
              </h2>

            </div>

            <FileText
              size={28}
              className="text-purple-500"
            />

          </div>

          <div className="mt-6 space-y-4">

            {resources.length === 0 &&
              !loading && (

                <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
                  No resources found.
                </div>

              )}

            {resources.map((resource) => (

              <div
                key={resource._id}
                className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 p-5 md:flex-row md:items-center"
              >

                <div className="min-w-0">

                  <h3 className="truncate text-lg font-black text-slate-900">
                    {resource.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">

                    <span className="rounded-lg bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                      {resource.resourceType}
                    </span>

                    {resource.category && (

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {resource.category.name}
                      </span>

                    )}

                    {resource.fileSize && (

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {resource.fileSize}
                      </span>

                    )}

                  </div>

                  {resource.description && (

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {resource.description}
                    </p>

                  )}

                </div>

                {/* RESOURCE ACTIONS */}

                <div className="flex shrink-0 flex-wrap gap-2">

                  {resource.category?.slug && (

                    <Link
                      href={`/career-resources/interview-preparation/tech-stack/${resource.category.slug}/${resource._id}`}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 font-bold text-blue-600 transition hover:bg-blue-100"
                    >
                      <Eye size={17} />
                      View
                    </Link>

                  )}

                  <Link
                    href={`/admin/tech-stack-preparation/resources/${resource._id}/edit`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 font-bold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Edit size={17} />
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteResource(
                        resource._id,
                        resource.title
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </section>

    </main>
  );
}