"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  createdAt?: string;
};

export default function ArticlesPage() {
  const params = useParams();

  const categoryId =
    params.id as string;

  const examId =
    params.examId as string;

  const [articles, setArticles] =
    useState<Article[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchArticles = async () => {
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
          "Backend returned HTML instead of JSON. Check the Exam Articles route."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch articles"
        );
      }

      setArticles(
        Array.isArray(result)
          ? result
          : result.articles || []
      );
    } catch (error) {
      console.error(
        "Fetch Articles Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to fetch articles"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchArticles();
    }
  }, [examId]);

  const handleDelete = async (
    articleId: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this article?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/api/exam-articles/${articleId}`,
          {
            method: "DELETE",
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete article"
        );
      }

      setArticles(
        (previous) =>
          previous.filter(
            (article) =>
              article._id !==
              articleId
          )
      );

      alert(
        "Article deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete Article Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete article"
      );
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2
            size={40}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">

            Loading articles...

          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <Link
            href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Back to Exams

          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

                <FileText size={31} />

              </div>

              <div>

                <h1 className="text-4xl font-black">

                  Manage Articles

                </h1>

                <p className="mt-2 text-indigo-100">

                  Add, edit and manage articles for this exam.

                </p>

              </div>

            </div>

            <Link
              href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles/new`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-indigo-50"
            >

              <Plus size={19} />

              Add Article

            </Link>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-7">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

            {articles.length} Articles

          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900">

            Exam Articles

          </h2>

          <p className="mt-2 text-slate-600">

            Create useful exam information, syllabus, pattern and preparation articles.

          </p>

        </div>

        {articles.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50">

              <FileText
                size={38}
                className="text-indigo-600"
              />

            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-900">

              No articles found

            </h3>

            <p className="mx-auto mt-3 max-w-md text-slate-500">

              Start by creating the first article for this exam.

            </p>

            <Link
              href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles/new`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
            >

              <Plus size={18} />

              Add First Article

            </Link>

          </div>

        ) : (

          <div className="space-y-5">

            {articles.map(
              (article) => (

                <div
                  key={article._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-black text-slate-900">

                          {article.title}

                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            article.isPublished
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >

                          {article.isPublished
                            ? "Published"
                            : "Draft"}

                        </span>

                      </div>

                      <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-600">

                        {article.content}

                      </p>

                    </div>

                    <div className="flex shrink-0 items-center gap-3">

                      <Link
                        href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${examId}/articles/edit/${article._id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >

                        <Pencil size={17} />

                        Edit

                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            article._id
                          )
                        }
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                        title="Delete Article"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}