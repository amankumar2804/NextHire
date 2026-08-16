"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  BookOpen,
  FileText,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";


type Subject = {
  _id: string;

  name: string;

  slug: string;

  description?: string;

  icon?: string;

  image?: string;

  gradient?: string;

  isActive?: boolean;
};


type NotesCategory = {
  _id: string;

  name: string;

  slug: string;

  description?: string;

  icon?: string;

  image?: string;

  gradient?: string;

  isActive?: boolean;
};


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function NotesCategorySubjectsPage() {

  const params =
    useParams();


  const categoryId =
    params.id as string;


  const [
    category,
    setCategory,
  ] = useState<
    NotesCategory | null
  >(null);


  const [
    subjects,
    setSubjects,
  ] = useState<
    Subject[]
  >([]);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    deletingId,
    setDeletingId,
  ] = useState<
    string | null
  >(null);


  // =====================================
  // FETCH CATEGORY + SUBJECTS
  // =====================================

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          setLoading(true);


          const [

            categoryResponse,

            subjectsResponse,

          ] = await Promise.all([

            fetch(

              `${API_URL}/api/government-notes-categories/${categoryId}`

            ),

            fetch(

              `${API_URL}/api/government-notes-categories/${categoryId}/subjects`

            ),

          ]);


          // =====================================
          // CATEGORY
          // =====================================

          const categoryText =
            await categoryResponse.text();


          let categoryData;


          try {

            categoryData =
              JSON.parse(
                categoryText
              );

          } catch {

            throw new Error(

              "Category API returned an invalid response"

            );

          }


          if (
            !categoryResponse.ok
          ) {

            throw new Error(

              categoryData.message ||

              "Failed to fetch notes category"

            );

          }


          setCategory(

            categoryData.category ||

            null

          );


          // =====================================
          // SUBJECTS
          // =====================================

          const subjectsText =
            await subjectsResponse.text();


          let subjectsData;


          try {

            subjectsData =
              JSON.parse(
                subjectsText
              );

          } catch {

            throw new Error(

              "Subjects API returned an invalid response"

            );

          }


          if (
            !subjectsResponse.ok
          ) {

            throw new Error(

              subjectsData.message ||

              "Failed to fetch subjects"

            );

          }


          setSubjects(

            Array.isArray(

              subjectsData.subjects

            )

              ? subjectsData.subjects

              : []

          );


        } catch (error) {

          console.error(

            "Fetch Notes Subjects Error:",

            error

          );


          alert(

            error instanceof Error

              ? error.message

              : "Failed to load subjects"

          );


        } finally {

          setLoading(false);

        }

      };


    if (
      categoryId
    ) {

      fetchData();

    }


  }, [
    categoryId
  ]);


  // =====================================
  // DELETE SUBJECT
  // =====================================

  const handleDelete =
    async (
      subjectId: string
    ) => {

      const confirmed =
        window.confirm(

          "Are you sure you want to delete this subject?"

        );


      if (
        !confirmed
      ) {

        return;

      }


      try {

        setDeletingId(

          subjectId

        );


        const response =
          await fetch(

            `${API_URL}/api/government-notes-categories/${categoryId}/subjects/${subjectId}`,

            {

              method:
                "DELETE",

            }

          );


        const text =
          await response.text();


        let result;


        try {

          result =
            JSON.parse(
              text
            );

        } catch {

          throw new Error(

            "Backend returned an invalid response"

          );

        }


        if (
          !response.ok
        ) {

          throw new Error(

            result.message ||

            "Failed to delete subject"

          );

        }


        setSubjects(

          (
            previous
          ) =>

            previous.filter(

              (
                subject
              ) =>

                subject._id !==

                subjectId

            )

        );


        alert(

          "Subject deleted successfully"

        );


      } catch (error) {

        console.error(

          "Delete Subject Error:",

          error

        );


        alert(

          error instanceof Error

            ? error.message

            : "Failed to delete subject"

        );


      } finally {

        setDeletingId(

          null

        );

      }

    };


  // =====================================
  // SEARCH SUBJECTS
  // =====================================

  const filteredSubjects =

    subjects.filter(

      (
        subject
      ) => {

        const query =

          search

            .toLowerCase()

            .trim();


        return (

          subject.name

            .toLowerCase()

            .includes(
              query
            )

          ||

          subject.slug

            .toLowerCase()

            .includes(
              query
            )

        );

      }

    );


  // =====================================
  // LOADING
  // =====================================

  if (
    loading
  ) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />


          <p className="mt-4 font-semibold text-slate-600">

            Loading subjects...

          </p>

        </div>

      </main>

    );

  }


  return (

    <main className="min-h-screen bg-slate-50">


      {/* =================================
          HEADER
      ================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">


        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />


        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />


        <div className="relative mx-auto max-w-7xl px-6 py-12">


          <Link

            href="/admin/career-resources/government-exams/notes/categories"

            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"

          >

            <ArrowLeft size={17} />

            Back to Notes Categories

          </Link>


          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">


            <div>


              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100 backdrop-blur">

                <Sparkles size={16} />

                Subject Management

              </div>


              <h1 className="text-4xl font-black tracking-tight md:text-6xl">

                {

                  category?.name ||

                  "Notes Category"

                }

              </h1>


              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                {

                  category?.description ||

                  "Create and manage subjects for this notes category."

                }

              </p>

            </div>


            <Link

              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/new`}

              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-lg font-black text-slate-900 shadow-xl transition hover:-translate-y-1 hover:bg-indigo-50"

            >

              <Plus size={22} />

              Add Subject

            </Link>

          </div>

        </div>

      </section>


      {/* =================================
          MAIN
      ================================= */}

      <section className="mx-auto max-w-7xl px-6 py-12">


        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">


          <div>


            <p className="text-sm font-black uppercase tracking-widest text-indigo-600">

              {

                subjects.length

              }

              {" "}

              Subjects

            </p>


            <h2 className="mt-2 text-3xl font-black text-slate-900">

              Manage Subjects

            </h2>


            <p className="mt-2 text-slate-600">

              Add subjects like Mathematics, Reasoning, English, General Awareness and more.

            </p>

          </div>


          <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:max-w-sm">


            <Search

              size={20}

              className="text-slate-400"

            />


            <input

              type="text"

              value={
                search
              }

              onChange={

                (
                  event
                ) =>

                  setSearch(

                    event.target.value

                  )

              }

              placeholder="Search subjects..."

              className="w-full bg-transparent font-medium text-slate-700 outline-none placeholder:text-slate-400"

            />

          </div>

        </div>


        {/* =================================
            EMPTY STATE
        ================================= */}

        {

          filteredSubjects.length === 0

            ? (

              <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">


                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">

                  <BookOpen size={38} />

                </div>


                <h3 className="mt-6 text-2xl font-black text-slate-900">

                  {

                    search

                      ? "No matching subjects"

                      : "No subjects added yet"

                  }

                </h3>


                <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">

                  {

                    search

                      ? "Try a different subject name."

                      : "Create your first subject to start adding notes and study material."

                  }

                </p>


                {

                  !search && (

                    <Link

                      href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/new`}

                      className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"

                    >

                      <Plus size={18} />

                      Add First Subject

                    </Link>

                  )

                }

              </div>

            )

            : (

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


                {

                  filteredSubjects.map(

                    (
                      subject
                    ) => (

                      <div

                        key={
                          subject._id
                        }

                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"

                      >


                        {/* =================================
                            FULL IMAGE FIT
                        ================================= */}

                        <div className="flex h-52 w-full items-center justify-center bg-slate-100 p-3">


                          {

                            subject.image

                              ? (

                                <img

                                  src={
                                    subject.image
                                  }

                                  alt={
                                    subject.name
                                  }

                                  className="h-full w-full object-contain"

                                />

                              )

                              : (

                                <div

                                  className={`flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br ${
                                    subject.gradient ||

                                    "from-indigo-500 to-violet-600"

                                  }`}

                                >

                                  <span className="text-5xl">

                                    {

                                      subject.icon ||

                                      "📚"

                                    }

                                  </span>

                                </div>

                              )

                          }

                        </div>


                        <div className="p-6">


                          <div className="flex items-start justify-between gap-4">


                            <div>


                              <h3 className="text-xl font-black text-slate-900">

                                {

                                  subject.name

                                }

                              </h3>


                              <p className="mt-1 text-sm font-bold text-indigo-600">

                                /

                                {

                                  subject.slug

                                }

                              </p>

                            </div>


                            <span

                              className={`rounded-full px-3 py-1 text-xs font-black ${
                                subject.isActive ===
                                false

                                  ? "bg-slate-100 text-slate-500"

                                  : "bg-emerald-100 text-emerald-700"

                              }`}

                            >

                              {

                                subject.isActive ===
                                false

                                  ? "Inactive"

                                  : "Active"

                              }

                            </span>

                          </div>


                          {

                            subject.description && (

                              <p className="mt-4 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">

                                {

                                  subject.description

                                }

                              </p>

                            )

                          }


                          <div className="mt-6 flex items-center gap-3">


                            <Link

                              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/${subject._id}/notes`}

                              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700"

                            >

                              <FileText size={17} />

                              Manage Notes

                            </Link>


                            <Link

                              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}/subjects/edit/${subject._id}`}

                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"

                              title="Edit Subject"

                            >

                              <Pencil size={18} />

                            </Link>


                            <button

                              type="button"

                              onClick={

                                () =>

                                  handleDelete(

                                    subject._id

                                  )

                              }

                              disabled={

                                deletingId ===

                                subject._id

                              }

                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"

                              title="Delete Subject"

                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </div>

                      </div>

                    )

                  )

                }

              </div>

            )

        }

      </section>

    </main>

  );

}