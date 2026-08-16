"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Terminal,
  GitBranch,
  Cloud,
  Workflow,
  Box,
  Network,
  Activity,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const stages = [
  {
    number: "01",
    title: "Linux & Networking Fundamentals",
    icon: Terminal,
    color: "blue",
    topics: [
      "Linux File System & Permissions",
      "Shell Commands",
      "Process & Package Management",
      "Networking Basics (TCP/IP, DNS)",
      "SSH & Remote Access",
      "Firewalls & Ports",
    ],
  },
  {
    number: "02",
    title: "Scripting & Version Control",
    icon: GitBranch,
    color: "orange",
    topics: [
      "Bash Scripting",
      "Python Scripting Basics",
      "Git Fundamentals",
      "Branching & Merging",
      "GitHub / GitLab Workflows",
      "Pull Requests & Code Review",
    ],
  },
  {
    number: "03",
    title: "Cloud Computing Fundamentals",
    icon: Cloud,
    color: "cyan",
    topics: [
      "Cloud Concepts (IaaS, PaaS, SaaS)",
      "AWS / Azure / GCP Basics",
      "Compute Services (EC2, VMs)",
      "Storage Services (S3, Blob)",
      "Identity & Access Management",
      "Virtual Networks & VPCs",
    ],
  },
  {
    number: "04",
    title: "CI/CD & Automation",
    icon: Workflow,
    color: "green",
    topics: [
      "CI/CD Concepts",
      "Jenkins Fundamentals",
      "GitHub Actions / GitLab CI",
      "Build & Release Pipelines",
      "Automated Testing in Pipelines",
      "Artifact Management",
    ],
  },
  {
    number: "05",
    title: "Containerization",
    icon: Box,
    color: "purple",
    topics: [
      "Docker Fundamentals",
      "Images & Containers",
      "Dockerfile Best Practices",
      "Docker Compose",
      "Container Networking",
      "Container Registries",
    ],
  },
  {
    number: "06",
    title: "Orchestration with Kubernetes",
    icon: Network,
    color: "indigo",
    topics: [
      "Kubernetes Architecture",
      "Pods, Deployments & Services",
      "ConfigMaps & Secrets",
      "Helm Basics",
      "Scaling & Load Balancing",
      "Namespaces & RBAC",
    ],
  },
  {
    number: "07",
    title: "Infrastructure as Code & Monitoring",
    icon: Activity,
    color: "pink",
    topics: [
      "Terraform Fundamentals",
      "Ansible Basics",
      "Infrastructure as Code Principles",
      "Prometheus & Grafana",
      "Logging & Alerting",
      "Incident Response Basics",
    ],
  },
  {
    number: "08",
    title: "Projects & Interview Preparation",
    icon: Briefcase,
    color: "yellow",
    topics: [
      "End-to-End CI/CD Pipeline Project",
      "Deploy a Kubernetes Cluster",
      "Infrastructure Automation Project",
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

export default function CloudDevOpsEngineerPage() {
  const [openStage, setOpenStage] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-blue-950 py-20 text-white">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            href="/career-resources/career-roadmaps"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Roadmaps
          </Link>

          <div className="mx-auto mt-14 max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/30">
              <Cloud size={40} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-sky-300">
              Career Roadmap
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Cloud & DevOps Engineer
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sky-100">
              Master Linux, cloud platforms, CI/CD and Kubernetes to become a
              job-ready Cloud & DevOps engineer.
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
            <div className="text-3xl font-black text-sky-600">8</div>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Stages
            </p>
          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">
            <div className="text-3xl font-black text-blue-600">50+</div>
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
          <div className="rounded-[32px] bg-gradient-to-br from-sky-600 to-blue-700 p-8 text-white shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Cloud size={32} />
            </div>

            <h2 className="mt-8 text-3xl font-black">
              Your Cloud & DevOps Journey
            </h2>

            <p className="mt-4 leading-7 text-sky-100">
              Start with Linux and networking foundations, learn scripting
              and version control, build strong cloud and automation skills,
              and finally master containers and orchestration.
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
            <p className="text-sm font-bold uppercase tracking-widest text-sky-600">
              How To Follow This Roadmap
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
              Become a job-ready Cloud & DevOps engineer step by step.
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
                  Practice every topic with hands-on labs.
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
            <p className="text-sm font-bold uppercase tracking-widest text-sky-600">
              Step-by-Step Learning Path
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Your Cloud & DevOps Engineer Roadmap
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Follow these stages in order and gradually build your Cloud &
              DevOps engineering skills.
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
            <p className="text-sm font-bold uppercase tracking-widest text-sky-400">
              Build Your Portfolio
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Projects are the proof of your skills.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              After learning the fundamentals, start building real
              infrastructure and automation projects. A strong portfolio can
              make a huge difference during interviews.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "CI/CD Pipeline for a Web App",
              "Kubernetes Cluster Deployment",
              "Infrastructure as Code with Terraform",
            ].map((project) => (
              <div
                key={project}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Terminal className="text-sky-400" size={24} />
                <h3 className="mt-4 font-bold">{project}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Real-world automation project with monitoring and alerts.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-700 p-8 text-white shadow-2xl md:p-14">
          <Sparkles size={28} className="text-sky-200" />

          <h2 className="mt-5 max-w-3xl text-3xl font-black md:text-5xl">
            Keep learning. Keep building. Become a Cloud & DevOps Engineer.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-sky-100">
            The best roadmap is the one you follow consistently. Start today
            and build something every step of the way.
          </p>

          <Link
            href="/career-resources/career-roadmaps"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-sky-700 transition hover:scale-105"
          >
            Explore Other Roadmaps
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
