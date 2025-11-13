/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  closeCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/lib/cartSlice";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
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

  const handleCheckout = () => {
    dispatch(closeCart());
    router.push("/checkout");
  };

  // Don't render anything on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch(closeCart())}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-[#EC8923]" />
            <h2 className="text-lg font-semibold">
              Shopping Cart ({totalQuantity})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(closeCart())}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <Button
                onClick={() => dispatch(closeCart())}
                className="bg-[#EC8923] hover:bg-[#d97a1f] text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex space-x-4 border-b pb-4 last:border-b-0"
                >
                  {/* Product Image */}
                  <Link
                    href={`/shop/${item.category}/${item.slug}`}
                    onClick={() => dispatch(closeCart())}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.category}/${item.slug}`}
                      onClick={() => dispatch(closeCart())}
                    >
                      <h3 className="font-medium text-sm line-clamp-2 hover:text-[#EC8923] transition-colors">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Variants */}
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " • "}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}

                    {/* Price */}
                    <p className="font-semibold text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            dispatch(
                              decreaseQuantity({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                              })
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm w-8 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            dispatch(
                              increaseQuantity({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                              })
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() =>
                          dispatch(
                            removeItem({
                              id: item.id,
                              size: item.size,
                              color: item.color,
                            })
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-gray-50">
            {/* Subtotal */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>

            {/* Total */}
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                className="w-full bg-[#EC8923] hover:bg-[#d97a1f] text-white py-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>

              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800"
                onClick={() => dispatch(closeCart())}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
