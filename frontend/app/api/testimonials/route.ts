import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = "NextHire";
const COLLECTION = "testimonials";

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
    createdAt: new Date("2026-01-01"),
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
    createdAt: new Date("2026-01-01"),
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
    createdAt: new Date("2026-01-01"),
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
    createdAt: new Date("2026-01-01"),
  },
];

const VALID_TYPES = ["student", "fresher", "professional"];

function isAdmin(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  return Boolean(process.env.ADMIN_SECRET) && key === process.env.ADMIN_SECRET;
}

async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION);
}

export async function GET() {
  try {
    const collection = await getCollection();

    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(SEED_TESTIMONIALS);
    }

    const docs = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(docs);
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

    const newTestimonial = {
      id: `user-${Date.now()}`,
      userType: VALID_TYPES.includes(userType) ? userType : "professional",
      name: name.trim().slice(0, 80),
      role: role.trim().slice(0, 80),
      company: typeof company === "string" ? company.trim().slice(0, 80) : "",
      rating,
      message: message.trim().slice(0, 400),
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      createdAt: new Date(),
    };

    const collection = await getCollection();
    await collection.insertOne(newTestimonial);

    const { _id, ...responseBody } = newTestimonial as typeof newTestimonial & {
      _id?: unknown;
    };
    void _id;

    return NextResponse.json(responseBody, { status: 201 });
  } catch (err) {
    console.error("Failed to save testimonial:", err);
    return NextResponse.json(
      { error: "Could not save your feedback. Try again." },
      { status: 500 }
    );
  }
}

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

    const collection = await getCollection();
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete testimonial:", err);
    return NextResponse.json(
      { error: "Could not delete testimonial." },
      { status: 500 }
    );
  }
}
