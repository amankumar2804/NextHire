"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  FileEdit,
  GraduationCap,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const careerResources = [
  {
    title: "Government Exams",
    description:
      "Manage exam blueprints, patterns, syllabus and detailed exam preparation articles.",
    href: "/admin/career-resources/government-exams",
    icon: GraduationCap,
    iconBg: "bg-indigo-100",
    iconText: "text-indigo-600",
    badge: "Exam Preparation",
  },
  {
    title: "Career News",
    description:
      "Publish career news, hiring updates, company announcements and important trends.",
    href: "/admin/career-resources/career-news",
    icon: Newspaper,
    iconBg: "bg-rose-100",
    iconText: "text-rose-600",
    badge: "News & Updates",
  },
  {
    title: "Resume Builder",
    description:
      "Manage resume templates and writing guides shown on the resume builder tool.",
    href: "/admin/career-resources/resume-builder",
    icon: FileEdit,
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    badge: "Templates & Tips",
  },
  {
    title: "Career Roadmaps",
    description:
      "Manage roadmap categories and upload downloadable PDF, JPG and PNG resources.",
    href: "/admin/career-resources/career-roadmaps",
    icon: TrendingUp,
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    badge: "Step-by-Step Roadmaps",
  },
];

export default function CareerResourcesAdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">

          <Link
            href="/admin"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Admin Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

                <Sparkles size={16} />

                Content Management

              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">

                Career Resources

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                Manage government exam preparation content from one organized
                place.

              </p>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">

              <BriefcaseBusiness
                size={38}
                className="text-indigo-200"
              />

            </div>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

            Resource Management

          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900">

            Choose a Resource Section

          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">

            Select a section to create, update and manage government exam
            preparation content.

          </p>

        </div>


        {/* RESOURCE CARDS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {careerResources.map((resource) => {

            const Icon = resource.icon;

            return (

              <Link
                key={resource.title}
                href={resource.href}
                className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                {/* Background Decoration */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-50 transition duration-500 group-hover:scale-150" />


                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${resource.iconBg}`}
                    >

                      <Icon
                        size={31}
                        className={resource.iconText}
                      />

                    </div>


                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">

                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />

                    </div>

                  </div>


                  <p className="mt-7 text-xs font-bold uppercase tracking-widest text-indigo-600">

                    {resource.badge}

                  </p>


                  <h3 className="mt-3 text-2xl font-black text-slate-900">

                    {resource.title}

                  </h3>


                  <p className="mt-4 min-h-[72px] leading-7 text-slate-600">

                    {resource.description}

                  </p>


                  <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition group-hover:bg-indigo-600">

                    Manage Section

                    <ArrowRight size={17} />

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </section>


      {/* INFO */}

      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:flex-row sm:items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">

              <Sparkles size={24} />

            </div>

            <div>

              <h3 className="font-bold text-slate-900">

                Government exam preparation content

              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">

                Manage exam categories, exam blueprints, syllabus and
                preparation articles from the Government Exams section.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
