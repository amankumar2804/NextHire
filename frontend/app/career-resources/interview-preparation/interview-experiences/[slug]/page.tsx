"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  MapPin,
  MessageCircle,
  Send,
  Share2,
  Users,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type InterviewExperience = {
  _id: string;
  company: string;
  role: string;
  interviewType: string;
  category: string;
  location?: string;
  year?: number;
  rounds?: string;
  summary: string;
  article: string;
  tips?: string;
  imageUrl?: string;
  slug: string;
};

export default function InterviewExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [experience, setExperience] =
    useState<InterviewExperience | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);


  // =====================================
  // FETCH EXPERIENCE
  // =====================================

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/interview-experiences/${slug}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Interview experience not found"
          );
        }

        setExperience(data.experience);

      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load interview experience."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchExperience();

  }, [slug]);


  // =====================================
  // SHARE DATA
  // =====================================

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";


  const shareText = experience
    ? `${experience.company} ${experience.role} Interview Experience - Read the complete interview experience and preparation journey.`
    : "Interview Experience";


  // =====================================
  // COPY LINK
  // =====================================

  const copyLink = async () => {
    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(error);
    }
  };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 font-semibold text-slate-600">

            Loading interview experience...

          </p>

        </div>

      </main>
    );
  }


  // =====================================
  // ERROR
  // =====================================

  if (error || !experience) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <h1 className="text-2xl font-black text-red-800">

            Interview Experience Not Found

          </h1>


          <p className="mt-3 text-red-700">

            {error}

          </p>


          <Link
            href="/career-resources/interview-preparation/interview-experiences"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
          >

            <ArrowLeft size={18} />

            Back to Experiences

          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50">


      {/* =====================================
          PREMIUM HERO
      ===================================== */}

      <section className="relative min-h-[620px] overflow-hidden bg-slate-950 text-white">


        {/* COMPANY IMAGE */}

        {experience.imageUrl && (

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                `url(${experience.imageUrl})`,
            }}
          />

        )}


        {/* LIGHT OVERLAY */}

        <div className="absolute inset-0 bg-black/35" />


        {/* LEFT TEXT GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />


        {/* BOTTOM GRADIENT */}

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/80 to-transparent" />


        {/* PURPLE LIGHT */}

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />


        {/* CONTENT */}

        <div className="relative mx-auto flex min-h-[620px] max-w-5xl items-center px-6 py-24">

          <div className="max-w-3xl">


            {/* BACK BUTTON */}

            <Link
              href="/career-resources/interview-preparation/interview-experiences"
              className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >

              <ArrowLeft size={18} />

              Back to Interview Experiences

            </Link>


            {/* BADGES */}

            <div className="flex flex-wrap gap-3">

              <span className="rounded-full border border-indigo-300/30 bg-indigo-600/70 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">

                {experience.interviewType}

              </span>


              <span className="rounded-full border border-white/20 bg-white/15 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">

                {experience.category}

              </span>

            </div>


            {/* COMPANY */}

            <h1 className="mt-8 text-5xl font-black uppercase tracking-tight drop-shadow-2xl md:text-7xl">

              {experience.company}

            </h1>


            {/* ROLE */}

            <h2 className="mt-3 text-3xl font-bold text-indigo-200 drop-shadow-lg md:text-4xl">

              {experience.role}

            </h2>


            {/* SUMMARY */}

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-lg">

              {experience.summary}

            </p>


            {/* ARTICLE LABEL */}

            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-black/30 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md">

              <BriefcaseBusiness size={18} />

              Read Full Interview Experience

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          QUICK INFO
      ===================================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:grid-cols-2 lg:grid-cols-4">


          <div className="rounded-2xl bg-slate-50 p-4">

            <div className="flex items-center gap-3 text-slate-500">

              <Users size={19} />

              <span className="text-sm font-semibold">

                Interview Rounds

              </span>

            </div>


            <p className="mt-2 text-lg font-black text-slate-900">

              {experience.rounds ||
                "Not Specified"}

            </p>

          </div>


          <div className="rounded-2xl bg-slate-50 p-4">

            <div className="flex items-center gap-3 text-slate-500">

              <CalendarDays size={19} />

              <span className="text-sm font-semibold">

                Year

              </span>

            </div>


            <p className="mt-2 text-lg font-black text-slate-900">

              {experience.year ||
                "Not Specified"}

            </p>

          </div>


          <div className="rounded-2xl bg-slate-50 p-4">

            <div className="flex items-center gap-3 text-slate-500">

              <MapPin size={19} />

              <span className="text-sm font-semibold">

                Location

              </span>

            </div>


            <p className="mt-2 text-lg font-black text-slate-900">

              {experience.location ||
                "Not Specified"}

            </p>

          </div>


          <div className="rounded-2xl bg-slate-50 p-4">

            <div className="flex items-center gap-3 text-slate-500">

              <Clock3 size={19} />

              <span className="text-sm font-semibold">

                Type

              </span>

            </div>


            <p className="mt-2 text-lg font-black text-slate-900">

              {experience.interviewType}

            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          ARTICLE
      ===================================== */}

      <section className="mx-auto max-w-5xl px-6 py-20">

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">


          {/* MAIN ARTICLE */}

          <article className="space-y-10">


            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">


              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                  <BriefcaseBusiness
                    size={24}
                  />

                </div>


                <h2 className="text-2xl font-black text-slate-900">

                  Complete Interview Experience

                </h2>

              </div>


              {/* ARTICLE CONTENT */}

              <div
                className="article-content mt-8"
                dangerouslySetInnerHTML={{
                  __html:
                    experience.article,
                }}
              />

            </section>


            {/* TIPS */}

            {experience.tips && (

              <section className="rounded-3xl border border-indigo-200 bg-indigo-50 p-7 md:p-10">

                <div className="flex items-center gap-3">

                  <MessageCircle
                    size={26}
                    className="text-indigo-600"
                  />


                  <h2 className="text-2xl font-black text-indigo-950">

                    Interview Tips

                  </h2>

                </div>


                <div className="mt-6 flex items-start gap-3">

                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-indigo-600"
                  />


                  <p className="whitespace-pre-line leading-8 text-indigo-900">

                    {experience.tips}

                  </p>

                </div>

              </section>

            )}

          </article>


          {/* SIDEBAR */}

          <aside className="h-fit space-y-5 lg:sticky lg:top-6">


            {/* SHARE CARD */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">

                  <Share2 size={20} />

                </div>


                <h3 className="text-lg font-black text-slate-900">

                  Share Experience

                </h3>

              </div>


              <p className="mt-3 text-sm leading-6 text-slate-500">

                Help your friends prepare better for their next interview.

              </p>


              <div className="mt-5 grid grid-cols-2 gap-3">


                {/* WHATSAPP */}

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${shareText} ${currentUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                >

                  WhatsApp

                </a>


                {/* LINKEDIN */}

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >

                  LinkedIn

                </a>


                {/* TELEGRAM */}

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    currentUrl
                  )}&text=${encodeURIComponent(
                    shareText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-3 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
                >

                  <Send size={16} />

                  Telegram

                </a>


                {/* COPY LINK */}

                <button
                  onClick={copyLink}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                >

                  <Copy size={16} />

                  {copied
                    ? "Copied!"
                    : "Copy Link"}

                </button>

              </div>

            </div>


            {/* OVERVIEW */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-black text-slate-900">

                Interview Overview

              </h3>


              <div className="mt-5 space-y-4">


                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">

                    Company

                  </p>


                  <p className="mt-1 font-bold text-slate-800">

                    {experience.company}

                  </p>

                </div>


                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">

                    Role

                  </p>


                  <p className="mt-1 font-bold text-slate-800">

                    {experience.role}

                  </p>

                </div>


                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">

                    Category

                  </p>


                  <p className="mt-1 font-bold text-slate-800">

                    {experience.category}

                  </p>

                </div>


                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">

                    Interview Type

                  </p>


                  <p className="mt-1 font-bold text-slate-800">

                    {experience.interviewType}

                  </p>

                </div>

              </div>

            </div>


            {/* EXPLORE MORE */}

            <Link
              href="/career-resources/interview-preparation/interview-experiences"
              className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white transition hover:scale-[1.02]"
            >

              <div>

                <p className="text-sm font-semibold text-indigo-100">

                  Explore more

                </p>


                <p className="mt-1 text-lg font-black">

                  Interview Experiences

                </p>

              </div>


              <ArrowRight size={22} />

            </Link>

          </aside>

        </div>

      </section>


      {/* =====================================
          ARTICLE STYLING
      ===================================== */}

      <style jsx global>{`

        .article-content {

          font-size: 1.125rem;

          line-height: 2rem;

          color: #334155;

          overflow-wrap: anywhere;

          word-break: break-word;

        }


        .article-content h1 {

          margin-top: 2.5rem;

          margin-bottom: 1rem;

          font-size: 2rem;

          line-height: 1.3;

          font-weight: 900;

          color: #0f172a;

        }


        .article-content h2 {

          margin-top: 2.5rem;

          margin-bottom: 1rem;

          font-size: 1.6rem;

          line-height: 1.4;

          font-weight: 900;

          color: #312e81;

        }


        .article-content h3 {

          margin-top: 2rem;

          margin-bottom: 0.75rem;

          font-size: 1.3rem;

          line-height: 1.4;

          font-weight: 800;

          color: #4338ca;

        }


        .article-content p {

          margin-bottom: 1.25rem;

        }


        .article-content strong {

          font-weight: 800;

          color: #111827;

        }


        .article-content u {

          text-decoration-thickness: 2px;

          text-underline-offset: 4px;

        }


        .article-content ul {

          margin: 1.25rem 0;

          padding-left: 2rem;

          list-style-type: disc;

        }


        .article-content ol {

          margin: 1.25rem 0;

          padding-left: 2rem;

          list-style-type: decimal;

        }


        .article-content li {

          margin-bottom: 0.6rem;

        }


        .article-content blockquote {

          margin: 1.5rem 0;

          border-left: 4px solid #6366f1;

          padding: 1rem 1.5rem;

          border-radius: 0.75rem;

          background: #eef2ff;

          font-style: italic;

          color: #3730a3;

        }


        .article-content pre {

          margin: 1.5rem 0;

          overflow-x: auto;

          border-radius: 1rem;

          background: #0f172a;

          padding: 1.25rem;

          color: white;

        }


        .article-content code {

          border-radius: 0.4rem;

          background: #f1f5f9;

          padding: 0.15rem 0.4rem;

          font-size: 0.95em;

        }


        .article-content a {

          color: #4f46e5;

          font-weight: 700;

          text-decoration: underline;

        }

      `}</style>

    </main>
  );
}