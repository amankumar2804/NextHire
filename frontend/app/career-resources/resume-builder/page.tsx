"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileEdit,
  Loader2,
  Plus,
  Trash2,
  Pencil,
  Clock,
  Layers,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { resumeFetch, API_URL } from "@/lib/resumeAuth";

type Resume = {
  _id: string;
  title: string;
  updatedAt: string;
  personalInfo?: {
    fullName?: string;
  };
};

type Template = {
  _id: string;
  name: string;
  description: string;
  thumbnailImage: string;
  gradient: string;
};

const getFullImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ResumeDashboardPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [creatingTemplateId, setCreatingTemplateId] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [resumesData, templatesResponse] = await Promise.all([
          resumeFetch("/api/resumes"),
          fetch(`${API_URL}/api/resume-templates`).then((res) => res.json()),
        ]);

        setResumes(resumesData.resumes || []);
        setTemplates(templatesResponse.templates || []);
      } catch (error) {
        console.error("Fetch Dashboard Data Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load resumes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createResume = async (templateId?: string, title?: string) => {
    try {
      const data = await resumeFetch("/api/resumes", {
        method: "POST",
        body: JSON.stringify({
          title: title || "Untitled Resume",
          template: templateId || null,
        }),
      });

      router.push(`/career-resources/resume-builder/${data.resume._id}`);
    } catch (error) {
      console.error("Create Resume Error:", error);
      alert(error instanceof Error ? error.message : "Failed to create resume");
    }
  };

  const handleCreateBlank = async () => {
    setCreating(true);
    await createResume();
    setCreating(false);
  };

  const handleUseTemplate = async (template: Template) => {
    setCreatingTemplateId(template._id);
    await createResume(template._id, template.name);
    setCreatingTemplateId("");
  };

  const handleDelete = async (resumeId: string, title: string) => {
    const confirmed = window.confirm(
      `Delete "${title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(resumeId);
      await resumeFetch(`/api/resumes/${resumeId}`, { method: "DELETE" });
      setResumes((previous) =>
        previous.filter((resume) => resume._id !== resumeId)
      );
    } catch (error) {
      console.error("Delete Resume Error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete resume");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">
            Loading your resumes...
          </p>
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
            href="/career-resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Resources
          </Link>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <FileEdit size={32} />
              </div>

              <div>
                <h1 className="text-4xl font-black md:text-5xl">
                  Resume Builder
                </h1>
                <p className="mt-3 text-indigo-100">
                  Create, edit and download your resumes.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateBlank}
              disabled={creating}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-black text-indigo-700 shadow-lg transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Plus size={20} />
              )}
              {creating ? "Creating..." : "Start From Blank"}
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="mx-auto mt-8 max-w-6xl px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        </div>
      )}

      {/* TEMPLATE GALLERY */}
      {templates.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Get Started Faster
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Choose a Template
          </h2>
          <p className="mt-2 text-slate-500">
            Pick a style to base your resume on — you can change it anytime.
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {template.thumbnailImage ? (
                  <div className="h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={getFullImageUrl(template.thumbnailImage)}
                      alt={template.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex h-40 w-full items-center justify-center bg-gradient-to-br ${template.gradient}`}
                  >
                    <Layers size={34} className="text-white/80" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-black text-slate-900">
                    {template.name}
                  </h3>

                  {template.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {template.description}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => handleUseTemplate(template)}
                    disabled={creatingTemplateId === template._id}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {creatingTemplateId === template._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Check size={16} />
                    )}
                    Use This Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* YOUR RESUMES */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
          Your Resumes
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">
          {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"}
        </h2>

        {resumes.length === 0 ? (
          <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100">
              <FileEdit size={38} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No resumes yet
            </h3>

            <p className="mt-2 text-slate-500">
              Pick a template above, or start from a blank resume.
            </p>

            <button
              type="button"
              onClick={handleCreateBlank}
              disabled={creating}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-black text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={20} />
              Start From Blank
            </button>
          </div>
        ) : (
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                  <FileEdit size={24} className="text-indigo-600" />
                </div>

                <h3 className="mt-5 truncate text-lg font-black text-slate-900">
                  {resume.title}
                </h3>

                {resume.personalInfo?.fullName && (
                  <p className="mt-1 truncate text-sm text-slate-500">
                    {resume.personalInfo.fullName}
                  </p>
                )}

                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock size={12} />
                  Updated {formatDate(resume.updatedAt)}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/career-resources/resume-builder/${resume._id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Pencil size={15} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(resume._id, resume.title)}
                    disabled={deletingId === resume._id}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === resume._id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
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
