import { Link } from "wouter";
import { Edit, Trash2, MoreHorizontal, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@shared/schema";

interface ProductsTableProps {
  products: Product[] | undefined;
  isLoading: boolean;
  formatPrice: (price: string | number) => string;
  onDelete: (id: number) => void;
}

export function ProductsTable({
  products,
  isLoading,
  formatPrice,
  onDelete,
}: ProductsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">تصویر</TableHead>
              <TableHead>نام محصول</TableHead>
              <TableHead>قیمت</TableHead>
              <TableHead>موجودی</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead className="w-16">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-12 w-12 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-lg border bg-card h-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">محصولی یافت نشد.</p>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="ml-2 h-4 w-4" />
              افزودن محصول
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">تصویر</TableHead>
            <TableHead>نام محصول</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>موجودی</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="w-16">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                  <img
                    src={
                      product.image ||
                      "https://placehold.co/48x48/e2e8f0/64748b?text=N"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.sku || "-"}
                  </p>
                </div>
              </TableCell>
              <TableCell>{formatPrice(product.price)} تومان</TableCell>
              <TableCell>
                <Badge
                  variant={
                    product.stock <= 0
                      ? "destructive"
                      : product.stock <= 10
                      ? "secondary"
                      : "default"
                  }
                >
                  {product.stock} عدد
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? "فعال" : "غیرفعال"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/products/${product.slug}`}>
                        <Eye className="ml-2 h-4 w-4" />
                        مشاهده
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${product.id}`}>
                        <Edit className="ml-2 h-4 w-4" />
                        ویرایش
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(product.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
