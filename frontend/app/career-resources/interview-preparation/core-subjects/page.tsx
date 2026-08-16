"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Database,
  FileCode2,
  Layers3,
  Network,
  Server,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

type CoreSubjectCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
};

const subjectIcons = [
  Database,
  Server,
  Network,
  Code2,
  Layers3,
  FileCode2,
  BrainCircuit,
];

const subjectColors = [
  {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    button: "bg-purple-600 hover:bg-purple-700",
  },
  {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    border: "border-cyan-200",
    button: "bg-cyan-600 hover:bg-cyan-700",
  },
  {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    button: "bg-orange-600 hover:bg-orange-700",
  },
  {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    button: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    button: "bg-green-600 hover:bg-green-700",
  },
  {
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    button: "bg-pink-600 hover:bg-pink-700",
  },
];

export default function CoreSubjectsPage() {
  const [categories, setCategories] = useState<
    CoreSubjectCategory[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/core-subject-categories`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch core subject categories"
          );
        }

        const data =
          await response.json();

        setCategories(
          data.categories || []
        );
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load core subject categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ==========================================
          HERO
      ========================================== */}

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

              <BookOpen size={16} />

              Core Computer Science Subjects

            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">

              Core Subjects Preparation

            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">

              Strengthen your computer science fundamentals with structured
              notes and resources for interviews, exams and placements.

            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          INTRO
      ========================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm md:p-12">

          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">

              <BrainCircuit size={40} />

            </div>

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

                Build Strong Fundamentals

              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-900">

                Master the subjects that every developer should know.

              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-600">

                Explore structured notes and study resources for important
                computer science subjects. Learn the concepts, revise quickly
                and prepare confidently for technical interviews.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          SUBJECTS
      ========================================== */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              Explore Subjects

            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">

              Choose a Core Subject

            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">

              Select a subject to explore notes and preparation resources.

            </p>

          </div>


          {loading && (

            <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

              <p className="mt-4 font-semibold text-slate-600">

                Loading core subjects...

              </p>

            </div>

          )}


          {!loading && error && (

            <div className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

              <p className="font-semibold text-red-700">

                {error}

              </p>

            </div>

          )}


          {!loading &&
            !error &&
            categories.length === 0 && (

              <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">

                <BookOpen
                  size={45}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-4 text-xl font-bold text-slate-800">

                  No subjects available yet

                </h3>

                <p className="mt-2 text-slate-500">

                  New core subjects will be added soon.

                </p>

              </div>

            )}


          {!loading &&
            !error &&
            categories.length > 0 && (

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {categories.map(
                  (category, index) => {

                    const Icon =
                      subjectIcons[
                        index %
                          subjectIcons.length
                      ];

                    const color =
                      subjectColors[
                        index %
                          subjectColors.length
                      ];

                    return (

                      <Link
                        key={category._id}
                        href={`/career-resources/interview-preparation/core-subjects/${category.slug}`}
                        className={`group overflow-hidden rounded-3xl border bg-slate-50 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl ${color.border}`}
                      >

                        {/* ==========================================
                            CATEGORY IMAGE
                        ========================================== */}

                        <div className="relative h-52 w-full overflow-hidden bg-slate-100">

                          {category.imageUrl ? (

                            <img
                              src={category.imageUrl}
                              alt={category.name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                          ) : (

                            <div
                              className={`flex h-full w-full items-center justify-center ${color.bg}`}
                            >

                              <Icon
                                size={70}
                                className={color.text}
                              />

                            </div>

                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        </div>


                        {/* ==========================================
                            CARD CONTENT
                        ========================================== */}

                        <div className="p-7">

                          <div className="flex items-start justify-between">

                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color.bg}`}
                            >

                              <Icon
                                size={25}
                                className={color.text}
                              />

                            </div>

                            <ArrowRight
                              className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
                            />

                          </div>


                          <h3 className="mt-6 text-2xl font-black text-slate-900">

                            {category.name}

                          </h3>


                          <p className="mt-4 min-h-[72px] leading-7 text-slate-600">

                            {category.description ||
                              `Explore ${category.name} notes and preparation resources.`}

                          </p>


                          <div
                            className={`mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition group-hover:gap-4 ${color.button}`}
                          >

                            Explore Notes

                            <ArrowRight size={18} />

                          </div>

                        </div>

                      </Link>

                    );
                  }
                )}

              </div>

            )}

        </div>

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-14">

          <div className="relative z-10 max-w-2xl">

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">

              <Sparkles size={17} />

              Learn the fundamentals

            </div>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">

              Strong fundamentals build strong developers.

            </h2>

            <p className="mt-5 leading-7 text-indigo-100">

              Master the core concepts, revise consistently and prepare
              yourself for technical interviews.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
