"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FilePlus2,
  FileText,
  Image as ImageIcon,
  Loader2,
  Upload,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function NewTechStackResourcePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [article, setArticle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ===============================
  // FETCH CATEGORIES
  // ===============================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/tech-stack-categories`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch categories"
          );
        }

        setCategories(data.categories || []);

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load categories"
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ===============================
  // FILE SELECT
  // ===============================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      if (!title.trim()) {
        throw new Error("Title is required");
      }

      if (!category) {
        throw new Error("Please select a category");
      }

      if (!resourceType) {
        throw new Error("Please select a resource type");
      }

      if (resourceType === "ARTICLE" && !article.trim()) {
        throw new Error("Article content is required");
      }

      if (
        resourceType !== "ARTICLE" &&
        !file
      ) {
        throw new Error("Please select a file");
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
        "category",
        category
      );

      formData.append(
        "resourceType",
        resourceType
      );

      if (resourceType === "ARTICLE") {
        formData.append(
          "article",
          article
        );
      }

      if (
        resourceType !== "ARTICLE" &&
        file
      ) {
        formData.append(
          "file",
          file
        );
      }

      const response = await fetch(
        `${API_URL}/api/tech-stack-resources/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create resource"
        );
      }

      setSuccess(
        "Tech stack resource created successfully!"
      );

      setTitle("");
      setDescription("");
      setCategory("");
      setResourceType("PDF");
      setArticle("");
      setFile(null);

      const fileInput =
        document.getElementById(
          "resource-file"
        ) as HTMLInputElement;

      if (fileInput) {
        fileInput.value = "";
      }

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =============================== */}
      {/* HEADER */}
      {/* =============================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-12 text-white">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">

          <Link
            href="/admin/tech-stack-preparation"
            className="inline-flex items-center gap-2 text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />

            Back to Tech Stack Preparation
          </Link>

          <div className="mt-10 flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

              <FilePlus2
                size={32}
                className="text-indigo-200"
              />

            </div>

            <div>

              <p className="font-bold uppercase tracking-widest text-indigo-300">
                Admin Panel
              </p>

              <h1 className="mt-2 text-4xl font-black md:text-5xl">
                Add New Tech Stack Resource
              </h1>

            </div>

          </div>

        </div>

      </section>


      {/* =============================== */}
      {/* FORM */}
      {/* =============================== */}

      <section className="mx-auto max-w-4xl px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10"
        >

          {/* SUCCESS */}

          {success && (

            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">

              <CheckCircle2 size={21} />

              <p className="font-semibold">
                {success}
              </p>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

              <AlertCircle size={21} />

              <p className="font-semibold">
                {error}
              </p>

            </div>

          )}


          {/* TITLE */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Resource Title
              <span className="text-red-500">
                {" "}*
              </span>

            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Java OOPs Complete Notes"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Description

            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Short description about this resource..."
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* CATEGORY */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Tech Stack Category
              <span className="text-red-500">
                {" "}*
              </span>

            </label>

            {loadingCategories ? (

              <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3.5 text-slate-500">

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Loading categories...

              </div>

            ) : (

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                required
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

            )}

          </div>


          {/* RESOURCE TYPE */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Resource Type
              <span className="text-red-500">
                {" "}*
              </span>

            </label>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">

              {[
                {
                  value: "PDF",
                  label: "PDF",
                  icon: FileText,
                },
                {
                  value: "JPG",
                  label: "JPG",
                  icon: ImageIcon,
                },
                {
                  value: "JPEG",
                  label: "JPEG",
                  icon: ImageIcon,
                },
                {
                  value: "PNG",
                  label: "PNG",
                  icon: ImageIcon,
                },
                {
                  value: "ARTICLE",
                  label: "Article",
                  icon: FileText,
                },
              ].map(
                (item) => {

                  const Icon = item.icon;

                  const isSelected =
                    resourceType ===
                    item.value;

                  return (

                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setResourceType(
                          item.value
                        )
                      }
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-bold transition ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400"
                      }`}
                    >

                      <Icon size={18} />

                      {item.label}

                    </button>

                  );

                }
              )}

            </div>

          </div>


          {/* ARTICLE */}

          {resourceType === "ARTICLE" && (

            <div className="mt-6">

              <label className="mb-2 block text-sm font-bold text-slate-700">

                Article Content
                <span className="text-red-500">
                  {" "}*
                </span>

              </label>

              <textarea
                value={article}
                onChange={(event) =>
                  setArticle(
                    event.target.value
                  )
                }
                placeholder="Write your complete article here..."
                rows={14}
                className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3.5 leading-7 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          )}


          {/* FILE UPLOAD */}

          {resourceType !== "ARTICLE" && (

            <div className="mt-6">

              <label className="mb-2 block text-sm font-bold text-slate-700">

                Upload Resource File
                <span className="text-red-500">
                  {" "}*
                </span>

              </label>

              <label
                htmlFor="resource-file"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
              >

                <Upload
                  size={34}
                  className="text-indigo-600"
                />

                <p className="mt-4 font-bold text-slate-800">

                  {file
                    ? file.name
                    : "Click to upload a file"}

                </p>

                <p className="mt-2 text-sm text-slate-500">

                  PDF, JPG, JPEG or PNG • Maximum 20 MB

                </p>

                <input
                  id="resource-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            </div>

          )}


          {/* BUTTONS */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              type="submit"
              disabled={loading || loadingCategories}
              className="inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Creating Resource...

                </>

              ) : (

                <>
                  <FilePlus2 size={20} />

                  Add Resource

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