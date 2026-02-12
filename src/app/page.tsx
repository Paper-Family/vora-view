import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "@/page/home";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <HomePage />;
}
