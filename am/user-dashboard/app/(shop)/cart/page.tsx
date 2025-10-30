"use client";

import { useQuery } from "@apollo/client";
import { GET_CART } from "@/graphql/queries/cart";

export default function CartPage() {
  const { data, loading, error } = useQuery(GET_CART);

  if (loading) return <div className="p-6">Loading your cart...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading cart</div>;

  const cartItems = data?.cart || [];

  if (cartItems.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        No items in cart.
      </div>
    );

  const total = cartItems.reduce(
    (sum: number, item: any) =>
      sum + item.quantity * (item.product?.price || 0),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="bg-white rounded shadow divide-y">
        <div className="p-4 space-y-3">
          {cartItems.map((it: any) => (
            <div
              key={it.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {it.product?.imageUrl ? (
                    <img
                      src={it.product.imageUrl}
                      alt={it.product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No image</div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{it.product?.name}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {it.quantity}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ₹{(it.product?.price || 0) * it.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Total: ₹{total}</div>
            <div className="text-sm text-gray-500">
              No payment implemented yet
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded">Clear (later)</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Checkout (later)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
