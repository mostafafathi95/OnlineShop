import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Analytics = () => {
  const salesData = [
    { month: "فروردین", sales: 4000, orders: 24 },
    { month: "اردیبهشت", sales: 3000, orders: 13 },
    { month: "خردادماه", sales: 2000, orders: 9 },
    { month: "تیرماه", sales: 2780, orders: 39 },
    { month: "مرداد", sales: 1890, orders: 48 },
    { month: "شهریور", sales: 2390, orders: 38 },
    { month: "مهرماه", sales: 3490, orders: 43 }
  ];

  const topProducts = [
    { name: "گوشی سامسونگ", sales: 1200, revenue: "96000000" },
    { name: "لپ‌تاپ اپل", sales: 850, revenue: "29750000" },
    { name: "تی‌شرت مردانه", sales: 2100, revenue: "525000" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">تحلیلات</h1>
        <p className="text-muted-foreground mt-1">بررسی عملکرد فروشگاه</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">کل فروش</p>
          <p className="text-3xl font-bold mt-2">23,590,000</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% از ماه گذشته</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">کل سفارشات</p>
          <p className="text-3xl font-bold mt-2">214</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% از ماه گذشته</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">کاربران فعال</p>
          <p className="text-3xl font-bold mt-2">1,247</p>
          <p className="text-xs text-green-600 mt-2">↑ 15% از ماه گذشته</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">میانگین سفارش</p>
          <p className="text-3xl font-bold mt-2">110,000</p>
          <p className="text-xs text-green-600 mt-2">↑ 5% از ماه گذشته</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-bold text-lg mb-4">فروش ماهانه</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="font-bold text-lg mb-4">تعداد سفارشات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="p-6">
        <h2 className="font-bold text-lg mb-4">محصولات برتر</h2>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex justify-between items-center pb-4 border-b last:border-b-0">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} فروش</p>
              </div>
              <p className="font-bold">{product.revenue}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
