"use client";

import {
  Bookmark,
  Check,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SaveJobButtonProps = {
  jobId: string;
  title?: string;
  company?: string;
  slug?: string;
};

export default function SaveJobButton({
  jobId,
  title,
  company,
  slug,
}: SaveJobButtonProps) {
  const router = useRouter();

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if job is already saved
  useEffect(() => {
    const checkSavedJob = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/check/${jobId}`,
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
  }, [jobId]);

  // Save Job
  const handleSaveJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (saved) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/jobs/save",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            jobId,
            title,
            company,
            slug,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save job");
        return;
      }

      setSaved(true);

    } catch (error) {
      console.error("Error saving job:", error);

      alert(
        "Unable to connect to server. Make sure backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSaveJob}
      disabled={loading || saved}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 font-semibold transition ${
        saved
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />

          Saving...
        </>
      ) : saved ? (
        <>
          <Check size={18} />

          Job Saved
        </>
      ) : (
        <>
          <Bookmark size={18} />

          Save Job
        </>
      )}
    </button>
  );
}