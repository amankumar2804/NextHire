"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";

const sections = [
  {
    title: "Resume Templates",
    description:
      "Manage the visual design themes users can choose from while building their resume.",
    href: "/admin/career-resources/resume-builder/templates",
    icon: Layers,
    iconBg: "bg-indigo-100",
    iconText: "text-indigo-600",
    badge: "Design Themes",
  },
  {
    title: "Resume Tips & Guides",
    description:
      "Publish writing tips, guides and best practices to help users build better resumes.",
    href: "/admin/career-resources/resume-builder/tips",
    icon: FileText,
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    badge: "Writing Guide",
  },
];

export default function ResumeBuilderAdminHubPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/admin/career-resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Resources
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">
            <Sparkles size={16} />
            Content Management
          </div>

          <h1 className="text-4xl font-black md:text-5xl">Resume Builder</h1>

          <p className="mt-4 max-w-2xl text-lg text-indigo-100">
            Manage resume templates and writing guides shown to users on the
            resume builder tool.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Resource Management
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">
            Choose a Section
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-50 transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${section.iconBg}`}
                    >
                      <Icon size={31} className={section.iconText} />
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>

                  <p className="mt-7 text-xs font-bold uppercase tracking-widest text-indigo-600">
                    {section.badge}
                  </p>

                  <h3 className="mt-3 text-2xl font-black text-slate-900">
                    {section.title}
                  </h3>

                  <p className="mt-4 min-h-[72px] leading-7 text-slate-600">
                    {section.description}
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
    </main>
  );
}
