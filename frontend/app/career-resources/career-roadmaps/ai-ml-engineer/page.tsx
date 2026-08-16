"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Calculator,
  BarChart3,
  Brain,
  Cpu,
  Eye,
  Cloud,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const stages = [
  {
    number: "01",
    title: "Python & Programming Fundamentals",
    icon: Code2,
    color: "blue",
    topics: [
      "Python Syntax & Data Types",
      "Control Flow & Loops",
      "Functions & Modules",
      "OOP in Python",
      "NumPy Basics",
      "Pandas Basics",
      "Working with Jupyter Notebooks",
      "Git & GitHub Basics",
    ],
  },
  {
    number: "02",
    title: "Mathematics for Machine Learning",
    icon: Calculator,
    color: "orange",
    topics: [
      "Linear Algebra (Vectors & Matrices)",
      "Calculus (Derivatives & Gradients)",
      "Probability Theory",
      "Statistics & Distributions",
      "Optimization Basics",
      "Hypothesis Testing",
    ],
  },
  {
    number: "03",
    title: "Data Analysis & Visualization",
    icon: BarChart3,
    color: "cyan",
    topics: [
      "Data Cleaning & Preprocessing",
      "Exploratory Data Analysis",
      "Matplotlib & Seaborn",
      "Feature Engineering",
      "Handling Missing Data",
      "SQL for Data Analysis",
    ],
  },
  {
    number: "04",
    title: "Machine Learning Fundamentals",
    icon: Brain,
    color: "green",
    topics: [
      "Supervised vs Unsupervised Learning",
      "Regression Algorithms",
      "Classification Algorithms",
      "Decision Trees & Random Forests",
      "Model Evaluation Metrics",
      "Cross-Validation",
      "Scikit-learn",
    ],
  },
  {
    number: "05",
    title: "Deep Learning",
    icon: Cpu,
    color: "purple",
    topics: [
      "Neural Networks Basics",
      "Backpropagation",
      "Activation Functions",
      "TensorFlow / PyTorch",
      "CNNs",
      "RNNs & LSTMs",
      "Transfer Learning",
    ],
  },
  {
    number: "06",
    title: "NLP & Computer Vision",
    icon: Eye,
    color: "indigo",
    topics: [
      "Text Preprocessing & Tokenization",
      "Word Embeddings",
      "Transformers & Attention",
      "Large Language Models Basics",
      "Image Processing Basics",
      "Object Detection Basics",
    ],
  },
  {
    number: "07",
    title: "MLOps & Model Deployment",
    icon: Cloud,
    color: "pink",
    topics: [
      "Model Serving Basics",
      "Flask / FastAPI for ML APIs",
      "Docker for ML Applications",
      "CI/CD for ML Pipelines",
      "Model Monitoring",
      "Cloud Platforms (AWS / GCP / Azure)",
    ],
  },
  {
    number: "08",
    title: "Projects & Interview Preparation",
    icon: Briefcase,
    color: "yellow",
    topics: [
      "End-to-End ML Projects",
      "Kaggle Competitions",
      "Research Paper Reading",
      "System Design for ML",
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

export default function AIMLEngineerPage() {
  const [openStage, setOpenStage] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-violet-950 py-20 text-white">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            href="/career-resources/career-roadmaps"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Roadmaps
          </Link>

          <div className="mx-auto mt-14 max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/30">
              <Brain size={40} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-purple-300">
              Career Roadmap
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              AI/ML Engineer
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-purple-100">
              Master Python, mathematics, machine learning and deep learning
              to become a job-ready AI/ML engineer.
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
            <div className="text-3xl font-black text-purple-600">8</div>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Learning Stages
            </p>
          </div>

          <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">
            <div className="text-3xl font-black text-violet-600">55+</div>
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
          <div className="rounded-[32px] bg-gradient-to-br from-purple-600 to-violet-700 p-8 text-white shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Brain size={32} />
            </div>

            <h2 className="mt-8 text-3xl font-black">Your AI/ML Journey</h2>

            <p className="mt-4 leading-7 text-purple-100">
              Start with Python and math foundations, build strong machine
              learning and deep learning skills, then learn to deploy models
              into real-world production systems.
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
            <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
              How To Follow This Roadmap
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-5xl">
              Become a job-ready AI/ML engineer step by step.
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
            <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
              Step-by-Step Learning Path
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Your AI/ML Engineer Roadmap
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Follow these stages in order and gradually build your AI/ML
              engineering skills.
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
            <p className="text-sm font-bold uppercase tracking-widest text-purple-400">
              Build Your Portfolio
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Projects are the proof of your skills.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              After learning the fundamentals, start building real-world ML
              models and deploy them as usable applications. A strong
              portfolio can make a huge difference during interviews.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "House Price Prediction Model",
              "Image Classification App",
              "Chatbot with LLM Integration",
            ].map((project) => (
              <div
                key={project}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Code2 className="text-purple-400" size={24} />
                <h3 className="mt-4 font-bold">{project}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  End-to-end ML project with data pipeline and deployment.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-14">
          <Sparkles size={28} className="text-purple-200" />

          <h2 className="mt-5 max-w-3xl text-3xl font-black md:text-5xl">
            Keep learning. Keep building. Become an AI/ML Engineer.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-purple-100">
            The best roadmap is the one you follow consistently. Start today
            and build something every step of the way.
          </p>

          <Link
            href="/career-resources/career-roadmaps"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-purple-700 transition hover:scale-105"
          >
            Explore Other Roadmaps
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
