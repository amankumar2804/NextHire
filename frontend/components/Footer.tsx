"use client";

import Link from "next/link";
import { BriefcaseBusiness, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <BriefcaseBusiness className="h-6 w-6 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white">
                NextHire
              </h2>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              NextHire is a trusted platform to discover verified Government
              Jobs, Private Jobs, Direct Hiring opportunities and internships
              from reliable sources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              <Link href="/jobs" className="block hover:text-white transition">
                All Jobs
              </Link>

              <Link href="/government-jobs" className="block hover:text-white transition">
                Government Jobs
              </Link>

              <Link href="/private-jobs" className="block hover:text-white transition">
                Private Jobs
              </Link>

              <Link href="/direct-hiring" className="block hover:text-white transition">
                Direct Hiring
              </Link>

              <Link href="/internships" className="block hover:text-white transition">
                Internships
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Resources
            </h3>

            <div className="mt-5 space-y-3">
              <Link href="/resources" className="block hover:text-white transition">
                Career Resources
              </Link>

              <Link href="/resume-builder" className="block hover:text-white transition">
                Resume Builder
              </Link>

              <Link href="/interview-preparation" className="block hover:text-white transition">
                Interview Preparation
              </Link>

              <Link href="/salary-guide" className="block hover:text-white transition">
                Salary Guide
              </Link>

              <Link href="/career-roadmaps" className="block hover:text-white transition">
                Career Roadmaps
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@nexthire.in</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} />
                <span>India</span>
              </div>

            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="mb-3 font-medium text-white">
                Follow Us
              </h4>

              <div className="flex flex-wrap gap-3">

                <Link
                  href="https://linkedin.com"
                  className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-blue-600 transition"
                >
                  LinkedIn
                </Link>

                <Link
                  href="https://instagram.com"
                  className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-pink-600 transition"
                >
                  Instagram
                </Link>

                <Link
                  href="https://x.com"
                  className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700 transition"
                >
                  X
                </Link>

                <Link
                  href="https://t.me"
                  className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-cyan-600 transition"
                >
                  Telegram
                </Link>

              </div>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© 2026 NextHire. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}