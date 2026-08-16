"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const [email] = useState(emailFromQuery);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    e.preventDefault();

    const next = pasted.split("");
    while (next.length < 6) next.push("");
    setDigits(next);

    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const otp = digits.join("");

    if (!email) {
      setError("Missing email — go back and register again.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid OTP");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      setError("Unable to connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;

    setError("");
    setInfo("");

    try {
      setResending(true);

      const res = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to resend OTP");
        return;
      }

      setInfo("A new OTP has been sent to your email.");
      setCooldown(60);
    } catch (err) {
      setError("Unable to connect to server. Make sure backend is running.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-10">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <ShieldCheck size={26} />
            </div>
          </div>

          <h1 className="mt-6 text-center text-2xl font-bold text-white">
            Verify your email
          </h1>
          <p className="mt-2 text-center text-sm text-slate-400">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-white">{email || "your email"}</span>
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          {info && (
            <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-center text-sm text-green-400">
              {info}
            </div>
          )}

          <form onSubmit={handleVerify} className="mt-8">
            <div className="flex justify-between gap-2">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-14 w-12 rounded-xl border border-white/10 bg-white/5 text-center text-xl font-bold text-white outline-none transition focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Didn't get the code?{" "}
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className="font-semibold text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:text-slate-600"
            >
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : resending
                ? "Sending..."
                : "Resend OTP"}
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-600">
            <Link href="/register" className="text-slate-500 hover:text-slate-300">
              Wrong email? Register again
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
}
