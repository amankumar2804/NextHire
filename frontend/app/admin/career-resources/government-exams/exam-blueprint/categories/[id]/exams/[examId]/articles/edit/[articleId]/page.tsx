"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

type Article = {
  _id: string;
  title: string;
  content: string;
  contentType?: string;
  image?: string;
  isPublished?: boolean;
};

export default function EditArticlePage() {
  const params = useParams();

  const router = useRouter();

  const categoryId =
    params.id as string;

  const examId =
    params.examId as string;

  const articleId =
    params.articleId as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      content: "",
      contentType: "article",
      image: "",
      isPublished: true,
    });

  // =================================
  // FETCH ARTICLE
  // =================================

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            `${API_URL}/api/exam-articles/exam/${examId}`
          );

        const text =
          await response.text();

        let result;

        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(
            "Backend returned HTML instead of JSON."
          );
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch articles"
          );
        }

        const articles =
          Array.isArray(result)
            ? result
            : result.articles || [];

        const article =
          articles.find(
            (item: Article) =>
              item._id === articleId
          );

        if (!article) {
          throw new Error(
            "Article not found"
          );
        }

        setForm({
          title:
            article.title || "",

          content:
            article.content || "",

          contentType:
            article.contentType ||
            "article",

          image:
            article.image || "",

          isPublished:
            article.isPublished !==
            false,
        });

      } catch (error) {
        console.error(
          "Fetch Article Error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to load article"
        );

      } finally {
        setLoading(false);
      }
    };

    if (
      examId &&
      articleId
    ) {
      fetchArticle();
    }
  }, [
    examId,
    articleId,
  ]);


  // =================================
  // IMAGE UPLOAD
  // =================================

  const handleImageUpload =
    async (
      event: ChangeEvent<
        HTMLInputElement
      >
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) return;

      try {
        setUploadingImage(true);

        const imageFormData =
          new FormData();

        imageFormData.append(
          "image",
          file
        );

        const response =
          await fetch(
            `${API_URL}/api/upload/image`,
            {
              method: "POST",
              body: imageFormData,
            }
          );

        const text =
          await response.text();

        let result;

        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(
            "Image upload route returned HTML instead of JSON."
          );
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Image upload failed"
          );
        }

        const imageUrl =
          result.imageUrl ||
          result.url ||
          result.image;

        if (!imageUrl) {
          throw new Error(
            "Image URL was not returned by backend."
          );
        }

        setForm(
          (previous) => ({
            ...previous,
            image: imageUrl,
          })
        );

      } catch (error) {
        console.error(
          "Image Upload Error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Image upload failed"
        );

      } finally {
        setUploadingImage(
          false
        );

        event.target.value =
          "";
      }
    };


  // =================================
  // REMOVE IMAGE
  // =================================

  const removeImage = () => {
    setForm(
      (previous) => ({
        ...previous,
        image: "",
      })
    );
  };


  // =================================
  // UPDATE ARTICLE
  // =================================

  const handleSubmit =
    async (
      event: React.FormEvent
    ) => {
      event.preventDefault();

      if (
        !form.title.trim() ||
        !form.content.trim()
      ) {
        alert(
          "Article title and content are required"
        );

        return;
      }

      if (
        form.contentType ===
          "image-and-article" &&
        !form.image
      ) {
        alert(
          "Please upload an article image"
        );

        return;
      }

      try {
        setSaving(true);

        const response =
          await fetch(
            `${API_URL}/api/exam-articles/${articleId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                title:
                  form.title.trim(),

                content:
                  form.content.trim(),

                contentType:
                  form.contentType,

                image:
                  form.image,

                isPublished:
                  form.isPublished,
              }),
            }
          );

        const text =
          await response.text();

        let result;

        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(
            "Backend returned HTML instead of JSON. Check the Exam Articles route."
          );
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to update article"
          );
        }

        alert(
          "Article updated successfully"
        );

        router.push(
          `/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles`
        );

        router.refresh();

      } catch (error) {
        console.error(
          "Update Article Error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to update article"
        );

      } finally {
        setSaving(false);
      }
    };


  // =================================
  // LOADING
  // =================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2
            size={38}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">

            Loading article...

          </p>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="mx-auto max-w-5xl px-6 py-10">

          <Link
            href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles`}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Back to Articles

          </Link>


          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

              <FileText
                size={31}
              />

            </div>

            <div>

              <h1 className="text-4xl font-black">

                Edit Article

              </h1>

              <p className="mt-2 text-indigo-100">

                Update article content and image.

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
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >

          <div className="space-y-6">

            {/* TITLE */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Article Title

              </label>

              <input
                type="text"
                value={
                  form.title
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    title:
                      event.target
                        .value,
                  })
                }
                placeholder="SSC CGL Exam Pattern"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* CONTENT TYPE */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Article Type

              </label>

              <select
                value={
                  form.contentType
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    contentType:
                      event.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >

                <option value="article">

                  Article Only

                </option>

                <option value="image-and-article">

                  Image + Article

                </option>

              </select>

            </div>


            {/* IMAGE */}

            {form.contentType ===
              "image-and-article" && (

              <div>

                <label className="mb-2 flex items-center gap-2 font-bold text-slate-700">

                  <ImageIcon
                    size={18}
                  />

                  Article Image

                </label>


                {form.image ? (

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                    <div className="relative">

                      <img
                        src={
                          form.image
                        }
                        alt="Article preview"
                        className="h-64 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={
                          removeImage
                        }
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
                        title="Remove image"
                      >

                        <X size={19} />

                      </button>

                    </div>

                    <div className="p-4">

                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700">

                        <Upload
                          size={18}
                        />

                        Replace Image

                        <input
                          type="file"
                          accept="image/*"
                          onChange={
                            handleImageUpload
                          }
                          className="hidden"
                        />

                      </label>

                    </div>

                  </div>

                ) : (

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 px-6 py-12 text-center transition hover:border-indigo-400 hover:bg-indigo-100">

                    {uploadingImage ? (

                      <Loader2
                        size={35}
                        className="animate-spin text-indigo-600"
                      />

                    ) : (

                      <Upload
                        size={35}
                        className="text-indigo-600"
                      />

                    )}

                    <span className="mt-4 font-bold text-slate-800">

                      {uploadingImage
                        ? "Uploading image..."
                        : "Click to upload image"}

                    </span>

                    <span className="mt-2 text-sm text-slate-500">

                      JPG, PNG, WEBP and other image formats

                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                      disabled={
                        uploadingImage
                      }
                      className="hidden"
                    />

                  </label>

                )}

              </div>

            )}


            {/* CONTENT */}

            <div>

              <label className="mb-2 block font-bold text-slate-700">

                Article Content

              </label>

              <textarea
                rows={18}
                value={
                  form.content
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    content:
                      event.target
                        .value,
                  })
                }
                placeholder="Write complete article content here..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <p className="mt-2 text-sm text-slate-500">

                Content will be displayed on the frontend with line breaks and formatting preserved.

              </p>

            </div>


            {/* PUBLISHED */}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

              <input
                type="checkbox"
                checked={
                  form.isPublished
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    isPublished:
                      event.target
                        .checked,
                  })
                }
                className="h-5 w-5 accent-indigo-600"
              />

              <span className="font-semibold text-slate-700">

                Publish article immediately

              </span>

            </label>


            {/* BUTTONS */}

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-6">

              <Link
                href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles`}
                className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >

                Cancel

              </Link>

              <button
                type="submit"
                disabled={
                  saving ||
                  uploadingImage
                }
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {saving ? (

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                ) : (

                  <Save
                    size={18}
                  />

                )}

                {saving
                  ? "Updating..."
                  : "Update Article"}

              </button>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}