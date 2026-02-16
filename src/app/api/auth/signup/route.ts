import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const backendRes = await fetch(
    "https://vora-api.onrender.com/api/auth/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json().catch(() => ({}));

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  return NextResponse.json(data, { status: 200 });
}
