"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Coffee,
  Boxes,
  Cpu,
  GitBranch,
  Database,
  Leaf,
  Network,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const stages = [
  {
    number: "01",
    title: "Java Fundamentals",
    icon: Coffee,
    color: "blue",
    topics: [
      "JDK, JRE & JVM",
      "Variables & Data Types",
      "Operators",
      "Control Flow Statements",
      "Loops",
      "Arrays & Strings",
      "Methods & Parameters",
      "Basic Exception Handling",
    ],
  },
  {
    number: "02",
    title: "Object-Oriented Programming",
    icon: Boxes,
    color: "orange",
    topics: [
      "Classes & Objects",
      "Constructors",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction",
      "Interfaces & Abstract Classes",
      "SOLID Principles",
    ],
  },
  {
    number: "03",
    title: "Advanced Java",
    icon: Cpu,
    color: "cyan",
    topics: [
      "Collections Framework",
      "Generics",
      "Lambda Expressions",
      "Streams API",
      "Multithreading & Concurrency",
      "File I/O",
      "Java Memory Model & GC",
    ],
  },
  {
    number: "04",
    title: "Data Structures & Algorithms",
    icon: GitBranch,
    color: "green",
    topics: [
      "Arrays, Stacks & Queues",
      "Linked Lists",
      "Trees & Graphs",
      "Sorting Algorithms",
      "Searching Algorithms",
      "Recursion & Backtracking",
      "Time & Space Complexity",
      "Problem Solving Practice",
    ],
  },
  {
    number: "05",
    title: "SQL & Databases",
    icon: Database,
    color: "purple",
    topics: [
      "Database Fundamentals",
      "SQL Basics",
      "Joins & Aggregations",
      "Normalization",
      "JDBC Fundamentals",
      "JPA & Hibernate Basics",
      "Query Optimization Basics",
    ],
  },
  {
    number: "06",
    title: "Spring & Spring Boot",
    icon: Leaf,
    color: "indigo",
    topics: [
      "Dependency Injection & IoC",
      "Spring Boot Project Setup",
      "Spring MVC",
      "Spring Data JPA",
      "Configuration & Profiles",
      "Validation",
      "Exception Handling",
    ],
  },
  {
    number: "07",
    title: "REST APIs & Microservices",
    icon: Network,
    color: "pink",
    topics: [
      "REST API Design",
      "Building APIs with Spring Boot",
      "Spring Security & JWT",
      "Microservices Architecture",
      "API Gateway & Service Discovery",
      "API Testing with Postman",
      "Docker Fundamentals",
    ],
  },
  {
    number: "08",
    title: "Projects & Interview Preparation",
    icon: Briefcase,
    color: "yellow",
    topics: [
      "Build Full Stack Java Projects",
      "Connect Frontend with Backend",
      "Open Source Contribution",
      "System Design Basics",
      "Mock Interviews",
      "Resume & GitHub Portfolio",
      "Behavioral Interview Practice",
    ],
  },
];

const colorStyles: Record<
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
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    line: "bg-orange-200",
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
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    line: "bg-purple-200",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    line: "bg-indigo-200",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    line: "bg-pink-200",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    border: "border-yellow-200",
    line: "bg-yellow-200",
  },
};

export default function JavaDeveloperPage() {
  const [openStage, setOpenStage] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-orange-950 py-20 text-white">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            href="/career-resources/career-roadmaps"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Roadmaps
          </Link>

          <div className="mx-auto mt-14 max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/20 text-orange-300 ring-1 ring-orange-400/30">
              <Coffee size={40} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-orange-300">
              Career Roadmap
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Java Developer
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-orange-100">
              Master core Java, object-oriented programming, Spring Boot and
              databases to become a job-ready Java developer.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                Beginner to Advanced
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                8 Learning Stages
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                Project Based
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">
          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">
            <div className="text-3xl font-black text-red-600">8</div>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Stages
            </p>
          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">
            <div className="text-3xl font-black text-orange-600">55+</div>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Important Topics
            </p>
          </div>

          <div className="p-6 text-center">
            <div className="text-3xl font-black text-green-600">100%</div>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Project Focused
            </p>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[32px] bg-gradient-to-br from-red-600 to-orange-700 p-8 text-white shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Coffee size={32} />
            </div>

            <h2 className="mt-8 text-3xl font-black">Your Java Journey</h2>

            <p className="mt-4 leading-7 text-orange-100">
              Start with core syntax, build a strong foundation in OOP, learn
              data structures and databases, then master Spring Boot to build
              production-ready backend systems.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={21} />
                <span className="font-semibold">
                  Learn → Build → Practice → Deploy
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              How To Follow This Roadmap
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
              Become a job-ready Java developer step by step.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Do not try to learn everything at once. Complete each stage,
              practice what you learn and build projects regularly.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />
                <p className="text-slate-700">
                  Complete the fundamentals first.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />
                <p className="text-slate-700">
                  Practice every topic with hands-on coding.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={20}
                />
                <p className="text-slate-700">
                  Build projects to prove your skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Step-by-Step Learning Path
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Your Java Developer Roadmap
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Follow these stages in order and gradually build your Java
              development skills.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-8 top-8 hidden h-[calc(100%-64px)] w-1 bg-slate-200 md:block" />

            <div className="space-y-6">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const style = colorStyles[stage.color];
                const isOpen = openStage === index;

                return (
                  <div
                    key={stage.number}
                    className={`relative rounded-3xl border bg-slate-50 transition hover:shadow-lg ${style.border}`}
                  >
                    <button
                      onClick={() => setOpenStage(isOpen ? null : index)}
                      className="relative z-10 flex w-full items-center gap-5 p-5 text-left md:p-6"
                    >
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
                      >
                        <Icon size={28} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-black ${style.text}`}>
                          STAGE {stage.number}
                        </p>

                        <h3 className="mt-1 text-xl font-black text-slate-900 md:text-2xl">
                          {stage.title}
                        </h3>
                      </div>

                      <ChevronDown
                        className={`shrink-0 text-slate-500 transition duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200 px-5 pb-6 pt-5 md:ml-21 md:px-6">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {stage.topics.map((topic) => (
                            <div
                              key={topic}
                              className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                            >
                              <CheckCircle2
                                size={18}
                                className={`shrink-0 ${style.text}`}
                              />
                              <span className="text-sm font-medium text-slate-700">
                                {topic}
                              </span>
                            </div>
                          ))}
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

      {/* PROJECT SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl md:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
              Build Your Portfolio
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Projects are the proof of your skills.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              After learning the fundamentals, start building real-world
              applications with Spring Boot. A strong portfolio can make a
              huge difference during interviews.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Library Management System",
              "E-Commerce Backend (Spring Boot)",
              "Employee Management System",
            ].map((project) => (
              <div
                key={project}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Code2 className="text-orange-400" size={24} />
                <h3 className="mt-4 font-bold">{project}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Full stack Java project with REST APIs and a database.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-r from-red-700 via-orange-700 to-amber-700 p-8 text-white shadow-2xl md:p-14">
          <Sparkles size={28} className="text-orange-200" />

          <h2 className="mt-5 max-w-3xl text-3xl font-black md:text-5xl">
            Keep learning. Keep building. Become a Java Developer.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-orange-100">
            The best roadmap is the one you follow consistently. Start today
            and build something every step of the way.
          </p>

          <Link
            href="/career-resources/career-roadmaps"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-orange-700 transition hover:scale-105"
          >
            Explore Other Roadmaps
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
