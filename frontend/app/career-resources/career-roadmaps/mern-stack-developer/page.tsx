"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Globe,
  Layers3,
  Lock,
  Rocket,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState } from "react";

const roadmapSteps = [
  {
    number: "01",
    title: "HTML & CSS",
    subtitle: "Build the foundation of the web",
    icon: Globe,
    color: "blue",
    topics: [
      "HTML5 Semantic Elements",
      "Forms and Validation",
      "CSS Fundamentals",
      "Flexbox",
      "CSS Grid",
      "Responsive Design",
      "Tailwind CSS",
    ],
    project: "Build a responsive portfolio website",
  },
  {
    number: "02",
    title: "JavaScript",
    subtitle: "Make your websites interactive",
    icon: Code2,
    color: "yellow",
    topics: [
      "Variables and Data Types",
      "Functions",
      "Arrays and Objects",
      "DOM Manipulation",
      "ES6+ Features",
      "Async JavaScript",
      "Promises and Fetch API",
    ],
    project: "Build a weather app or task management app",
  },
  {
    number: "03",
    title: "React.js",
    subtitle: "Build modern frontend applications",
    icon: Layers3,
    color: "cyan",
    topics: [
      "Components",
      "Props and State",
      "Hooks",
      "React Router",
      "Context API",
      "API Integration",
      "Performance Optimization",
    ],
    project: "Build a complete job portal frontend",
  },
  {
    number: "04",
    title: "Node.js & Express",
    subtitle: "Build powerful backend APIs",
    icon: Server,
    color: "green",
    topics: [
      "Node.js Fundamentals",
      "Express.js",
      "REST APIs",
      "Middleware",
      "Error Handling",
      "MVC Architecture",
      "API Design",
    ],
    project: "Build a REST API for an e-commerce application",
  },
  {
    number: "05",
    title: "MongoDB",
    subtitle: "Store and manage application data",
    icon: Database,
    color: "emerald",
    topics: [
      "MongoDB Basics",
      "Collections and Documents",
      "CRUD Operations",
      "Mongoose",
      "Schema Design",
      "Relationships",
      "Database Optimization",
    ],
    project: "Design a database for a full stack application",
  },
  {
    number: "06",
    title: "Authentication & Security",
    subtitle: "Protect your applications",
    icon: Lock,
    color: "red",
    topics: [
      "JWT Authentication",
      "Login and Registration",
      "Password Hashing",
      "Authorization",
      "Role-Based Access",
      "CORS",
      "Environment Variables",
    ],
    project: "Build a complete authentication system",
  },
  {
    number: "07",
    title: "Projects",
    subtitle: "Turn your knowledge into experience",
    icon: Terminal,
    color: "purple",
    topics: [
      "Build Real-World Projects",
      "Use Git and GitHub",
      "Write Clean Code",
      "Create Responsive UI",
      "Integrate APIs",
      "Deploy Applications",
      "Build Your Portfolio",
    ],
    project: "Build 3-5 production-ready projects",
  },
  {
    number: "08",
    title: "Deployment & Job Preparation",
    subtitle: "Become ready for the industry",
    icon: Rocket,
    color: "orange",
    topics: [
      "Git and GitHub",
      "Vercel Deployment",
      "Render Deployment",
      "Docker Basics",
      "Resume Preparation",
      "DSA Practice",
      "Interview Preparation",
    ],
    project: "Deploy your portfolio and start applying for jobs",
  },
];

const colors: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    line: string;
  }
> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    line: "bg-blue-200",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    border: "border-yellow-200",
    line: "bg-yellow-200",
  },
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    border: "border-cyan-200",
    line: "bg-cyan-200",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    line: "bg-green-200",
  },
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-200",
    line: "bg-emerald-200",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    line: "bg-red-200",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    line: "bg-purple-200",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    line: "bg-orange-200",
  },
};

