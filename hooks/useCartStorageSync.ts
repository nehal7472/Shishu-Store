"use client";

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { syncCartFromStorage } from '@/lib/cartSlice';

export function useCartStorageSync() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Sync cart when component mounts
    dispatch(syncCartFromStorage());

    // Listen for storage changes (cross-tab synchronization)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'shishu-cart' && event.newValue) {
        dispatch(syncCartFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
}