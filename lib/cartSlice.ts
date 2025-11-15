import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types";

// Helper function to generate unique key for cart items
const getItemKey = (item: CartItem) =>
  `${item.id}-${item.size || "no-size"}-${item.color || "no-color"}`;

// Load cart from sessionStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
      isOpen: false,
    };
  }

  try {
    const storedCart = sessionStorage.getItem("shishu-cart");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Error loading cart from sessionStorage:", error);
  }

  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isOpen: false,
  };
};

// Save cart to sessionStorage
const saveCartToStorage = (cart: CartState) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem("shishu-cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to sessionStorage:", error);
  }
};

const initialState: CartState = loadCartFromStorage();

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

      // Save to sessionStorage
      saveCartToStorage(state);
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

        // Save to sessionStorage
        saveCartToStorage(state);
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

        // Save to sessionStorage
        saveCartToStorage(state);
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

        // Save to sessionStorage
        saveCartToStorage(state);
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Save to sessionStorage
      saveCartToStorage(state);
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

    // Sync cart from storage (useful for cross-tab synchronization)
    syncCartFromStorage: (state) => {
      const storedCart = loadCartFromStorage();
      state.items = storedCart.items;
      state.totalQuantity = storedCart.totalQuantity;
      state.totalAmount = storedCart.totalAmount;
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
  syncCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
