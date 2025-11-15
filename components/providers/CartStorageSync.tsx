"use client";

import { useCartStorageSync } from "@/hooks/useCartStorageSync";

// This component handles cart storage synchronization
export function CartStorageSync() {
  useCartStorageSync();

  // This component doesn't render anything
  return null;
}
