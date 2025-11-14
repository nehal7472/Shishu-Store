/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  closeCart,
} from "@/lib/cartSlice";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, totalQuantity, totalAmount, isOpen } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Close on scroll
  useEffect(() => {
    function handleScroll() {
      if (isOpen) dispatch(closeCart());
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, dispatch]);

  if (!isMounted || !isOpen) return null;

  const handleCheckout = () => router.push("/checkout");
  const handleViewCart = () => router.push("/cart");

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <span className="text-sm font-bold text-gray-700">
          {totalQuantity} {totalQuantity === 1 ? "ITEM" : "ITEMS"}
        </span>
        <button
          onClick={handleViewCart}
          className="text-sm font-bold text-gray-700 hover:text-[#EC8923] transition-colors"
        >
          VIEW CART
        </button>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="p-4 flex items-start gap-3"
              >
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-md text-sm">
                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity({
                          id: item.id,
                          size: item.size,
                          color: item.color,
                        })
                      )
                    }
                    className="px-2 py-1 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-medium min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity({
                          id: item.id,
                          size: item.size,
                          color: item.color,
                        })
                      )
                    }
                    className="px-2 py-1 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-gray-900">
                    × {(item.price * item.quantity).toFixed(2)}৳
                  </p>
                </div>

                {/* Image + Remove */}
                <div className="relative">
                  <Link href={`/shop/${item.category}/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </Link>
                  <button
                    onClick={() =>
                      dispatch(
                        removeItem({
                          id: item.id,
                          size: item.size,
                          color: item.color,
                        })
                      )
                    }
                    className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}

            {/* Product Names */}
            {items.map((item) => (
              <div key={`name-${item.id}`} className="px-4 pb-3">
                <Link
                  href={`/shop/${item.category}/${item.slug}`}
                  className="text-sm text-gray-700 hover:text-[#EC8923] line-clamp-2"
                >
                  {item.name}
                  {item.size && `, Size: ${item.size}`}
                  {item.color && `, Color: ${item.color}`}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-700">SUBTOTAL:</span>
            <span className="text-base font-bold text-gray-900">
              {totalAmount.toFixed(2)}৳
            </span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-md text-base"
          >
            CHECKOUT
          </Button>
        </div>
      )}
    </div>
  );
}
