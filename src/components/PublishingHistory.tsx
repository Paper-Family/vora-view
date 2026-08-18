"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, Clock3, History } from "lucide-react";
import { getContentHistory } from "@/app/api/content";

export function PublishingHistory() {
  const query = useQuery({ queryKey: ["content-history"], queryFn: getContentHistory });
  const contents = query.data?.contents ?? [];

  return (
    <section className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2"><History className="size-5 text-blue-600" /><h2 className="font-semibold text-slate-950">최근 콘텐츠·발행 이력</h2></div>
      {query.isLoading ? <p className="mt-4 text-sm text-slate-500">이력을 불러오는 중...</p> : contents.length === 0 ? <p className="mt-4 text-sm text-slate-500">아직 생성된 콘텐츠가 없습니다.</p> : (
        <div className="mt-4 space-y-3">
          {contents.map((content) => (
            <div key={content._id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2"><p className="font-medium text-slate-900">{content.blog?.title || content.instagram?.headline || "제목 없는 콘텐츠"}</p><span className="inline-flex items-center gap-1 text-xs text-slate-500"><Clock3 className="size-3" /> {content.createdAt ? new Date(content.createdAt).toLocaleString("ko-KR") : ""}</span></div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["instagram", "blog", "threads"] as const).map((channel) => <span key={channel} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${content.publications?.[channel]?.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{content.publications?.[channel]?.published && <Check className="size-3" />}{channel} {content.publications?.[channel]?.published ? "발행" : "미발행"}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
