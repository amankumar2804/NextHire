"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  FileUp,
  Loader2,
  Upload,
} from "lucide-react";

const API_URL = "http://localhost:5000";


type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function NewCoreSubjectResourcePage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =================================
  // FETCH CATEGORIES
  // =================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/core-subject-categories`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch categories"
          );
        }

        setCategories(
          data.categories || []
        );

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  // =================================
  // HANDLE FILE
  // =================================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {
      setError(
        "Only PDF, JPG, JPEG and PNG files are allowed."
      );

      setFile(null);

      return;
    }

    if (
      selectedFile.size >
      20 * 1024 * 1024
    ) {
      setError(
        "File size must be less than 20 MB."
      );

      setFile(null);

      return;
    }

    setError("");

    setFile(selectedFile);
  };


  // =================================
  // SUBMIT
  // =================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      if (!title.trim()) {
        throw new Error(
          "Resource title is required."
        );
      }

      if (!category) {
        throw new Error(
          "Please select a category."
        );
      }

      if (!file) {
        throw new Error(
          "Please select a PDF or image file."
        );
      }

      const formData =
        new FormData();

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
        "file",
        file
      );

      const response = await fetch(
        `${API_URL}/api/core-subject-resources/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload resource"
        );
      }

      setSuccess(
        "Core subject resource uploaded successfully!"
      );

      setTitle("");
      setDescription("");
      setCategory("");
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
          : "Failed to upload resource"
      );
    } finally {
      setUploading(false);
    }
  };


  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================
          HEADER
      ================================= */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/core-subjects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Core Subject Admin
          </Link>

          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <FileUp
                size={32}
                className="text-indigo-300"
              />
            </div>

            <div>

              <p className="font-bold uppercase tracking-widest text-indigo-300">
                Admin Panel
              </p>

              <h1 className="mt-1 text-4xl font-black md:text-5xl">
                Add Core Subject Resource
              </h1>

            </div>

          </div>

          <p className="mt-5 text-indigo-100">
            Upload PDFs and images for core subject preparation.
          </p>

        </div>

      </section>


      {/* =================================
          FORM
      ================================= */}

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


          {/* TITLE */}

          <div>

            <label className="text-sm font-bold text-slate-700">
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
              placeholder="Example: Computer Networks Complete Notes"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />

          </div>


          {/* CATEGORY */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">
              Select Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            >

              <option value="">
                {loading
                  ? "Loading categories..."
                  : "Select a category"}
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
              placeholder="Write a short description about this resource..."
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>


          {/* FILE */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">
              Upload Resource
            </label>

            <label
              htmlFor="resource-file"
              className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-10 text-center transition hover:bg-indigo-100"
            >

              <Upload
                size={40}
                className="text-indigo-600"
              />

              <p className="mt-4 font-bold text-slate-800">
                Click to upload PDF or Image
              </p>

              <p className="mt-2 text-sm text-slate-500">
                PDF, JPG, JPEG and PNG • Maximum 20 MB
              </p>

              {file && (

                <p className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
                  Selected: {file.name}
                </p>

              )}

            </label>

            <input
              id="resource-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {uploading ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Uploading...

                </>

              ) : (

                <>
                  <Upload size={20} />
                  Upload Resource
                </>

              )}

            </button>


            <Link
              href="/admin/core-subjects"
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
