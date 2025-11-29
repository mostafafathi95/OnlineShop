import { useRoute, useLocation } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import type { News } from "@shared/schema";

export default function NewsDetailPage() {
  const [, params] = useRoute("/news/:slug");
  const [, setLocation] = useLocation();

  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const newsItem = news?.find(n => n.slug === params?.slug);

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

  if (!newsItem) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">خبر یافت نشد</h1>
          <Button onClick={() => setLocation("/news")}>
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت به اخبار
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
          onClick={() => setLocation("/news")}
          data-testid="button-back-news"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت به اخبار
        </Button>

        <article className="space-y-6" data-testid={`news-${newsItem.id}`}>
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{newsItem.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(newsItem.createdAt || "").toLocaleDateString("fa-IR")}
            </div>
          </div>

          {/* Featured Image */}
          {newsItem.image && (
            <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {newsItem.excerpt && (
            <Card className="bg-muted/50 border-0 p-6">
              <p className="text-lg font-medium">{newsItem.excerpt}</p>
            </Card>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div
              className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: newsItem.content?.replace(/\n/g, "<br />") || "",
              }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
}
