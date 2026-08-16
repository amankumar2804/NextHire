"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresVerification) {
          router.push(`/verify-otp?email=${encodeURIComponent(data.email || email)}`);
          return;
        }

        setError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");

    } catch (error) {
      setError(
        "Unable to connect to server. Make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background Glow */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      {/* Navbar */}

      <header className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">

              <BriefcaseBusiness size={21} />

            </div>

            <span className="text-xl font-bold tracking-tight text-white">

              Next<span className="text-blue-400">Hire</span>

            </span>

          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >

            Back to Home

          </Link>

        </div>

      </header>

      {/* Main */}

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:block">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">

            <Sparkles size={16} />

            Your career journey starts here

          </div>

          <h1 className="mt-7 max-w-xl text-5xl font-bold leading-tight text-white xl:text-6xl">

            Find your next

            <span className="block text-blue-400">

              career opportunity.

            </span>

          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">

            Discover verified jobs, connect with industry professionals,
            and take the next step toward your dream career.

          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3 text-slate-300">

              <CheckCircle2
                size={21}
                className="text-blue-400"
              />

              Verified job opportunities

            </div>

            <div className="flex items-center gap-3 text-slate-300">

              <CheckCircle2
                size={21}
                className="text-blue-400"
              />

              Connect with professionals for referrals

            </div>

            <div className="flex items-center gap-3 text-slate-300">

              <CheckCircle2
                size={21}
                className="text-blue-400"
              />

              Save and track your favorite jobs

            </div>

          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-blue-400">

              <ShieldCheck size={23} />

            </div>

            <div>

              <p className="font-semibold text-white">

                Your privacy matters

              </p>

              <p className="mt-1 text-sm text-slate-500">

                Your personal information is always protected.

              </p>

            </div>

          </div>

        </div>

        {/* LOGIN CARD */}

        <div className="mx-auto w-full max-w-md">

          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-10">

            {/* Mobile Logo */}

            <div className="mb-8 flex justify-center lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">

                  <BriefcaseBusiness size={22} />

                </div>

                <span className="text-2xl font-bold text-white">

                  Next<span className="text-blue-400">Hire</span>

                </span>

              </div>

            </div>

            {/* Heading */}

            <div>

              <h2 className="text-3xl font-bold text-white">

                Welcome back 👋

              </h2>

              <p className="mt-3 text-slate-400">

                Login to continue your career journey.

              </p>

            </div>

            {/* Error */}

            {error && (

              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">

                {error}

              </div>

            )}

            {/* Form */}

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">

                  Email Address

                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-medium text-slate-300">

                    Password

                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                  >

                    Forgot password?

                  </Link>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Logging in..."
                  : "Login to NextHire"}

                {!loading && (

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                )}

              </button>

            </form>

            {/* Divider */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-slate-500">

                OR CONTINUE WITH

              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            {/* Google */}

            <GoogleSignInButton />

            {/* Register */}

            <p className="mt-8 text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="font-semibold text-blue-400 transition hover:text-blue-300"
              >

                Create an account

              </Link>

            </p>

          </div>

          <p className="mt-6 text-center text-xs text-slate-600">

            By continuing, you agree to NextHire's Terms of Service and Privacy Policy.

          </p>

        </div>

      </section>

    </main>
  );
}
