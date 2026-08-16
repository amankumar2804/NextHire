"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Image as ImageIcon,
  Layers3,
  Loader2,
  Sparkles,
  Terminal,
  Eye,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

type Resource = {
  _id: string;
  title: string;
  description?: string;
  resourceType: "PDF" | "JPG" | "JPEG" | "PNG" | "ARTICLE";
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  article?: string;
  createdAt?: string;
  category?: {
    name: string;
    slug: string;
  };
};

export default function TechStackResourcesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { slug } = await params;

        const categoryResponse = await fetch(
          `${API_URL}/api/tech-stack-categories/${slug}`
        );

        if (!categoryResponse.ok) {
          throw new Error("Tech stack category not found");
        }

        const categoryData = await categoryResponse.json();
        const currentCategory = categoryData.category;

        setCategory(currentCategory);

        const resourceResponse = await fetch(
          `${API_URL}/api/tech-stack-resources/category/${currentCategory._id}`
        );

        if (!resourceResponse.ok) {
          throw new Error("Failed to load resources");
        }

        const resourceData = await resourceResponse.json();

        setResources(resourceData.resources || []);
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

    fetchData();
  }, [params]);

  const handleImageDownload = async (
    fileUrl: string,
    resource: Resource
  ) => {
    try {
      setDownloadingId(resource._id);

      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;

      link.download =
        resource.fileName ||
        `${resource.title}.${resource.resourceType.toLowerCase()}`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);

      alert(
        "Image download nahi ho pa raha. Please dobara try karein."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            size={45}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">
            Loading resources...
          </p>
        </div>
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
          <h1 className="text-2xl font-black text-red-800">
            Tech Stack Not Found
          </h1>

          <p className="mt-3 text-red-700">
            {error}
          </p>

          <Link
            href="/career-resources/interview-preparation/tech-stack"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
          >
            <ArrowLeft size={18} />
            Back to Tech Stacks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-20 text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <Link
            href="/career-resources/interview-preparation/tech-stack"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Tech Stacks
          </Link>

          <div className="mx-auto mt-12 max-w-4xl text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">
              <Terminal size={16} />
              Interview Preparation
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-tight md:text-7xl">
              {category.name}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-indigo-100">
              {category.description ||
                `Master ${category.name} with carefully curated interview preparation resources, important concepts and practical learning materials.`}
            </p>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-indigo-600">
              {resources.length}
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Resources
            </p>

          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-purple-600">
              Interview
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Focused Preparation
            </p>

          </div>

          <div className="p-6 text-center">

            <div className="text-3xl font-black text-green-600">
              Free
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Access Resources
            </p>

          </div>

        </div>

      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">

          <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Layers3 size={32} />
            </div>

            <h2 className="mt-8 text-3xl font-black">
              Prepare for {category.name}
            </h2>

            <p className="mt-4 leading-7 text-indigo-100">
              Explore important resources designed to help you build strong
              fundamentals and prepare confidently for technical interviews.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />
                <span>Learn important concepts</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />
                <span>Study interview-focused material</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />
                <span>Improve your technical preparation</span>
              </div>

            </div>

          </div>

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Curated Resources
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
              Everything you need to prepare better.
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-slate-600">
              Browse through our carefully selected articles, PDFs and study
              materials to strengthen your knowledge of {category.name}.
            </p>

          </div>

        </div>

      </section>

      {/* RESOURCES */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Start Learning
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              {category.name} Resources
            </h2>

            <p className="mt-3 text-slate-600">
              Explore all available preparation material.
            </p>

          </div>

          {resources.length === 0 && (

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-16 text-center">

              <BookOpen
                size={50}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-5 text-2xl font-black text-slate-900">
                Resources Coming Soon
              </h3>

              <p className="mt-3 text-slate-500">
                Preparation resources for this technology will be added soon.
              </p>

            </div>

          )}

          {resources.length > 0 && (

            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {resources.map((resource) => {

                const isArticle =
                  resource.resourceType === "ARTICLE";

                const isImage =
                  ["JPG", "JPEG", "PNG"].includes(
                    resource.resourceType
                  );

                return (

                  <article
                    key={resource._id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
                  >

                    {/* HEADER */}

                    <div
                      className={`relative flex h-48 items-center justify-center overflow-hidden ${
                        isArticle
                          ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600"
                          : isImage
                          ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950"
                          : "bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-950"
                      }`}
                    >

                      <div className="text-center text-white">

                        {isArticle ? (
                          <FileText
                            size={48}
                            className="mx-auto"
                          />
                        ) : isImage ? (
                          <ImageIcon
                            size={52}
                            className="mx-auto"
                          />
                        ) : (
                          <Download
                            size={48}
                            className="mx-auto"
                          />
                        )}

                        <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white/80">
                          {resource.resourceType}
                        </p>

                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-6">

                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">

                        {isArticle ? (
                          <BookOpen size={14} />
                        ) : isImage ? (
                          <ImageIcon size={14} />
                        ) : (
                          <FileText size={14} />
                        )}

                        {resource.resourceType}

                      </div>

                      <h3 className="mt-3 line-clamp-2 text-xl font-black text-slate-900 transition group-hover:text-indigo-600">
                        {resource.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                        {resource.description ||
                          "Explore this resource to improve your technical interview preparation."}
                      </p>

                      {resource.fileSize && (

                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays size={15} />
                          {resource.fileSize}
                        </div>

                      )}

                      {/* ARTICLE */}

                      {isArticle ? (

                        <Link
                          href={`/career-resources/interview-preparation/tech-stack/${category.slug}/${resource._id}`}
                          className="mt-6 flex items-center justify-between rounded-xl bg-slate-950 px-5 py-3.5 font-bold text-white transition hover:bg-indigo-600"
                        >

                          <span>Read Article</span>

                          <ArrowRight size={18} />

                        </Link>

                      ) : isImage && resource.fileUrl ? (

                        /* IMAGE ACTIONS */

                        <div className="mt-6 grid grid-cols-2 gap-3">

                          <a
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700"
                          >

                            <Eye size={17} />

                            View Image

                          </a>

                          <button
                            type="button"
                            onClick={() =>
                              handleImageDownload(
                                resource.fileUrl!,
                                resource
                              )
                            }
                            disabled={
                              downloadingId === resource._id
                            }
                            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                          >

                            {downloadingId === resource._id ? (
                              <Loader2
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Download size={17} />
                            )}

                            {downloadingId === resource._id
                              ? "Downloading..."
                              : "Download"}

                          </button>

                        </div>

                      ) : (

                        /* PDF */

                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 flex items-center justify-between rounded-xl bg-slate-950 px-5 py-3.5 font-bold text-white transition hover:bg-indigo-600"
                        >

                          <span>Open Resource</span>

                          <ArrowRight size={18} />

                        </a>

                      )}

                    </div>

                  </article>

                );

              })}

            </div>

          )}

        </div>

      </section>

      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-14">

          <div className="relative z-10 max-w-2xl">

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">

              <Sparkles size={17} />

              Keep learning and improving

            </div>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Master {category.name}. Crack the interview.
            </h2>

            <p className="mt-5 leading-7 text-indigo-100">
              Consistent learning and focused preparation can help you build
              confidence for your technical interview journey.
            </p>

            <Link
              href="/career-resources/interview-preparation/tech-stack"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-indigo-700 transition hover:scale-105 hover:bg-indigo-50"
            >
              Explore More Tech Stacks
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}