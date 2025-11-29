import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserWallet } from "@shared/schema";

export default function AdminUserWallets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [chargeAmount, setChargeAmount] = useState("");
  const { toast } = useToast();

  const { data: wallets, isLoading } = useQuery<UserWallet[]>({
    queryKey: ["/api/wallet"],
  });

  const chargeMutation = useMutation({
    mutationFn: async () => {
      if (!selectedUserId) return;
      return apiRequest("PATCH", "/api/wallet/balance", {
        balance: chargeAmount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      toast({ title: "کیف‌پول شارژ شد" });
      setSelectedUserId(null);
      setChargeAmount("");
    },
  });

  const filtered = wallets?.filter(w =>
    (w.userId || "").toString().includes(searchQuery)
  ) || [];

  const formatCurrency = (value: string | number) => {
    return Number(value).toLocaleString("fa-IR");
  };

  return (
    <AdminLayout title="کیف‌پول کاربران">
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
                  <TableHead className="text-right">کاربر</TableHead>
                  <TableHead className="text-right">موجودی</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell>{wallet.userId}</TableCell>
                    <TableCell>{formatCurrency(wallet.balance)} تومان</TableCell>
                    <TableCell>
                      <Dialog open={selectedUserId === wallet.userId} onOpenChange={(open) => {
                        if (!open) setSelectedUserId(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUserId(wallet.userId)}
                            data-testid={`button-charge-${wallet.userId}`}
                          >
                            <Plus className="w-4 h-4 ml-2" />
                            شارژ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>شارژ کیف‌پول</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">مبلغ (تومان)</label>
                              <Input
                                type="number"
                                value={chargeAmount}
                                onChange={(e) => setChargeAmount(e.target.value)}
                                placeholder="مثال: 50000"
                                data-testid="input-charge-amount"
                              />
                            </div>
                            <Button
                              onClick={() => chargeMutation.mutate()}
                              disabled={chargeMutation.isPending || !chargeAmount}
                              data-testid="button-confirm-charge"
                            >
                              تایید
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
