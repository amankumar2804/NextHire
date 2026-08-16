"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
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

type Resume = {
  personalInfo: {
    fullName: string;
    location: string;
    email: string;
    phone: string;
  };
  links: LinkItem[];
  education: Education[];
  skillCategories: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  achievements: string[];
  template?: {
    gradient: string;
  } | null;
};

function formatRange(start: string, end: string, current?: boolean) {
  const endLabel = current ? "Present" : end;
  if (!start && !endLabel) return "";
  return [start, endLabel].filter(Boolean).join(" – ");
}

function getGradeLine(item: Education) {
  const parts: string[] = [];
  if (item.cgpa) parts.push(`CGPA: ${item.cgpa}`);
  if (item.percentage) parts.push(`Percentage: ${item.percentage}`);
  if (item.grade) parts.push(`Grade: ${item.grade}`);
  return parts.join(" · ");
}

function withProtocol(url: string) {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ResumePreviewPage() {
  const params = useParams();
  const resumeId = params.id as string;

  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await resumeFetch(`/api/resumes/${resumeId}`);
        setResume(data.resume);
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

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-indigo-600" />
          <p className="mt-4 font-semibold text-slate-600">
            Preparing preview...
          </p>
        </div>
      </main>
    );
  }

  if (error || !resume) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-black text-slate-900">
            Could not load resume
          </h2>
          <p className="mt-2 text-slate-500">{error}</p>
          <Link
            href="/career-resources/resume-builder"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const {
    personalInfo,
    links,
    education,
    skillCategories,
    experience,
    projects,
    achievements,
    template,
  } = resume;

  const accentGradient = template?.gradient || "";

  return (
    <main className="min-h-screen bg-slate-100">
      {/* TOOLBAR — hidden when printing */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href={`/career-resources/resume-builder/${resumeId}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Editor
          </Link>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      {/* RESUME PAPER */}
      <div className="mx-auto max-w-4xl px-6 py-10 print:px-0 print:py-0">
        <div
          id="resume-paper"
          className="mx-auto w-full max-w-[800px] bg-white p-10 font-serif text-slate-900 shadow-xl print:shadow-none"
        >
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-wide">
              {personalInfo.fullName || "Your Name"}
            </h1>

            <p className="mt-1.5 text-sm text-slate-700">
              {[personalInfo.location, personalInfo.email, personalInfo.phone]
                .filter(Boolean)
                .join("  |  ")}
            </p>

            {links.length > 0 && (
              <p className="mt-1 text-sm">
                {links.map((link, index) => (
                  <span key={index}>
                    <a
                      href={withProtocol(link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 underline underline-offset-2 hover:text-indigo-700"
                    >
                      {link.label || link.url}
                    </a>
                    {index < links.length - 1 && "  |  "}
                  </span>
                ))}
              </p>
            )}
          </div>

          {/* EDUCATION */}
          {education.length > 0 && (
            <Section title="Education" gradient={accentGradient}>
              {education.map((item, index) => {
                const gradeLine = getGradeLine(item);
                return (
                  <div key={index} className="mb-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="font-bold">
                        {item.institution}
                        {item.location && (
                          <span className="font-normal">, {item.location}</span>
                        )}
                      </p>
                      <p className="whitespace-nowrap text-sm italic text-slate-600">
                        {formatRange(item.startDate, item.endDate)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="text-sm">{item.degree}</p>
                      {gradeLine && (
                        <p className="whitespace-nowrap text-sm italic text-slate-600">
                          {gradeLine}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </Section>
          )}

          {/* SKILLS */}
          {skillCategories.length > 0 && (
            <Section title="Skills" gradient={accentGradient}>
              <div className="space-y-1 text-sm">
                {skillCategories.map((item, index) => (
                  <p key={index}>
                    <span className="font-bold">{item.category}: </span>
                    <span>{item.skills}</span>
                  </p>
                ))}
              </div>
            </Section>
          )}

          {/* ACADEMIC PROJECTS */}
          {projects.length > 0 && (
            <Section title="Academic Projects" gradient={accentGradient}>
              {projects.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-bold">
                      {item.title}
                      {item.description && (
                        <span className="font-normal"> – {item.description}</span>
                      )}
                    </p>
                    <p className="whitespace-nowrap text-sm italic text-slate-600">
                      {formatRange(item.startDate, item.endDate)}
                    </p>
                  </div>

                  {item.bulletPoints.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-1 text-sm">
                      {item.bulletPoints
                        .filter((point) => point.trim())
                        .map((point, pointIndex) => (
                          <li key={pointIndex} className="flex gap-2">
                            <span>–</span>
                            <span>{point}</span>
                          </li>
                        ))}
                    </ul>
                  )}

                  {item.stack && (
                    <p className="mt-1 text-sm">
                      <span className="font-bold">Stack: </span>
                      {item.stack}
                    </p>
                  )}

                  {item.link && (
                    <p className="mt-1 text-sm">
                      <a
                        href={withProtocol(item.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-indigo-700"
                      >
                        {item.link}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* PROFESSIONAL EXPERIENCE */}
          {experience.length > 0 && (
            <Section title="Professional Experience" gradient={accentGradient}>
              {experience.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-bold">
                      {item.company}
                      {item.role && <span className="font-normal">, {item.role}</span>}
                    </p>
                    <p className="whitespace-nowrap text-sm italic text-slate-600">
                      {formatRange(item.startDate, item.endDate, item.currentlyWorking)}
                    </p>
                  </div>

                  {item.bulletPoints.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-1 text-sm">
                      {item.bulletPoints
                        .filter((point) => point.trim())
                        .map((point, pointIndex) => (
                          <li key={pointIndex} className="flex gap-2">
                            <span>–</span>
                            <span>{point}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* ACHIEVEMENTS & LEADERSHIP */}
          {achievements.filter(Boolean).length > 0 && (
            <Section title="Achievements & Leadership" gradient={accentGradient}>
              <ul className="space-y-1 text-sm">
                {achievements
                  .filter((item) => item.trim())
                  .map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span>–</span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </Section>
          )}
        </div>
      </div>

      {/* PRINT STYLES */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
          }
        }
      `}</style>
    </main>
  );
}

function Section({
  title,
  gradient,
  children,
}: {
  title: string;
  gradient?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h2
        className={`border-b pb-0.5 text-[15px] font-bold ${
          gradient ? "border-transparent" : "border-slate-900"
        }`}
      >
        {gradient ? (
          <span
            className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {title}
          </span>
        ) : (
          title
        )}
      </h2>
      <div
        className={`-mt-[1px] h-px w-full ${
          gradient ? `bg-gradient-to-r ${gradient}` : "bg-transparent"
        }`}
      />
      <div className="mt-2">{children}</div>
    </div>
  );
}
