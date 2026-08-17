import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const key = req.headers.get("x-admin-key");

  if (!process.env.ADMIN_SECRET) {
    console.error(
      "ADMIN_SECRET is not set. Add it to .env.local (dev) and your Vercel Environment Variables (production), then redeploy."
    );
    return NextResponse.json(
      { error: "Admin login is not configured on the server yet." },
      { status: 500 }
    );
  }

  if (key !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Incorrect admin key." }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
