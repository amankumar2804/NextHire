"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FolderOpen,
  Loader2,
  Upload,
  Trash2,
  Eye,
  Download,
  FileText,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
};

type RoadmapFile = {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: string;
};

export default function ManageRoadmapFilesPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [files, setFiles] = useState<RoadmapFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [categoriesResponse, filesResponse] = await Promise.all([
        fetch(`${API_URL}/api/roadmap-categories`),
        fetch(`${API_URL}/api/roadmap-files/category/${categoryId}`),
      ]);

      const categoriesText = await categoriesResponse.text();
      const filesText = await filesResponse.text();

      let categoriesData;
      let filesData;

      try {
        categoriesData = JSON.parse(categoriesText);
      } catch {
        throw new Error("Categories API returned an invalid response");
      }

      try {
        filesData = JSON.parse(filesText);
      } catch {
        throw new Error("Files API returned an invalid response");
      }

      if (!filesResponse.ok) {
        throw new Error(filesData.message || "Failed to fetch files");
      }

      const matchedCategory = (categoriesData.categories || []).find(
        (item: Category) => item._id === categoryId
      );

      setCategory(matchedCategory || null);
      setFiles(filesData.files || []);
    } catch (error) {
      console.error("Fetch Roadmap Files Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load files"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, JPEG and PNG files are allowed");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }

    if (!selectedFile) {
      setFormError("Please select a file");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", categoryId);
      formData.append("file", selectedFile);

      const response = await fetch(`${API_URL}/api/roadmap-files/upload`, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Upload API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload file");
      }

      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setShowForm(false);

      fetchData();
    } catch (error) {
      console.error("Upload Roadmap File Error:", error);
      setFormError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (fileId: string, fileTitle: string) => {
    const confirmed = window.confirm(`Delete "${fileTitle}"?`);
    if (!confirmed) return;

    try {
      setDeletingId(fileId);

      const response = await fetch(`${API_URL}/api/roadmap-files/${fileId}`, {
        method: "DELETE",
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Delete API returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete file");
      }

      setFiles((previous) => previous.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Delete Roadmap File Error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete file");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-purple-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading files...</p>
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
            href="/admin/career-resources/career-roadmaps"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Categories
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              {category?.icon || "📁"}
            </div>

            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                {category?.name || "Manage Files"}
              </h1>
              <p className="mt-3 text-purple-100">
                Upload and manage PDF, JPG and PNG roadmap files.
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
              {files.length} {files.length === 1 ? "File" : "Files"}
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              All Resources
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 font-bold text-white transition hover:bg-purple-700"
          >
            {showForm ? <X size={18} /> : <Upload size={18} />}
            {showForm ? "Cancel" : "Upload File"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleUpload}
            className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            {formError && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {formError}
              </div>
            )}

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: Complete Data Science Roadmap"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Short description..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  File <span className="text-red-500">*</span>
                </label>

                {selectedFile ? (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FileText size={16} className="text-purple-600" />
                      {selectedFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 transition hover:text-red-700"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-purple-400 hover:bg-purple-50">
                    <Upload size={26} className="text-purple-600" />
                    <span className="mt-2 text-sm font-bold text-slate-700">
                      Click to select a PDF, JPG or PNG
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
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
                <Upload size={18} />
              )}
              {submitting ? "Uploading..." : "Upload File"}
            </button>
          </form>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {files.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-100">
              <FolderOpen size={38} className="text-purple-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No files uploaded yet
            </h3>

            <p className="mt-2 text-slate-500">
              Upload your first resource for this category.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {files.map((file) => (
              <div
                key={file._id}
                className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                    <FileText size={20} className="text-purple-600" />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">{file.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {file.fileType} · {file.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-3">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <a
                    href={file.fileUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700"
                  >
                    <Download size={16} />
                    Download
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDelete(file._id, file.title)}
                    disabled={deletingId === file._id}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === file._id ? (
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
