/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/views/OrdersView.tsx
"use client";
import { useAppSelector } from "@/lib/hooks";

export default function OrdersView() {
  const orders = useAppSelector((s) => s.dashboard.orders || []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {orders.length === 0 ? (
        <div className="text-sm text-gray-500">You have no orders yet.</div>
      ) : (
        <div className="bg-white border rounded-lg overflow-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-600">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((o: any) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 text-sm">#{o.id}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(o.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">{o.items?.length || 0}</td>
                  <td className="px-4 py-3 text-sm">৳{o.total}</td>
                  <td className="px-4 py-3 text-sm">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
