"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";


type Subject = {
  _id: string;

  name: string;

  slug: string;

  description?: string;

  icon?: string;

  image?: string;

  imagePublicId?: string;

  gradient?: string;

  isActive?: boolean;
};


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function EditSubjectPage() {

  const params =
    useParams();


  const router =
    useRouter();


  const categoryId =
    params.id as string;


  const subjectId =
    params.subjectId as string;


  // =====================================
  // FORM STATES
  // =====================================

  const [
    name,
    setName,
  ] = useState("");


  const [
    slug,
    setSlug,
  ] = useState("");


  const [
    description,
    setDescription,
  ] = useState("");


  const [
    icon,
    setIcon,
  ] = useState("📚");


  const [
    image,
    setImage,
  ] = useState("");


  const [
    imagePublicId,
    setImagePublicId,
  ] = useState("");


  const [
    gradient,
    setGradient,
  ] = useState(
    "from-indigo-500 to-violet-600"
  );


  const [
    isActive,
    setIsActive,
  ] = useState(true);


  // =====================================
  // UI STATES
  // =====================================

  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    uploading,
    setUploading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    success,
    setSuccess,
  ] = useState("");


  // =====================================
  // FETCH SUBJECT
  // =====================================

  useEffect(() => {

    const fetchSubject =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await fetch(

              `${API_URL}/api/government-notes-categories/${categoryId}/subjects`

            );


          const text =
            await response.text();


          let data;


          try {

            data =
              JSON.parse(
                text
              );

          } catch {

            throw new Error(

              "Subject API returned an invalid response"

            );

          }


          if (
            !response.ok
          ) {

            throw new Error(

              data.message ||

              "Failed to fetch subject"

            );

          }


          const subjects =
            Array.isArray(
              data.subjects
            )

              ? data.subjects

              : [];


          const currentSubject =
            subjects.find(

              (
                item: Subject
              ) =>

                item._id ===
                subjectId

            );


          if (
            !currentSubject
          ) {

            throw new Error(

              "Subject not found"

            );

          }


          setName(

            currentSubject.name ||

            ""

          );


          setSlug(

            currentSubject.slug ||

            ""

          );


          setDescription(

            currentSubject.description ||

            ""

          );


          setIcon(

            currentSubject.icon ||

            "📚"

          );


          setImage(

            currentSubject.image ||

            ""

          );


          setImagePublicId(

            currentSubject.imagePublicId ||

            ""

          );


          setGradient(

            currentSubject.gradient ||

            "from-indigo-500 to-violet-600"

          );


          setIsActive(

            currentSubject.isActive !==
            false

          );


        } catch (error) {

          console.error(

            "Fetch Subject Error:",

            error

          );


          setError(

            error instanceof Error

              ? error.message

              : "Failed to load subject"

          );


        } finally {

          setLoading(false);

        }

      };


    if (
      categoryId &&
      subjectId
    ) {

      fetchSubject();

    }


  }, [
    categoryId,
    subjectId,
  ]);


  // =====================================
  // AUTO GENERATE SLUG
  // =====================================

  const generateSlug =
    (
      value: string
    ) => {

      return value

        .toLowerCase()

        .trim()

        .replace(
          /[^a-z0-9\s-]/g,
          ""
        )

        .replace(
          /\s+/g,
          "-"
        )

        .replace(
          /-+/g,
          "-"
        );

    };


  const handleNameChange =
    (
      event:
        ChangeEvent<
          HTMLInputElement
        >
    ) => {

      const value =
        event.target.value;


      setName(
        value
      );


      setSlug(

        generateSlug(
          value
        )

      );

    };


  // =====================================
  // UPLOAD IMAGE
  // =====================================

  const uploadImage =
    async (
      file: File
    ) => {

      const formData =
        new FormData();


      formData.append(

        "image",

        file

      );


      const response =
        await fetch(

          `${API_URL}/api/upload/image`,

          {

            method:
              "POST",

            body:
              formData,

          }

        );


      const text =
        await response.text();


      let result;


      try {

        result =
          JSON.parse(
            text
          );

      } catch {

        throw new Error(

          "Image upload API returned an invalid response"

        );

      }


      if (
        !response.ok
      ) {

        throw new Error(

          result.message ||

          "Image upload failed"

        );

      }


      if (
        !result.imageUrl
      ) {

        throw new Error(

          "Image URL was not returned by the upload API"

        );

      }


      return {

        imageUrl:
          result.imageUrl,

        imagePublicId:
          result.imagePublicId ||
          "",

      };

    };


  // =====================================
  // IMAGE SELECT
  // =====================================

  const handleImageChange =
    async (
      event:
        ChangeEvent<
          HTMLInputElement
        >
    ) => {

      const file =
        event.target.files?.[0];


      if (
        !file
      ) {

        return;

      }


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        setError(

          "Please select a valid image file"

        );

        return;

      }


      if (
        file.size >
        5 * 1024 * 1024
      ) {

        setError(

          "Image size must be less than 5 MB"

        );

        return;

      }


      try {

        setUploading(
          true
        );


        setError(
          ""
        );


        const uploadedImage =
          await uploadImage(
            file
          );


        setImage(

          uploadedImage.imageUrl

        );


        setImagePublicId(

          uploadedImage.imagePublicId

        );


        setSuccess(

          "New image uploaded successfully"

        );


      } catch (error) {

        console.error(

          "Subject Image Upload Error:",

          error

        );


        setError(

          error instanceof Error

            ? error.message

            : "Failed to upload image"

        );


      } finally {

        setUploading(
          false
        );

      }

    };


  // =====================================
  // REMOVE IMAGE
  // =====================================

  const removeImage =
    () => {

      setImage(
        ""
      );


      setImagePublicId(
        ""
      );


      setSuccess(
        ""
      );

    };


  // =====================================
  // UPDATE SUBJECT
  // =====================================

  const handleSubmit =
    async (
      event:
        FormEvent<
          HTMLFormElement
        >
    ) => {

      event.preventDefault();


      try {

        setSaving(
          true
        );


        setError(
          ""
        );


        setSuccess(
          ""
        );


        if (
          !name.trim()
        ) {

          throw new Error(

            "Subject name is required"

          );

        }


        if (
          !slug.trim()
        ) {

          throw new Error(

            "Subject slug is required"

          );

        }


        const response =
          await fetch(

            `${API_URL}/api/government-notes-categories/${categoryId}/subjects/${subjectId}`,

            {

              method:
                "PUT",


              headers: {

                "Content-Type":

                  "application/json",

              },


              body:

                JSON.stringify({

                  name:

                    name.trim(),


                  slug:

                    slug.trim(),


                  description:

                    description.trim(),


                  icon:

                    icon.trim() ||

                    "📚",


                  image,


                  imagePublicId,


                  gradient,


                  isActive,

                }),

            }

          );


        const text =
          await response.text();


        let result;


        try {

          result =
            JSON.parse(
              text
            );

        } catch {

          throw new Error(

            "Update API returned an invalid response"

          );

        }


        if (
          !response.ok
        ) {

          throw new Error(

            result.message ||

            "Failed to update subject"

          );

        }


        setSuccess(

          "Subject updated successfully"

        );


        setTimeout(

          () => {

            router.push(

              `/admin/career-resources/government-exams/notes/categories/${categoryId}`

            );

          },

          1000

        );


      } catch (error) {

        console.error(

          "Update Subject Error:",

          error

        );


        setError(

          error instanceof Error

            ? error.message

            : "Failed to update subject"

        );


      } finally {

        setSaving(
          false
        );

      }

    };


  // =====================================
  // LOADING
  // =====================================

  if (
    loading
  ) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2

            size={42}

            className="mx-auto animate-spin text-indigo-600"

          />


          <p className="mt-4 font-bold text-slate-600">

            Loading subject details...

          </p>

        </div>

      </main>

    );

  }


  // =====================================
  // PAGE
  // =====================================

  return (

    <main className="min-h-screen bg-slate-50">


      {/* HEADER */}

      <section className="border-b border-slate-200 bg-white">


        <div className="mx-auto max-w-5xl px-6 py-8">


          <Link

            href={`/admin/career-resources/government-exams/notes/categories/${categoryId}`}

            className="mb-6 inline-flex items-center gap-2 font-bold text-slate-500 transition hover:text-indigo-600"

          >

            <ArrowLeft size={18} />

            Back to Subjects

          </Link>


          <h1 className="text-4xl font-black text-slate-900">

            Edit Subject

          </h1>


          <p className="mt-2 text-slate-600">

            Update subject information and image.

          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-10">


        <form

          onSubmit={
            handleSubmit
          }

          className="space-y-8"

        >


          {/* ERROR */}

          {

            error && (

              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-700">

                {error}

              </div>

            )

          }


          {/* SUCCESS */}

          {

            success && (

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700">

                <CheckCircle2
                  size={20}
                />

                {success}

              </div>

            )

          }


          {/* BASIC DETAILS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">


            <h2 className="text-2xl font-black text-slate-900">

              Subject Details

            </h2>


            <div className="mt-7 grid gap-6 md:grid-cols-2">


              {/* NAME */}

              <div>

                <label className="mb-2 block font-bold text-slate-700">

                  Subject Name

                </label>


                <input

                  type="text"

                  value={
                    name
                  }

                  onChange={
                    handleNameChange
                  }

                  placeholder="Example: Reasoning"

                  className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"

                />

              </div>


              {/* SLUG */}

              <div>

                <label className="mb-2 block font-bold text-slate-700">

                  Subject Slug

                </label>


                <input

                  type="text"

                  value={
                    slug
                  }

                  onChange={

                    (
                      event
                    ) =>

                      setSlug(

                        generateSlug(

                          event.target.value

                        )

                      )

                  }

                  placeholder="reasoning"

                  className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"

                />

              </div>


            </div>


            {/* DESCRIPTION */}

            <div className="mt-6">

              <label className="mb-2 block font-bold text-slate-700">

                Description

              </label>


              <textarea

                value={
                  description
                }

                onChange={

                  (
                    event
                  ) =>

                    setDescription(

                      event.target.value

                    )

                }

                rows={4}

                placeholder="Write a short description..."

                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"

              />

            </div>

          </div>


          {/* IMAGE */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">


            <h2 className="text-2xl font-black text-slate-900">

              Subject Image

            </h2>


            <p className="mt-2 text-slate-500">

              Upload a new image or keep the current image.

            </p>


            {

              image

                ? (

                  <div className="mt-6">


                    <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-4">


                      <img

                        src={
                          image
                        }

                        alt={
                          name
                        }

                        className="h-full w-full object-contain"

                      />

                    </div>


                    <button

                      type="button"

                      onClick={
                        removeImage
                      }

                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-bold text-red-600 transition hover:bg-red-50"

                    >

                      <X size={18} />

                      Remove Image

                    </button>

                  </div>

                )

                : (

                  <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 px-6 py-12 text-center transition hover:border-indigo-400 hover:bg-indigo-100">


                    {

                      uploading

                        ? (

                          <Loader2

                            size={38}

                            className="animate-spin text-indigo-600"

                          />

                        )

                        : (

                          <Upload

                            size={38}

                            className="text-indigo-600"

                          />

                        )

                    }


                    <span className="mt-4 text-lg font-black text-slate-800">

                      {

                        uploading

                          ? "Uploading image..."

                          : "Click to upload image"

                      }

                    </span>


                    <span className="mt-2 text-sm text-slate-500">

                      JPG, PNG or WEBP • Maximum 5 MB

                    </span>


                    <input

                      type="file"

                      accept="image/*"

                      onChange={
                        handleImageChange
                      }

                      disabled={
                        uploading
                      }

                      className="hidden"

                    />

                  </label>

                )

            }


            {

              image && (

                <label className="mt-5 flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4 font-bold text-indigo-700 transition hover:bg-indigo-100">


                  {

                    uploading

                      ? (

                        <Loader2

                          size={20}

                          className="animate-spin"

                        />

                      )

                      : (

                        <ImageIcon
                          size={20}
                        />

                      )

                  }


                  {

                    uploading

                      ? "Uploading..."

                      : "Replace Current Image"

                  }


                  <input

                    type="file"

                    accept="image/*"

                    onChange={
                      handleImageChange
                    }

                    disabled={
                      uploading
                    }

                    className="hidden"

                  />

                </label>

              )

            }

          </div>


          {/* STATUS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">


            <h2 className="text-2xl font-black text-slate-900">

              Subject Status

            </h2>


            <label className="mt-6 flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 p-5">


              <div>

                <p className="font-black text-slate-900">

                  Active Subject

                </p>


                <p className="mt-1 text-sm text-slate-500">

                  Inactive subjects will not be visible to users.

                </p>

              </div>


              <input

                type="checkbox"

                checked={
                  isActive
                }

                onChange={

                  (
                    event
                  ) =>

                    setIsActive(

                      event.target.checked

                    )

                }

                className="h-6 w-6 accent-indigo-600"

              />

            </label>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-col justify-end gap-4 sm:flex-row">


            <Link

              href={`/admin/career-resources/government-exams/notes/categories/${categoryId}`}

              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:bg-slate-100"

            >

              Cancel

            </Link>


            <button

              type="submit"

              disabled={

                saving ||

                uploading

              }

              className="inline-flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-8 py-4 font-black text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"

            >

              {

                saving

                  ? (

                    <Loader2

                      size={20}

                      className="animate-spin"

                    />

                  )

                  : (

                    <Save
                      size={20}
                    />

                  )

              }


              {

                saving

                  ? "Saving Changes..."

                  : "Save Changes"

              }

            </button>

          </div>

        </form>

      </section>

    </main>

  );

}