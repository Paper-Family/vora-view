import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "@/page/home";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("connect.sid")?.value;

  if (!session) {
    redirect("/login?reason=not_authenticated");
  }

  const backendUrl = process.env.VORA_API_URL ?? "https://vora-api-jayl.onrender.com";
  const response = await fetch(`${backendUrl}/api/auth/me`, {
    headers: { Cookie: `connect.sid=${session}` },
    cache: "no-store",
  });
  if (!response.ok) redirect("/login?reason=not_authenticated");
  const data = await response.json();

  return <HomePage user={data.user} />;
}
