import { NextResponse } from "next/server";

const backendUrl =
  process.env.VORA_API_URL ?? "https://vora-api-jayl.onrender.com";

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const backendResponse = await fetch(`${backendUrl}/api/content`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  const data = await backendResponse.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendResponse.status });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const cookie = request.headers.get("cookie") ?? "";

  const backendResponse = await fetch(`${backendUrl}/api/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await backendResponse.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendResponse.status });
}
