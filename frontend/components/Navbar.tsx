"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Bookmark,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Next<span className="text-blue-600">Hire</span>
            </h1>

            <p className="hidden text-[10px] font-medium text-slate-500 sm:block">
              Find your next opportunity
            </p>
          </div>

        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Find Jobs
          </Link>

          <Link
            href="/jobs/category/government"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Government
          </Link>

          <Link
            href="/jobs/category/private"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Private
          </Link>

          {/* Saved Jobs */}

          <Link
            href="/saved-jobs"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Bookmark size={18} />
            Saved Jobs
          </Link>

        </nav>

        {/* Right Side */}

        <div className="hidden items-center gap-3 md:flex">

          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {isOpen && (

        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">

          <nav className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              href="/jobs"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Find Jobs
            </Link>

            <Link
              href="/jobs/category/government"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Government Jobs
            </Link>

            <Link
              href="/jobs/category/private"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Private Jobs
            </Link>

            <Link
              href="/saved-jobs"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
            >
              <Bookmark size={19} />
              Saved Jobs
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-300 py-3 text-center font-semibold text-slate-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-blue-600 py-3 text-center font-semibold text-white"
              >
                Get Started
              </Link>

            </div>

          </nav>

        </div>

      )}

    </header>
  );
}