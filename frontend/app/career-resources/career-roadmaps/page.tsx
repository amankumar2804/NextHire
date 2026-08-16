"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Download,
  Eye,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Layers3,
  Map,
  Rocket,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";


// ===============================
// BACKEND API URL
// ===============================

const API_URL = "http://localhost:5000";


// ===============================
// STATIC INTERACTIVE ROADMAPS
// ===============================

const roadmaps = [
  {
    title: "Full Stack Developer",
    description:
      "Learn frontend, backend, databases and deployment to become a complete full stack developer.",
    icon: Layers3,
    color: "blue",
    level: "Beginner to Advanced",
    steps: "8 Learning Stages",
    href: "/career-resources/career-roadmaps/full-stack-developer",
  },
  {
    title: "MERN Stack Developer",
    description:
      "Master MongoDB, Express, React and Node.js to build modern full stack web applications.",
    icon: Code2,
    color: "green",
    level: "Beginner to Advanced",
    steps: "8 Learning Stages",
    href: "/career-resources/career-roadmaps/mern-stack-developer",
  },
  {
    title: "Java Developer",
    description:
      "Build a strong foundation in Java, OOPs, Spring Boot, databases and backend development.",
    icon: Code2,
    color: "orange",
    level: "Beginner to Advanced",
    steps: "8 Learning Stages",
    href: "/career-resources/career-roadmaps/java-developer",
  },
  {
    title: "AI / ML Engineer",
    description:
      "Learn Python, mathematics, machine learning and artificial intelligence step-by-step.",
    icon: BrainCircuit,
    color: "purple",
    level: "Beginner to Advanced",
    steps: "9 Learning Stages",
    href: "/career-resources/career-roadmaps/ai-ml-engineer",
  },
  {
    title: "Data Scientist",
    description:
      "Learn data analysis, statistics, Python, machine learning and data visualization.",
    icon: TrendingUp,
    color: "indigo",
    level: "Beginner to Advanced",
    steps: "8 Learning Stages",
    href: "/career-resources/career-roadmaps/data-scientist",
  },
  {
    title: "Cloud & DevOps Engineer",
    description:
      "Learn Linux, networking, cloud platforms, Docker, Kubernetes and CI/CD pipelines.",
    icon: Cloud,
    color: "cyan",
    level: "Intermediate to Advanced",
    steps: "8 Learning Stages",
    href: "/career-resources/career-roadmaps/cloud-devops",
  },
];


// ===============================
// TYPES
// ===============================

type RoadmapFile = {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileName: string;
  fileType: "PDF" | "JPG" | "JPEG" | "PNG";
  fileSize?: string;
};

type RoadmapCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  files: RoadmapFile[];
};


// ===============================
// COLORS
// ===============================

const colors: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    button: string;
  }
> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    button: "bg-green-600 hover:bg-green-700",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    button: "bg-orange-600 hover:bg-orange-700",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    button: "bg-purple-600 hover:bg-purple-700",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    button: "bg-indigo-600 hover:bg-indigo-700",
  },
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    border: "border-cyan-200",
    button: "bg-cyan-600 hover:bg-cyan-700",
  },
};


// ===============================
// PAGE
// ===============================

