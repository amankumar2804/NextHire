"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BriefcaseBusiness,
  Bookmark,
  LogOut,
  UserRound,
  Search,
  ArrowRight,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [savedJobsCount, setSavedJobsCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Invalid user data:", error);
      router.push("/login");
      return;
    }

    const fetchSavedJobsCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs/saved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSavedJobsCount(data.savedJobs?.length || 0);
        }
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);
      }
    };

    fetchSavedJobsCount();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">

              <BriefcaseBusiness size={21} />

            </div>

            <span className="text-xl font-bold">

              Next<span className="text-blue-400">Hire</span>

            </span>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >

            <LogOut size={17} />

            Logout

          </button>

        </div>

      </header>


      {/* Dashboard */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* Welcome */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/20 to-indigo-600/10 p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-medium text-blue-400">
                Welcome back 👋
              </p>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">

                Hello, {user.name}

              </h1>

              <p className="mt-3 text-slate-400">

                Continue your journey towards your dream career.

              </p>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">

              <UserRound size={32} />

            </div>

          </div>

        </div>


        {/* Stats */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">


          {/* Saved Jobs */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-400">

                Saved Jobs

              </p>

              <Bookmark
                size={20}
                className="text-blue-400"
              />

            </div>

            <p className="mt-4 text-3xl font-bold">

              {savedJobsCount}

            </p>

          </div>


          {/* Applications */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-400">

                Applications

              </p>

              <BriefcaseBusiness
                size={20}
                className="text-blue-400"
              />

            </div>

            <p className="mt-4 text-3xl font-bold">

              0

            </p>

          </div>


          {/* Profile Status */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-400">

                Profile Status

              </p>

              <UserRound
                size={20}
                className="text-blue-400"
              />

            </div>

            <p className="mt-4 text-3xl font-bold text-green-400">

              Active

            </p>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold">

            Quick Actions

          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">


            {/* Explore Jobs */}

            <button
              onClick={() => router.push("/jobs")}
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-left transition hover:border-blue-500/40 hover:bg-blue-500/10"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

                  <Search size={23} />

                </div>

                <ArrowRight
                  size={20}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-400"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold">

                Explore Jobs

              </h3>

              <p className="mt-2 text-sm text-slate-400">

                Find your next career opportunity.

              </p>

            </button>


            {/* Saved Jobs */}

            <button
              onClick={() => router.push("/saved-jobs")}
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-left transition hover:border-blue-500/40 hover:bg-blue-500/10"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

                  <Bookmark size={23} />

                </div>

                <ArrowRight
                  size={20}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-400"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold">

                Saved Jobs

              </h3>

              <p className="mt-2 text-sm text-slate-400">

                View the jobs you saved for later.

              </p>

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}