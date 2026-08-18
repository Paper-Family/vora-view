import { Bookmark, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import type { Article } from "@/app/api/article";

interface ArticlesStepProps {
  articles: Article[];
  savedArticles: Article[];
  onSaveArticle: (article: Article) => void;
  onUnsaveArticle: (articleId: string) => void;
  onConfirm: () => void;
}

export function ArticlesStep({
  articles,
  savedArticles,
  onSaveArticle,
  onUnsaveArticle,
  onConfirm,
}: ArticlesStepProps) {
  const articleKey = (article: Article) => article._id || article.link;
  const isSaved = (article: Article) =>
    savedArticles.some((savedArticle) => articleKey(savedArticle) === articleKey(article));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>기사 선택</h2>
            <p className="text-gray-600 text-sm">
              콘텐츠에 사용할 기사를 선택하세요 · {savedArticles.length}/8개 선택
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onConfirm}
              disabled={savedArticles.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Sparkles size={16} />
              콘텐츠 만들기 ({savedArticles.length})
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {articles.map((article) => {
          const saved = isSaved(article);

          return (
            <div
              key={articleKey(article)}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
                saved
                  ? "border-blue-500 bg-blue-50/30"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.source}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="mb-2 text-gray-900">{article.title}</h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {article.summary}
                  </p>

                  {article.analysis && (
                    <div className="mb-4 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                      <span className="font-semibold">시장 인사이트</span> · {article.analysis}
                    </div>
                  )}

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {article.keywords?.slice(0, 5).map((keyword, index) => (
                      <span key={`${keyword}-${index}`} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                        #{keyword}
                      </span>
                    ))}
                  </div>

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    원문 보기
                    <ExternalLink size={14} />
                  </a>
                </div>

                <Button
                  onClick={() =>
                    saved
                      ? onUnsaveArticle(articleKey(article))
                      : onSaveArticle(article)
                  }
                  variant={saved ? "default" : "outline"}
                  disabled={!saved && savedArticles.length >= 8}
                  className={`flex-shrink-0 gap-2 ${
                    saved ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
                  }`}
                >
                  <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
                  {saved ? "담김" : "담기"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {articles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
          선택한 날짜에 수집된 기사가 없습니다. 다른 날짜를 선택해 주세요.
        </div>
      )}
    </div>
  );
}