export default function MERNStackRoadmapPage() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-emerald-950 py-20 text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <Link
            href="/career-resources/career-roadmaps"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Roadmaps
          </Link>

          <div className="mx-auto mt-14 max-w-4xl text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-white/10 px-4 py-2 text-sm font-semibold text-green-200 backdrop-blur">
              <Sparkles size={16} />
              Complete Career Roadmap
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">
              MERN Stack Developer
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
              Follow a structured path to learn MongoDB, Express.js, React.js
              and Node.js and become a job-ready full stack developer.
            </p>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-4">

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-green-600">
              8
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Stages
            </p>

          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-blue-600">
              4
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Core Technologies
            </p>

          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">

            <div className="text-3xl font-black text-purple-600">
              5+
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Projects
            </p>

          </div>

          <div className="p-6 text-center">

            <div className="text-3xl font-black text-orange-600">
              Job Ready
            </div>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Final Goal
            </p>

          </div>

        </div>

      </section>


      {/* TECHNOLOGY STACK */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-widest text-green-600">
            The MERN Stack
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            Four technologies. One powerful career.
          </h2>

        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-green-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-2xl font-black text-green-600">
              M
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              MongoDB
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              NoSQL Database
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-black text-slate-700">
              E
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              Express.js
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Backend Framework
            </p>

          </div>

          <div className="rounded-3xl border border-cyan-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-2xl font-black text-cyan-600">
              R
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              React.js
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Frontend Library
            </p>

          </div>

          <div className="rounded-3xl border border-green-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-2xl font-black text-green-600">
              N
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              Node.js
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              JavaScript Runtime
            </p>

          </div>

        </div>

      </section>


      {/* ROADMAP */}

      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-5xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-green-600">
              Step-by-Step Journey
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Your path to becoming a MERN Developer
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Follow these stages in order. Learn the concepts, build projects
              and keep practicing.
            </p>

          </div>


          <div className="relative mt-14">

            <div className="absolute left-7 top-8 hidden h-[calc(100%-64px)] w-1 bg-slate-200 md:block" />

            <div className="space-y-6">

              {roadmapSteps.map((step, index) => {

                const Icon = step.icon;
                const color = colors[step.color];
                const isOpen = openStep === index;

                return (

                  <div
                    key={step.number}
                    className={`relative rounded-3xl border bg-slate-50 transition-all duration-300 ${color.border} ${
                      isOpen ? "shadow-xl" : "shadow-sm"
                    }`}
                  >

                    <button
                      onClick={() =>
                        setOpenStep(isOpen ? null : index)
                      }
                      className="flex w-full items-center gap-5 p-6 text-left md:p-7"
                    >

                      <div
                        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${color.bg} ${color.text}`}
                      >

                        <Icon size={26} />

                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="text-sm font-black text-slate-400">
                            STEP {step.number}
                          </span>

                          <h3 className="text-xl font-black text-slate-900 md:text-2xl">
                            {step.title}
                          </h3>

                        </div>

                        <p className="mt-1 text-sm text-slate-500 md:text-base">
                          {step.subtitle}
                        </p>

                      </div>

                      <ChevronDown
                        className={`shrink-0 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />

                    </button>


                    {isOpen && (

                      <div className="border-t border-slate-200 px-6 pb-7 pt-6 md:px-7">

                        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">

                          <div>

                            <h4 className="font-bold text-slate-900">
                              What to Learn
                            </h4>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">

                              {step.topics.map((topic) => (

                                <div
                                  key={topic}
                                  className="flex items-center gap-2 text-sm text-slate-600"
                                >

                                  <CheckCircle2
                                    size={17}
                                    className={color.text}
                                  />

                                  {topic}

                                </div>

                              ))}

                            </div>

                          </div>


                          <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <div className="flex items-center gap-2">

                              <Rocket
                                size={19}
                                className={color.text}
                              />

                              <h4 className="font-bold text-slate-900">
                                Recommended Project
                              </h4>

                            </div>

                            <p className="mt-4 text-sm leading-6 text-slate-600">
                              {step.project}
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </section>


      {/* JOB PREPARATION */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-2xl md:p-14">

          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">

            <div>

              <div className="flex items-center gap-2 text-sm font-bold text-green-400">

                <Sparkles size={17} />

                Final Stage

              </div>

              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                Become Job Ready
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-slate-300">
                Once you have learned the technologies and built real-world
                projects, it is time to prepare for the job market.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Build a strong portfolio",
                  "Practice DSA and coding problems",
                  "Prepare your resume",
                  "Practice technical interviews",
                  "Start applying for jobs",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
                      size={20}
                      className="text-green-400"
                    />

                    <span className="text-slate-200">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

              <div className="flex items-center gap-3">

                <BriefcaseBusiness
                  className="text-green-400"
                  size={26}
                />

                <h3 className="text-xl font-bold">
                  Next Steps
                </h3>

              </div>

              <p className="mt-5 leading-7 text-slate-300">
                Use NextHire to discover relevant software development jobs
                and start your career journey.
              </p>

              <Link
                href="/jobs"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
              >

                Explore Software Jobs

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center">

          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Ready to start your MERN journey?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Start with the basics, stay consistent and keep building. Your
            dream career is built one step at a time.
          </p>

          <Link
            href="/career-resources"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
          >

            Explore More Resources

            <ExternalLink size={18} />

          </Link>

        </div>

      </section>

    </main>
  );
}