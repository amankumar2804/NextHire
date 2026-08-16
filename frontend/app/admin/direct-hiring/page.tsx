"use client";

import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  BriefcaseBusiness,
  BadgeCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type HiringJob = {
  _id: string;
  title: string;
  company: string;
  slug: string;
  jobType: string;
  hiringEmail: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
};

const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export default function DirectHiringAdminListPage() {
  const [jobs, setJobs] = useState<HiringJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/direct-hiring/admin/all`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleToggleActive = async (job: HiringJob) => {
    try {
      setActionLoadingId(job._id);
      const res = await fetch(`${API_URL}/api/direct-hiring/${job._id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !job.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setJobs((prev) =>
        prev.map((j) => (j._id === job._id ? { ...j, isActive: !j.isActive } : j))
      );
    } catch (err) {
      console.error("Failed to toggle job:", err);
      alert("Failed to update job status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (job: HiringJob) => {
    if (!confirm(`Delete "${job.title}" at ${job.company}? This cannot be undone.`)) {
      return;
    }
    try {
      setActionLoadingId(job._id);
      const res = await fetch(`${API_URL}/api/direct-hiring/${job._id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setJobs((prev) => prev.filter((j) => j._id !== job._id));
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Direct Hiring Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage direct hiring opportunities shown to users.
          </p>
        </div>

        <Link
          href="/admin/direct-hiring/new"
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 font-bold text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Add New Job
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-16 flex items-center justify-center gap-3 text-slate-500">
          <Loader2 size={22} className="animate-spin" />
          Loading jobs...
        </div>
      )}

      {/* EMPTY */}
      {!loading && jobs.length === 0 && (
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <BriefcaseBusiness size={38} className="mx-auto text-slate-400" />
          <h3 className="mt-4 text-lg font-bold text-slate-900">No jobs added yet</h3>
          <p className="mt-2 text-sm text-slate-500">
            Click "Add New Job" to post your first direct hiring opportunity.
          </p>
        </div>
      )}

      {/* TABLE */}
      {!loading && jobs.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Hiring Email</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-4 font-semibold text-slate-900">{job.title}</td>
                  <td className="px-5 py-4 text-slate-600">{job.company}</td>
                  <td className="px-5 py-4 text-slate-600">{job.jobType}</td>
                  <td className="px-5 py-4 text-slate-600">{job.hiringEmail}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          job.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {job.isActive ? "Active" : "Inactive"}
                      </span>
                      {job.isVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                          <BadgeCheck size={11} />
                          Verified
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(job)}
                        disabled={actionLoadingId === job._id}
                        title={job.isActive ? "Deactivate" : "Activate"}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                      >
                        {job.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>

                      <Link
                        href={`/admin/direct-hiring/edit/${job._id}`}
                        className="rounded-lg p-2 text-purple-600 hover:bg-purple-50"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(job)}
                        disabled={actionLoadingId === job._id}
                        title="Delete"
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
