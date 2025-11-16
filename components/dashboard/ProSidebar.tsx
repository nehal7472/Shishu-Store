/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/ProSidebar.tsx
"use client";
import { Home, ClipboardList, Download, MapPin, User, LogOut } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/authSlice";
import { clearDashboard } from "@/lib/dashboardSlice";

export default function DashboardSidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: any) => void;
}) {
  const dispatch = useAppDispatch();

  const items = [
    { id: "overview", label: "Overview", Icon: Home },
    { id: "orders", label: "Orders", Icon: ClipboardList },
    { id: "downloads", label: "Downloads", Icon: Download },
    { id: "addresses", label: "Addresses", Icon: MapPin },
    { id: "account", label: "Account details", Icon: User },
    { id: "logout", label: "Logout", Icon: LogOut },
  ];

  return (
    <aside className="w-64 bg-white border rounded-lg p-4 h-fit sticky top-20">
      <div className="mb-4 px-2">
        <h3 className="text-lg font-semibold">My Account</h3>
        <p className="text-sm text-gray-500">Manage your account & orders</p>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => {
                if (it.id === "logout") {
                  dispatch(logout());
                  dispatch(clearDashboard());
                  // redirect to home
                  if (typeof window !== "undefined") window.location.href = "/";
                  return;
                }
                onChange(it.id);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left transition ${
                isActive ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"
              }`}
            >
              <it.Icon className="h-4 w-4 text-slate-600" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
