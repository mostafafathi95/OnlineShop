import AdminLayout from "../AdminLayout";
import { DashboardStats } from "./DashboardStats";
import { DashboardOrders } from "./DashboardOrders";
import { DashboardLowStock } from "./DashboardLowStock";
import { useDashboardData, useStatCards, useFormatPrice } from "./hooks";

export default function AdminDashboard() {
  const { stats, recentOrders, lowStockProducts, statsLoading, ordersLoading } =
    useDashboardData();
  const statCards = useStatCards(stats);
  const formatPrice = useFormatPrice();

  return (
    <AdminLayout title="داشبورد">
      <div className="space-y-6">
        <DashboardStats stats={statCards} isLoading={statsLoading} />

        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardOrders
            orders={recentOrders}
            isLoading={ordersLoading}
            formatPrice={formatPrice}
          />
          <DashboardLowStock products={lowStockProducts} formatPrice={formatPrice} />
        </div>
      </div>
    </AdminLayout>
  );
}
