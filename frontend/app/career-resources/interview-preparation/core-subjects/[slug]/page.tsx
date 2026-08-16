"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  Eye,
  FileText,
  Loader2,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
};

type Resource = {
  _id: string;
  title: string;
  description?: string;
  resourceType: string;
  fileName?: string;
  fileSize?: string;
  fileUrl: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
};

export default function CoreSubjectCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");

  const [category, setCategory] =
    useState<Category | null>(null);

  const [resources, setResources] =
    useState<Resource[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadPage = async () => {
      try {
        const resolvedParams = await params;

        setSlug(resolvedParams.slug);

        const categoryResponse =
          await fetch(
            `${API_URL}/api/core-subject-categories/slug/${resolvedParams.slug}`
          );

        const categoryData =
          await categoryResponse.json();

        if (!categoryResponse.ok) {
          throw new Error(
            categoryData.message ||
              "Category not found"
          );
        }

        setCategory(
          categoryData.category
        );

        const resourceResponse =
          await fetch(
            `${API_URL}/api/core-subject-resources/category/${categoryData.category._id}`
          );

        const resourceData =
          await resourceResponse.json();

        if (!resourceResponse.ok) {
          throw new Error(
            resourceData.message ||
              "Failed to fetch resources"
          );
        }

        setResources(
          resourceData.resources || []
        );
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2
            size={42}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">
            Loading subject resources...
          </p>

        </div>

      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <h1 className="text-3xl font-black text-red-700">
            404
          </h1>

          <p className="mt-3 font-semibold text-red-600">
            {error || "Subject not found"}
          </p>

          <Link
            href="/career-resources/interview-preparation/core-subjects"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
          >
            <ArrowLeft size={18} />
            Back to Core Subjects
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-16 text-white">

        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <Link
            href="/career-resources/interview-preparation/core-subjects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Core Subjects
          </Link>

          <div className="mt-12 grid gap-10 md:grid-cols-[280px_1fr] md:items-center">

            {/* CATEGORY IMAGE */}

            <div className="h-64 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl">

              {category.imageUrl ? (

                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />

              ) : (

                <div className="flex h-full items-center justify-center">

                  <BookOpen
                    size={90}
                    className="text-indigo-300"
                  />

                </div>

              )}

            </div>


            {/* CATEGORY CONTENT */}

            <div>

              <p className="font-bold uppercase tracking-widest text-indigo-300">
                Core Subject Preparation
              </p>

              <h1 className="mt-4 text-4xl font-black md:text-6xl">
                {category.name}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-indigo-100">
                {category.description ||
                  `Explore complete ${category.name} notes, study materials and preparation resources.`}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          RESOURCES
      ========================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Study Materials
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
              {category.name} Resources
            </h2>

            <p className="mt-3 text-slate-600">
              Notes, PDFs and study materials for your preparation.
            </p>

          </div>

          <div className="rounded-xl bg-indigo-100 px-4 py-2 font-bold text-indigo-700">
            {resources.length} Resources
          </div>

        </div>


        {/* NO RESOURCES */}

        {resources.length === 0 && (

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-14 text-center shadow-sm">

            <FileText
              size={55}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-5 text-2xl font-black text-slate-800">
              No resources available yet
            </h3>

            <p className="mt-3 text-slate-500">
              Study materials for this subject will be added soon.
            </p>

          </div>

        )}


        {/* RESOURCES LIST */}

        {resources.length > 0 && (

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {resources.map((resource) => (

              <div
                key={resource._id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                    <FileText size={28} />

                  </div>

                  <span className="rounded-lg bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">
                    {resource.resourceType}
                  </span>

                </div>


                <h3 className="mt-6 text-xl font-black text-slate-900">
                  {resource.title}
                </h3>


                {resource.description && (

                  <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                    {resource.description}
                  </p>

                )}


                <div className="mt-5 flex flex-wrap gap-2">

                  {resource.fileSize && (

                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {resource.fileSize}
                    </span>

                  )}

                  {resource.fileName && (

                    <span className="max-w-full truncate rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {resource.fileName}
                    </span>

                  )}

                </div>


                {/* ACTIONS */}

                <div className="mt-7 flex flex-wrap gap-3">

                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Eye size={18} />
                    View Resource
                  </a>

                  <a
                    href={resource.fileUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    <Download size={18} />
                    Download
                  </a>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ==========================================
          BOTTOM CTA
      ========================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-12">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">

                <BookOpen size={17} />

                Keep Learning

              </div>

              <h2 className="mt-3 text-3xl font-black">
                Build strong fundamentals with consistent practice.
              </h2>

            </div>

            <Link
              href="/career-resources/interview-preparation/core-subjects"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              Explore More Subjects
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
