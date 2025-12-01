import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { ProductWithCategory } from "@shared/schema";

interface BreadcrumbProps {
  product: ProductWithCategory;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-foreground">
        خانه
      </Link>
      <ArrowRight className="h-4 w-4" />
      <Link href="/products" className="hover:text-foreground">
        محصولات
      </Link>
      {product.category && (
        <>
          <ArrowRight className="h-4 w-4" />
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-foreground"
          >
            {product.category.name}
          </Link>
        </>
      )}
      <ArrowRight className="h-4 w-4" />
      <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
    </nav>
  );
}
