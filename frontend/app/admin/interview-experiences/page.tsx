"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Trash2,
  Eye,
  CalendarDays,
  BriefcaseBusiness,
  Loader2,
  ExternalLink,
  Pencil,
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
  imageUrl?: string;
  slug: string;
  isPublished: boolean;
};

const API_URL = "http://localhost:5000";

export default function InterviewExperiencesAdminPage() {
  const [experiences, setExperiences] = useState<
    InterviewExperience[]
  >([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");


  // =====================================
  // FETCH ALL EXPERIENCES
  // =====================================

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `${API_URL}/api/interview-experiences`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch experiences"
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


  useEffect(() => {
    fetchExperiences();
  }, []);


  // =====================================
  // DELETE EXPERIENCE
  // =====================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview experience?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/api/interview-experiences/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete experience"
        );
      }

      setExperiences((previous) =>
        previous.filter(
          (experience) =>
            experience._id !== id
        )
      );

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete experience"
      );

    } finally {
      setDeletingId(null);
    }
  };


  // =====================================
  // SEARCH FILTER
  // =====================================

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

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-12 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Back to Dashboard

          </Link>


          <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="font-bold uppercase tracking-widest text-indigo-300">

                Admin Management

              </p>


              <h1 className="mt-2 text-4xl font-black md:text-5xl">

                Interview Experiences

              </h1>


              <p className="mt-3 max-w-2xl text-indigo-100">

                Manage all interview experiences published on NextHire.

              </p>

            </div>


            <Link
              href="/admin/interview-experiences/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
            >

              <Plus size={20} />

              Add Experience

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12">


        {/* SEARCH */}

        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

          <Search
            size={21}
            className="text-slate-400"
          />


          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by company, role or category..."
            className="w-full outline-none placeholder:text-slate-400"
          />

        </div>


        {/* ERROR */}

        {error && (

          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 font-semibold text-red-700">

            {error}

          </div>

        )}


        {/* LOADING */}

        {loading && (

          <div className="flex min-h-60 items-center justify-center">

            <Loader2
              size={40}
              className="animate-spin text-indigo-600"
            />

          </div>

        )}


        {/* EMPTY STATE */}

        {!loading &&
          filteredExperiences.length === 0 && (

            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center">

              <BriefcaseBusiness
                size={52}
                className="mx-auto text-slate-300"
              />


              <h2 className="mt-5 text-2xl font-black text-slate-900">

                No Experiences Found

              </h2>


              <p className="mt-2 text-slate-500">

                Add your first interview experience.

              </p>


              <Link
                href="/admin/interview-experiences/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
              >

                <Plus size={18} />

                Add Experience

              </Link>

            </div>

          )}


        {/* =====================================
            EXPERIENCE LIST
        ===================================== */}

        {!loading &&
          filteredExperiences.length > 0 && (

            <div className="space-y-5">

              {filteredExperiences.map(
                (experience) => (

                  <div
                    key={experience._id}
                    className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg md:flex-row md:items-center"
                  >

                    {/* IMAGE */}

                    <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:w-52">

                      {experience.imageUrl ? (

                        <img
                          src={
                            experience.imageUrl
                          }
                          alt={
                            experience.company
                          }
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4 text-center text-xl font-black text-white">

                          {experience.company}

                        </div>

                      )}

                    </div>


                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        {/* CATEGORY */}

                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">

                          {experience.category}

                        </span>


                        {/* STATUS */}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            experience.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >

                          {experience.isPublished
                            ? "Published"
                            : "Draft"}

                        </span>

                      </div>


                      <h2 className="mt-3 text-2xl font-black text-slate-900">

                        {experience.company}

                      </h2>


                      <p className="font-bold text-indigo-600">

                        {experience.role}

                      </p>


                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">

                        {experience.summary}

                      </p>


                      <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">

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

                    </div>


                    {/* ACTION BUTTONS */}

                    <div className="flex shrink-0 flex-wrap gap-3 md:flex-col">


                      {/* EDIT */}

                      <Link
                        href={`/admin/interview-experiences/${experience._id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                      >

                        <Pencil
                          size={17}
                        />

                        Edit

                      </Link>


                      {/* VIEW */}

                      <Link
                        href={`/career-resources/interview-preparation/interview-experiences/${experience.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                      >

                        <Eye
                          size={17}
                        />

                        View

                        <ExternalLink
                          size={14}
                        />

                      </Link>


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            experience._id
                          )
                        }
                        disabled={
                          deletingId ===
                          experience._id
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >

                        {deletingId ===
                        experience._id ? (

                          <Loader2
                            size={17}
                            className="animate-spin"
                          />

                        ) : (

                          <Trash2
                            size={17}
                          />

                        )}

                        Delete

                      </button>

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