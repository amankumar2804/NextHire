import { ImageResponse } from "next/og";

export const alt = "Direct Hiring Job on NextHire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Same gradient palette used on the public cards, expressed as hex pairs for ImageResponse
const BANNER_GRADIENTS: [string, string][] = [
  ["#a855f7", "#d946ef"],
  ["#3b82f6", "#22d3ee"],
  ["#f97316", "#ec4899"],
  ["#10b981", "#2dd4bf"],
  ["#f43f5e", "#fb923c"],
  ["#6366f1", "#a855f7"],
];

function getGradient(company: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BANNER_GRADIENTS[Math.abs(hash) % BANNER_GRADIENTS.length];
}

function getInitials(company: string) {
  return company
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

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

export default async function Image({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);

  // Fallback card if the job couldn't be loaded
  if (!job) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #a855f7, #d946ef)",
            fontSize: 56,
            fontWeight: 900,
            color: "white",
          }}
        >
          NextHire — Direct Hiring
        </div>
      ),
      { ...size }
    );
  }

  const [from, to] = getGradient(job.company);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        {/* BACKGROUND: company image or colorful initials, same as the public cards */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: job.companyImage
              ? "#0f0f0f"
              : `linear-gradient(135deg, ${from}, ${to})`,
          }}
        >
          {job.companyImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={job.companyImage}
              alt={job.company}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ fontSize: 240, fontWeight: 900, color: "rgba(255,255,255,0.35)" }}>
              {getInitials(job.company)}
            </div>
          )}
        </div>

        {/* DARK GRADIENT OVERLAY + TEXT */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.05))",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#d8b4fe",
              marginBottom: 16,
            }}
          >
            Direct Hiring · Resume goes straight to HR
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            {job.title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              color: "#f3e8ff",
              marginTop: 12,
            }}
          >
            {job.company}
            {job.location ? ` · ${job.location}` : ""}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
