// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// function buildUrl(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const qs = searchParams.toString();
//   const base = "https://vora-api.onrender.com/api/article";
//   return qs ? `${base}?${qs}` : base;
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const search = url.search;

//   const backendRes = await fetch(
//     `https://vora-api.onrender.com/api/article${search}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//       credentials: "include", // 쿠키 전달
//     }
//   );

//   const data = await backendRes.json().catch(() => ({}));

//   if (!backendRes.ok) {
//     return NextResponse.json(data, { status: backendRes.status });
//   }

//   return NextResponse.json(data);
// }

// export async function POST() {
//   const cookieHeader = cookies().toString();

//   const backendRes = await fetch("https://vora-api.onrender.com/api/article", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Cookie: cookieHeader,
//     },
//     body: JSON.stringify({}),
//     cache: "no-store",
//   });

//   const data = await backendRes.json().catch(() => ({}));
//   return NextResponse.json(data, { status: backendRes.status });
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = "https://vora-api.onrender.com";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie") ?? "";

  const backendRes = await fetch(`${BACKEND}/api/article${url.search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    cache: "no-store",
  });

  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";

  const backendRes = await fetch(`${BACKEND}/api/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie, // ✅
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
