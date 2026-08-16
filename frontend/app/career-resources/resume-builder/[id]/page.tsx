"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Save,
  Plus,
  Trash2,
  Check,
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  FolderKanban,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { resumeFetch } from "@/lib/resumeAuth";

type LinkItem = { label: string; url: string };

type Education = {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
  percentage: string;
  cgpa: string;
  grade: string;
};

type SkillCategory = { category: string; skills: string };

type Project = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
  stack: string;
  link: string;
};

type Experience = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  bulletPoints: string[];
};

type PersonalInfo = {
  fullName: string;
  location: string;
  email: string;
  phone: string;
};

const emptyLink: LinkItem = { label: "", url: "" };

const emptyEducation: Education = {
  institution: "",
  location: "",
  degree: "",
  startDate: "",
  endDate: "",
  percentage: "",
  cgpa: "",
  grade: "",
};

const emptySkillCategory: SkillCategory = { category: "", skills: "" };

const emptyProject: Project = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  bulletPoints: [],
  stack: "",
  link: "",
};

const emptyExperience: Experience = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  bulletPoints: [],
};

const STEPS = [
  { key: "personal", label: "Personal & Links", icon: User },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Sparkles },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "achievements", label: "Achievements", icon: Trophy },
];

const inputClass =
  "rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export default function ResumeBuilderFormPage() {
  const params = useParams();
  const resumeId = params.id as string;

  const [activeStep, setActiveStep] = useState("personal");

  const [title, setTitle] = useState("My Resume");

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    location: "",
    email: "",
    phone: "",
  });

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievementsText, setAchievementsText] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await resumeFetch(`/api/resumes/${resumeId}`);
        const resume = data.resume;

        setTitle(resume.title || "My Resume");
        setPersonalInfo({
          fullName: resume.personalInfo?.fullName || "",
          location: resume.personalInfo?.location || "",
          email: resume.personalInfo?.email || "",
          phone: resume.personalInfo?.phone || "",
        });
        setLinks(resume.links || []);
        setEducation(resume.education || []);
        setSkillCategories(resume.skillCategories || []);
        setExperience(resume.experience || []);
        setProjects(resume.projects || []);
        setAchievementsText((resume.achievements || []).join("\n"));
      } catch (error) {
        console.error("Fetch Resume Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load resume"
        );
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  const handleSave = async (silent = false) => {
    try {
      setSaving(true);

      const finalAchievements = achievementsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      await resumeFetch(`/api/resumes/${resumeId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          personalInfo,
          links,
          education,
          skillCategories,
          experience,
          projects,
          achievements: finalAchievements,
        }),
      });

      if (!silent) {
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 2000);
      }
    } catch (error) {
      console.error("Save Resume Error:", error);
      alert(error instanceof Error ? error.message : "Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const goToStep = async (stepKey: string) => {
    await handleSave(true);
    setActiveStep(stepKey);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading resume...</p>
        </div>
      </main>
    );
  }

  const currentStepIndex = STEPS.findIndex((step) => step.key === activeStep);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/career-resources/resume-builder"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </Link>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="border-b-2 border-transparent bg-transparent text-lg font-black text-slate-900 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            {savedMessage && (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                <Check size={16} />
                Saved
              </span>
            )}

            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="mx-auto mt-6 max-w-6xl px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* STEP SIDEBAR */}
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {STEPS.map((step, index) => {
              const isActive = step.key === activeStep;
              const isDone = index < currentStepIndex;

              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => goToStep(step.key)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition lg:w-full ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : isDone
                      ? "bg-indigo-50 text-indigo-700"
                      : "bg-white text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <step.icon size={17} />
                  {step.label}
                </button>
              );
            })}
          </nav>

          {/* STEP CONTENT */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            {/* ===== PERSONAL + LINKS ===== */}
            {activeStep === "personal" && (
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Basic details shown at the top of your resume.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(event) =>
                        setPersonalInfo({
                          ...personalInfo,
                          fullName: event.target.value,
                        })
                      }
                      className={`w-full ${inputClass}`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(event) =>
                        setPersonalInfo({
                          ...personalInfo,
                          location: event.target.value,
                        })
                      }
                      placeholder="City, State"
                      className={`w-full ${inputClass}`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(event) =>
                        setPersonalInfo({
                          ...personalInfo,
                          email: event.target.value,
                        })
                      }
                      className={`w-full ${inputClass}`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(event) =>
                        setPersonalInfo({
                          ...personalInfo,
                          phone: event.target.value,
                        })
                      }
                      className={`w-full ${inputClass}`}
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <h3 className="font-black text-slate-900">Links</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      GitHub, LinkedIn, LeetCode, Portfolio...
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLinks([...links, { ...emptyLink }])}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Add Link
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {links.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(event) => {
                          const updated = [...links];
                          updated[index].label = event.target.value;
                          setLinks(updated);
                        }}
                        placeholder="Label (e.g. GitHub)"
                        className={`w-40 ${inputClass}`}
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(event) => {
                          const updated = [...links];
                          updated[index].url = event.target.value;
                          setLinks(updated);
                        }}
                        placeholder="https://github.com/username"
                        className={`flex-1 ${inputClass}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setLinks(links.filter((_, i) => i !== index))
                        }
                        className="text-red-500 transition hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  {links.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No links added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ===== EDUCATION ===== */}
            {activeStep === "education" && (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Education
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Add your schools, colleges and degrees.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setEducation([...education, { ...emptyEducation }])
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {education.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-black text-slate-400">
                          Entry {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setEducation(
                              education.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].institution = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="Institution name"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.location}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].location = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="Location"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.degree}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].degree = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="Degree (e.g. B.Tech, Computer Science)"
                          className={`${inputClass} sm:col-span-2`}
                        />

                        <input
                          type="text"
                          value={item.startDate}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].startDate = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="Start (e.g. Aug 2025)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.endDate}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].endDate = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="End (e.g. July 2027)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.cgpa}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].cgpa = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="CGPA (e.g. 8.27)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.percentage}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].percentage = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="Percentage (e.g. 85%)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.grade}
                          onChange={(event) => {
                            const updated = [...education];
                            updated[index].grade = event.target.value;
                            setEducation(updated);
                          }}
                          placeholder="Grade (e.g. A+)"
                          className={`${inputClass} sm:col-span-2`}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        Fill only whichever applies — CGPA, Percentage or
                        Grade. Empty ones are skipped automatically.
                      </p>
                    </div>
                  ))}

                  {education.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No education added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ===== SKILLS (CATEGORIES) ===== */}
            {activeStep === "skills" && (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Skills
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Group skills by category, e.g. Languages, Frontend,
                      Backend.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSkillCategories([
                        ...skillCategories,
                        { ...emptySkillCategory },
                      ])
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Add Category
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {skillCategories.map((item, index) => (
                    <div key={index} className="flex flex-wrap gap-3">
                      <input
                        type="text"
                        value={item.category}
                        onChange={(event) => {
                          const updated = [...skillCategories];
                          updated[index].category = event.target.value;
                          setSkillCategories(updated);
                        }}
                        placeholder="Category (e.g. Frontend)"
                        className={`w-48 ${inputClass}`}
                      />
                      <input
                        type="text"
                        value={item.skills}
                        onChange={(event) => {
                          const updated = [...skillCategories];
                          updated[index].skills = event.target.value;
                          setSkillCategories(updated);
                        }}
                        placeholder="React.js, Next.js, Tailwind CSS"
                        className={`flex-1 ${inputClass}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSkillCategories(
                            skillCategories.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-500 transition hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  {skillCategories.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No skill categories added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ===== EXPERIENCE ===== */}
            {activeStep === "experience" && (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Professional Experience
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Add internships and jobs you&apos;ve worked.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExperience([...experience, { ...emptyExperience }])
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {experience.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-black text-slate-400">
                          Entry {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setExperience(
                              experience.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          value={item.company}
                          onChange={(event) => {
                            const updated = [...experience];
                            updated[index].company = event.target.value;
                            setExperience(updated);
                          }}
                          placeholder="Company name"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.role}
                          onChange={(event) => {
                            const updated = [...experience];
                            updated[index].role = event.target.value;
                            setExperience(updated);
                          }}
                          placeholder="Role / Title"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.location}
                          onChange={(event) => {
                            const updated = [...experience];
                            updated[index].location = event.target.value;
                            setExperience(updated);
                          }}
                          placeholder="Location"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.startDate}
                          onChange={(event) => {
                            const updated = [...experience];
                            updated[index].startDate = event.target.value;
                            setExperience(updated);
                          }}
                          placeholder="Start (e.g. Nov 2023)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.endDate}
                          disabled={item.currentlyWorking}
                          onChange={(event) => {
                            const updated = [...experience];
                            updated[index].endDate = event.target.value;
                            setExperience(updated);
                          }}
                          placeholder="End (e.g. Dec 2023)"
                          className={`${inputClass} disabled:bg-slate-100`}
                        />

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.currentlyWorking}
                            onChange={(event) => {
                              const updated = [...experience];
                              updated[index].currentlyWorking =
                                event.target.checked;
                              setExperience(updated);
                            }}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-semibold text-slate-600">
                            Currently working here
                          </span>
                        </label>

                        <textarea
                          rows={4}
                          value={item.bulletPoints.join("\n")}
                          onChange={(event) => {
                            const updated = [...experience];
                            updated[index].bulletPoints =
                              event.target.value.split("\n");
                            setExperience(updated);
                          }}
                          placeholder={
                            "One point per line, e.g.\nBuilt React + Tailwind dashboard integrated with MySQL\nManaged version control using Git and GitHub"
                          }
                          className={`resize-y sm:col-span-2 ${inputClass}`}
                        />
                      </div>
                    </div>
                  ))}

                  {experience.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No experience added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ===== PROJECTS ===== */}
            {activeStep === "projects" && (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Academic Projects
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Showcase projects you&apos;ve built.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setProjects([...projects, { ...emptyProject }])
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {projects.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-black text-slate-400">
                          Project {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setProjects(
                              projects.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].title = event.target.value;
                            setProjects(updated);
                          }}
                          placeholder="Project title"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.description}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].description = event.target.value;
                            setProjects(updated);
                          }}
                          placeholder="Short subtitle (optional)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.startDate}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].startDate = event.target.value;
                            setProjects(updated);
                          }}
                          placeholder="Start (e.g. Dec 2025)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.endDate}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].endDate = event.target.value;
                            setProjects(updated);
                          }}
                          placeholder="End (e.g. Feb 2026)"
                          className={inputClass}
                        />

                        <input
                          type="text"
                          value={item.link}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].link = event.target.value;
                            setProjects(updated);
                          }}
                          placeholder="Live link / GitHub link"
                          className={`${inputClass} sm:col-span-2`}
                        />

                        <textarea
                          rows={4}
                          value={item.bulletPoints.join("\n")}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].bulletPoints =
                              event.target.value.split("\n");
                            setProjects(updated);
                          }}
                          placeholder={
                            "One point per line, e.g.\nDesigned and built a production multi-tenant SaaS\nImplemented scalable architecture with Redis cache"
                          }
                          className={`resize-y sm:col-span-2 ${inputClass}`}
                        />

                        <input
                          type="text"
                          value={item.stack}
                          onChange={(event) => {
                            const updated = [...projects];
                            updated[index].stack = event.target.value;
                            setProjects(updated);
                          }}
                          placeholder="Stack (e.g. React 18, Node.js, PostgreSQL)"
                          className={`${inputClass} sm:col-span-2`}
                        />
                      </div>
                    </div>
                  ))}

                  {projects.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No projects added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ===== ACHIEVEMENTS ===== */}
            {activeStep === "achievements" && (
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Achievements & Leadership
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  One achievement per line.
                </p>

                <textarea
                  rows={8}
                  value={achievementsText}
                  onChange={(event) => setAchievementsText(event.target.value)}
                  placeholder={
                    "AWS Hackathon Winner — Team Lead, Track Prize $250 (2025)\nRepresented HBTU as Team Leader at VERSION'26"
                  }
                  className={`mt-4 w-full resize-y ${inputClass}`}
                />
              </div>
            )}

            {/* STEP NAVIGATION */}
            <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
              <button
                type="button"
                disabled={currentStepIndex === 0}
                onClick={() => goToStep(STEPS[currentStepIndex - 1].key)}
                className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {currentStepIndex < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => goToStep(STEPS[currentStepIndex + 1].key)}
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <Link
                  href={`/career-resources/resume-builder/${resumeId}/preview`}
                  onClick={() => handleSave(true)}
                  className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
                >
                  Preview & Download
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
