"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

type Exam = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  isActive?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const makeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function EditExamPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  const examId = params.examId as string;
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/exam-categories/${categoryId}/exams`
        );
        const { exams = [] } = await response.json();
        const exam = exams.find((item: Exam) => item._id === examId);

        if (!response.ok || !exam) throw new Error("Exam not found");

        setForm({
          name: exam.name,
          slug: exam.slug,
          description: exam.description || "",
          image: exam.image || "",
          isActive: exam.isActive !== false,
        });
      } catch (error) {
        console.error("Fetch exam error:", error);
        alert("Exam details could not be loaded");
        router.replace(
          `/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && examId) fetchExam();
  }, [categoryId, examId, router]);

  const uploadImage = async () => {
    if (!imageFile) return form.image;

    const data = new FormData();
    data.append("image", imageFile);
    const response = await fetch(`${API_URL}/api/upload/image`, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Image upload failed");
    return result.imageUrl;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.slug.trim() || !form.description.trim()) {
      alert("Exam name, slug and description are required");
      return;
    }

    try {
      setSaving(true);
      const image = await uploadImage();
      const response = await fetch(`${API_URL}/api/exam-categories/${examId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: form.name.trim(), slug: makeSlug(form.slug), description: form.description.trim(), image }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update exam");

      alert("Exam updated successfully");
      router.push(
        `/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`
      );
    } catch (error) {
      console.error("Update exam error:", error);
      alert(error instanceof Error ? error.message : "Failed to update exam");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600" size={40} /></main>;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white">
            <ArrowLeft size={17} /> Back to Exams
          </Link>
          <h1 className="mt-8 text-4xl font-black md:text-5xl">Edit Exam</h1>
          <p className="mt-3 text-indigo-100">Update this government exam&apos;s details.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <label className="block text-sm font-bold text-slate-700">Exam Name</label>
          <input value={form.name} onChange={(e) => setForm((previous) => ({ ...previous, name: e.target.value, slug: makeSlug(e.target.value) }))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />

          <label className="mt-6 block text-sm font-bold text-slate-700">Exam Slug</label>
          <input value={form.slug} onChange={(e) => setForm((previous) => ({ ...previous, slug: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
          <p className="mt-2 text-xs text-slate-500">Use lowercase words separated by hyphens, e.g. ssc-cgl.</p>

          <label className="mt-6 block text-sm font-bold text-slate-700">Description</label>
          <textarea value={form.description} onChange={(e) => setForm((previous) => ({ ...previous, description: e.target.value }))} rows={5} className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />

          <label className="mt-6 block text-sm font-bold text-slate-700">Replace Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
          {form.image && !imageFile && <p className="mt-2 text-xs text-slate-500">Current image will be kept unless you select a new one.</p>}

          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((previous) => ({ ...previous, isActive: e.target.checked }))} className="h-5 w-5 accent-indigo-600" />
            Exam is active
          </label>

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <Link href={`/admin/career-resources/government-exams/exam-blueprint/categories/${categoryId}`} className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600">Cancel</Link>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Updating..." : "Update Exam"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
