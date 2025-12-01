import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { StatCard } from "./types";

interface DashboardStatsProps {
  stats: StatCard[];
  isLoading: boolean;
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover-elevate">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  stat.trendUp
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                <stat.icon
                  className={`h-6 w-6 ${
                    stat.trendUp ? "text-green-600" : "text-red-600"
                  }`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stat.trendUp ? (
                <ArrowUpRight className="h-4 w-4 text-green-600 ml-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600 ml-1" />
              )}
              <span
                className={
                  stat.trendUp ? "text-green-600" : "text-red-600"
                }
              >
                {stat.trend}
              </span>
              <span className="text-muted-foreground mr-1">
                نسبت به ماه قبل
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
