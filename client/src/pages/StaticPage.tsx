import { useRoute, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import type { Page } from "@shared/schema";

export default function StaticPageComponent() {
  const [, params] = useRoute("/:slug");
  const [, setLocation] = useLocation();

  const { data: pages, isLoading } = useQuery<Page[]>({
    queryKey: ["/api/pages"],
  });

  const page = pages?.find(p => p.slug === params?.slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-96" />
        </div>
      </Layout>
    );
  }

  if (!page) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">صفحه یافت نشد</h1>
          <Button onClick={() => setLocation("/")} data-testid="button-home">
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-4xl font-bold">{page.title}</h1>

        <div
          className="prose prose-invert max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: page.content?.replace(/\n/g, "<br />") || "",
          }}
          data-testid={`page-content-${page.id}`}
        />
      </div>
    </Layout>
  );
}
