"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { useMutation } from "@tanstack/react-query";
import { getArticles } from "@/app/api/article";
import type { Article, GetArticleResponse } from "@/app/api/article";

interface SelectionStepProps {
  articles: [Article[], React.Dispatch<React.SetStateAction<Article[]>>];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onArticlesLoaded?: (data: GetArticleResponse) => void;
  onSubmit?: () => void;
}

export function SelectionStep({
  articles,
  selectedDate,
  onDateChange,
  onArticlesLoaded,
  onSubmit,
}: SelectionStepProps) {
  // console.log("=", selectedDate);
  const isValid = selectedDate;
  const [articleList, setArticleList] = articles;
  const mutation = useMutation({
    mutationFn: (params: { sort?: string; page?: number; limit?: number }) =>
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
              날짜와 카테고리를 선택해주세요
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
              if (!isValid || mutation.isPending) return;

              mutation.mutate({
                // page: 1,
                // limit: 10,
                sort: "date",
              });
            }}
            disabled={!isValid || mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {mutation.isPending ? "불러오는 중..." : "기사 요청"}
          </Button>
        </div>
      </div>
    </div>
  );
}
