"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Newspaper,
  Loader2,
  Flame,
  Eye,
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
  thumbnailImage: string;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
};

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function CareerNewsListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [articlesResponse, popularResponse] = await Promise.all([
          fetch(`${API_URL}/api/career-news`),
          fetch(`${API_URL}/api/career-news/popular?limit=6`),
        ]);

        const articlesText = await articlesResponse.text();
        const popularText = await popularResponse.text();

        let articlesData;
        let popularData;

        try {
          articlesData = JSON.parse(articlesText);
        } catch {
          throw new Error("News API returned an invalid response");
        }

        try {
          popularData = JSON.parse(popularText);
        } catch {
          popularData = { articles: [] };
        }

        if (!articlesResponse.ok) {
          throw new Error(articlesData.message || "Failed to fetch news");
        }

        setArticles(articlesData.articles || []);
        setPopularArticles(popularData.articles || []);
      } catch (error) {
        console.error("Fetch Career News Error:", error);
        setError(error instanceof Error ? error.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-rose-600" />
          <p className="mt-4 font-semibold text-slate-600">Loading news...</p>
        </div>
      </main>
    );
  }

  const featuredArticle =
    articles.find((article) => article.isFeatured) || articles[0];

  const restArticles = articles.filter(
    (article) => article._id !== featuredArticle?._id
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950 to-indigo-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/career-resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-200 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Career Resources
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-rose-300">
            Stay Updated
          </p>

          <h1 className="mt-2 text-4xl font-black md:text-6xl">
            Career News & Updates
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-rose-100">
            Hiring news, company updates, career trends and important
            announcements — all in one place.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-100">
              <Newspaper size={38} className="text-rose-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              No news yet
            </h3>

            <p className="mt-2 text-slate-500">
              Check back soon for the latest career updates.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* MAIN COLUMN */}
            <div>
              {/* FEATURED / MAIN STORY */}
              {featuredArticle && (
                <Link
                  href={`/career-resources/career-news/${featuredArticle._id}`}
                  className="group mb-10 block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl"
                >
                  {featuredArticle.thumbnailImage && (
                    <div className="h-64 w-full overflow-hidden bg-slate-100 sm:h-80">
                      <img
                        src={getFullImageUrl(featuredArticle.thumbnailImage)}
                        alt={featuredArticle.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-rose-600">
                      <span>{featuredArticle.category}</span>
                      {featuredArticle.source && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500">
                            {featuredArticle.source}
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="mt-3 text-2xl font-black leading-snug text-slate-900 transition group-hover:text-rose-600 sm:text-3xl">
                      {featuredArticle.title}
                    </h2>

                    {featuredArticle.excerpt && (
                      <p className="mt-3 leading-relaxed text-slate-600">
                        {featuredArticle.excerpt}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-rose-600">
                      Read Full Story
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              )}

              {/* REST OF THE NEWS */}
              <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm">
                {restArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/career-resources/career-news/${article._id}`}
                    className="group flex gap-5 p-6 transition hover:bg-slate-50"
                  >
                    {article.thumbnailImage && (
                      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={getFullImageUrl(article.thumbnailImage)}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
                        {article.category}
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900 transition group-hover:text-rose-600">
                        {article.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        {article.source && <span>{article.source}</span>}
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

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
                  {popularArticles.map((article, index) => (
                    <Link
                      key={article._id}
                      href={`/career-resources/career-news/${article._id}`}
                      className="group flex items-start gap-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-black text-slate-500">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <h4 className="text-sm font-bold leading-snug text-slate-900 transition group-hover:text-rose-600">
                          {article.title}
                        </h4>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Eye size={12} />
                          {article.viewCount || 0} views
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
        )}
      </section>
    </main>
  );
}
