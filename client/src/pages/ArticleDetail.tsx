import { useRoute, useLocation } from "wouter";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@shared/schema";

export default function ArticleDetailPage() {
  const [, params] = useRoute("/articles/:slug");
  const [, setLocation] = useLocation();

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const article = articles?.find(a => a.slug === params?.slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-96 mb-8" />
          <Skeleton className="h-48" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">مقاله یافت نشد</h1>
          <Button onClick={() => setLocation("/articles")}>
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت به مقالات
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/articles")}
          data-testid="button-back-articles"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت به مقالات
        </Button>

        <article className="space-y-6" data-testid={`article-${article.id}`}>
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.createdAt || "").toLocaleDateString("fa-IR")}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <Card className="bg-muted/50 border-0 p-6">
              <p className="text-lg font-medium">{article.excerpt}</p>
            </Card>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div
              className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: article.content?.replace(/\n/g, "<br />") || "",
              }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
}
