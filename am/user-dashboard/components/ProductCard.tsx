"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void; }) {
  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm flex flex-col">
      <div className="h-40 mb-3 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
        {product.imageUrl ? (
          // fallback to next/image or plain img
          // using img to keep it simple
          <img src={product.imageUrl} alt={product.name} className="object-cover h-full w-full" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-semibold">₹{product.price}</div>
        <div className="flex gap-2">
          <Link href={`/product/${product.id}`} className="px-3 py-1 border rounded">View</Link>
          <button onClick={onAdd} className="px-3 py-1 rounded bg-green-600 text-white">Add</button>
        </div>
      </div>
    </div>
  );
}