export default function CareerRoadmapsPage() {
  const [categories, setCategories] = useState<RoadmapCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ===============================
  // FETCH CATEGORIES + FILES
  // ===============================

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        setError("");

        const categoryResponse = await fetch(
          `${API_URL}/api/roadmap-categories`
        );

        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch roadmap categories");
        }

        const categoryData = await categoryResponse.json();

        const categoryList = categoryData.categories || [];

        const categoriesWithFiles = await Promise.all(
          categoryList.map(async (category: RoadmapCategory) => {
            try {
              const fileResponse = await fetch(
                `${API_URL}/api/roadmap-files/category/${category._id}`
              );

              if (!fileResponse.ok) {
                return {
                  ...category,
                  files: [],
                };
              }

              const fileData = await fileResponse.json();

              return {
                ...category,
                files: fileData.files || [],
              };
            } catch {
              return {
                ...category,
                files: [],
              };
            }
          })
        );

        setCategories(categoriesWithFiles);
      } catch (error) {
        console.error("Roadmap fetch error:", error);

        setError(
          "Unable to load downloadable roadmaps. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData();
  }, []);


  return (
    <main className="min-h-screen bg-slate-50">


      {/* ===============================
          HERO
      =============================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-20 text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <Link
            href="/career-resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to Career Resources
          </Link>


          <div className="mx-auto mt-14 max-w-4xl text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

              <Map size={16} />

              Plan Your Career Journey

            </div>


            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">

              Career Roadmaps

            </h1>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">

              Follow structured career roadmaps and explore downloadable
              resources to build the right skills for your dream career.

            </p>

          </div>

        </div>

      </section>


      {/* ===============================
          STATS
      =============================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-indigo-600">
              6+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Career Paths
            </p>

          </div>


          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-purple-600">
              40+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Stages
            </p>

          </div>


          <div className="p-6 text-center">

            <div className="text-3xl font-black text-green-600">
              Free
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Career Guidance
            </p>

          </div>

        </div>

      </section>


      {/* ===============================
          INTRODUCTION
      =============================== */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">


          <div>

            <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-2xl">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">

                <Rocket size={32} />

              </div>


              <h3 className="mt-8 text-3xl font-black">

                Start Your Journey

              </h3>


              <p className="mt-4 leading-7 text-indigo-100">

                A clear roadmap can save months of confusion and help you
                focus on the skills that actually matter.

              </p>


              <div className="mt-8 rounded-2xl bg-white/10 p-5">

                <div className="flex items-center gap-3">

                  <CheckCircle2 size={21} />

                  <span className="font-semibold">

                    Learn → Build → Practice → Get Hired

                  </span>

                </div>

              </div>

            </div>

          </div>


          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              No More Confusion

            </p>


            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">

              Know exactly what to learn next.

            </h2>


            <p className="mt-6 leading-8 text-slate-600">

              Choose a structured roadmap, learn the right skills, build
              projects and prepare yourself for real job opportunities.

            </p>


            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">

                  Follow a clear step-by-step learning path.

                </p>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">

                  Explore multiple roadmap categories.

                </p>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">

                  Download useful PDF and image-based roadmaps.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===============================
          INTERACTIVE ROADMAPS
      =============================== */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              Interactive Roadmaps

            </p>


            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">

              Choose Your Career Path

            </h2>


            <p className="mx-auto mt-4 max-w-2xl text-slate-600">

              Follow a complete step-by-step learning path designed for your
              career goal.

            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {roadmaps.map((roadmap) => {

              const Icon = roadmap.icon;

              const color = colors[roadmap.color];

              return (

                <Link
                  key={roadmap.title}
                  href={roadmap.href}
                  className={`group rounded-3xl border bg-slate-50 p-7 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl ${color.border}`}
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg}`}
                    >

                      <Icon
                        size={31}
                        className={color.text}
                      />

                    </div>


                    <ChevronRight
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
                    />

                  </div>


                  <h3 className="mt-7 text-2xl font-black text-slate-900">

                    {roadmap.title}

                  </h3>


                  <p className="mt-4 min-h-[84px] leading-7 text-slate-600">

                    {roadmap.description}

                  </p>


                  <div className="mt-6 flex flex-wrap gap-2">

                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">

                      {roadmap.level}

                    </span>


                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">

                      {roadmap.steps}

                    </span>

                  </div>


                  <div
                    className={`mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition group-hover:gap-4 ${color.button}`}
                  >

                    View Roadmap

                    <ArrowRight size={18} />

                  </div>

                </Link>

              );

            })}

          </div>

        </div>

      </section>


      {/* ===============================
          DYNAMIC DOWNLOADABLE ROADMAPS
      =============================== */}

      <section className="bg-slate-50 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-purple-600">

                Downloadable Resources

              </p>


              <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">

                Explore Roadmap Categories

              </h2>


              <p className="mt-4 max-w-2xl text-slate-600">

                Browse categories and explore multiple PDF, JPG and PNG
                roadmaps inside each category.

              </p>

            </div>


            <div className="rounded-2xl border border-purple-200 bg-purple-50 px-5 py-3 text-sm font-semibold text-purple-700">

              📚 New resources can be added anytime

            </div>

          </div>


          {loading && (

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-12 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

              <p className="mt-4 font-semibold text-slate-600">

                Loading roadmap categories...

              </p>

            </div>

          )}


          {!loading && error && (

            <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

              <p className="font-semibold text-red-700">

                {error}

              </p>

            </div>

          )}


          {!loading && !error && categories.length === 0 && (

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-12 text-center">

              <FolderOpen
                size={45}
                className="mx-auto text-slate-400"
              />


              <h3 className="mt-4 text-xl font-bold text-slate-800">

                No roadmap categories available yet

              </h3>


              <p className="mt-2 text-slate-500">

                New roadmap categories and files will appear here.

              </p>

            </div>

          )}


          {!loading && !error && categories.length > 0 && (

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {categories.map((category) => (

                <div
                  key={category._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">

                        <FolderOpen size={27} />

                      </div>


                      <div>

                        <h3 className="text-xl font-black text-slate-900">

                          {category.name}

                        </h3>


                        <p className="mt-1 text-sm text-slate-500">

                          {category.files.length} downloadable resources

                        </p>

                      </div>

                    </div>


                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">

                      {category.files.length} Files

                    </span>

                  </div>


                  {category.description && (

                    <p className="mt-5 text-sm leading-6 text-slate-600">

                      {category.description}

                    </p>

                  )}


                  {category.files.length === 0 ? (

                    <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">

                      <p className="text-sm font-semibold text-slate-500">

                        No files available in this category yet.

                      </p>

                    </div>

                  ) : (

                    <div className="mt-6 space-y-3">

                      {category.files.map((file) => (

                        <div
                          key={file._id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">

                              {file.fileType === "PDF" ? (

                                <FileText size={19} />

                              ) : (

                                <ImageIcon size={19} />

                              )}

                            </div>


                            <div className="min-w-0">

                              <h4 className="truncate text-sm font-bold text-slate-800">

                                {file.title}

                              </h4>


                              <p className="mt-1 text-xs text-slate-500">

                                {file.fileType}

                                {file.fileSize
                                  ? ` • ${file.fileSize}`
                                  : ""}

                              </p>

                            </div>

                          </div>


                          <div className="flex shrink-0 gap-2">

                            <a
                              href={file.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-purple-300 hover:text-purple-600"
                            >

                              <Eye size={15} />

                              View

                            </a>


                            <a
                              href={file.fileUrl}
                              download={file.fileName}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-purple-700"
                            >

                              <Download size={15} />

                              Download

                            </a>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ===============================
          CTA
      =============================== */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-14">

          <div className="relative z-10 max-w-2xl">

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">

              <Sparkles size={17} />

              Your future starts with one step

            </div>


            <h2 className="mt-4 text-3xl font-black md:text-5xl">

              Choose a path. Learn consistently. Build your career.

            </h2>


            <p className="mt-5 leading-7 text-indigo-100">

              You do not need to learn everything. You just need to learn the
              right things in the right order.

            </p>


            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-indigo-700 transition hover:scale-105 hover:bg-indigo-50"
            >

              Explore Jobs

              <ArrowRight size={18} />

            </Link>

          </div>


          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

          <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full border-[40px] border-white/5" />

        </div>

      </section>

    </main>
  );
}