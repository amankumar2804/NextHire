"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function EditGovernmentExamCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.id as string;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [currentImage, setCurrentImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [error, setError] = useState("");

  // ===============================
  // FETCH CATEGORY
  // ===============================

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/government-exam-categories/${categoryId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch category"
          );
        }

        const category = data.category;

        setName(category.name || "");
        setSlug(category.slug || "");
        setDescription(category.description || "");
        setCurrentImage(category.image || "");

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load category"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);


  // ===============================
  // IMAGE CHANGE
  // ===============================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };


  // ===============================
  // SLUG GENERATOR
  // ===============================

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };


  // ===============================
  // UPLOAD IMAGE
  // ===============================

  const uploadImage = async () => {
    if (!imageFile) return currentImage;

    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await fetch(
      `${API_URL}/api/upload/image`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Image upload failed"
      );
    }

    return data.imageUrl;
  };


  // ===============================
  // UPDATE CATEGORY
  // ===============================

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    try {
      setError("");
      setIsSaving(true);

      let imageUrl = currentImage;

      if (imageFile) {
        setIsUploading(true);

        imageUrl = await uploadImage();

        setIsUploading(false);
      }

      const response = await fetch(
        `${API_URL}/api/government-exam-categories/${categoryId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            slug,
            description,
            image: imageUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update category"
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


  // ===============================
  // LOADING
  // ===============================

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="flex items-center gap-3 text-slate-600">

          <Loader2
            size={24}
            className="animate-spin"
          />

          Loading category...

        </div>

      </main>
    );
  }


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
            Edit Government Exam Category
          </h1>

          <p className="mt-3 text-indigo-100">
            Update category information and image.
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


          {/* NAME + SLUG */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Category Name *
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


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
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>


          {/* IMAGE */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Category Image
            </label>

            <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50">

              {imagePreview ? (

                <img
                  src={imagePreview}
                  alt="New category preview"
                  className="h-44 w-full rounded-xl object-cover"
                />

              ) : currentImage ? (

                <img
                  src={currentImage}
                  alt={name}
                  className="h-44 w-full rounded-xl object-cover"
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


          {/* BUTTONS */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/career-resources/government-exams/categories"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={isSaving}
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
                ? "Updating..."
                : "Update Category"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}