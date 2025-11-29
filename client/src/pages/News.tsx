import { useState } from "react";
import { Link } from "wouter";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import type { News } from "@shared/schema";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const filtered = news?.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">اخبار فروشگاه</h1>
            <p className="text-muted-foreground mb-6">تازه‌ترین اخبار و آپدیت‌های فروشگاه</p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجوی خبر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
                data-testid="input-search-news"
              />
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          ) : (
            <>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((newsItem) => (
                    <Link key={newsItem.id} href={`/news/${newsItem.slug}`}>
                      <Card className="h-full hover-elevate cursor-pointer overflow-hidden" data-testid={`card-news-${newsItem.id}`}>
                        {newsItem.image && (
                          <div className="h-48 overflow-hidden bg-muted">
                            <img
                              src={newsItem.image}
                              alt={newsItem.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2 text-lg">
                            {newsItem.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {newsItem.excerpt}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {new Date(newsItem.createdAt || "").toLocaleDateString("fa-IR")}
                          </div>
                          <Button variant="ghost" className="w-full group" data-testid={`button-read-${newsItem.id}`}>
                            مطالعه کامل
                            <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">خبری یافت نشد</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
