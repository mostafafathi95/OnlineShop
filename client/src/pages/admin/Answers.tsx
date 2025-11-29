import { useState } from "react";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Answer } from "@shared/schema";

export default function AdminAnswers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: answers, isLoading } = useQuery<Answer[]>({
    queryKey: ["/api/answers"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/answers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/answers"] });
      toast({ title: "پاسخ حذف شد" });
      setDeleteId(null);
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("PATCH", `/api/answers/${id}`, { approved: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/answers"] });
      toast({ title: "پاسخ تایید شد" });
    },
  });

  const filtered = answers?.filter(a => 
    a.content.includes(searchQuery) || (a.questionId || "").toString().includes(searchQuery)
  ) || [];

  return (
    <AdminLayout title="پاسخ‌های سؤالات">
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
        </div>

        {isLoading ? <Skeleton className="h-96" /> : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">محتوای پاسخ</TableHead>
                  <TableHead className="text-right">سؤال</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((answer) => (
                  <TableRow key={answer.id}>
                    <TableCell className="max-w-xs truncate">{answer.content}</TableCell>
                    <TableCell>{answer.questionId}</TableCell>
                    <TableCell>
                      <Badge variant={answer.approved ? "default" : "secondary"}>
                        {answer.approved ? "تایید شده" : "منتظر تایید"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" data-testid={`button-menu-answer-${answer.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!answer.approved && (
                            <DropdownMenuItem
                              onClick={() => approveMutation.mutate(answer.id)}
                              data-testid={`button-approve-${answer.id}`}
                            >
                              تایید
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => setDeleteId(answer.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 ml-2" /> حذف
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
      </div>
    </AdminLayout>
  );
}
