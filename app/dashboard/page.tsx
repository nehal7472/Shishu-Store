// app/dashboard/page.tsx
"use client";
import { useState } from "react";
import ProtectedClient from "@/components/dashboard/ProtectedClient";
import Navbar from "@/components/header/Navbar";
import DashboardSidebar from "@/components/dashboard/ProSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";
import { Footer } from "@/components/footer/Footer";

export default function DashboardPage() {
  const [active, setActive] = useState<
    "overview" | "orders" | "downloads" | "addresses" | "account"
  >("overview");

  return (
    <ProtectedClient>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 flex gap-6">
          <DashboardSidebar active={active} onChange={setActive} />
          <div className="flex-1">
            <DashboardMain active={active} onChange={setActive} />
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedClient>
  );
}
