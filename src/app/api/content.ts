export type InstagramSlide = {
  order: number;
  source: string;
  kind: "cover" | "article" | "numbers" | "cta";
  title: string;
  body: string;
  metrics: Array<{ label: string; value: string; context: string }>;
};

export type Publication = { published: boolean; publishedAt?: string; url?: string };

export type ContentSource = {
  title: string;
  link: string;
  source: string;
};

export type GeneratedContent = {
  _id?: string;
  createdAt?: string;
  instagram: {
    headline: string;
    caption: string;
    hashtags: string[];
    slides: InstagramSlide[];
  };
  blog: {
    title: string;
    introduction: string;
    sections: Array<{
      heading: string;
      fact: string;
      interpretation: string;
      marketImpact: string;
      watchPoints: string[];
    }>;
    conclusion: string;
    tags: string[];
  };
  threads: {
    headline: string;
    posts: string[];
    closing: string;
    hashtags: string[];
  };
  publications?: {
    instagram?: Publication;
    blog?: Publication;
    threads?: Publication;
  };
  sources: ContentSource[];
};

export type ContentHistoryItem = Pick<GeneratedContent, "_id" | "createdAt" | "publications"> & {
  instagram?: { headline?: string };
  blog?: { title?: string };
  threads?: { headline?: string };
};

export async function getContentHistory() {
  const response = await fetch("/api/content", { credentials: "include", cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? "발행 이력을 불러오지 못했습니다.");
  return data as { contents: ContentHistoryItem[] };
}

export async function generateContent(articleIds: string[]) {
  const response = await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({ articleIds }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? "콘텐츠 생성에 실패했습니다.");
  }

  return data as GeneratedContent;
}

export async function updatePublication(contentId: string, channel: "instagram" | "blog" | "threads", published: boolean, url = "") {
  const response = await fetch(`/api/content/${contentId}/publications/${channel}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ published, url }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? "발행 상태 저장에 실패했습니다.");
  return data as GeneratedContent;
}
