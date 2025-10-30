"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { CartItem } from "@/types/cart";

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ Optional persistence using localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function addToCart(item: CartItem) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === item.product.id);
      if (idx === -1) return [...prev, item];
      const copy = [...prev];
      copy[idx].quantity += item.quantity;
      return copy;
    });
  }

  function removeFromCart(productId: string) {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  function total() {
    return items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
