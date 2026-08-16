import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Simple file-based storage so this works immediately without a database.
// Swap this out for Prisma + MongoDB later (per NextHire Blueprint v3.0) —
// only this file needs to change, the component stays the same.

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "testimonials.json");

const AVATAR_COLORS = [
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-600",
];

const SEED_TESTIMONIALS = [
  {
    id: "seed-1",
    userType: "professional",
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Google",
    rating: 5,
    message:
      "NextHire helped me find the right opportunity quickly. The AI matching feature is amazing.",
    color: AVATAR_COLORS[0],
  },
  {
    id: "seed-2",
    userType: "professional",
    name: "Priya Verma",
    role: "Frontend Developer",
    company: "Microsoft",
    rating: 5,
    message:
      "The platform is simple, fast and has genuine job opportunities from top companies.",
    color: AVATAR_COLORS[1],
  },
  {
    id: "seed-3",
    userType: "professional",
    name: "Arjun Patel",
    role: "Data Analyst",
    company: "Amazon",
    rating: 5,
    message:
      "I got multiple interview calls within weeks. Highly recommended for job seekers.",
    color: AVATAR_COLORS[2],
  },
  {
    id: "seed-4",
    userType: "student",
    name: "Sneha Kulkarni",
    role: "B.Tech CSE, Final Year",
    company: "VJTI Mumbai",
    rating: 5,
    message:
      "Found 3 solid internships in my first week here. Wish I'd found NextHire earlier in college.",
    color: AVATAR_COLORS[3],
  },
];

const VALID_TYPES = ["student", "fresher", "professional"];

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(SEED_TESTIMONIALS, null, 2));
  }
}

function isAdmin(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  // Set ADMIN_SECRET in your .env.local file — never hardcode it here.
  return Boolean(process.env.ADMIN_SECRET) && key === process.env.ADMIN_SECRET;
}

export async function GET() {
  try {
    await ensureFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    console.error("Failed to load testimonials:", err);
    return NextResponse.json(
      { error: "Could not load testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userType, name, role, company, rating, message } = body ?? {};

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof role !== "string" ||
      !role.trim() ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields." },
        { status: 400 }
      );
    }

    await ensureFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const testimonials = JSON.parse(raw);

    const newTestimonial = {
      id: `user-${Date.now()}`,
      userType: VALID_TYPES.includes(userType) ? userType : "professional",
      name: name.trim().slice(0, 80),
      role: role.trim().slice(0, 80),
      company: typeof company === "string" ? company.trim().slice(0, 80) : "",
      rating,
      message: message.trim().slice(0, 400),
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    };

    const updated = [newTestimonial, ...testimonials];
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2));

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (err) {
    console.error("Failed to save testimonial:", err);
    return NextResponse.json(
      { error: "Could not save your feedback. Try again." },
      { status: 500 }
    );
  }
}

// Only requests carrying the correct x-admin-key header (matched against
// ADMIN_SECRET in .env.local) are allowed to delete a testimonial.
export async function DELETE(req: NextRequest) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await ensureFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const testimonials = JSON.parse(raw);

    const updated = testimonials.filter((t: { id: string }) => t.id !== id);
    if (updated.length === testimonials.length) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete testimonial:", err);
    return NextResponse.json(
      { error: "Could not delete testimonial." },
      { status: 500 }
    );
  }
}
