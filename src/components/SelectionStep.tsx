"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { useMutation } from "@tanstack/react-query";
import { getArticles, postArticle } from "@/app/api/article";
import type { Article, GetArticleResponse } from "@/app/api/article";

interface SelectionStepProps {
  isAdmin: boolean;
  articles: [Article[], React.Dispatch<React.SetStateAction<Article[]>>];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onArticlesLoaded?: (data: GetArticleResponse) => void;
  onSubmit?: () => void;
}

export function SelectionStep({
  isAdmin,
  articles,
  selectedDate,
  onDateChange,
  onArticlesLoaded,
  onSubmit,
}: SelectionStepProps) {
  // console.log("=", selectedDate);
  const isValid = selectedDate;
  const [, setArticleList] = articles;
  const mutation = useMutation({
    mutationFn: (params: {
      sort?: string;
      page?: number;
      limit?: number;
      date?: string;
    }) =>
      getArticles(params),
    onSuccess: (data) => {
      onArticlesLoaded?.(data);
      onSubmit?.();
      setArticleList(data.articles);
    },
    onError: (err: any) => {
      alert(err?.message ?? "기사 불러오기에 실패했습니다.");
    },
    retry: false,
  });

  const collectMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: (data) => {
      onArticlesLoaded?.({ articles: data.articles, left: 0 });
      setArticleList(data.articles);
      onSubmit?.();
    },
    onError: (err: Error) => {
      alert(err.message || "새 기사 수집에 실패했습니다.");
    },
    retry: false,
  });

  const isBusy = mutation.isPending || collectMutation.isPending;

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Calendar className="text-blue-600" size={24} />
          </div>
          <div>
            <h2>뉴스 큐레이션 요청</h2>
            <p className="text-gray-600 text-sm">
              발행할 날짜의 수집 기사를 불러오세요
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="date">날짜 선택</Label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            onClick={() => {
              if (!isValid || isBusy) return;

              mutation.mutate({
                sort: "-date",
                limit: 30,
                date: selectedDate,
              });
            }}
            disabled={!isValid || isBusy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {mutation.isPending ? "불러오는 중..." : "기사 요청"}
          </Button>

          {isAdmin ? (
            <>
              <Button type="button" variant="outline" onClick={() => { if (isValid && !isBusy) collectMutation.mutate(); }} disabled={!isValid || isBusy} className="w-full py-6">
                {collectMutation.isPending ? "새 기사를 수집하는 중..." : "새 기사 수집 (OpenAI 사용)"}
              </Button>
              <p className="text-center text-xs text-gray-500">새 기사 수집은 관리자 전용이며 OpenAI API 사용료가 발생합니다.</p>
            </>
          ) : (
            <p className="rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">읽기 전용 계정입니다. 기존 기사 조회만 가능합니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
