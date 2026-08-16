"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Download,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type Resource = {
  _id: string;
  title: string;
  description?: string;
  resourceType: string;
  fileUrl?: string;
  fileName?: string;
};

export default function ImagePreviewPage({
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
        const response = await fetch(
          `${API_URL}/api/tech-stack-resources/single/${resourceId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load image"
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2
          size={50}
          className="animate-spin text-indigo-500"
        />
      </main>
    );
  }


  if (error || !resource || !resource.fileUrl) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

        <div className="rounded-3xl bg-red-950 p-10 text-center">

          <h1 className="text-2xl font-black text-red-400">
            Image Not Found
          </h1>

          <p className="mt-3 text-red-300">
            {error || "Image is not available"}
          </p>

          <Link
            href={`/career-resources/interview-preparation/tech-stack/${slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white"
          >
            <ArrowLeft size={18} />
            Back to Resources
          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-950">

      {/* TOP BAR */}

      <header className="border-b border-white/10 bg-black/40">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">

          <Link
            href={`/career-resources/interview-preparation/tech-stack/${slug}`}
            className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-indigo-400"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </Link>


          <a
            href={resource.fileUrl}
            download={resource.fileName || resource.title}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            <Download size={19} />
            Download Image
          </a>

        </div>

      </header>


      {/* IMAGE AREA */}

      <section className="flex min-h-[calc(100vh-85px)] items-center justify-center px-4 py-10">

        <div className="w-full max-w-6xl">

          {/* TITLE */}

          <div className="mb-8 text-center">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-300">
              <ImageIcon size={17} />
              {resource.resourceType}
            </div>

            <h1 className="text-3xl font-black text-white md:text-5xl">
              {resource.title}
            </h1>

            {resource.description && (
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                {resource.description}
              </p>
            )}

          </div>


          {/* IMAGE CONTAINER */}

          <div className="flex min-h-[500px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black p-4 shadow-2xl md:p-8">

            <img
              src={resource.fileUrl}
              alt={resource.title}
              className="max-h-[75vh] max-w-full object-contain"
            />

          </div>


          {/* BOTTOM DOWNLOAD */}

          <div className="mt-8 flex justify-center">

            <a
              href={resource.fileUrl}
              download={resource.fileName || resource.title}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 hover:bg-indigo-700"
            >
              <Download size={22} />
              Download Image
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}