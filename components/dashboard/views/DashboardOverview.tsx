/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/views/DashboardOverview.tsx
"use client";
import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // optional shadcn card
import { TrendingUp, ShoppingCart, Users, Box } from "lucide-react";
import MiniChart from "../widgets/MiniChart";
import { useAppSelector } from "@/lib/hooks";

export default function DashboardOverview({ onOpen }: { onOpen: (s: any) => void }) {
  const orders = useAppSelector((s) => s.dashboard.orders || []);
  const downloads = useAppSelector((s) => s.dashboard.downloads || []);
  const addresses = useAppSelector((s) => s.dashboard.addresses || []);

  const totals = useMemo(() => {
    const revenue = orders.reduce((acc: number, o: any) => acc + Number(o.total || 0), 0);
    const ordersCount = orders.length;
    const customers = new Set(orders.map((o: any) => o.customerId || o.id)).size;
    return { revenue, ordersCount, customers };
  }, [orders]);

  const kpis = [
    { title: "Revenue", value: `৳${totals.revenue.toFixed(2)}`, icon: TrendingUp },
    { title: "Orders", value: totals.ordersCount, icon: ShoppingCart },
    { title: "Downloads", value: downloads.length, icon: Box },
    { title: "Addresses", value: addresses.length, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome back — here’s your recent activity</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.title} className="bg-white border rounded-lg p-4 shadow-sm flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded">
              <k.icon className="h-6 w-6 text-slate-700" />
            </div>
            <div>
              <div className="text-sm text-gray-500">{k.title}</div>
              <div className="text-lg font-semibold">{k.value}</div>
            </div>
            <div className="ml-auto hidden md:block w-32">
              <MiniChart />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Sales (last 7 days)</h3>
          <MiniChart />
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o: any) => (
              <div key={o.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{o.id}</div>
                  <div className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">৳{o.total}</div>
                  <div className="text-sm text-gray-500">{o.status}</div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="text-sm text-gray-500">No recent orders</div>}
            <div className="pt-3">
              <button onClick={() => onOpen("orders")} className="text-sm text-[#EC8923]">View all orders →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
