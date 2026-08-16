"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

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
  isPublished: boolean;
};

const API_URL = "http://localhost:5000";

export default function InterviewExperiencesPage() {
  const [experiences, setExperiences] = useState<
    InterviewExperience[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/interview-experiences`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch interview experiences"
          );
        }

        setExperiences(
          data.experiences || []
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

    fetchExperiences();
  }, []);


  const filteredExperiences =
    experiences.filter((experience) => {
      const searchText =
        search.toLowerCase();

      return (
        experience.company
          .toLowerCase()
          .includes(searchText) ||

        experience.role
          .toLowerCase()
          .includes(searchText) ||

        experience.category
          .toLowerCase()
          .includes(searchText)
      );
    });


  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-20 text-white">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />


        <div className="relative mx-auto max-w-7xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-100 backdrop-blur">

            <Sparkles size={16} />

            Real Interview Experiences

          </div>


          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">

            Learn From Real{" "}

            <span className="text-indigo-300">

              Interview Experiences

            </span>

          </h1>


          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">

            Read real interview experiences shared by candidates and understand the interview process, rounds, questions and preparation strategy.

          </p>


          {/* SEARCH */}

          <div className="mt-10 max-w-2xl">

            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">

              <Search
                size={22}
                className="text-indigo-200"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search company, role or category..."
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
              />

            </div>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <p className="font-bold uppercase tracking-widest text-indigo-600">

              Interview Preparation

            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">

              Latest Interview Experiences

            </h2>

          </div>


          <p className="text-slate-500">

            {filteredExperiences.length}{" "}

            Experience
            {filteredExperiences.length !== 1
              ? "s"
              : ""}

          </p>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >

                <div className="h-56 animate-pulse bg-slate-200" />

                <div className="space-y-4 p-6">

                  <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />

                  <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">

            {error}

          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredExperiences.length === 0 && (

            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center">

              <BriefcaseBusiness
                size={48}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-2xl font-black text-slate-900">

                No Interview Experience Found

              </h3>

              <p className="mt-2 text-slate-500">

                Try searching with another company, role or category.

              </p>

            </div>

          )}


        {/* EXPERIENCE CARDS */}

        {!loading &&
          !error &&
          filteredExperiences.length > 0 && (

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {filteredExperiences.map(
                (experience) => (

                  <article
                    key={experience._id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">

                      {experience.imageUrl ? (

                        <img
                          src={
                            experience.imageUrl
                          }
                          alt={`${experience.company} interview experience`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                      ) : (

                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600">

                          <span className="px-6 text-center text-3xl font-black text-white">

                            {experience.company}

                          </span>

                        </div>

                      )}


                      {/* IMAGE OVERLAY */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />


                      {/* CATEGORY */}

                      <div className="absolute left-5 top-5">

                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow backdrop-blur">

                          {experience.category}

                        </span>

                      </div>

                    </div>


                    {/* CARD CONTENT */}

                    <div className="p-6">

                      {/* META */}

                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">

                        <span className="inline-flex items-center gap-1.5">

                          <BriefcaseBusiness
                            size={14}
                          />

                          {experience.interviewType}

                        </span>


                        {experience.year && (

                          <span className="inline-flex items-center gap-1.5">

                            <CalendarDays
                              size={14}
                            />

                            {experience.year}

                          </span>

                        )}

                      </div>


                      {/* COMPANY */}

                      <h3 className="mt-4 text-2xl font-black text-slate-900 transition group-hover:text-indigo-600">

                        {experience.company}

                      </h3>


                      {/* ROLE */}

                      <p className="mt-1 font-bold text-indigo-600">

                        {experience.role}

                      </p>


                      {/* SUMMARY */}

                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">

                        {experience.summary}

                      </p>


                      {/* DETAILS */}

                      <div className="mt-5 flex flex-wrap gap-3">

                        {experience.rounds && (

                          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">

                            {experience.rounds}

                          </span>

                        )}


                        {experience.location && (

                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">

                            <MapPin
                              size={13}
                            />

                            {experience.location}

                          </span>

                        )}

                      </div>


                      {/* READ BUTTON */}

                      <Link
                        href={`/career-resources/interview-preparation/interview-experiences/${experience.slug}`}
                        className="mt-6 flex items-center justify-between rounded-xl bg-slate-950 px-5 py-3.5 font-bold text-white transition hover:bg-indigo-600"
                      >

                        <span>
                          Read Full Experience
                        </span>

                        <ArrowRight
                          size={19}
                          className="transition-transform group-hover:translate-x-1"
                        />

                      </Link>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

      </section>

    </main>
  );
}