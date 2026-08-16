"use client";

import { ArrowLeft, ImagePlus, Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];

const getAuthHeaders = (isJson = true) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    ...(isJson ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export default function EditDirectHiringJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [description, setDescription] = useState("");
  const [whoCanApply, setWhoCanApply] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [hiringEmail, setHiringEmail] = useState("");
  const [originalPostUrl, setOriginalPostUrl] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [isActive, setIsActive] = useState(true);

  // Company image
  const [existingCompanyImage, setExistingCompanyImage] = useState("");
  const [existingCompanyImagePublicId, setExistingCompanyImagePublicId] = useState("");
  const [companyImageFile, setCompanyImageFile] = useState<File | null>(null);
  const [companyImagePreview, setCompanyImagePreview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_URL}/api/direct-hiring/${jobId}`, {
          headers: getAuthHeaders(),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load job");
        }

        const job = data.job;

        setTitle(job.title || "");
        setSlug(job.slug || "");
        setCompany(job.company || "");
        setLocation(job.location || "");
        setExperience(job.experience || "");
        setJobType(job.jobType || "Full-time");
        setSalary(job.salary || "");
        setLastDate(job.lastDate || "");
        setDescription(job.description || "");
        setWhoCanApply((job.whoCanApply || []).join("\n"));
        setRequiredSkills((job.requiredSkills || []).join(", "));
        setHiringEmail(job.hiringEmail || "");
        setOriginalPostUrl(job.originalPostUrl || "");
        setIsVerified(job.isVerified ?? true);
        setIsActive(job.isActive ?? true);

        setExistingCompanyImage(job.companyImage || "");
        setExistingCompanyImagePublicId(job.companyImagePublicId || "");
        setCompanyImagePreview(job.companyImage || "");
      } catch (err: any) {
        console.error("Failed to fetch job:", err);
        setError(err.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError("");
    setImageRemoved(false);
    setCompanyImageFile(file);
    setCompanyImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setCompanyImageFile(null);
    setCompanyImagePreview("");
    setImageRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !company.trim() || !hiringEmail.trim()) {
      setError("Title, Company and Hiring Email are required.");
      return;
    }

    try {
      setSaving(true);

      // Start with whatever image already exists on the job
      let companyImage = existingCompanyImage;
      let companyImagePublicId = existingCompanyImagePublicId;

      // A new file was picked — upload it and replace
      if (companyImageFile) {
        setUploadingImage(true);

        const formData = new FormData();
        formData.append("image", companyImageFile);

        const uploadRes = await fetch(`${API_URL}/api/upload/image`, {
          method: "POST",
          headers: getAuthHeaders(false),
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadData.message || "Image upload failed");
        }

        companyImage = uploadData.imageUrl;
        companyImagePublicId = uploadData.imagePublicId;
        setUploadingImage(false);
      } else if (imageRemoved) {
        // Image explicitly removed and no replacement chosen
        companyImage = "";
        companyImagePublicId = "";
      }

      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        company: company.trim(),
        companyImage,
        companyImagePublicId,
        location: location.trim(),
        experience: experience.trim(),
        jobType,
        salary: salary.trim(),
        lastDate: lastDate.trim(),
        description: description.trim(),
        whoCanApply: whoCanApply
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        requiredSkills: requiredSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        hiringEmail: hiringEmail.trim(),
        originalPostUrl: originalPostUrl.trim(),
        isVerified,
        isActive,
      };

      const res = await fetch(`${API_URL}/api/direct-hiring/${jobId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/admin/direct-hiring");
    } catch (err: any) {
      console.error("Update job failed:", err);
      setError(err.message || "Failed to update job");
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="p-6">
      <Link
        href="/admin/direct-hiring"
        className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-900"
      >
        <ArrowLeft size={16} />
        Back to Direct Hiring Jobs
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-slate-900">Edit Direct Hiring Job</h1>

      {loading && (
        <div className="mt-10 flex items-center gap-3 text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Loading job...
        </div>
      )}

      {!loading && (
        <form onSubmit={handleSubmit} className="mt-6 max-w-3xl">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
            {/* COMPANY IMAGE UPLOAD */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Company Image / Logo
              </label>

              {companyImagePreview ? (
                <div className="relative h-40 w-full overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={companyImagePreview}
                    alt="Company preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600"
                >
                  <ImagePlus size={26} />
                  <span className="text-sm font-semibold">Click to upload an image</span>
                  <span className="text-xs text-slate-400">
                    If skipped, a colorful auto-generated banner will be used instead
                  </span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* TITLE + COMPANY */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Frontend Developer"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Company *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Tech Startup"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* SLUG */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="frontend-developer-tech-startup"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* LOCATION + EXPERIENCE */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Remote / Bengaluru"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Experience
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="0-2 years"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* JOB TYPE + SALARY */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Job Type
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
                >
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Salary
                </label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="4-6 LPA"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* LAST DATE */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Last Date to Apply
              </label>
              <input
                type="text"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                placeholder="30 Aug 2026"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Short description about the role..."
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* WHO CAN APPLY */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Who Can Apply (one point per line)
              </label>
              <textarea
                value={whoCanApply}
                onChange={(e) => setWhoCanApply(e.target.value)}
                rows={3}
                placeholder={"Final year students\n0-1 years experience\nB.Tech / MCA graduates"}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* REQUIRED SKILLS */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Required Skills (comma separated)
              </label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="React, Next.js, Tailwind CSS"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* HIRING EMAIL */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Hiring Email *
              </label>
              <input
                type="email"
                value={hiringEmail}
                onChange={(e) => setHiringEmail(e.target.value)}
                placeholder="hr@company.com"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* ORIGINAL POST URL */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Original Post URL (screenshot/proof link)
              </label>
              <input
                type="text"
                value={originalPostUrl}
                onChange={(e) => setOriginalPostUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* TOGGLES */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="h-4 w-4 accent-purple-600"
                />
                Mark as Verified
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 accent-purple-600"
                />
                Active (visible to users)
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={saving}
            className="mt-6 flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700 disabled:opacity-60"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {uploadingImage ? "Uploading image..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}
