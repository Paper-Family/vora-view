import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const backendRes = await fetch(
    "https://vora-api.onrender.com/api/auth/login",
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

  const res = NextResponse.json(data, { status: 200 });

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  return res;
}
