"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileText,
  MessageSquareText,
  Network,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const sections = [
  {
    title: "Interview Experiences",
    description:
      "Read real interview experiences shared by candidates and understand the complete interview journey of different companies and roles.",
    icon: MessageSquareText,
    color: "blue",
    href: "/career-resources/interview-preparation/interview-experiences",
    badge: "Real Experiences",
    features: [
      "Company-wise experiences",
      "Complete interview rounds",
      "Technical & HR questions",
      "Candidate preparation tips",
    ],
  },
  {
    title: "Tech Stack Preparation",
    description:
      "Prepare for interviews based on your technology and career path with important questions, notes, resources and articles.",
    icon: Code2,
    color: "purple",
    href: "/career-resources/interview-preparation/tech-stack",
    badge: "Technology Focused",
    features: [
      "Web Development",
      "MERN & Java",
      "AI / ML & Data Science",
      "Cloud & DevOps",
    ],
  },
  {
    title: "Core CS Subjects",
    description:
      "Strengthen your computer science fundamentals with interview-focused notes and resources for important core subjects.",
    icon: Network,
    color: "green",
    href: "/career-resources/interview-preparation/core-subjects",
    badge: "Fundamentals",
    features: [
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "OOPs & Software Engineering",
    ],
  },
];

const colorStyles: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    button: string;
    soft: string;
  }
> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
    soft: "bg-blue-50",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    button: "bg-purple-600 hover:bg-purple-700",
    soft: "bg-purple-50",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    button: "bg-green-600 hover:bg-green-700",
    soft: "bg-green-50",
  },
};

export default function InterviewPreparationPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-20 text-white">

        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

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

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-indigo-300 ring-1 ring-white/20 backdrop-blur">

              <BriefcaseBusiness size={40} />

            </div>


            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-indigo-300">

              Career Preparation Hub

            </p>


            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">

              Interview Preparation

            </h1>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">

              Prepare smarter with real interview experiences, technology-focused
              resources and strong computer science fundamentals.

            </p>


            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">

                Real Interview Experiences

              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">

                Tech Stack Preparation

              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">

                Core CS Fundamentals

              </span>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-indigo-600">
              3
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Preparation Areas
            </p>

          </div>


          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-purple-600">
              100+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Resources Coming Soon
            </p>

          </div>


          <div className="p-6 text-center">

            <div className="text-3xl font-black text-green-600">
              Free
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Resources
            </p>

          </div>

        </div>

      </section>


      {/* INTRODUCTION */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">

              <Rocket size={32} />

            </div>


            <h2 className="mt-8 text-3xl font-black">

              Prepare With Confidence

            </h2>


            <p className="mt-4 leading-7 text-indigo-100">

              Interviews become easier when you understand what companies ask,
              what skills are important and how real candidates prepare.

            </p>


            <div className="mt-8 rounded-2xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <CheckCircle2 size={21} />

                <span className="font-semibold">

                  Learn → Practice → Prepare → Get Hired

                </span>

              </div>

            </div>

          </div>


          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              Your Interview Journey

            </p>


            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">

              Everything you need to prepare better.

            </h2>


            <p className="mt-6 leading-8 text-slate-600">

              Whether you want to learn from someone else's interview
              experience, prepare for a specific technology or strengthen your
              core CS subjects, this section will help you prepare step by step.

            </p>


            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">

                  Learn from real interview experiences.

                </p>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">

                  Prepare according to your tech stack.

                </p>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />

                <p className="text-slate-700">

                  Strengthen your core computer science fundamentals.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MAIN SECTIONS */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">

              Explore Preparation Areas

            </p>


            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">

              Choose How You Want To Prepare

            </h2>


            <p className="mx-auto mt-4 max-w-2xl text-slate-600">

              Select a preparation path and start building the knowledge you
              need for your next interview.

            </p>

          </div>


          <div className="mt-12 grid gap-6 lg:grid-cols-3">

            {sections.map((section) => {

              const Icon = section.icon;

              const style = colorStyles[section.color];

              return (

                <Link
                  key={section.title}
                  href={section.href}
                  className={`group rounded-3xl border bg-slate-50 p-7 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl ${style.border}`}
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
                    >

                      <Icon size={31} />

                    </div>


                    <ChevronRight
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
                    />

                  </div>


                  <span
                    className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-bold ${style.soft} ${style.text}`}
                  >

                    {section.badge}

                  </span>


                  <h3 className="mt-5 text-2xl font-black text-slate-900">

                    {section.title}

                  </h3>


                  <p className="mt-4 min-h-[112px] leading-7 text-slate-600">

                    {section.description}

                  </p>


                  <div className="mt-6 space-y-3">

                    {section.features.map((feature) => (

                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm font-medium text-slate-700"
                      >

                        <CheckCircle2
                          size={17}
                          className={`shrink-0 ${style.text}`}
                        />

                        {feature}

                      </div>

                    ))}

                  </div>


                  <div
                    className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition group-hover:gap-4 ${style.button}`}
                  >

                    Explore Section

                    <ArrowRight size={18} />

                  </div>

                </Link>

              );

            })}

          </div>

        </div>

      </section>


      {/* PREPARATION FLOW */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl md:p-14">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">

              Smart Preparation Strategy

            </p>


            <h2 className="mt-4 text-3xl font-black md:text-5xl">

              Prepare in the right order.

            </h2>


            <p className="mt-5 leading-8 text-slate-300">

              Start by understanding real interview experiences, then prepare
              your technology and finally strengthen your core computer science
              concepts.

            </p>

          </div>


          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <MessageSquareText className="text-blue-400" size={28} />

              <p className="mt-4 text-sm font-bold text-blue-400">
                STEP 01
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Understand Experiences
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">

                Learn what real candidates experienced during interviews.

              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <Code2 className="text-purple-400" size={28} />

              <p className="mt-4 text-sm font-bold text-purple-400">
                STEP 02
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Prepare Your Skills
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">

                Focus on the technology and skills required for your target
                role.

              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <Trophy className="text-green-400" size={28} />

              <p className="mt-4 text-sm font-bold text-green-400">
                STEP 03
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Crack The Interview
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">

                Practice consistently and approach your interview with
                confidence.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-14">

          <div className="relative z-10 max-w-3xl">

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">

              <Sparkles size={17} />

              Your next interview can be better prepared

            </div>


            <h2 className="mt-4 text-3xl font-black md:text-5xl">

              Learn from others. Prepare yourself. Get hired.

            </h2>


            <p className="mt-5 leading-7 text-indigo-100">

              Explore interview experiences, improve your technical skills and
              strengthen your fundamentals.

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
