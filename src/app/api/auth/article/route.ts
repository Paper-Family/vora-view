import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function buildUrl(req: Request) {
  const { searchParams } = new URL(req.url);
  const qs = searchParams.toString();
  const base = "https://vora-api.onrender.com/api/article";
  return qs ? `${base}?${qs}` : base;
}

export async function GET(req: Request) {
  const cookieHeader = cookies().toString();

  const backendRes = await fetch(buildUrl(req), {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST() {
  const cookieHeader = cookies().toString();

  const backendRes = await fetch("https://vora-api.onrender.com/api/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
