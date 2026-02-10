import url from "@/url";

export type Article = {
  _id: string;
  title: string;
  hooking: string;
  summary: string;
  author: string;
  date: string;
  source: string;
};

export type GetArticleResponse = {
  articles: Article[];
  left: number;
};

export type PostArticleResponse = {
  articlers: Article[];
};


type GetArticleParams = {
  page?: number;
  limit?: number;
  sort?: string;
};

export async function getArticles(
  params?: GetArticleParams,
): Promise<GetArticleResponse> {
  const query = new URLSearchParams(
    params as Record<string, string>,
  ).toString();

  const res = await fetch(
    `${url.ARTICLES}?${query}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export async function postArticle(): Promise<PostArticleResponse> {
  const res = await fetch(
    `${url.ARTICLES}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // 현재는 빈 body
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("POST /api/article failed");
  }

  return res.json();
}