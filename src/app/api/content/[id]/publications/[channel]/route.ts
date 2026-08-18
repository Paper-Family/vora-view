import { NextResponse } from "next/server";

const backendUrl = process.env.VORA_API_URL ?? "https://vora-api-jayl.onrender.com";

export async function PATCH(request: Request, context: { params: Promise<{ id: string; channel: string }> }) {
  const { id, channel } = await context.params;
  const cookie = request.headers.get("cookie") ?? "";
  const body = await request.json().catch(() => ({}));
  const backendResponse = await fetch(`${backendUrl}/api/content/${id}/publications/${channel}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await backendResponse.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendResponse.status });
}
