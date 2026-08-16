"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  FolderPlus,
  ImagePlus,
  Loader2,
  Save,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000";


export default function NewCoreSubjectCategoryPage() {
  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================
  // IMAGE SELECT
  // ==========================================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;


    const allowedTypes = [

      "image/jpeg",

      "image/jpg",

      "image/png",

      "image/webp",

    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setError(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      );

      return;

    }


    if (
      file.size >
      10 *
      1024 *
      1024
    ) {

      setError(
        "Image size must be less than 10 MB"
      );

      return;

    }


    setError("");

    setImage(file);

    setImagePreview(
      URL.createObjectURL(file)
    );

  };


  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {

    setImage(null);

    setImagePreview("");

  };


  // ==========================================
  // CREATE CATEGORY
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    try {

      setLoading(true);

      setError("");

      setSuccess("");


      if (
        !name.trim()
      ) {

        throw new Error(
          "Category name is required"
        );

      }


      if (
        !slug.trim()
      ) {

        throw new Error(
          "Category slug is required"
        );

      }


      const formData =
        new FormData();


      formData.append(
        "name",
        name.trim()
      );


      formData.append(
        "slug",
        slug.trim()
      );


      formData.append(
        "description",
        description.trim()
      );


      if (
        image
      ) {

        formData.append(
          "image",
          image
        );

      }


      const response =
        await fetch(

          `${API_URL}/api/core-subject-categories`,

          {

            method:
              "POST",

            body:
              formData,

          }

        );


      const data =
        await response.json();


      if (
        !response.ok
      ) {

        throw new Error(

          data.message ||
          "Failed to create category"

        );

      }


      setSuccess(

        "Core subject category created successfully!"

      );


      setName("");

      setSlug("");

      setDescription("");

      setImage(null);

      setImagePreview("");


    } catch (error) {

      console.error(error);


      setError(

        error instanceof Error

          ? error.message

          : "Something went wrong"

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-slate-950 via-purple-950 to-fuchsia-950 px-6 py-14 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/core-subjects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-200 transition hover:text-white"
          >

            <ArrowLeft size={18} />

            Back to Core Subject Admin

          </Link>


          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

              <FolderPlus
                size={32}
                className="text-purple-300"
              />

            </div>


            <div>

              <p className="font-bold uppercase tracking-widest text-purple-300">

                Admin Panel

              </p>


              <h1 className="mt-1 text-4xl font-black md:text-5xl">

                Add Subject Category

              </h1>

            </div>

          </div>


          <p className="mt-5 text-purple-100">

            Create a new core computer science subject category.

          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10"
        >

          {/* ERROR */}

          {error && (

            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">

              {error}

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 font-semibold text-green-700">

              {success}

            </div>

          )}


          {/* NAME */}

          <div>

            <label className="text-sm font-bold text-slate-700">

              Subject Name

            </label>


            <input
              type="text"
              value={name}
              onChange={(event) => {

                const value =
                  event.target.value;


                setName(value);


                if (
                  !slug
                ) {

                  setSlug(

                    value

                      .toLowerCase()

                      .trim()

                      .replace(

                        /[^a-z0-9]+/g,

                        "-"

                      )

                      .replace(

                        /^-+|-+$/g,

                        ""

                      )

                  );

                }

              }}
              placeholder="Example: Database Management System"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              required
            />

          </div>


          {/* SLUG */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">

              Slug

            </label>


            <input
              type="text"
              value={slug}
              onChange={(event) =>

                setSlug(

                  event.target.value

                    .toLowerCase()

                    .replace(

                      /[^a-z0-9-]/g,

                      "-"

                    )

                    .replace(

                      /-+/g,

                      "-"

                    )

                )

              }
              placeholder="Example: dbms"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              required
            />


            <p className="mt-2 text-sm text-slate-500">

              Example URL: /core-subject/{slug || "dbms"}

            </p>

          </div>


          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">

              Description

            </label>


            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Enter subject category description"
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

          </div>


          {/* IMAGE */}

          <div className="mt-6">

            <label className="text-sm font-bold text-slate-700">

              Category Image

            </label>


            <div className="mt-2">

              {!imagePreview ? (

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-10 text-center transition hover:border-purple-500 hover:bg-purple-100">

                  <ImagePlus
                    size={42}
                    className="text-purple-600"
                  />


                  <p className="mt-3 font-bold text-purple-700">

                    Upload Category Image

                  </p>


                  <p className="mt-1 text-sm text-purple-500">

                    JPG, PNG, WEBP • Maximum 10 MB

                  </p>


                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

              ) : (

                <div className="relative overflow-hidden rounded-2xl border border-slate-200">

                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="h-64 w-full object-cover"
                  />


                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
                  >

                    <X size={20} />

                  </button>

                </div>

              )}

            </div>

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              type="submit"
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (

                <>

                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Creating...

                </>

              ) : (

                <>

                  <Save size={20} />

                  Create Category

                </>

              )}

            </button>


            <Link
              href="/admin/core-subjects"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-100"
            >

              Cancel

            </Link>

          </div>

        </form>

      </section>

    </main>

  );

}
