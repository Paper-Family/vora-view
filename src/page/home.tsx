"use client";

import { useState } from "react";
import { LogOut, Newspaper, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { SelectionStep } from "@/components/SelectionStep";
import { ArticlesStep } from "@/components/ArticleStep";
import { SummaryStep } from "@/components/SummaryStep";
import type { Article } from "@/app/api/article";
import { getLogout } from "@/app/api/login";

type Step = "selection" | "articles" | "summary";

export default function HomePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("selection");
  const [selectedDate, setSelectedDate] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  const handleSubmitSelection = () => setCurrentStep("articles");

  const handleSaveArticle = (article: Article) => {
    setSavedArticles((prev) =>
      prev.length >= 8 || prev.some((savedArticle) =>
        (savedArticle._id || savedArticle.link) === (article._id || article.link)
      )
        ? prev
        : [...prev, article]
    );
  };

  const handleUnsaveArticle = (articleId: string) => {
    setSavedArticles((prev) =>
      prev.filter((article) => (article._id || article.link) !== articleId)
    );
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
    setArticles([]);
    setSavedArticles([]);
  };

  const handleLogout = async () => {
    await getLogout().catch(() => undefined);
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen overflow-auto bg-[#f5f7fb]">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white"><Newspaper size={20} /></div>
            <div><p className="font-semibold text-slate-950">VORA Studio</p><p className="text-xs text-slate-500">US Market Content Desk</p></div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"><LogOut size={16} /> 로그아웃</button>
        </div>
      </header>
      <div className="min-h-full px-4 py-10">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"><Sparkles size={14} /> AI News Curation</div>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">오늘의 미주 콘텐츠를 준비하세요</h1>
          <p className="text-slate-500">검증할 뉴스를 고르면 인스타그램과 블로그 원고를 한 번에 만듭니다.</p>
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
              <span className="text-sm">날짜 선택</span>
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
            onDateChange={setSelectedDate}
            onSubmit={handleSubmitSelection}
            articles={[articles, setArticles]}
          />
        )}

        {currentStep === "articles" && (
          <ArticlesStep
            articles={articles}
            savedArticles={savedArticles}
            onSaveArticle={handleSaveArticle}
            onUnsaveArticle={handleUnsaveArticle}
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
