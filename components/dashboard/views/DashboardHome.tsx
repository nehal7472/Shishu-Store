/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Download, MapPin, User } from "lucide-react";

export default function DashboardHome({ onOpenSection }: { onOpenSection: (s: any) => void; }) {
  const cards = [
    { id: "orders", title: "Orders", icon: ShoppingCart, desc: "View your recent orders" },
    { id: "downloads", title: "Downloads", icon: Download, desc: "Your downloadable files" },
    { id: "addresses", title: "Addresses", icon: MapPin, desc: "Manage your addresses" },
    { id: "account", title: "Account", icon: User, desc: "Edit account details" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to your dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              onClick={() => onOpenSection(c.id)}
              className="cursor-pointer border rounded-lg p-4 flex items-start gap-4 hover:shadow"
            >
              <div className="bg-gray-100 p-3 rounded">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
