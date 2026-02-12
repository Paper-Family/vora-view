"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
