/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Address = {
  id: string;
  label?: string;
  name: string;
  phone?: string;
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postal?: string;
  country?: string;
};

type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
  items: any[];
};

type Download = {
  id: string;
  name: string;
  url: string;
  expiresAt?: string;
};

type DashboardState = {
  addresses: Address[];
  orders: Order[];
  downloads: Download[];
};

const STORAGE_KEY = "shishu-dashboard";

const loadFromStorage = (): DashboardState => {
  if (typeof window === "undefined") {
    return { addresses: [], orders: [], downloads: [] };
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error("dashboard load error", err);
  }
  // seed with sample orders/downloads
  return {
    addresses: [],
    orders: [
      {
        id: "ORD-1001",
        date: new Date().toISOString(),
        total: 74.98,
        status: "Delivered",
        items: [{ id: "p-1", name: "Classic Leather Bag", qty: 1, price: 79.99 }],
      },
    ],
    downloads: [
      {
        id: "DL-1",
        name: "Size Chart PDF",
        url: "/static/downloads/size-chart.pdf",
      },
    ],
  };
};

const initialState: DashboardState = loadFromStorage();

const persist = (state: DashboardState) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("dashboard persist error", err);
  }
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
      persist(state);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const idx = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (idx >= 0) state.addresses[idx] = action.payload;
      persist(state);
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      persist(state);
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      persist(state);
    },
    addDownload: (state, action: PayloadAction<Download>) => {
      state.downloads.unshift(action.payload);
      persist(state);
    },
    clearDashboard: (state) => {
      state.addresses = [];
      state.orders = [];
      state.downloads = [];
      persist(state);
    },
    syncDashboard: (state, action: PayloadAction<DashboardState>) => {
      state.addresses = action.payload.addresses;
      state.orders = action.payload.orders;
      state.downloads = action.payload.downloads;
    },
  },
});

export const {
  addAddress,
  updateAddress,
  removeAddress,
  addOrder,
  addDownload,
  clearDashboard,
  syncDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
export type { Address, Order, Download };
