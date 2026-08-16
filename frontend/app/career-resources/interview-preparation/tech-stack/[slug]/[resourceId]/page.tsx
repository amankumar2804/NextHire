"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { marked } from "marked";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:5000";

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

export default function ResourcePage({
  params,
}: {
  params: Promise<{
    slug: string;
    resourceId: string;
  }>;
}) {
  const { slug, resourceId } = use(params);

  const [resource, setResource] =
    useState<Resource | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/tech-stack-resources/single/${resourceId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch resource"
          );
        }

        setResource(data.resource);

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

    fetchResource();
  }, [resourceId]);


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2
            size={45}
            className="mx-auto animate-spin text-indigo-600"
          />

          <p className="mt-4 font-semibold text-slate-600">
            Loading resource...
          </p>

        </div>

      </main>
    );
  }


  if (error || !resource) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <h1 className="text-2xl font-black text-red-800">
            Resource Not Found
          </h1>

          <p className="mt-3 text-red-700">
            {error || "Resource not found"}
          </p>

          <Link
            href={`/career-resources/interview-preparation/tech-stack/${slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
          >

            <ArrowLeft size={18} />

            Back to Tech Stack

          </Link>

        </div>

      </main>
    );
  }


  const isArticle =
    resource.resourceType === "ARTICLE";

  const isPdf =
    resource.resourceType === "PDF";

  const isImage =
    ["JPG", "JPEG", "PNG"].includes(
      resource.resourceType
    );


  // =====================================
  // MARKDOWN TO HTML
  // =====================================

  const articleHtml = isArticle
    ? marked.parse(
        resource.article || ""
      ) as string
    : "";


  return (
    <main className="min-h-screen bg-slate-50">


      {/* =====================================
          HERO
      ===================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-20 text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />


        <div className="relative mx-auto max-w-5xl px-6">

          <Link
            href={`/career-resources/interview-preparation/tech-stack/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Back to{" "}
            {resource.category?.name || "Resources"}

          </Link>


          <div className="mt-12">


            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-bold text-indigo-200 backdrop-blur">

              {isArticle && (
                <BookOpen size={16} />
              )}

              {isPdf && (
                <FileText size={16} />
              )}

              {isImage && (
                <ImageIcon size={16} />
              )}

              {resource.resourceType}

            </div>


            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight md:text-6xl">

              {resource.title}

            </h1>


            {resource.description && (

              <p className="mt-6 max-w-3xl text-lg leading-8 text-indigo-100">

                {resource.description}

              </p>

            )}


            {resource.createdAt && (

              <div className="mt-7 flex items-center gap-2 text-sm text-indigo-200">

                <CalendarDays size={16} />

                Published on{" "}

                {new Date(
                  resource.createdAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================
          RESOURCE CONTENT
      ===================================== */}

      <section className="mx-auto max-w-5xl px-6 py-16">

        <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">


          {/* RESOURCE HEADER */}

          <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-6 py-8 md:px-12">

            <div className="flex items-center gap-3">


              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">

                {isArticle && (
                  <Sparkles size={22} />
                )}

                {isPdf && (
                  <FileText size={22} />
                )}

                {isImage && (
                  <ImageIcon size={22} />
                )}

              </div>


              <div>

                <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

                  {isArticle
                    ? "Tech Stack Preparation"
                    : "Learning Resource"}

                </p>


                <p className="mt-1 text-sm text-slate-500">

                  {isArticle
                    ? "Learn. Practice. Prepare."
                    : resource.fileName ||
                      "Resource file"}

                </p>

              </div>

            </div>

          </div>


          {/* =====================================
              ARTICLE
          ===================================== */}

          {isArticle && (

            <div className="p-6 md:p-12">

              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: articleHtml,
                }}
              />

            </div>

          )}


          {/* =====================================
              PDF
          ===================================== */}

          {isPdf &&
            resource.fileUrl && (

              <div className="p-4 md:p-8">

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">

                  <iframe
                    src={resource.fileUrl}
                    title={resource.title}
                    className="h-[80vh] w-full"
                  />

                </div>


                <div className="mt-6 flex justify-center">

                  <a
                    href={resource.fileUrl}
                    download={
                      resource.fileName ||
                      "resource.pdf"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                  >

                    <Download size={19} />

                    Download PDF

                  </a>

                </div>

              </div>

            )}


          {/* =====================================
              IMAGE
          ===================================== */}

          {isImage &&
            resource.fileUrl && (

              <div className="p-6 md:p-10">

                <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-slate-100 p-4">

                  <img
                    src={resource.fileUrl}
                    alt={resource.title}
                    className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-lg"
                  />

                </div>


                <div className="mt-6 flex justify-center">

                  <a
                    href={resource.fileUrl}
                    download={
                      resource.fileName ||
                      `nexthire-${resource.resourceType.toLowerCase()}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                  >

                    <Download size={19} />

                    Download Image

                  </a>

                </div>

              </div>

            )}


          {!isArticle &&
            !resource.fileUrl && (

              <div className="p-12 text-center">

                <p className="font-semibold text-red-600">

                  Resource file is not available.

                </p>

              </div>

            )}

        </article>

      </section>


      {/* =====================================
          CTA
      ===================================== */}

      <section className="mx-auto max-w-5xl px-6 pb-20">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-xl">

          <h2 className="text-2xl font-black md:text-3xl">

            Keep learning and improve your preparation 🚀

          </h2>


          <p className="mt-3 text-indigo-100">

            Explore more resources and prepare better for your technical interviews.

          </p>


          <Link
            href={`/career-resources/interview-preparation/tech-stack/${slug}`}
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >

            Explore More Resources

          </Link>

        </div>

      </section>


      {/* =====================================
          ARTICLE STYLING
      ===================================== */}

      <style jsx global>{`

        .article-content {
          color: #334155;
          font-size: 1.05rem;
          line-height: 1.9;
        }

        .article-content h1 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #0f172a;
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1.2;
        }

        .article-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1e293b;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.3;
        }

        .article-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #334155;
          font-size: 1.4rem;
          font-weight: 800;
        }

        .article-content p {
          margin: 1rem 0;
        }

        .article-content strong {
          color: #0f172a;
          font-weight: 800;
        }

        .article-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .article-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }

        .article-content li {
          margin: 0.5rem 0;
        }

        .article-content a {
          color: #4f46e5;
          font-weight: 700;
          text-decoration: underline;
        }

        .article-content blockquote {
          margin: 1.5rem 0;
          border-left: 4px solid #6366f1;
          background: #eef2ff;
          padding: 1rem 1.25rem;
          font-style: italic;
          color: #475569;
        }

        .article-content pre {
          margin: 1.5rem 0;
          overflow-x: auto;
          border-radius: 1rem;
          background: #0f172a;
          padding: 1.25rem;
          color: #e2e8f0;
          font-family: monospace;
          font-size: 0.9rem;
          line-height: 1.7;
        }

        .article-content code {
          border-radius: 0.35rem;
          background: #f1f5f9;
          padding: 0.15rem 0.35rem;
          color: #7c3aed;
          font-family: monospace;
          font-size: 0.9em;
        }

        .article-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }

        .article-content table {
          width: 100%;
          margin: 1.5rem 0;
          border-collapse: collapse;
        }

        .article-content th,
        .article-content td {
          border: 1px solid #cbd5e1;
          padding: 0.75rem;
          text-align: left;
        }

        .article-content th {
          background: #eef2ff;
          color: #1e293b;
          font-weight: 800;
        }

        .article-content img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem auto;
          border-radius: 1rem;
        }

        @media (max-width: 640px) {

          .article-content {
            font-size: 1rem;
            line-height: 1.8;
          }

          .article-content h1 {
            font-size: 1.8rem;
          }

          .article-content h2 {
            font-size: 1.5rem;
          }

          .article-content h3 {
            font-size: 1.25rem;
          }

        }

      `}</style>

    </main>
  );
}