"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { authService } from "@/lib/auth";
import { AlertCircle } from "lucide-react";
import { postLogin } from "@/api/login";
import { useMutation } from "@tanstack/react-query";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      postLogin(data),
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
    onError: (error: any) => {
      setError(error.message || "로그인에 실패했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const user = authService.login(email, password);

    if (user) {
      router.push("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm mb-4">
            VORA AI News Curation
          </div>
          <h1 className="mb-2">뉴스 큐레이션 라이브러리</h1>
          <p className="text-gray-600">
            AI 기반 뉴스 분석 및 콘텐츠 생성 플랫폼
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>
              계정에 로그인하여 VORA를 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full">
                로그인
              </Button>

              <div className="text-center text-sm text-gray-600">
                계정이 없으신가요?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  회원가입
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
