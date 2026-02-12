"use client";

import { useState } from "react";
import { SelectionStep } from "@/components/SelectionStep";
import { ArticlesStep } from "@/components/ArticleStep";
import { SummaryStep } from "@/components/SummaryStep";
import { Article, getArticlesByCategory } from "@/mock/data";

type Step = "selection" | "articles" | "summary";

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<Step>("selection");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);

  const handleSubmitSelection = () => {
    const newArticles = getArticlesByCategory(selectedCategory, excludedIds);
    setArticles(newArticles);
    setCurrentStep("articles");
  };

  const handleSaveArticle = (article: Article) => {
    setSavedArticles((prev) => [...prev, article]);
  };

  const handleUnsaveArticle = (articleId: string) => {
    setSavedArticles((prev) => prev.filter((a) => a.id !== articleId));
  };

  const handleRefresh = () => {
    // 담지 않은 기사들의 ID를 제외 목록에 추가
    const unsavedIds = articles
      .filter(
        (article) => !savedArticles.some((saved) => saved.id === article.id)
      )
      .map((article) => article.id);

    const newExcludedIds = [...excludedIds, ...unsavedIds];
    setExcludedIds(newExcludedIds);

    // 새로운 기사 가져오기 (담긴 기사 + 새 기사)
    const newArticles = getArticlesByCategory(selectedCategory, newExcludedIds);

    // 담긴 기사는 유지하고, 나머지를 새 기사로 교체
    const combinedArticles = [
      ...savedArticles,
      ...newArticles.filter(
        (article) => !savedArticles.some((saved) => saved.id === article.id)
      ),
    ].slice(0, 5);

    setArticles(combinedArticles);
  };

  const handleConfirm = () => {
    setCurrentStep("summary");
  };

  const handleBack = () => {
    setCurrentStep("articles");
  };

  const handleReset = () => {
    setCurrentStep("selection");
    setSelectedDate("");
    setSelectedCategory("");
    setArticles([]);
    setSavedArticles([]);
    setExcludedIds([]);
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 overflow-auto">
      <div className="min-h-full py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm mb-4">
            VORA AI News Curation
          </div>
          <h1 className="mb-2">뉴스 큐레이션 라이브러리</h1>
          <p className="text-gray-600">
            AI 기반 뉴스 분석 및 콘텐츠 생성 플랫폼
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentStep === "selection"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm">
                1
              </div>
              <span className="text-sm">날짜/카테고리 선택</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-300"></div>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentStep === "articles"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-sm">기사 선택</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-300"></div>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentStep === "summary"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm">요약 및 변환</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentStep === "selection" && (
          <SelectionStep
            selectedDate={selectedDate}
            selectedCategory={selectedCategory}
            onDateChange={setSelectedDate}
            onCategoryChange={setSelectedCategory}
            onSubmit={handleSubmitSelection}
          />
        )}

        {currentStep === "articles" && (
          <ArticlesStep
            articles={articles}
            savedArticles={savedArticles}
            onSaveArticle={handleSaveArticle}
            onUnsaveArticle={handleUnsaveArticle}
            onRefresh={handleRefresh}
            onConfirm={handleConfirm}
          />
        )}

        {currentStep === "summary" && (
          <SummaryStep savedArticles={savedArticles} onBack={handleBack} />
        )}

        {/* Reset Button (for demo purposes) */}
        {currentStep !== "selection" && (
          <div className="text-center mt-8">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
