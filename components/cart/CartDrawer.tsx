"use client";

import Image from "next/image";
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

export function CartDrawer() {
  const { items, totalQuantity, totalAmount, isOpen } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(closeCart())}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-6 w-6 text-[#EC8923]" />
            <h2 className="text-xl font-semibold text-gray-800">
              Shopping Cart ({totalQuantity})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(closeCart())}
          >
            <X className="h-5 w-5 text-gray-600 hover:text-gray-800" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex items-center space-x-4 border-b border-gray-200 pb-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                      {item.name}
                    </h3>

                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " • "}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}

                    <p className="font-semibold text-gray-900 mt-1 text-sm">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded border-gray-300"
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

                      <span className="text-sm w-6 text-center">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded border-gray-300"
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
                      className="h-6 w-6 text-red-500 hover:text-red-700"
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
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-5 space-y-4">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-[#EC8923] hover:bg-[#d97a1f] text-white rounded-md py-2">
                Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#EC8923] text-[#EC8923] hover:bg-[#EC8923] hover:text-white rounded-md py-2"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
