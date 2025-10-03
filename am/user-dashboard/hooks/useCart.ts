"use client";

import { useState } from "react";
import type { CartItem } from "@/types/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

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

  return { items, addToCart, removeFromCart, clearCart, total };
}
