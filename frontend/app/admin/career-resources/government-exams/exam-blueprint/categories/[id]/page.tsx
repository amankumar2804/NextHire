"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

type Exam = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function CategoryExamsPage() {
  const params = useParams();

  const categoryId = params.id as string;

  const [category, setCategory] =
    useState<Category | null>(null);

  const [exams, setExams] =
    useState<Exam[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // ============================
  // FETCH CATEGORY + EXAMS
  // ============================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ============================
        // FETCH ALL CATEGORIES
        // ============================

        const categoryResponse =
          await fetch(
            `${API_URL}/api/government-exam-categories`
          );

        const categoryText =
          await categoryResponse.text();

        let categoryData;

        try {
          categoryData =
            JSON.parse(categoryText);
        } catch {
          throw new Error(
            "Backend returned HTML instead of JSON. Check backend URL and route."
          );
        }

        if (!categoryResponse.ok) {
          throw new Error(
            categoryData.message ||
              "Failed to fetch categories"
          );
        }

        const allCategories =
          categoryData.categories ||
          categoryData;

        const foundCategory =
          Array.isArray(allCategories)
            ? allCategories.find(
                (item: Category) =>
                  item._id === categoryId
              )
            : null;

        setCategory(
          foundCategory || null
        );


        // ============================
        // FETCH EXAMS
        // ============================

        const examResponse =
          await fetch(
            `${API_URL}/api/exam-categories/${categoryId}/exams`
          );

        if (!examResponse.ok) {
          setExams([]);
          return;
        }

        const examText =
          await examResponse.text();

        let examData;

        try {
          examData =
            JSON.parse(examText);
        } catch {
          console.warn(
            "Exam API is not returning JSON yet."
          );

          setExams([]);

          return;
        }

        setExams(
          Array.isArray(examData)
            ? examData
            : examData.exams || []
        );

      } catch (error) {
        console.error(
          "Failed to fetch category data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);


  // ============================
  // DELETE EXAM
  // ============================

  const handleDelete = async (
    examId: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this exam?"
      );

    if (!confirmDelete) return;

    try {
      const response =
        await fetch(
          `${API_URL}/api/exam-categories/${examId}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to delete exam"
        );
      }

      setExams((previous) =>
        previous.filter(
          (exam) =>
            exam._id !== examId
        )
      );

      alert(
        "Exam deleted successfully"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete exam"
      );
    }
  };


  // ============================
  // SEARCH
  // ============================

  const filteredExams =
    exams.filter((exam) =>
      exam.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 font-medium text-slate-600">

            Loading exams...

          </p>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50">

      {/* ============================
          HEADER
      ============================ */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">

          {/* BACK */}

          <Link
            href="/admin/career-resources/government-exams/exam-blueprint/categories"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Back to Categories

          </Link>


          {/* HEADER CONTENT */}

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

                <Sparkles size={16} />

                Exam Management

              </div>


              <h1 className="text-4xl font-black tracking-tight md:text-6xl">

                {category?.name ||
                  "Exam Category"}

              </h1>


              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                {category?.description ||
                  "Manage all exams available under this category."}

              </p>

            </div>


            {/* ADD EXAM BUTTON */}

            <Link
              href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/new`}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-lg font-bold text-slate-900 shadow-xl transition hover:-translate-y-1 hover:bg-indigo-50"
            >

              <Plus size={22} />

              Add Exam

            </Link>

          </div>

        </div>

      </section>


      {/* ============================
          MAIN CONTENT
      ============================ */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* TOP AREA */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              {exams.length} Exams

            </p>


            <h2 className="mt-2 text-3xl font-black text-slate-900">

              Manage{" "}

              {category?.name ||
                "Category"}{" "}

              Exams

            </h2>


            <p className="mt-2 text-slate-600">

              Add and manage individual exams like SSC CGL, SSC CHSL, SSC MTS and more.

            </p>

          </div>


          {/* SEARCH */}

          <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:max-w-sm">

            <Search
              size={20}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />

          </div>

        </div>


        {/* ============================
            EMPTY STATE
        ============================ */}

        {filteredExams.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50">

              <BookOpen
                size={38}
                className="text-indigo-500"
              />

            </div>


            <h3 className="mt-6 text-2xl font-black text-slate-900">

              No exams found

            </h3>


            <p className="mx-auto mt-3 max-w-md text-slate-500">

              Start by adding your first exam under{" "}

              {category?.name ||
                "this category"}.

            </p>


            <Link
              href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/new`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
            >

              <Plus size={18} />

              Add First Exam

            </Link>

          </div>

        ) : (

          /* ============================
             EXAMS LIST
          ============================ */

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {filteredExams.map(
              (exam, index) => (

                <div
                  key={exam._id}
                  className={`group flex flex-col gap-5 p-6 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between ${
                    index !==
                    filteredExams.length -
                      1
                      ? "border-b border-slate-200"
                      : ""
                  }`}
                >

                  {/* LEFT */}

                  <div className="flex min-w-0 items-center gap-5">

                    {/* IMAGE */}

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">

                      {exam.image ? (

                        <img
                          src={exam.image}
                          alt={exam.name}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <FileText
                          size={30}
                        />

                      )}

                    </div>


                    {/* DETAILS */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-black text-slate-900">

                          {exam.name}

                        </h3>


                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">

                          {exam.isActive ===
                          false
                            ? "Inactive"
                            : "Active"}

                        </span>

                      </div>


                      <p className="mt-1 text-sm font-medium text-indigo-600">

                        /{exam.slug}

                      </p>


                      {exam.description && (

                        <p className="mt-2 line-clamp-2 text-sm text-slate-500">

                          {
                            exam.description
                          }

                        </p>

                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex shrink-0 items-center gap-3">

                    {/* MANAGE ARTICLES */}

                    <Link
                      href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${exam._id}/articles`}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                    >

                      <FileText size={17} />

                      Manage Articles

                    </Link>

                    {/* EDIT */}

                    <Link
                      href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/edit/${exam._id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    >

                      <Pencil
                        size={17}
                      />

                      Edit

                    </Link>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(
                          exam._id
                        )
                      }
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                      title="Delete Exam"
                    >

                      <Trash2
                        size={18}
                      />

                    </button>


                    {/* OPEN */}

                    <Link
                      href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}/exams/${exam._id}`}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-indigo-600"
                    >

                      <ArrowRight
                        size={19}
                      />

                    </Link>

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
