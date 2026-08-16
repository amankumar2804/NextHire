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
  UserRound,
} from "lucide-react";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // OTP has been sent — take them straight to verification
      router.push(`/verify-otp?email=${encodeURIComponent(data.email || email)}`);

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
            href="/login"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            Already have an account?
          </Link>

        </div>

      </header>

      {/* Main */}

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:block">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">

            <Sparkles size={16} />

            Start your career journey

          </div>

          <h1 className="mt-7 max-w-xl text-5xl font-bold leading-tight text-white xl:text-6xl">

            Build your future
            <span className="block text-blue-400">
              with NextHire.
            </span>

          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">

            Create your free account and discover better opportunities,
            connect with professionals, and grow your career.

          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3 text-slate-300">

              <CheckCircle2
                size={21}
                className="text-blue-400"
              />

              Explore verified job opportunities

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

              Save jobs and manage your career journey

            </div>

          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-blue-400">

              <ShieldCheck size={23} />

            </div>

            <div>

              <p className="font-semibold text-white">
                Your data is secure
              </p>

              <p className="mt-1 text-sm text-slate-500">
                We respect your privacy and protect your information.
              </p>

            </div>

          </div>

        </div>

        {/* REGISTER CARD */}

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
                Create your account 🚀
              </h2>

              <p className="mt-3 text-slate-400">
                Join thousands of candidates building their careers.
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
              onSubmit={handleRegister}
              className="mt-8 space-y-5"
            >

              {/* Full Name */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name
                </label>

                <div className="relative">

                  <UserRound
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

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

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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

              {/* Confirm Password */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Terms */}

              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-blue-600"
                />

                <span className="text-sm leading-5 text-slate-500">

                  I agree to NextHire's{" "}

                  <span className="text-blue-400">
                    Terms of Service
                  </span>{" "}

                  and{" "}

                  <span className="text-blue-400">
                    Privacy Policy
                  </span>

                </span>

              </label>

              {/* Register Button */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? "Creating Account..." : "Create Account"}

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
              <span className="text-xs text-slate-500">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}

            <GoogleSignInButton />

            {/* Login */}

            <p className="mt-8 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                href="/login"
                className="font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Login here
              </Link>

            </p>

          </div>

          <p className="mt-6 text-center text-xs text-slate-600">
            Your information is securely handled by NextHire.
          </p>

        </div>

      </section>

    </main>
  );
}
