import { PublicRoute } from "@/components/auth/PublicRoute";
import { LoginPage } from "@/page/login";

export default function Login() {
  return (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  );
}
