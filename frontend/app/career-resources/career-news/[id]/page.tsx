"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Newspaper,
  Loader2,
  Flame,
  Eye,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getFullImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
};

type Article = {
  _id: string;
  title: string;
  category: string;
  source: string;
  excerpt: string;
  content: string;
  thumbnailImage: string;
  viewCount: number;
  createdAt: string;
};

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function CareerNewsArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [articleResponse, popularResponse] = await Promise.all([
          fetch(`${API_URL}/api/career-news/${articleId}`),
          fetch(`${API_URL}/api/career-news/popular?limit=6`),
        ]);

        const articleText = await articleResponse.text();
        const popularText = await popularResponse.text();

        let articleData;
        let popularData;

        try {
          articleData = JSON.parse(articleText);
        } catch {
          throw new Error("Article API returned an invalid response");
        }

        try {
          popularData = JSON.parse(popularText);
        } catch {
          popularData = { articles: [] };
        }

        if (!articleResponse.ok) {
          throw new Error(articleData.message || "Failed to fetch article");
        }

        setArticle(articleData.article);
        setPopularArticles(popularData.articles || []);
      } catch (error) {
        console.error("Fetch Career News Article Error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load article"
        );
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchData();
    }
  }, [articleId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-rose-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-black text-slate-900">
            Article not found
          </h2>
          <p className="mt-2 text-slate-500">{error}</p>
          <Link
            href="/career-resources/career-news"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 font-bold text-white transition hover:bg-rose-700"
          >
            <ArrowLeft size={18} />
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950 to-indigo-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <Link
            href="/career-resources/career-news"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to News
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-rose-300">
            {article.category}
          </p>

          <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-rose-100">
            {article.source && (
              <span className="font-semibold">{article.source}</span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(article.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye size={14} />
              {article.viewCount || 0} views
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* ARTICLE BODY */}
          <article>
            {article.thumbnailImage && (
              <div className="mb-8 overflow-hidden rounded-3xl bg-slate-100">
                <img
                  src={getFullImageUrl(article.thumbnailImage)}
                  alt={article.title}
                  className="h-64 w-full object-cover sm:h-96"
                />
              </div>
            )}

            <div
              className="prose prose-slate max-w-none leading-relaxed text-slate-700 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-rose-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* SIDEBAR: MOST POPULAR */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                  <Flame size={18} />
                </div>
                <h3 className="font-black text-slate-900">Most Popular</h3>
              </div>

              <div className="space-y-5">
                {popularArticles
                  .filter((popular) => popular._id !== article._id)
                  .map((popular, index) => (
                    <Link
                      key={popular._id}
                      href={`/career-resources/career-news/${popular._id}`}
                      className="group flex items-start gap-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-black text-slate-500">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <h4 className="text-sm font-bold leading-snug text-slate-900 transition group-hover:text-rose-600">
                          {popular.title}
                        </h4>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Eye size={12} />
                          {popular.viewCount || 0} views
                        </p>
                      </div>
                    </Link>
                  ))}

                {popularArticles.length === 0 && (
                  <p className="text-sm text-slate-400">
                    No popular articles yet.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
