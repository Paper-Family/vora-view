import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "@/page/home";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("connect.sid")?.value;

  if (!session) {
    redirect("/login?reason=not_authenticated");
  }

  return <HomePage />;
}
