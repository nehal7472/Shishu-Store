/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ClipboardList, Download, MapPin, User, LogOut, Grid } from "lucide-react";

export default function DashboardSidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: any) => void;
}) {
  const items = [
    { id: "home", label: "Dashboard", icon: Grid },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "account", label: "Account details", icon: User },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <aside className="w-56 border rounded-md p-4 h-fit">
      <nav className="flex flex-col space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => {
                if (it.id === "logout") {
                  // dispatch logout from auth slice and clear dashboard
                  // lazy import to avoid circular dependency
                  (async () => {
                    const { logout } = await import("@/lib/authSlice");
                    const { clearDashboard } = await import("@/lib/dashboardSlice");
                    const store = (await import("@/lib/store")).default;
                    store.dispatch(logout());
                    store.dispatch(clearDashboard());
                    // navigate to home
                    const { default: router } = await import("next/navigation");
                    // can't call default import router here; instead just location:
                    if (typeof window !== "undefined") window.location.href = "/";
                  })();
                  return;
                }
                onChange(it.id);
              }}
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded ${
                isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
