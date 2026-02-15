"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "@/page/home";
import { authService } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const authed = authService.isAuthenticated();
    console.log(authed);
    if (!authed) {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) return null;

  return <HomePage />;
}
