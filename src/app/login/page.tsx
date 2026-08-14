import { Suspense } from "react";
import { LoginPage } from "@/page/login";

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
