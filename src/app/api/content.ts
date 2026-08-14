export type InstagramSlide = {
  order: number;
  title: string;
  body: string;
};

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
    sections: Array<{ heading: string; body: string }>;
    conclusion: string;
    tags: string[];
  };
  sources: ContentSource[];
};

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

