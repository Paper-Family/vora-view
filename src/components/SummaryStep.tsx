import {
  Instagram,
  FileText,
  Video,
  Download,
  ArrowLeft,
  Newspaper,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useState } from "react";

interface SummaryStepProps {
  // savedArticles: Article[];
  onBack: () => void;
}

export function SummaryStep({ onBack }: SummaryStepProps) {
  // const [activeFormat, setActiveFormat] = useState<string>("summary");

  // const generateSummary = () => {
  //   const titles = savedArticles.map((a) => `• ${a.title}`).join("\n");
  //   return `📰 뉴스 큐레이션 요약 (${savedArticles.length}개 기사)\n\n${titles}\n\n주요 트렌드:\n선별된 기사들은 최신 산업 동향과 혁신 기술을 다루고 있으며, 시장의 변화와 미래 전망을 제시하고 있습니다.`;
  // };

  // const generateInstagram = () => {
  //   const mainTitle = savedArticles[0]?.title || "";
  //   return `📱 Instagram Post\n\n🔥 ${mainTitle}\n\n오늘의 주요 뉴스 ${
  //     savedArticles.length
  //   }가지를 정리했습니다!\n\n${savedArticles
  //     .slice(0, 3)
  //     .map((a, i) => `${i + 1}. ${a.title.slice(0, 40)}...`)
  //     .join("\n")}\n\n#뉴스 #트렌드 #정보 #큐레이션`;
  // };

  // const generateBlog = () => {
  //   return `# 뉴스 큐레이션: ${new Date().toLocaleDateString(
  //     "ko-KR"
  //   )}\n\n## 개요\n오늘 선별한 ${
  //     savedArticles.length
  //   }개의 주요 기사를 분석하여 핵심 인사이트를 정리했습니다.\n\n${savedArticles
  //     .map(
  //       (a, i) =>
  //         `## ${i + 1}. ${a.title}\n\n**출처:** ${a.source}\n\n${
  //           a.summary
  //         }\n\n---\n`
  //     )
  //     .join(
  //       "\n"
  //     )}\n## 결론\n선별된 기사들을 통해 현재 산업의 주요 동향과 미래 전망을 확인할 수 있습니다.`;
  // };

  // const generateShorts = () => {
  //   return `🎬 YouTube Shorts 스크립트\n\n[오프닝 - 3초]\n"오늘의 핵심 뉴스 ${
  //     savedArticles.length
  //   }가지!"\n\n${savedArticles
  //     .slice(0, 3)
  //     .map(
  //       (a, i) =>
  //         `[${i + 1}번째 뉴스 - 7초]\n${a.title}\n${a.summary.slice(
  //           0,
  //           60
  //         )}...\n`
  //     )
  //     .join("\n")}\n[엔딩 - 2초]\n"자세한 내용은 설명란에서 확인하세요!"`;
  // };

  // const getContent = () => {
  //   switch (activeFormat) {
  //     case "instagram":
  //       return generateInstagram();
  //     case "blog":
  //       return generateBlog();
  //     case "shorts":
  //       return generateShorts();
  //     default:
  //       return generateSummary();
  //   }
  // };

  // const handleDownload = () => {
  //   const content = getContent();
  //   const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `vora_${activeFormat}_${Date.now()}.txt`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  return (
    <div className="max-w-5xl mx-auto">
      {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost" className="gap-2">
              <ArrowLeft size={16} />
              뒤로
            </Button>
            <div>
              <h2>큐레이션 완료</h2>
              <p className="text-gray-600 text-sm">
                {savedArticles.length}개의 기사가 선택되었습니다
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="text-gray-700" size={20} />
            <h3>선택된 기사</h3>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {savedArticles.map((article, index) => (
              <div
                key={article.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {article.source}
                      </Badge>
                    </div>
                    <h4 className="text-sm mb-1 text-gray-900">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="mb-4">콘텐츠 포맷 변환</h3>

          <Tabs value={activeFormat} onValueChange={setActiveFormat}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="summary" className="gap-1.5 text-xs">
                <FileText size={14} />
                요약
              </TabsTrigger>
              <TabsTrigger value="instagram" className="gap-1.5 text-xs">
                <Instagram size={14} />
                Insta
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-1.5 text-xs">
                <FileText size={14} />
                Blog
              </TabsTrigger>
              <TabsTrigger value="shorts" className="gap-1.5 text-xs">
                <Video size={14} />
                Shorts
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeFormat} className="mt-0">
              <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] max-h-[500px] overflow-y-auto border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {getContent()}
                </pre>
              </div>

              <Button
                onClick={handleDownload}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Download size={16} />
                {activeFormat === "summary"
                  ? "요약본"
                  : activeFormat === "instagram"
                  ? "Instagram 포스트"
                  : activeFormat === "blog"
                  ? "Blog 글"
                  : "Shorts 스크립트"}{" "}
                다운로드
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div> */}
      asdf
    </div>
  );
}
