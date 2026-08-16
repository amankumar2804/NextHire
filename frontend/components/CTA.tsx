"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-16 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20">
            <BriefcaseBusiness size={38} className="text-white" />
          </div>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">
            Ready to Build Your Career?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Discover verified Government Jobs, Private Jobs, Direct Hiring
            opportunities and internships — all in one trusted platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/jobs"
              className="rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 transition hover:scale-105"
            >
              Explore Jobs
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Create Free Account
              <ArrowRight size={18}/>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}