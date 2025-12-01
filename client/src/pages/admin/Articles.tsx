import { useState } from "react";
import { Link } from "wouter";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@shared/schema";

interface ArticleWithType extends Article {
  type: string;
}

export default function AdminArticles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: articles, isLoading } = useQuery<ArticleWithType[]>({
    queryKey: ["/api/articles"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "مقاله حذف شد" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "خطا در حذف مقاله", variant: "destructive" });
    },
  });

  const filtered = articles?.filter(a => 
    a.title.includes(searchQuery) || a.slug.includes(searchQuery)
  ) || [];

  return (
    <AdminLayout title="مقالات">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
            <Input
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Link href="/admin/articles/new">
            <Button data-testid="button-add-article">
              <Plus className="w-4 h-4 ml-2" />
              مقاله جدید
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <Skeleton className="h-96" />
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">عنوان</TableHead>
                  <TableHead className="text-right">نویسنده</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">تاریخ</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <Badge variant={article.published ? "default" : "secondary"}>
                        {article.published ? "منتشر شده" : "پیش‌نویس"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(article.createdAt || "").toLocaleDateString("fa-IR")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" data-testid={`button-menu-article-${article.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/articles/${article.id}`}>
                              <Edit className="w-4 h-4 ml-2" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(article.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 ml-2" />
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
        )}

        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>حذف مقاله</DialogTitle>
              <DialogDescription>
                آیا مطمئن هستید؟ این عملیات قابل برگشت نیست.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline">انصراف</Button>
              <Button
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              >
                حذف
              </>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
