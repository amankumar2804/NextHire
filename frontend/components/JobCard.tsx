"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  Check,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  CalendarDays,
} from "lucide-react";

type JobCardProps = {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyImage?: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  posted: string;
  lastDate?: string;
  verified?: boolean;
};

// Colorful gradients used when a company has no uploaded image
const BANNER_GRADIENTS = [
  "from-purple-500 to-fuchsia-500",
  "from-blue-500 to-cyan-400",
  "from-orange-500 to-pink-500",
  "from-emerald-500 to-teal-400",
  "from-rose-500 to-orange-400",
  "from-indigo-500 to-purple-500",
];

const getCompanyGradient = (company: string) => {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BANNER_GRADIENTS[Math.abs(hash) % BANNER_GRADIENTS.length];
};

const getCompanyInitials = (company: string) =>
  company
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function JobCard({
  id,
  slug,
  title,
  company,
  companyImage,
  location,
  salary,
  type,
  experience,
  posted,
  lastDate,
  verified,
}: JobCardProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkSavedJob = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/check/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSaved(data.saved);
        }
      } catch (error) {
        console.error("Error checking saved job:", error);
      }
    };

    checkSavedJob();
  }, [id]);

  const saveJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (saved || saving) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/jobs/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: id,
          title,
          company,
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save job");
        return;
      }

      setSaved(true);
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Unable to connect to server. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      {/* Top Section */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-4">

          {/* Company Logo */}

          {companyImage ? (
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-100">
              <img
                src={companyImage}
                alt={company}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white ${getCompanyGradient(
                company
              )}`}
            >
              {getCompanyInitials(company)}
            </div>
          )}

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-lg font-bold text-slate-900">
                {title}
              </h3>

              {verified && (
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                  <Check size={13} />
                  Verified
                </span>
              )}

            </div>

            <p className="mt-1 font-medium text-slate-600">
              {company}
            </p>

          </div>

        </div>

        {/* Save Button */}

        <button
          onClick={saveJob}
          disabled={saved || saving}
          title={saved ? "Saved" : "Save job"}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
            saved
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          } ${saving ? "cursor-wait opacity-70" : ""}`}
        >
          <Bookmark
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Job Details */}

      <div className="mt-6 flex flex-wrap gap-3">

        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">
          <MapPin size={15} />
          {location}
        </span>

        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">
          <BriefcaseBusiness size={15} />
          {experience}
        </span>

        <span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
          {type}
        </span>

        {lastDate && (
          <span className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
            <CalendarDays size={15} />
            Last Date: {lastDate}
          </span>
        )}

      </div>

      {/* Bottom Section */}

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-lg font-bold text-slate-900">
            {salary}
          </p>

          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Clock3 size={13} />
            {posted}
          </p>

        </div>

        <Link
          href={`/jobs/${slug}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
          <ArrowRight size={17} />
        </Link>

      </div>

    </div>
  );
}
