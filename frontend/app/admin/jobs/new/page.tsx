"use client";

import {
  ArrowLeft,
  FileText,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract"];
const SECTORS = ["Private", "Government"];

type ReferralContactInput = {
  name: string;
  role: string;
  linkedinUrl: string;
  verified: boolean;
};

const emptyContact = (): ReferralContactInput => ({
  name: "",
  role: "",
  linkedinUrl: "",
  verified: true,
});

const getAuthHeaders = (isJson = true) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    ...(isJson ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export default function NewJobPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [sector, setSector] = useState("Private");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [description, setDescription] = useState("");
  const [article, setArticle] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [skills, setSkills] = useState("");
  const [applyUrl, setApplyUrl] = useState("");
  const [verified, setVerified] = useState(true);
  const [isActive, setIsActive] = useState(true);

  // Government-only
  const [totalVacancies, setTotalVacancies] = useState("");
  const [applicationFee, setApplicationFee] = useState("");
  const [examDate, setExamDate] = useState("");

  const [referralContacts, setReferralContacts] = useState<ReferralContactInput[]>([]);

  // Company / organization image
  const [companyImageFile, setCompanyImageFile] = useState<File | null>(null);
  const [companyImagePreview, setCompanyImagePreview] = useState("");

  // Government notification PDF
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [error, setError] = useState("");

  const isGovernment = sector === "Government";

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError("");
    setCompanyImageFile(file);
    setCompanyImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setCompanyImageFile(null);
    setCompanyImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    setError("");
    setPdfFile(file);
    setPdfFileName(file.name);
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfFileName("");
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const addReferralContact = () => {
    if (referralContacts.length >= 3) return;
    setReferralContacts((prev) => [...prev, emptyContact()]);
  };

  const removeReferralContact = (index: number) => {
    setReferralContacts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateReferralContact = (
    index: number,
    field: keyof ReferralContactInput,
    value: string | boolean
  ) => {
    setReferralContacts((prev) =>
      prev.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalCompany = isGovernment ? category.trim() : company.trim();
    const finalLocation = isGovernment ? location.trim() || "All India" : location.trim();
    const finalDescription = isGovernment ? article : description;

    if (
      !title.trim() ||
      !finalCompany ||
      !category.trim() ||
      !finalLocation ||
      !experience.trim() ||
      !finalDescription.trim()
    ) {
      setError(
        isGovernment
          ? "Title, Organization/Department, Experience and Article are required."
          : "Title, Company, Category, Location, Experience and Description are required."
      );
      return;
    }

    try {
      setSaving(true);

      // 1. Upload company/organization image
      let companyImage = "";
      let companyImagePublicId = "";

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
      }

      // 2. Upload notification PDF (Government only)
      let notificationPdf = "";
      let notificationPdfPublicId = "";

      if (isGovernment && pdfFile) {
        setUploadingPdf(true);

        const pdfFormData = new FormData();
        pdfFormData.append("pdf", pdfFile);

        const pdfUploadRes = await fetch(`${API_URL}/api/upload/pdf`, {
          method: "POST",
          headers: getAuthHeaders(false),
          body: pdfFormData,
        });

        const pdfUploadData = await pdfUploadRes.json();

        if (!pdfUploadRes.ok) {
          throw new Error(pdfUploadData.message || "PDF upload failed");
        }

        notificationPdf = pdfUploadData.pdfUrl;
        notificationPdfPublicId = pdfUploadData.pdfPublicId;
        setUploadingPdf(false);
      }

      // 3. Create the job
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        company: finalCompany,
        category: category.trim(),
        sector,
        location: finalLocation,
        experience: experience.trim(),
        jobType,
        salary: salary.trim(),
        lastDate: lastDate.trim(),
        description: finalDescription,
        eligibility: eligibility
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        applyUrl: applyUrl.trim(),
        verified,
        isActive,
        companyImage,
        companyImagePublicId,
        referralContacts: isGovernment
          ? []
          : referralContacts
              .filter((c) => c.name.trim() && c.linkedinUrl.trim())
              .slice(0, 3),
        notificationPdf,
        notificationPdfPublicId,
        totalVacancies: totalVacancies.trim(),
        applicationFee: applicationFee.trim(),
        examDate: examDate.trim(),
      };

      const res = await fetch(`${API_URL}/api/jobs/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/admin/jobs");
    } catch (err: any) {
      console.error("Create job failed:", err);
      setError(err.message || "Failed to create job");
    } finally {
      setSaving(false);
      setUploadingImage(false);
      setUploadingPdf(false);
    }
  };

  return (
    <div className="p-6">
      <Link
        href="/admin/jobs"
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-slate-900">Add New Job</h1>
      <p className="mt-1 text-sm text-slate-500">
        This job will appear on the Private or Government page based on the sector you pick.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
          {/* SECTOR — first, since it drives the rest of the form */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* COMPANY / ORGANIZATION IMAGE UPLOAD */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              {isGovernment ? "Organization Logo" : "Company Image / Logo"}
            </label>

            {companyImagePreview ? (
              <div className="relative h-40 w-full overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={companyImagePreview}
                  alt="Preview"
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
                className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
              >
                <ImagePlus size={26} />
                <span className="text-sm font-semibold">Click to upload an image</span>
                <span className="text-xs text-slate-400">
                  If skipped, a colorful auto-generated logo will be used instead
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

          {/* TITLE */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              {isGovernment ? "Exam / Post Title *" : "Job Title *"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isGovernment ? "SSC CGL 2026" : "Software Development Engineer"}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </div>

          {/* PRIVATE ONLY: COMPANY */}
          {!isGovernment && (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Company *
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            </div>
          )}

          {/* SLUG */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Slug (optional — auto-generated if left blank)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ssc-cgl-2026"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </div>

          {/* CATEGORY / ORGANIZATION */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              {isGovernment ? "Organization / Department *" : "Category / Domain *"}
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={
                isGovernment ? "Staff Selection Commission (SSC)" : "Software Development"
              }
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </div>

          {/* PRIVATE ONLY: LOCATION */}
          {!isGovernment && (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Location *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bangalore, India"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            </div>
          )}

          {/* EXPERIENCE + JOB TYPE */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                {isGovernment ? "Eligibility Level *" : "Experience *"}
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder={isGovernment ? "Graduate / Freshers" : "0-2 Years"}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            </div>

            {!isGovernment && (
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Job Type
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
                >
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* SALARY + LAST DATE */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                {isGovernment ? "Salary / Pay Level" : "Salary"}
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder={isGovernment ? "Level 7 (₹44,900 - ₹1,42,400)" : "₹12-25 LPA"}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Last Date to Apply
              </label>
              <input
                type="text"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                placeholder="30 Aug 2026"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* GOVERNMENT ONLY: VACANCIES / FEE / EXAM DATE */}
          {isGovernment && (
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Total Vacancies
                </label>
                <input
                  type="text"
                  value={totalVacancies}
                  onChange={(e) => setTotalVacancies(e.target.value)}
                  placeholder="1500 Posts"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Application Fee
                </label>
                <input
                  type="text"
                  value={applicationFee}
                  onChange={(e) => setApplicationFee(e.target.value)}
                  placeholder="₹100 (General)"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Exam Date
                </label>
                <input
                  type="text"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  placeholder="15 Oct 2026"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>
          )}

          {/* GOVERNMENT ONLY: NOTIFICATION PDF UPLOAD */}
          {isGovernment && (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Notification PDF
              </label>

              {pdfFileName ? (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FileText size={18} className="text-red-500" />
                    {pdfFileName}
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePdf}
                    className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  className="flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                >
                  <FileText size={22} />
                  <span className="text-sm font-semibold">Click to upload notification PDF</span>
                </button>
              )}

              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                onChange={handlePdfSelect}
                className="hidden"
              />
            </div>
          )}

          {/* DESCRIPTION / ARTICLE */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              {isGovernment ? "Notification Article *" : "Description *"}
            </label>

            {isGovernment ? (
              <RichTextEditor
                value={article}
                onChange={setArticle}
                placeholder="Write the full notification details here — use bold, colors and headings to highlight important info..."
              />
            ) : (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Google is hiring Software Engineers..."
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            )}
          </div>

          {/* ELIGIBILITY */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              Eligibility (one point per line)
            </label>
            <textarea
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              rows={3}
              placeholder={
                isGovernment
                  ? "Graduate from a recognized university\nAge: 18-32 years"
                  : "Bachelor's or Master's degree in Computer Science\nStrong programming skills"
              }
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </div>

          {/* SKILLS (private only — not very relevant for govt exams, kept optional either way) */}
          {!isGovernment && (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Required Skills (comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="C++, Java, Python, Data Structures"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
              />
            </div>
          )}

          {/* APPLY URL */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">
              {isGovernment ? "Official Notification / Apply Link" : "Apply URL (official company website)"}
            </label>
            <input
              type="text"
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder={isGovernment ? "https://ssc.gov.in" : "https://careers.google.com"}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </div>

          {/* PRIVATE ONLY: REFERRAL CONTACTS */}
          {!isGovernment && (
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700">
                  Referral Contacts (up to 3)
                </label>
                {referralContacts.length < 3 && (
                  <button
                    type="button"
                    onClick={addReferralContact}
                    className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100"
                  >
                    <Plus size={14} />
                    Add Contact
                  </button>
                )}
              </div>

              {referralContacts.length === 0 && (
                <p className="mt-2 text-xs text-slate-400">
                  No referral contacts added. Add up to 3 HR/employee LinkedIn profiles for this
                  company.
                </p>
              )}

              <div className="mt-3 space-y-4">
                {referralContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <button
                      type="button"
                      onClick={() => removeReferralContact(index)}
                      className="absolute right-3 top-3 rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="grid gap-3 pr-8 sm:grid-cols-2">
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => updateReferralContact(index, "name", e.target.value)}
                        placeholder="Name (e.g. Rahul Sharma)"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        value={contact.role}
                        onChange={(e) => updateReferralContact(index, "role", e.target.value)}
                        placeholder="Role (e.g. Software Engineer)"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>

                    <input
                      type="text"
                      value={contact.linkedinUrl}
                      onChange={(e) =>
                        updateReferralContact(index, "linkedinUrl", e.target.value)
                      }
                      placeholder="https://www.linkedin.com/in/..."
                      className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />

                    <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <input
                        type="checkbox"
                        checked={contact.verified}
                        onChange={(e) =>
                          updateReferralContact(index, "verified", e.target.checked)
                        }
                        className="h-3.5 w-3.5 accent-blue-600"
                      />
                      Mark as Verified
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOGGLES */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              Mark Job as Verified
            </label>

            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              Active (visible to users)
            </label>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={saving}
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {uploadingImage
            ? "Uploading image..."
            : uploadingPdf
            ? "Uploading PDF..."
            : "Create Job"}
        </button>
      </form>
    </div>
  );
}
