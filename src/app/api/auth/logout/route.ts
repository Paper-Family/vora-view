import { NextResponse } from "next/server";
const backendUrl = process.env.VORA_API_URL ?? "https://vora-api.onrender.com";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";

  const backendRes = await fetch(
    `${backendUrl}/api/auth/logout`,
    {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  const data = await backendRes.json().catch(() => ({}));
  const res = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  return res;
}
