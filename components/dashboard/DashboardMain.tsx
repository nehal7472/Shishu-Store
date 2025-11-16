/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/DashboardMain.tsx
"use client";
import DashboardOverview from "./views/DashboardOverview";
import OrdersView from "./views/OrdersView";
import DownloadsView from "./views/DownloadsView";
import AddressesView from "./views/AddressesView";
import AccountDetailsView from "./views/AccountDetailsView";

export default function DashboardMain({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: any) => void;
}) {
  return (
    <div>
      {active === "overview" && <DashboardOverview onOpen={onChange} />}
      {active === "orders" && <OrdersView />}
      {active === "downloads" && <DownloadsView />}
      {active === "addresses" && <AddressesView />}
      {active === "account" && <AccountDetailsView />}
    </div>
  );
}
