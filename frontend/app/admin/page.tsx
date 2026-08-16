"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

const adminSections = [
  {
    title: "Career Resources",
    description:
      "Manage government exams, interview preparation, tech stacks, core subjects and career roadmaps.",
    href: "/admin/career-resources",
    icon: GraduationCap,
    count: "Manage Career Resources",
    iconBg: "bg-indigo-100",
    iconText: "text-indigo-600",
  },
  {
    title: "Interview Experiences",
    description:
      "Create and manage real interview experiences and detailed articles.",
    href: "/admin/interview-experiences",
    icon: MessageSquareText,
    count: "Manage Experiences",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
  },
  {
    title: "Tech Stack Preparation",
    description:
      "Create tech stack categories and upload interview preparation resources.",
    href: "/admin/tech-stack-preparation",
    icon: Code2,
    count: "Manage Tech Stacks",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
  },
  {
    title: "Core Subjects",
    description:
      "Create core subjects and manage notes, PDFs and study materials.",
    href: "/admin/core-subjects",
    icon: BookOpen,
    count: "Manage Subjects",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
  },
  
  {
    title: "Direct Hiring",
    description:
      "Manage direct hiring jobs, recruiter opportunities and HR email jobs.",
    href: "/admin/direct-hiring",
    icon: BriefcaseBusiness,
    count: "Manage Direct Hiring",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
  },
  {
    title: "Jobs (Private / Government)",
    description:
      "Manage regular job listings, company images and referral contacts for the Private and Government pages.",
    href: "/admin/jobs",
    icon: Building2,
    count: "Manage Jobs",
    iconBg: "bg-sky-100",
    iconText: "text-sky-600",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200 backdrop-blur">

                <LayoutDashboard size={16} />

                Admin Panel

              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">

                NextHire Dashboard

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">

                Manage career resources, interview preparation and learning
                content from one place.

              </p>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">

              <Settings
                size={38}
                className="text-indigo-200"
              />

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">

                <BriefcaseBusiness size={22} />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Content Sections
                </p>

                <p className="text-2xl font-black text-slate-900">
                  {adminSections.length}
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">

                <Users size={22} />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  User Management
                </p>

                <p className="text-2xl font-black text-slate-900">
                  Coming Soon
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">

                <FileText size={22} />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Resources
                </p>

                <p className="text-2xl font-black text-slate-900">
                  Manage
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-100 p-3 text-green-600">

                <Sparkles size={22} />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Platform
                </p>

                <p className="text-2xl font-black text-slate-900">
                  Active
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MANAGEMENT SECTIONS */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

            Content Management

          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900">

            Manage Your Resources

          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">

            Choose a section to create, update and manage content for NextHire.

          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2">

          {adminSections.map((section) => {

            const Icon = section.icon;

            return (

              <Link
                key={section.title}
                href={section.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${section.iconBg}`}
                  >

                    <Icon
                      size={31}
                      className={section.iconText}
                    />

                  </div>


                  <ArrowRight
                    size={22}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
                  />

                </div>


                <h3 className="mt-7 text-2xl font-black text-slate-900">

                  {section.title}

                </h3>


                <p className="mt-4 min-h-[56px] leading-7 text-slate-600">

                  {section.description}

                </p>


                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition group-hover:bg-indigo-600">

                  {section.count}

                  <ArrowRight size={17} />

                </div>

              </Link>

            );

          })}

        </div>

      </section>

    </main>
  );
}
