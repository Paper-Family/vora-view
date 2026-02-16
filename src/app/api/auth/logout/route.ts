import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieHeader = cookies().toString();

  const backendRes = await fetch(
    "https://vora-api.onrender.com/api/auth/logout",
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
