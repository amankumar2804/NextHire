"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function AddSubjectPage() {
  const params = useParams();

  const router = useRouter();

  const categoryId =
    params.id as string;

  const [saving, setSaving] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [form, setForm] =
    useState({
      name: "",
      slug: "",
      description: "",
      icon: "📚",
      gradient:
        "from-indigo-500 to-violet-600",
      isActive: true,
    });


  // =====================================
  // CREATE SLUG
  // =====================================

  const createSlug = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );
  };


  // =====================================
  // SUBJECT NAME
  // =====================================

  const handleNameChange = (
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      name: value,

      slug:
        createSlug(value),
    }));
  };


  // =====================================
  // SELECT IMAGE
  // =====================================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select a valid image file"
      );

      event.target.value = "";

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image size must be less than 5 MB"
      );

      event.target.value = "";

      return;
    }

    setSelectedImage(
      file
    );

    setImagePreview(
      URL.createObjectURL(
        file
      )
    );
  };


  // =====================================
  // REMOVE IMAGE
  // =====================================

  const removeImage = () => {
    setSelectedImage(
      null
    );

    setImagePreview(
      ""
    );
  };


  // =====================================
  // UPLOAD IMAGE
  // =====================================

  const uploadImage =
    async () => {
      if (!selectedImage) {
        return {
          image: "",
          imagePublicId: "",
        };
      }

      setUploadingImage(
        true
      );

      try {
        const formData =
          new FormData();

        formData.append(
          "image",
          selectedImage
        );

        // IMPORTANT:
        // Backend route is:
        // /api/upload/image

        const response =
          await fetch(
            `${API_URL}/api/upload/image`,
            {
              method: "POST",

              body:
                formData,
            }
          );

        const text =
          await response.text();

        let result;

        try {
          result =
            JSON.parse(text);
        } catch {
          throw new Error(
            "Image upload API returned an invalid response"
          );
        }

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Failed to upload image"
          );
        }

        // Backend sends:
        // {
        //   imageUrl: "Cloudinary image URL"
        // }

        return {
          image:
            result.imageUrl ||
            "",

          imagePublicId:
            result.imagePublicId ||
            "",
        };

      } catch (error) {
        console.error(
          "Image Upload Error:",
          error
        );

        throw error;

      } finally {
        setUploadingImage(
          false
        );
      }
    };


  // =====================================
  // CREATE SUBJECT
  // =====================================

  const handleSubmit =
    async (
      event: FormEvent
    ) => {
      event.preventDefault();

      if (
        !form.name.trim() ||
        !form.slug.trim()
      ) {
        alert(
          "Subject name and slug are required"
        );

        return;
      }

      try {
        setSaving(
          true
        );

        const uploadedImage =
          await uploadImage();

        const response =
          await fetch(
            `${API_URL}/api/government-notes-categories/${categoryId}/subjects`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  name:
                    form.name.trim(),

                  slug:
                    form.slug
                      .trim()
                      .toLowerCase(),

                  description:
                    form.description.trim(),

                  icon:
                    form.icon ||
                    "📚",

                  image:
                    uploadedImage.image,

                  imagePublicId:
                    uploadedImage.imagePublicId,

                  gradient:
                    form.gradient,

                  isActive:
                    form.isActive,
                }),
            }
          );

        const text =
          await response.text();

        let result;

        try {
          result =
            JSON.parse(text);
        } catch {
          throw new Error(
            "Backend returned an invalid response"
          );
        }

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Failed to create subject"
          );
        }

        alert(
          "Subject created successfully"
        );

        router.push(
          `/admin/career-resources/government-exams/notes/categories/${categoryId}`
        );

        router.refresh();

      } catch (error) {
        console.error(
          "Create Subject Error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to create subject"
        );

      } finally {
        setSaving(
          false
        );
      }
    };


  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-10">

          <Link
            href={`/admin/career-resources/government-exams/notes/categories/${categoryId}`}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to Subjects
          </Link>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

              <BookOpen
                size={31}
              />

            </div>

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">

                Notes Management

              </p>

              <h1 className="mt-1 text-4xl font-black">

                Add New Subject

              </h1>

              <p className="mt-2 text-indigo-100">

                Create a subject and upload its image directly.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-10">

        <form
          onSubmit={
            handleSubmit
          }
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >

          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 md:px-8">

            <h2 className="text-xl font-black text-slate-900">

              Subject Details

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Fill in the subject information below.

            </p>

          </div>


          <div className="space-y-7 p-6 md:p-8">

            {/* SUBJECT NAME */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Subject Name

                <span className="ml-1 text-red-500">

                  *

                </span>

              </label>

              <input
                type="text"
                value={
                  form.name
                }
                onChange={(event) =>
                  handleNameChange(
                    event.target.value
                  )
                }
                placeholder="Example: Quantitative Aptitude"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* SLUG */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Subject Slug

                <span className="ml-1 text-red-500">

                  *

                </span>

              </label>

              <input
                type="text"
                value={
                  form.slug
                }
                onChange={(event) =>
                  setForm({
                    ...form,

                    slug:
                      createSlug(
                        event.target.value
                      ),
                  })
                }
                placeholder="quantitative-aptitude"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Subject Description

              </label>

              <textarea
                rows={4}
                value={
                  form.description
                }
                onChange={(event) =>
                  setForm({
                    ...form,

                    description:
                      event.target.value,
                  })
                }
                placeholder="Write a short description about this subject..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* ICON */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Subject Icon

              </label>

              <input
                type="text"
                value={
                  form.icon
                }
                maxLength={4}
                onChange={(event) =>
                  setForm({
                    ...form,

                    icon:
                      event.target.value,
                  })
                }
                placeholder="📚"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* DIRECT IMAGE UPLOAD */}

            <div>

              <label className="mb-3 block font-bold text-slate-700">

                Subject Image

              </label>

              {!imagePreview ? (

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-6 py-12 transition hover:border-indigo-400 hover:bg-indigo-50">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">

                    <Upload
                      size={30}
                    />

                  </div>

                  <span className="mt-5 text-base font-bold text-slate-800">

                    Choose Subject Image

                  </span>

                  <span className="mt-2 text-sm text-slate-500">

                    PNG, JPG, JPEG or WEBP • Maximum 5 MB

                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

              ) : (

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">

                  <img
                    src={
                      imagePreview
                    }
                    alt="Subject preview"
                    className="h-64 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={
                      removeImage
                    }
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                    title="Remove image"
                  >

                    <X
                      size={20}
                    />

                  </button>

                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-white backdrop-blur">

                    <ImageIcon
                      size={17}
                    />

                    Image selected successfully

                  </div>

                </div>

              )}

            </div>


            {/* GRADIENT */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Card Gradient

              </label>

              <select
                value={
                  form.gradient
                }
                onChange={(event) =>
                  setForm({
                    ...form,

                    gradient:
                      event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >

                <option value="from-indigo-500 to-violet-600">

                  Indigo → Violet

                </option>

                <option value="from-emerald-500 to-teal-600">

                  Emerald → Teal

                </option>

                <option value="from-blue-500 to-cyan-600">

                  Blue → Cyan

                </option>

                <option value="from-orange-500 to-rose-600">

                  Orange → Rose

                </option>

                <option value="from-pink-500 to-fuchsia-600">

                  Pink → Fuchsia

                </option>

              </select>

            </div>


            {/* ACTIVE */}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

              <input
                type="checkbox"
                checked={
                  form.isActive
                }
                onChange={(event) =>
                  setForm({
                    ...form,

                    isActive:
                      event.target.checked,
                  })
                }
                className="h-5 w-5 accent-indigo-600"
              />

              <div>

                <p className="font-bold text-slate-700">

                  Active Subject

                </p>

                <p className="text-sm text-slate-500">

                  Students will be able to see this subject.

                </p>

              </div>

            </label>


            {/* BUTTONS */}

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-7 sm:flex-row">

              <Link
                href={`/admin/career-resources/government-exams/notes/categories/${categoryId}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >

                Cancel

              </Link>

              <button
                type="submit"
                disabled={
                  saving ||
                  uploadingImage
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {saving ||
                uploadingImage ? (

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                ) : (

                  <Save
                    size={18}
                  />

                )}

                {uploadingImage
                  ? "Uploading Image..."
                  : saving
                  ? "Creating Subject..."
                  : "Create Subject"}

              </button>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}