"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Layers3,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  TrendingUp,
} from "lucide-react";

const API_URL = "http://localhost:5000";

type TechStackCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
};

const icons = [
  Code2,
  Layers3,
  Server,
  Cloud,
  BrainCircuit,
  Database,
  Terminal,
  TrendingUp,
];

export default function TechStackPreparationPage() {
  const [categories, setCategories] = useState<TechStackCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/tech-stack-categories`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch tech stack categories"
          );
        }

        const data = await response.json();

        setCategories(data.categories || []);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load tech stack categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-20 text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <Link
            href="/career-resources/interview-preparation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Interview Preparation
          </Link>

          <div className="mx-auto mt-14 max-w-4xl text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">
              <Terminal size={16} />
              Master Your Technology
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">
              Tech Stack Preparation
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
              Prepare for technical interviews with structured resources,
              important concepts, interview questions and practical guidance.
            </p>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-indigo-600">
              {categories.length}+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Technology Categories
            </p>

          </div>


          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-purple-600">
              100+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Interview Topics
            </p>

          </div>


          <div className="p-6 text-center">

            <div className="text-3xl font-black text-green-600">
              Free
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Resources
            </p>

          </div>

        </div>

      </section>


      {/* ================= INTRODUCTION ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <div>

            <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-2xl">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">

                <Rocket size={32} />

              </div>

              <h2 className="mt-8 text-3xl font-black">
                Prepare Smarter
              </h2>

              <p className="mt-4 leading-7 text-indigo-100">
                Focus on the right technology, master the fundamentals and
                prepare for real technical interviews.
              </p>

              <div className="mt-8 rounded-2xl bg-white/10 p-5">

                <div className="flex items-center gap-3">

                  <CheckCircle2 size={21} />

                  <span className="font-semibold">
                    Learn → Practice → Prepare → Succeed
                  </span>

                </div>

              </div>

            </div>

          </div>


          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Choose Your Technology
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
              Prepare for the tech stack you want to master.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Every technology requires a different set of concepts and
              interview preparation. Choose a tech stack and explore
              carefully curated resources.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">
                  Learn important concepts systematically.
                </p>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">
                  Practice frequently asked interview questions.
                </p>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">
                  Access PDFs, articles and useful resources.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TECH STACK CATEGORIES ================= */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Explore Technology
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Choose Your Tech Stack
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Select a technology category to explore interview questions,
              concepts and preparation resources.
            </p>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

              <p className="mt-4 font-semibold text-slate-600">
                Loading technology categories...
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

              <p className="font-semibold text-red-700">
                {error}
              </p>

            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            categories.length === 0 && (

              <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">

                <Terminal
                  size={45}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-4 text-xl font-bold text-slate-800">
                  No technology categories available yet
                </h3>

                <p className="mt-2 text-slate-500">
                  New technology categories will appear here.
                </p>

              </div>

            )}


          {/* CATEGORY CARDS */}

          {!loading &&
            !error &&
            categories.length > 0 && (

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {categories.map((category, index) => {

                  const Icon =
                    icons[index % icons.length];

                  return (

                    <Link
                      key={category._id}
                      href={`/career-resources/interview-preparation/tech-stack/${category.slug}`}
                      className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
                    >

                      {/* CATEGORY IMAGE */}

                      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

                        {category.imageUrl ? (

                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />

                        ) : (

                          <div className="flex h-full w-full items-center justify-center">

                            <Icon
                              size={72}
                              className="text-indigo-600 transition duration-500 group-hover:scale-110"
                            />

                          </div>

                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition group-hover:translate-x-1">

                          <ArrowRight size={20} />

                        </div>

                      </div>


                      {/* CARD CONTENT */}

                      <div className="p-7">

                        <h3 className="text-2xl font-black text-slate-900">
                          {category.name}
                        </h3>

                        <p className="mt-4 min-h-[72px] leading-7 text-slate-600">
                          {category.description ||
                            "Explore interview preparation resources, important topics and technical questions."}
                        </p>

                        <div className="mt-7 inline-flex items-center gap-2 font-bold text-indigo-600 transition group-hover:gap-4">

                          Explore Resources

                          <ArrowRight size={18} />

                        </div>

                      </div>

                    </Link>

                  );

                })}

              </div>

            )}

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-14">

          <div className="relative z-10 max-w-2xl">

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">

              <Sparkles size={17} />

              Build your technical confidence

            </div>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Master the technology. Crack the interview.
            </h2>

            <p className="mt-5 leading-7 text-indigo-100">
              Strong fundamentals and consistent preparation can make a huge
              difference in your technical interview journey.
            </p>

            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-indigo-700 transition hover:scale-105 hover:bg-indigo-50"
            >
              Explore Jobs
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}