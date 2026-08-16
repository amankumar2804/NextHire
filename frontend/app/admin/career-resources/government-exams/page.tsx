"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Image as ImageIcon,
  PenLine,
  Sparkles,
} from "lucide-react";

const governmentExamSections = [
  {
    title: "Exam Blueprint",
    subtitle: "Pattern, Syllabus & Articles",
    description:
      "Create and manage government exam categories, exam patterns, syllabus and detailed preparation articles.",
    href: "/admin/career-resources/government-exams/exam-blueprint",
    icon: FileText,
    badge: "Exam Information",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    title: "Notes & Study Material",
    subtitle: "Notes, PDFs & Images",
    description:
      "Upload and manage exam-wise notes, study materials, PDFs and useful images for students.",
    href: "/admin/career-resources/government-exams/notes",
    icon: BookOpen,
    badge: "Study Resources",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Daily Practice / DPP",
    subtitle: "Daily Questions & Practice",
    description:
      "Upload daily practice papers, question sets, PDFs and images to help students practice regularly.",
    href: "/admin/career-resources/government-exams/dpp",
    icon: PenLine,
    badge: "Practice Zone",
    gradient: "from-orange-500 to-red-600",
  },
];

export default function GovernmentExamsAdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">

          <Link
            href="/admin/career-resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Resources
          </Link>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

                <Sparkles size={16} />

                Government Exam Management

              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">

                Government Exams

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                Manage exam information, study materials and daily practice
                resources for government exam aspirants.

              </p>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">

              <BookOpen
                size={38}
                className="text-indigo-200"
              />

            </div>

          </div>

        </div>

      </section>


      {/* MAIN CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

            Content Management

          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900">

            Manage Government Exam Resources

          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">

            Choose what you want to manage. Categories and resources can be
            added from their respective sections.

          </p>

        </div>


        {/* RESOURCE SECTIONS */}

        <div className="grid gap-6 lg:grid-cols-3">

          {governmentExamSections.map((section) => {

            const Icon = section.icon;

            return (

              <Link
                key={section.title}
                href={section.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Decorative Background */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-50 transition duration-500 group-hover:scale-150" />


                <div className="relative">

                  {/* ICON + ARROW */}

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} text-white shadow-lg`}
                    >

                      <Icon size={30} />

                    </div>


                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">

                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />

                    </div>

                  </div>


                  {/* BADGE */}

                  <p className="mt-7 text-xs font-bold uppercase tracking-widest text-indigo-600">

                    {section.badge}

                  </p>


                  {/* TITLE */}

                  <h3 className="mt-3 text-2xl font-black text-slate-900">

                    {section.title}

                  </h3>


                  {/* SUBTITLE */}

                  <p className="mt-2 font-semibold text-slate-500">

                    {section.subtitle}

                  </p>


                  {/* DESCRIPTION */}

                  <p className="mt-4 min-h-[96px] leading-7 text-slate-600">

                    {section.description}

                  </p>


                  {/* BUTTON */}

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


      {/* INFORMATION SECTION */}

      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

              <FileText
                size={26}
                className="text-indigo-600"
              />

              <h3 className="mt-4 font-bold text-slate-900">

                Exam Blueprint

              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">

                Manage exam categories, exams and detailed articles containing
                pattern and syllabus.

              </p>

            </div>


            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

              <BookOpen
                size={26}
                className="text-emerald-600"
              />

              <h3 className="mt-4 font-bold text-slate-900">

                Notes & Materials

              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">

                Upload useful notes, PDFs and images for different exam
                categories.

              </p>

            </div>


            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">

              <ImageIcon
                size={26}
                className="text-orange-600"
              />

              <h3 className="mt-4 font-bold text-slate-900">

                DPP & Practice

              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">

                Add daily practice papers and question sets for regular
                preparation.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}