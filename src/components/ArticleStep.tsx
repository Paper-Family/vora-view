import { Bookmark, RefreshCw, Check, ExternalLink } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Article } from "@/mock/data";

interface ArticlesStepProps {
  articles: Article[];
  savedArticles: Article[];
  onSaveArticle: (article: Article) => void;
  onUnsaveArticle: (articleId: string) => void;
  onRefresh: () => void;
  onConfirm: () => void;
}

export function ArticlesStep({
  articles,
  savedArticles,
  onSaveArticle,
  onUnsaveArticle,
  onRefresh,
  onConfirm,
}: ArticlesStepProps) {
  const isSaved = (articleId: string) =>
    savedArticles.some((a) => a.id === articleId);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>기사 선택</h2>
            <p className="text-gray-600 text-sm">
              담기: {savedArticles.length}개
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={onRefresh} variant="outline" className="gap-2">
              <RefreshCw size={16} />
              재요청
            </Button>
            <Button
              onClick={onConfirm}
              disabled={savedArticles.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Check size={16} />
              확인 ({savedArticles.length})
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {articles.map((article) => {
          const saved = isSaved(article.id);

          return (
            <div
              key={article.id}
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
                      {article.publishedAt}
                    </span>
                  </div>

                  <h3 className="mb-2 text-gray-900">{article.title}</h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {article.summary}
                  </p>

                  <a
                    href={article.url}
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
                    saved ? onUnsaveArticle(article.id) : onSaveArticle(article)
                  }
                  variant={saved ? "default" : "outline"}
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
    </div>
  );
}
