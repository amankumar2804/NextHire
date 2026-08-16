"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Layers,
  Loader2,
  Pencil,
  Trash2,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

type Template = {
  _id: string;
  name: string;
  description: string;
  thumbnailImage: string;
  layoutKey: string;
  gradient: string;
  isActive: boolean;
};

export default function ResumeTemplatesListPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/resume-templates/admin/all`
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Templates API returned an invalid response");
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch templates");
        }

        setTemplates(data.templates || []);
      } catch (error) {
        console.error("Fetch Resume Templates Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load templates"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (templateId: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(templateId);

      const response = await fetch(
        `${API_URL}/api/resume-templates/${templateId}`,
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
        throw new Error(data.message || "Failed to delete template");
      }

      setTemplates((previous) =>
        previous.filter((template) => template._id !== templateId)
      );
    } catch (error) {
      console.error("Delete Resume Template Error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete template");
    } finally {
      setDeletingId("");
    }
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading templates...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/admin/career-resources/resume-builder"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Resume Builder
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Layers size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                Resume Templates
              </h1>
              <p className="mt-3 text-indigo-100">
                Manage the design themes users can choose from.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              {templates.length} {templates.length === 1 ? "Template" : "Templates"}
            </p>
            <h2 className="text-2xl font-black text-slate-900">All Templates</h2>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search templates..."
                className="rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <Link
              href="/admin/career-resources/resume-builder/templates/new"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Template
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {filteredTemplates.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <Layers size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No templates added yet
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first resume template.
            </p>

            <Link
              href="/admin/career-resources/resume-builder/templates/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-black text-white transition hover:bg-indigo-700"
            >
              <Plus size={20} />
              Add First Template
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                {template.thumbnailImage ? (
                  <div className="h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={getFullImageUrl(template.thumbnailImage)}
                      alt={template.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex h-40 w-full items-center justify-center bg-gradient-to-br ${template.gradient}`}
                  >
                    <Layers size={36} className="text-white/80" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900">
                      {template.name}
                    </h3>

                    {!template.isActive && (
                      <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">
                        Inactive
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Layout: {template.layoutKey}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {template.description}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/admin/career-resources/resume-builder/templates/edit/${template._id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(template._id, template.name)}
                      disabled={deletingId === template._id}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === template._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
