"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
} from "lucide-react";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center text-slate-500">
        Loading editor...
      </div>
    ),
  }
);

const API_URL = "http://localhost:5000";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "align",
  "blockquote",
  "code-block",
];

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditInterviewExperiencePage({
  params,
}: PageProps) {
  const { id } = use(params);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    interviewType: "",
    category: "",
    location: "",
    year: "",
    rounds: "",
    summary: "",
    article: "",
    tips: "",
    slug: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =====================================
  // FETCH EXPERIENCE
  // =====================================

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/interview-experiences/id/${id}`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Interview experience not found"
          );
        }

        const experience =
          data.experience;

        setFormData({
          company:
            experience.company || "",

          role:
            experience.role || "",

          interviewType:
            experience.interviewType || "",

          category:
            experience.category || "",

          location:
            experience.location || "",

          year:
            experience.year
              ? String(experience.year)
              : "",

          rounds:
            experience.rounds || "",

          summary:
            experience.summary || "",

          article:
            experience.article || "",

          tips:
            experience.tips || "",

          slug:
            experience.slug || "",
        });

        setImageUrl(
          experience.imageUrl || ""
        );

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load experience"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchExperience();

  }, [id]);


  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =====================================
  // IMAGE UPLOAD
  // =====================================

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingImage(true);

      setError("");

      const uploadData =
        new FormData();

      uploadData.append(
        "image",
        file
      );

      const response =
        await fetch(
          `${API_URL}/api/upload/image`,
          {
            method: "POST",
            body: uploadData,
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

      setImageUrl(
        data.imageUrl
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );

    } finally {
      setUploadingImage(false);
    }
  };


  // =====================================
  // UPDATE EXPERIENCE
  // =====================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      setError("");

      setSuccess("");

      const response =
        await fetch(
          `${API_URL}/api/interview-experiences/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...formData,

              year: formData.year
                ? Number(formData.year)
                : undefined,

              imageUrl,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update interview experience"
        );
      }

      setSuccess(
        "Interview experience updated successfully!"
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    } finally {
      setSaving(false);
    }
  };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <Loader2
          size={42}
          className="animate-spin text-indigo-600"
        />

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50">


      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-12 text-white">

        <div className="mx-auto max-w-5xl px-6">

          <Link
            href="/admin/interview-experiences"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white"
          >

            <ArrowLeft size={18} />

            Back to Experiences

          </Link>


          <h1 className="mt-8 text-4xl font-black">

            Edit Interview Experience

          </h1>


          <p className="mt-3 text-indigo-100">

            Update your interview experience.

          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >


          {/* SUCCESS */}

          {success && (

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5 font-semibold text-green-700">

              {success}

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 font-semibold text-red-700">

              {error}

            </div>

          )}


          {/* BASIC INFORMATION */}

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">

              Basic Information

            </h2>


            <div className="mt-6 grid gap-5 md:grid-cols-2">


              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
                required
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                placeholder="Interview Type"
                required
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                type="number"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="rounds"
                value={formData.rounds}
                onChange={handleChange}
                placeholder="Interview Rounds"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />


              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Slug"
                required
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>

          </section>


          {/* COMPANY IMAGE */}

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">

              Company Image

            </h2>


            <label className="mt-6 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-8 text-indigo-700 hover:bg-indigo-100">

              {uploadingImage ? (

                <Loader2
                  size={24}
                  className="animate-spin"
                />

              ) : (

                <ImagePlus size={24} />

              )}


              <span className="font-bold">

                {uploadingImage
                  ? "Uploading..."
                  : "Choose New Company Image"}

              </span>


              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

            </label>


            {imageUrl && (

              <div className="mt-6 overflow-hidden rounded-2xl">

                <img
                  src={imageUrl}
                  alt="Company preview"
                  className="h-64 w-full object-cover"
                />

              </div>

            )}

          </section>


          {/* SUMMARY */}

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">

              Summary

            </h2>


            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={5}
              className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </section>


          {/* RICH ARTICLE */}

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">

              Complete Interview Experience

            </h2>


            <p className="mt-2 text-sm text-slate-500">

              Select text and use toolbar for bold, colors, highlights and underline.

            </p>


            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">

              <ReactQuill
                theme="snow"
                value={formData.article}
                onChange={(value) =>
                  setFormData((previous) => ({
                    ...previous,
                    article: value,
                  }))
                }
                modules={quillModules}
                formats={quillFormats}
              />

            </div>

          </section>


          {/* TIPS */}

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">

              Interview Tips

            </h2>


            <textarea
              name="tips"
              value={formData.tips}
              onChange={handleChange}
              rows={6}
              className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </section>


          {/* SAVE */}

          <button
            type="submit"
            disabled={
              saving ||
              uploadingImage
            }
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 text-lg font-black text-white hover:bg-indigo-700 disabled:opacity-60"
          >

            {saving ? (

              <Loader2
                size={22}
                className="animate-spin"
              />

            ) : (

              <Save size={22} />

            )}


            {saving
              ? "Updating..."
              : "Update Interview Experience"}

          </button>

        </form>

      </section>

    </main>
  );
}