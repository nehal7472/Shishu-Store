import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types";

// Helper function to generate unique key for cart items
const getItemKey = (item: CartItem) =>
  `${item.id}-${item.size || "no-size"}-${item.color || "no-color"}`;

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const newItem = action.payload;
      const itemKey = getItemKey(newItem as CartItem);

      const existingItem = state.items.find(
        (item) => getItemKey(item) === itemKey
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      // Update totals
      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },

    // Remove item from cart
    removeItem: (
      state,
      action: PayloadAction<{ id: string; size?: string; color?: string }>
    ) => {
      const { id, size, color } = action.payload;
      const itemKey = getItemKey({ id, size, color } as CartItem);

      const existingItemIndex = state.items.findIndex(
        (item) => getItemKey(item) === itemKey
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },

    // Increase quantity
    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; size?: string; color?: string }>
    ) => {
      const { id, size, color } = action.payload;
      const itemKey = getItemKey({ id, size, color } as CartItem);

      const existingItem = state.items.find(
        (item) => getItemKey(item) === itemKey
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += existingItem.price;
      }
    },

    // Decrease quantity
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; size?: string; color?: string }>
    ) => {
      const { id, size, color } = action.payload;
      const itemKey = getItemKey({ id, size, color } as CartItem);

      const existingItemIndex = state.items.findIndex(
        (item) => getItemKey(item) === itemKey
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        if (existingItem.quantity === 1) {
          // Remove item if quantity becomes 0
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price;
          state.items.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price;
        }
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    // Toggle cart drawer
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    // Open cart
    openCart: (state) => {
      state.isOpen = true;
    },

    // Close cart
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
