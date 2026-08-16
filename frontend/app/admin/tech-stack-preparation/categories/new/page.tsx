"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Plus,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function NewTechStackCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const handleNameChange = (
    value: string
  ) => {
    setName(value);

    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  };


  const handleImageChange = (
    file: File | null
  ) => {
    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };


  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");


    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append(
        "description",
        description
      );


      if (image) {
        formData.append("image", image);
      }


      const response = await fetch(
        `${API_URL}/api/tech-stack-categories`,
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
            "Failed to create category"
        );
      }


      setMessage(
        "Tech stack category created successfully!"
      );


      setName("");
      setSlug("");
      setDescription("");
      setImage(null);
      setPreview("");


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


      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/tech-stack-preparation"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />

            Back to Tech Stack Preparation
          </Link>


          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

              <Sparkles
                size={32}
                className="text-indigo-300"
              />

            </div>


            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">

                Admin Panel

              </p>


              <h1 className="mt-2 text-4xl font-black md:text-5xl">

                Add Tech Stack Category

              </h1>

            </div>

          </div>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
        >


          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Category Name

            </label>


            <input
              type="text"
              value={name}
              onChange={(e) =>
                handleNameChange(
                  e.target.value
                )
              }
              placeholder="e.g. Java"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* SLUG */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Slug

            </label>


            <input
              type="text"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              placeholder="java"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />


            <p className="mt-2 text-sm text-slate-500">

              URL: /tech-stack/{slug || "java"}

            </p>

          </div>


          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Description

            </label>


            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Complete Java programming and interview preparation resources."
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* IMAGE */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">

              Category Banner Image

            </label>


            <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 transition hover:bg-indigo-100">

              {preview ? (

                <img
                  src={preview}
                  alt="Preview"
                  className="h-64 w-full object-cover"
                />

              ) : (

                <div className="text-center">

                  <ImagePlus
                    size={42}
                    className="mx-auto text-indigo-500"
                  />

                  <p className="mt-3 font-bold text-slate-700">

                    Upload Category Image

                  </p>

                  <p className="mt-1 text-sm text-slate-500">

                    JPG, PNG or WEBP • Max 10MB

                  </p>

                </div>

              )}


              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />

            </label>

          </div>


          {/* MESSAGES */}

          {error && (

            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">

              {error}

            </div>

          )}


          {message && (

            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 font-semibold text-green-700">

              {message}

            </div>

          )}


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-7 py-4 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (

              <>

                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Creating...

              </>

            ) : (

              <>

                <Plus size={20} />

                Create Category

              </>

            )}

          </button>

        </form>

      </section>

    </main>
  );
}