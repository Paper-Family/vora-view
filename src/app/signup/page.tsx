import { PublicRoute } from "@/components/auth/PublicRoute";
import { SignupPage } from "@/page/signup";

export default function Signup() {
  return (
    <PublicRoute>
      <SignupPage />
    </PublicRoute>
  );
}
