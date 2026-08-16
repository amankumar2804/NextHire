"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  FolderPlus,
  ImagePlus,
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

  const [uploading, setUploading] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
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

      const result = await response.json();

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

      alert(
        "Unable to fetch categories"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);


  // ===============================
  // OPEN ADD MODAL
  // ===============================

  const openAddModal = () => {
    setEditingCategory(null);

    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      isActive: true,
    });

    setImageFile(null);
    setImagePreview("");

    setShowModal(true);
  };


  // ===============================
  // OPEN EDIT MODAL
  // ===============================

  const openEditModal = (
    category: Category
  ) => {
    setEditingCategory(category);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image || "",
      isActive: category.isActive,
    });

    setImageFile(null);
    setImagePreview(
      category.image || ""
    );

    setShowModal(true);
  };


  // ===============================
  // CLOSE MODAL
  // ===============================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingCategory(null);
    setImageFile(null);
    setImagePreview("");
  };


  // ===============================
  // NAME + SLUG
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


  // ===============================
  // IMAGE CHANGE
  // ===============================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
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

    const response = await fetch(
      `${API_URL}/api/upload/image`,
      {
        method: "POST",
        body: imageFormData,
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Image upload failed"
      );
    }

    return result.imageUrl;
  };


  // ===============================
  // CREATE / UPDATE
  // ===============================

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.slug ||
      !form.description
    ) {
      alert(
        "Name, slug and description are required"
      );

      return;
    }

    try {
      setSaving(true);

      let imageUrl =
        form.image;

      // Upload new image only if selected
      if (imageFile) {
        setUploading(true);

        imageUrl =
          await uploadImage();

        setUploading(false);
      }

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
            name: form.name,
            slug: form.slug,
            description:
              form.description,
            image: imageUrl,
            isActive:
              form.isActive,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Something went wrong"
        );
      }

      alert(
        editingCategory
          ? "Category updated successfully"
          : "Category created successfully"
      );

      closeModal();

      await fetchCategories();

    } catch (error) {
      setUploading(false);

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
  // DELETE
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
      const response = await fetch(
        `${API_URL}/api/government-exam-categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete category"
        );
      }

      alert(
        "Category deleted successfully"
      );

      await fetchCategories();

    } catch (error) {
      console.error(
        "Delete Category Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete category"
      );
    }
  };


  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <Link
                href="/admin/career-resources/government-exams"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
              >
                <ArrowLeft size={16} />

                Government Exams
              </Link>

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                  <FolderPlus size={28} />

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


            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-indigo-600"
            >

              <Plus size={19} />

              Add Category

            </button>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center">

            <Loader2
              size={35}
              className="animate-spin text-indigo-600"
            />

          </div>

        ) : categories.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

            <FolderPlus
              size={45}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-5 text-xl font-bold">

              No categories found

            </h2>

            <p className="mt-2 text-slate-500">

              Start by adding your first category.

            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
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
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >

                  <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600">

                    {category.image ? (

                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <FolderPlus
                          size={55}
                          className="text-white"
                        />

                      </div>

                    )}

                  </div>


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

                      {category.description}

                    </p>


                    <div className="mt-6 flex gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            category
                          )
                        }
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >

                        <Edit size={16} />

                        Edit

                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            category._id
                          )
                        }
                        className="flex cursor-pointer items-center justify-center rounded-xl border border-red-100 px-4 py-3 text-red-500 hover:bg-red-50"
                      >

                        <Trash2 size={17} />

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

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
                onClick={closeModal}
                className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              >

                <X size={20} />

              </button>

            </div>


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
                  onChange={(event) =>
                    handleNameChange(
                      event.target.value
                    )
                  }
                  required
                  placeholder="SSC Exams"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>


              {/* SLUG */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Slug

                </label>

                <input
                  value={form.slug}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      slug: event.target.value,
                    })
                  }
                  required
                  placeholder="ssc"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Description

                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description:
                        event.target.value,
                    })
                  }
                  required
                  rows={4}
                  placeholder="CGL, CHSL, MTS and other SSC examinations"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>


              {/* IMAGE UPLOAD */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Category Image

                </label>

                <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 hover:border-indigo-500">

                  {imagePreview ? (

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-44 w-full rounded-xl object-cover"
                    />

                  ) : (

                    <>

                      <ImagePlus
                        size={40}
                        className="text-indigo-500"
                      />

                      <p className="mt-3 font-bold text-slate-700">

                        Click to upload image

                      </p>

                      <p className="mt-1 text-sm text-slate-500">

                        PNG, JPG or WEBP

                      </p>

                    </>

                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

              </div>


              {/* ACTIVE */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      isActive:
                        event.target.checked,
                    })
                  }
                  className="h-5 w-5 accent-indigo-600"
                />

                <span className="text-sm font-semibold text-slate-700">

                  Category is active

                </span>

              </label>


              {/* ACTIONS */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving && (

                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                  )}

                  {uploading
                    ? "Uploading Image..."
                    : saving
                    ? "Saving..."
                    : editingCategory
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