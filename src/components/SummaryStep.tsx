"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Instagram,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { generateContent, type GeneratedContent } from "@/app/api/content";
import type { Article } from "@/app/api/article";

interface SummaryStepProps {
  savedArticles: Article[];
  onBack: () => void;
}

function instagramText(content: GeneratedContent) {
  return [
    content.instagram.headline,
    "",
    content.instagram.caption,
    "",
    content.instagram.hashtags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)).join(" "),
  ].join("\n");
}

function blogText(content: GeneratedContent) {
  return [
    `# ${content.blog.title}`,
    "",
    content.blog.introduction,
    "",
    ...content.blog.sections.flatMap((section) => [
      `## ${section.heading}`,
      "",
      section.body,
      "",
    ]),
    "## 마무리",
    "",
    content.blog.conclusion,
    "",
    "## 출처",
    "",
    ...content.sources.map((source) => `- [${source.source} · ${source.title}](${source.link})`),
    "",
    content.blog.tags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)).join(" "),
  ].join("\n");
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

function downloadInstagramSlide(
  slide: GeneratedContent["instagram"]["slides"][number],
  index: number,
  total: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) return;

  context.fillStyle = "#f5f7fb";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#2563eb";
  context.fillRect(0, 0, 22, canvas.height);

  context.fillStyle = "#2563eb";
  context.font = "700 32px sans-serif";
  context.fillText(`VORA DAILY BRIEF · ${String(index + 1).padStart(2, "0")}`, 78, 105);

  context.fillStyle = "#94a3b8";
  context.font = "500 26px sans-serif";
  context.textAlign = "right";
  context.fillText(`${index + 1} / ${total}`, 1002, 105);
  context.textAlign = "left";

  context.fillStyle = "#0f172a";
  context.font = "700 64px sans-serif";
  const titleLines = wrapCanvasText(context, slide.title, 920).slice(0, 3);
  titleLines.forEach((line, lineIndex) => {
    context.fillText(line, 78, 260 + lineIndex * 82);
  });

  const bodyStart = 260 + titleLines.length * 82 + 72;
  context.fillStyle = "#475569";
  context.font = "400 40px sans-serif";
  const bodyLines = wrapCanvasText(context, slide.body, 920).slice(0, 11);
  bodyLines.forEach((line, lineIndex) => {
    context.fillText(line, 78, bodyStart + lineIndex * 62);
  });

  context.strokeStyle = "#dbeafe";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(78, 1210);
  context.lineTo(1002, 1210);
  context.stroke();

  context.fillStyle = "#2563eb";
  context.font = "700 28px sans-serif";
  context.fillText("미국 시장을 한국어로 쉽게 · VORA", 78, 1275);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `vora-instagram-${String(index + 1).padStart(2, "0")}.png`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export function SummaryStep({ savedArticles, onBack }: SummaryStepProps) {
  const [activeFormat, setActiveFormat] = useState("instagram");
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: () => generateContent(savedArticles.map((article) => article._id)),
  });

  const content = mutation.data;
  const copyValue = useMemo(() => {
    if (!content) return "";
    return activeFormat === "instagram" ? instagramText(content) : blogText(content);
  }, [activeFormat, content]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!content) {
    return (
      <div className="mx-auto max-w-3xl">
        <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950">
          <ArrowLeft size={16} /> 기사 다시 선택하기
        </button>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-950 px-8 py-7 text-white">
            <p className="mb-2 text-sm text-blue-300">VORA CONTENT STUDIO</p>
            <h2 className="text-2xl font-semibold">선택한 뉴스로 오늘의 콘텐츠를 만드세요</h2>
            <p className="mt-2 text-sm text-slate-300">인스타그램 게시물과 블로그 원고를 한 번에 생성합니다.</p>
          </div>
          <div className="p-8">
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {savedArticles.map((article, index) => (
                <div key={article._id || article.link} className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-2 text-xs font-semibold text-blue-600">SOURCE {String(index + 1).padStart(2, "0")}</div>
                  <p className="line-clamp-2 text-sm font-medium text-slate-900">{article.title}</p>
                  <p className="mt-2 text-xs text-slate-500">{article.source} · {article.date}</p>
                </div>
              ))}
            </div>
            {mutation.isError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {mutation.error.message}
              </div>
            )}
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="h-12 w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {mutation.isPending ? <LoaderCircle className="animate-spin" /> : <FileText />}
              {mutation.isPending ? "뉴스를 분석해 원고를 작성하고 있습니다..." : "인스타그램 · 블로그 원고 생성"}
            </Button>
            <p className="mt-3 text-center text-xs text-slate-400">생성된 내용은 원문과 수치를 확인한 뒤 발행해 주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950">
          <ArrowLeft size={16} /> 기사 다시 선택하기
        </button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            <RefreshCw className={mutation.isPending ? "animate-spin" : ""} /> 다시 생성
          </Button>
          <Button onClick={handleCopy} className="bg-blue-600 text-white hover:bg-blue-700">
            {copied ? <Check /> : <Copy />} {copied ? "복사 완료" : "원고 복사"}
          </Button>
        </div>
      </div>

      <Tabs value={activeFormat} onValueChange={setActiveFormat}>
        <TabsList className="mb-5 grid h-12 w-full grid-cols-2 bg-slate-200 p-1 sm:w-96">
          <TabsTrigger value="instagram" className="gap-2"><Instagram /> Instagram</TabsTrigger>
          <TabsTrigger value="blog" className="gap-2"><FileText /> Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="instagram">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {content.instagram.slides.map((slide, index) => (
                <article key={`${slide.order}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-widest text-blue-600">SLIDE {String(slide.order).padStart(2, "0")}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadInstagramSlide(slide, index, content.instagram.slides.length)}
                      className="gap-2"
                    >
                      <Download className="size-4" /> PNG 저장
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{slide.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{slide.body}</p>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-2xl bg-slate-950 p-6 text-white lg:sticky lg:top-6">
              <p className="text-xs font-semibold tracking-widest text-blue-300">CAPTION</p>
              <h3 className="mt-3 text-xl font-semibold">{content.instagram.headline}</h3>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">{content.instagram.caption}</p>
              <p className="mt-5 text-sm leading-7 text-blue-300">
                {content.instagram.hashtags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)).join(" ")}
              </p>
              <Button
                onClick={handleCopy}
                className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {copied ? <Check /> : <Copy />} {copied ? "복사 완료" : "캡션 복사"}
              </Button>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <article className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-12 sm:py-12">
            <div className="mb-10 border-b border-slate-200 pb-8">
              <p className="text-sm font-semibold text-blue-600">VORA MARKET LETTER</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">{content.blog.title}</h2>
              <p className="mt-5 leading-8 text-slate-600">{content.blog.introduction}</p>
            </div>
            <div className="space-y-10">
              {content.blog.sections.map((section, index) => (
                <section key={`${section.heading}-${index}`}>
                  <h3 className="text-xl font-semibold text-slate-900">{section.heading}</h3>
                  <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">{section.body}</p>
                </section>
              ))}
              <section className="rounded-2xl bg-blue-50 p-6">
                <h3 className="font-semibold text-blue-950">마무리</h3>
                <p className="mt-2 leading-8 text-blue-900">{content.blog.conclusion}</p>
              </section>
            </div>
          </article>
        </TabsContent>
      </Tabs>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900">사용한 출처</h3>
        <div className="mt-3 space-y-2">
          {content.sources.map((source) => (
            <a key={source.link} href={source.link} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600">
              <span className="truncate">{source.source} · {source.title}</span><ExternalLink className="size-4 shrink-0" />
            </a>
          ))}
        </div>
        <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400">본 콘텐츠는 정보 제공을 목적으로 하며 특정 금융상품의 매수 또는 매도를 권유하지 않습니다.</p>
      </div>
    </div>
  );
}
