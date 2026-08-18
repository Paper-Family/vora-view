export type Article = {
  _id: string;
  analysis: string;
  author: string;
  date: string;
  hooking: string;
  keywords: string[];
  link: string;
  linkStatus?: "verified" | "unverified" | "dead";
  linkVerifiedAt?: string;
  sectors: string[];
  source: string;
  summary: string;
  title: string;
};

export type GetArticleResponse = {
  articles: Article[];
  left: number;
};

export type PostArticleResponse = {
  articles: Article[];
};

export const articleCategories = [
  { value: "all", label: "전체" },
  { value: "market", label: "증시·경제" },
  { value: "tech", label: "기술·AI" },
  { value: "semiconductor", label: "반도체" },
  { value: "earnings", label: "기업·실적" },
  { value: "policy", label: "정책·무역" },
  { value: "rates", label: "금리·채권" },
  { value: "crypto", label: "가상자산" },
] as const;

export type ArticleCategory = typeof articleCategories[number]["value"];

type GetArticleParams = {
  page?: number;
  limit?: number;
  sort?: string;
  date?: string;
  category?: ArticleCategory;
};

export async function getArticles(params?: GetArticleParams) {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.sort) sp.set("sort", params.sort);
  if (params?.date) sp.set("date", params.date);
  if (params?.category && params.category !== "all") sp.set("category", params.category);

  const qs = sp.toString();
  const res = await fetch(`/api/article${qs ? `?${qs}` : ""}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export async function postArticle(category: ArticleCategory) {
  const res = await fetch("/api/article", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "새 기사 수집에 실패했습니다.");
  }
  return res.json();
}
