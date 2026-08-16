import type { Metadata } from "next";
import DirectHiringDetailClient from "./DirectHiringDetailClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Props = {
  params: { slug: string };
};

async function getJob(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/direct-hiring/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.job;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.slug);

  if (!job) {
    return {
      title: "Job Not Found | NextHire Direct Hiring",
      description: "This direct hiring opportunity may have been filled or removed.",
    };
  }

  const title = `${job.title} at ${job.company} | Direct Hiring on NextHire`;

  const metaBits = [job.location, job.salary].filter(Boolean).join(" · ");

  const description = `${job.company} is hiring for ${job.title}${
    metaBits ? ` — ${metaBits}` : ""
  }. Skip the forms — send your resume directly to HR via NextHire.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function DirectHiringDetailPage() {
  return <DirectHiringDetailClient />;
}
