import { useState } from "react";
import { Link } from "wouter";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "../AdminLayout";
import { ProductsTable } from "./ProductsTable";
import { DeleteDialog } from "./DeleteDialog";
import { useProductsData, useDeleteProduct, useFormatPrice } from "./hooks";

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { products, isLoading } = useProductsData(searchQuery);
  const deleteMutation = useDeleteProduct();
  const formatPrice = useFormatPrice();

  return (
    <AdminLayout title="محصولات">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی محصول..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="ml-2 h-4 w-4" />
              افزودن محصول
            </Link>
          </Button>
        </div>

        <ProductsTable
          products={products}
          isLoading={isLoading}
          formatPrice={formatPrice}
          onDelete={setDeleteId}
        />
      </div>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
}
