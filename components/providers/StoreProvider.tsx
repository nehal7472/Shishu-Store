"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import  store  from "@/lib/store";
import { CartStorageSync } from "@/components/providers/CartStorageSync";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <CartStorageSync />
      {children}
    </Provider>
  );
}
