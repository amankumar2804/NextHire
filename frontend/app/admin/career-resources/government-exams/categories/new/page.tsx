"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  UploadCloud,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddGovernmentExamCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [isUploading, setIsUploading] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  };


  const generateSlug = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };


  const handleNameChange = (
    value: string
  ) => {
    setName(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  };


  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();

    formData.append(
      "image",
      imageFile
    );

    const response =
      await fetch(
        `${API_URL}/api/upload/image`,
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
          "Image upload failed"
      );
    }

    return (
      data.url ||
      data.imageUrl ||
      data.secure_url
    );
  };


  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    try {
      setError("");
      setIsSaving(true);

      let imageUrl = "";

      if (imageFile) {
        setIsUploading(true);

        imageUrl =
          await uploadImage();

        setIsUploading(false);
      }


      const response =
        await fetch(
          `${API_URL}/api/government-exam-categories`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              slug,
              description,
              image: imageUrl,
            }),
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


      router.push(
        "/admin/career-resources/government-exams/categories"
      );

      router.refresh();

    } catch (error) {

      setIsUploading(false);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    } finally {
      setIsSaving(false);
    }
  };


  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-6 py-10 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/career-resources/government-exams/categories"
            className="mb-6 inline-flex items-center gap-2 text-sm text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Categories
          </Link>

          <h1 className="text-3xl font-black md:text-4xl">
            Add Government Exam Category
          </h1>

          <p className="mt-3 text-indigo-100">
            Create a new category for government exam preparation.
          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-10">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}


          <div className="grid gap-6 md:grid-cols-2">

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Category Name *
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  handleNameChange(
                    event.target.value
                  )
                }
                placeholder="SSC Exams"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* SLUG */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Slug *
              </label>

              <input
                type="text"
                value={slug}
                onChange={(event) =>
                  setSlug(
                    generateSlug(
                      event.target.value
                    )
                  )
                }
                placeholder="ssc"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Description *
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="CGL, CHSL, MTS, CPO, GD and other SSC examinations"
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* IMAGE UPLOAD */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Category Image
            </label>

            <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50">

              {imagePreview ? (

                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 w-full rounded-xl object-cover"
                />

              ) : (

                <>

                  <ImagePlus
                    size={40}
                    className="text-indigo-500"
                  />

                  <p className="mt-3 font-bold text-slate-700">
                    Upload Category Image
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    PNG, JPG or WEBP
                  </p>

                </>

              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/career-resources/government-exams/categories"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={
                isSaving ||
                isUploading
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isSaving ? (

                <Loader2
                  size={18}
                  className="animate-spin"
                />

              ) : (

                <Save size={18} />

              )}

              {isUploading
                ? "Uploading Image..."
                : isSaving
                ? "Saving..."
                : "Save Category"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}