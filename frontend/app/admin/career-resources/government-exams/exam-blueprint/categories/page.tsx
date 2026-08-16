"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  FolderPlus,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  gradient?: string;
  image?: string;
  imagePublicId?: string;
  isActive: boolean;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function GovernmentExamCategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "📚",
    gradient:
      "from-blue-500 to-indigo-600",
    image: "",
    isActive: true,
  });

  // ===============================
  // FETCH CATEGORIES
  // ===============================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/government-exam-categories`
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch categories"
        );
      }

      setCategories(
        result.categories || []
      );
    } catch (error) {
      console.error(
        "Fetch Categories Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===============================
  // RESET FORM
  // ===============================

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      icon: "📚",
      gradient:
        "from-blue-500 to-indigo-600",
      image: "",
      isActive: true,
    });

    setImageFile(null);
    setEditingCategory(null);
  };

  // ===============================
  // ADD CATEGORY
  // ===============================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // ===============================
  // EDIT CATEGORY
  // ===============================

  const openEditModal = (
    category: Category
  ) => {
    setEditingCategory(category);

    setForm({
      name: category.name,
      slug: category.slug,
      description:
        category.description,
      icon: category.icon || "📚",
      gradient:
        category.gradient ||
        "from-blue-500 to-indigo-600",
      image: category.image || "",
      isActive: category.isActive,
    });

    setImageFile(null);
    setShowModal(true);
  };

  // ===============================
  // UPLOAD IMAGE
  // ===============================

  const uploadImage = async () => {
    if (!imageFile) {
      return form.image;
    }

    const imageFormData =
      new FormData();

    imageFormData.append(
      "image",
      imageFile
    );

    const uploadResponse =
      await fetch(
        `${API_URL}/api/upload/image`,
        {
          method: "POST",
          body: imageFormData,
        }
      );

    const uploadResult =
      await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(
        uploadResult.message ||
          "Image upload failed"
      );
    }

    return uploadResult.imageUrl;
  };

  // ===============================
  // SAVE CATEGORY
  // ===============================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.slug.trim() ||
      !form.description.trim()
    ) {
      alert(
        "Name, slug and description are required"
      );

      return;
    }

    try {
      setSaving(true);

      const imageUrl =
        await uploadImage();

      const url = editingCategory
        ? `${API_URL}/api/government-exam-categories/${editingCategory._id}`
        : `${API_URL}/api/government-exam-categories`;

      const method = editingCategory
        ? "PUT"
        : "POST";

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            image: imageUrl,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Something went wrong"
        );

        return;
      }

      alert(
        editingCategory
          ? "Category updated successfully"
          : "Category added successfully"
      );

      setShowModal(false);

      resetForm();

      fetchCategories();
    } catch (error) {
      console.error(
        "Save Category Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to connect with backend"
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // DELETE CATEGORY
  // ===============================

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this category?"
      );

    if (!confirmDelete) return;

    try {
      const response =
        await fetch(
          `${API_URL}/api/government-exam-categories/${id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to delete category"
        );

        return;
      }

      alert(
        "Category deleted successfully"
      );

      fetchCategories();
    } catch (error) {
      console.error(
        "Delete Category Error:",
        error
      );

      alert(
        "Unable to connect with backend"
      );
    }
  };

  // ===============================
  // AUTO SLUG
  // ===============================

  const handleNameChange = (
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,

      name: value,

      slug: editingCategory
        ? previous.slug
        : value
            .toLowerCase()
            .trim()
            .replace(
              /[^a-z0-9]+/g,
              "-"
            )
            .replace(
              /^-+|-+$/g,
              ""
            ),
    }));
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ===============================
          HEADER
      =============================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <Link
                href="/admin/career-resources/government-exams"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
              >

                <ArrowLeft size={16} />

                Government Exams

              </Link>

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                  <FolderPlus
                    size={28}
                  />

                </div>

                <div>

                  <h1 className="text-3xl font-black text-slate-900">

                    Manage Exam Categories

                  </h1>

                  <p className="mt-1 text-slate-500">

                    Add and manage government exam categories.

                  </p>

                </div>

              </div>

            </div>

            {/* ADD CATEGORY */}

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-indigo-600"
            >

              <Plus size={19} />

              Add Category

            </button>

          </div>

        </div>

      </section>


      {/* ===============================
          CONTENT
      =============================== */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center">

            <Loader2
              className="animate-spin text-indigo-600"
              size={35}
            />

          </div>

        ) : categories.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

            <FolderPlus
              className="mx-auto text-slate-400"
              size={45}
            />

            <h2 className="mt-5 text-xl font-bold text-slate-900">

              No categories found

            </h2>

            <p className="mt-2 text-slate-500">

              Start by adding your first government exam category.

            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >

              <Plus size={18} />

              Add First Category

            </button>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {categories.map(
              (category) => (

                <div
                  key={category._id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* CATEGORY IMAGE */}

                  <div
                    className={`flex h-32 items-center justify-center bg-gradient-to-br ${
                      category.gradient ||
                      "from-blue-500 to-indigo-600"
                    }`}
                  >

                    {category.image ? (

                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <span className="text-5xl">

                        {category.icon ||
                          "📚"}

                      </span>

                    )}

                  </div>


                  {/* CATEGORY DETAILS */}

                  <div className="p-6">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h2 className="text-xl font-black text-slate-900">

                          {category.name}

                        </h2>

                        <p className="mt-1 text-xs font-semibold text-indigo-600">

                          /{category.slug}

                        </p>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          category.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {category.isActive
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </div>


                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">

                      {
                        category.description
                      }

                    </p>


                    {/* ===============================
                        ACTION BUTTONS
                    =============================== */}

                    <div className="mt-6 flex gap-3">

                      {/* MANAGE */}

                      <Link
                        href={`/admin/career-resources/government-exams/exam-blueprint/categories/${category._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                      >

                        Manage

                        <ArrowRight
                          size={16}
                        />

                      </Link>


                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            category
                          )
                        }
                        className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        title="Edit Category"
                      >

                        <Edit
                          size={16}
                        />

                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            category._id
                          )
                        }
                        className="flex items-center justify-center rounded-xl border border-red-100 px-4 py-3 text-red-500 transition hover:bg-red-50"
                        title="Delete Category"
                      >

                        <Trash2
                          size={17}
                        />

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* ===============================
          MODAL
      =============================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="text-xl font-black text-slate-900">

                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  Manage government exam category details.

                </p>

              </div>

              <button
                type="button"
                onClick={() => {

                  setShowModal(
                    false
                  );

                  resetForm();

                }}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              >

                <X size={20} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Category Name

                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    handleNameChange(
                      e.target.value
                    )
                  }
                  placeholder="SSC Exams"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>


              {/* SLUG */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Slug

                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: e.target.value,
                    })
                  }
                  placeholder="ssc"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Description

                </label>

                <textarea
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="CGL, CHSL, MTS, CPO and other SSC examinations"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>


              {/* ICON + GRADIENT */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">

                    Icon / Emoji

                  </label>

                  <input
                    value={form.icon}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        icon: e.target.value,
                      })
                    }
                    placeholder="📊"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">

                    Tailwind Gradient

                  </label>

                  <input
                    value={
                      form.gradient
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gradient:
                          e.target.value,
                      })
                    }
                    placeholder="from-blue-500 to-indigo-600"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>


              {/* IMAGE UPLOAD */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">

                  <ImageIcon
                    size={16}
                  />

                  Upload Category Image

                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0] ||
                      null;

                    setImageFile(file);

                  }}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:border-indigo-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                {imageFile && (

                  <p className="mt-2 text-sm font-medium text-green-600">

                    ✓ {imageFile.name}

                  </p>

                )}

                {editingCategory &&
                  !imageFile &&
                  form.image && (

                    <p className="mt-2 text-sm text-slate-500">

                      Existing image will be kept

                    </p>

                  )}

              </div>


              {/* ACTIVE */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

                <input
                  type="checkbox"
                  checked={
                    form.isActive
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive:
                        e.target.checked,
                    })
                  }
                  className="h-5 w-5 accent-indigo-600"
                />

                <span className="text-sm font-semibold text-slate-700">

                  Category is active

                </span>

              </label>


              {/* FORM ACTIONS */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={() => {

                    setShowModal(
                      false
                    );

                    resetForm();

                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving && (

                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                  )}

                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}