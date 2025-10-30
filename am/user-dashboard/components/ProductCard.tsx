"use client";

import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: () => void;
}) {
  return (
    <div className="group border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-56 bg-gray-50 rounded-t-xl overflow-hidden flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-sm">No image</div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">₹{product.price}</div>
          <div className="flex gap-2">
            <Link
              href={`/product/${product.id}`}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
            >
              View
            </Link>
            <button
              onClick={onAdd}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
