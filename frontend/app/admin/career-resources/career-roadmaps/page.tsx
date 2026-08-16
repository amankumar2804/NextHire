"use client";

import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  Loader2,
  Plus,
  Trash2,
  FolderOpen,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
};

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function RoadmapCategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📁");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/roadmap-categories`);
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Categories API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch categories");
      }

      setCategories(data.categories || []);
    } catch (error) {
      console.error("Fetch Roadmap Categories Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Category name is required");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/api/roadmap-categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: (slug.trim() || createSlug(name)).toLowerCase(),
          description: description.trim(),
          icon: icon || "📁",
        }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Create category API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      setName("");
      setSlug("");
      setDescription("");
      setIcon("📁");
      setShowForm(false);

      fetchCategories();
    } catch (error) {
      console.error("Create Roadmap Category Error:", error);
      setFormError(
        error instanceof Error ? error.message : "Failed to create category"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string, categoryName: string) => {
    const confirmed = window.confirm(
      `Delete "${categoryName}"? Files inside it will remain in the database but become inaccessible from here.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(categoryId);

      const response = await fetch(
        `${API_URL}/api/roadmap-categories/${categoryId}`,
        { method: "DELETE" }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Delete API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete category");
      }

      setCategories((previous) =>
        previous.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Delete Roadmap Category Error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete category");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-purple-600" />
          <p className="mt-4 font-semibold text-slate-600">
            Loading categories...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/admin/career-resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Resources
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <TrendingUp size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                Career Roadmaps
              </h1>
              <p className="mt-3 text-purple-100">
                Manage roadmap categories and their downloadable resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
              {categories.length}{" "}
              {categories.length === 1 ? "Category" : "Categories"}
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              All Categories
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 font-bold text-white transition hover:bg-purple-700"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cancel" : "Add Category"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreate}
            className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            {formError && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {formError}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setSlug(createSlug(event.target.value));
                  }}
                  placeholder="Example: Data Science"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(createSlug(event.target.value))
                  }
                  placeholder="data-science"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  value={icon}
                  onChange={(event) => setIcon(event.target.value)}
                  placeholder="📁"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Roadmaps and resources for..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Plus size={18} />
              )}
              {submitting ? "Creating..." : "Create Category"}
            </button>
          </form>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-100">
              <FolderOpen size={38} className="text-purple-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No categories yet
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first roadmap category to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                  {category.icon || "📁"}
                </div>

                <h3 className="mt-4 font-black text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  /{category.slug}
                </p>

                {category.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {category.description}
                  </p>
                )}

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/admin/career-resources/career-roadmaps/${category._id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700"
                  >
                    Manage Files
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(category._id, category.name)}
                    disabled={deletingId === category._id}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === category._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
