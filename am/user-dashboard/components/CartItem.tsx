"use client";

import { CartItem as CI } from "@/types/cart";

export default function CartItem({ item, onRemove }: { item: CI; onRemove?: () => void; }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {item.product.imageUrl ? <img src={item.product.imageUrl} alt={item.product.name} className="object-cover w-full h-full" /> : <div className="text-gray-400">No image</div>}
        </div>
        <div>
          <div className="font-medium">{item.product.name}</div>
          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold">₹{item.product.price * item.quantity}</div>
        <button className="text-sm text-red-600 mt-1" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}
