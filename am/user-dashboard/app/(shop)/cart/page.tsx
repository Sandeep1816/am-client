"use client";

import CartItem from "@/components/CartItem";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, removeFromCart, clearCart, total } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No items in cart.</div>
      ) : (
        <div className="bg-white rounded shadow divide-y">
          <div className="p-4 space-y-3">
            {items.map(it => (
              <CartItem key={it.product.id} item={it} onRemove={() => removeFromCart(it.product.id)} />
            ))}
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Total: ₹{total()}</div>
              <div className="text-sm text-gray-500">No payment implemented yet</div>
            </div>
            <div className="flex gap-2">
              <button onClick={clearCart} className="px-4 py-2 border rounded">Clear</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Checkout (later)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
