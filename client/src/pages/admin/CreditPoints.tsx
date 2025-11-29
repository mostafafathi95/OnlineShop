import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminLayout from "./AdminLayout";
import { useQuery } from "@tanstack/react-query";
import type { CreditPoint } from "@shared/schema";

export default function AdminCreditPoints() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: points, isLoading } = useQuery<CreditPoint[]>({
    queryKey: ["/api/credit-points"],
  });

  const filtered = points?.filter(p => (p.userId || "").toString().includes(searchQuery)) || [];

  return (
    <AdminLayout title="نقاط اعتباری">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
            <Input placeholder="جستجو..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10" />
          </div>
          <Button data-testid="button-add-points"><Plus className="w-4 h-4 ml-2" /> افزودن نقاط</Button>
        </div>

        {isLoading ? <Skeleton className="h-96" /> : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">کاربر</TableHead>
                  <TableHead className="text-right">نقاط</TableHead>
                  <TableHead className="text-right">دلیل</TableHead>
                  <TableHead className="text-right">تاریخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((point, i) => (
                  <TableRow key={i}>
                    <TableCell>{point.userId}</TableCell>
                    <TableCell>{point.points}</TableCell>
                    <TableCell>{point.reason || "-"}</TableCell>
                    <TableCell>{new Date(point.createdAt || "").toLocaleDateString("fa-IR")}</TableCell>
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
