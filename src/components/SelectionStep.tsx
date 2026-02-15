"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { categories } from "@/mock/data";
import { useMutation } from "@tanstack/react-query";
import { getArticles } from "@/api/article";
import type { GetArticleResponse } from "@/api/article";

interface SelectionStepProps {
  selectedDate: string;
  selectedCategory: string;
  onDateChange: (date: string) => void;
  onCategoryChange: (category: string) => void;

  onArticlesLoaded?: (data: GetArticleResponse) => void;

  onSubmit?: () => void;
}

export function SelectionStep({
  selectedDate,
  selectedCategory,
  onDateChange,
  onCategoryChange,
  onArticlesLoaded,
  onSubmit,
}: SelectionStepProps) {
  // console.log("=", selectedDate);
  const isValid = selectedDate;
  const mutation = useMutation({
    mutationFn: (params: { sort?: string; page?: number; limit?: number }) =>
      getArticles(params),
    onSuccess: (data) => {
      onArticlesLoaded?.(data);
      onSubmit?.();
      console.log("Articles loaded:", data);
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

          {/* <div>
            <Label htmlFor="category">카테고리 선택</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger id="category" className="w-full mt-2">
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

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

          {/* (옵션) 간단한 상태 표시 */}
          {/* {mutation.isSuccess && (
            <p className="text-sm text-green-600">
              기사 {mutation.data?.articles?.length ?? 0}개 불러옴
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
