import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, Plus } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useAdminRequests } from "@/hooks/useAdminData";
import { formatDate } from "@/lib/formatters";

const AdminRequests = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: requests = [] } = useAdminRequests();

  return (
    <AdminLayout title="درخواست‌های کاربران">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">درخواست‌های کاربران</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            درخواست جدید
          </Button>
        </div>

        <div className="grid gap-4">
          {(requests as any[]).length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">هیچ درخواستی یافت نشد</p>
            </Card>
          ) : (
            (requests as any[]).map((request) => (
              <Card
                key={request.id}
                className="p-6 hover-elevate cursor-pointer"
                onClick={() => setSelectedId(request.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{request.title}</h3>
                    <p className="text-muted-foreground mt-1">
                      {request.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : request.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {request.status === "approved"
                          ? "تایید شده"
                          : request.status === "pending"
                            ? "در انتظار"
                            : "رد شده"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {request.createdAt && formatDate(request.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;
