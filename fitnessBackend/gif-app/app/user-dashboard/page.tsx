"use client";

import { useGetProductsQuery } from "@/generated/graphql";
import { useState } from "react";
import BuyNowModal from "@/components/BuyNowModal";
import Image from "next/image";

export default function UserDashboard() {
  const { data, loading, error } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load products</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">

        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.products?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-4 shadow-md border"
            >
              {/* Product Image */}
              <div className="w-full h-48 relative">
                <Image
                  src={product.imageUrl ?? "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="text-lg font-bold mt-3">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>

              <p className="text-blue-600 font-bold mt-2 text-lg">
                ₹{product.priceInr / 100}
              </p>

              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Buy Now Modal */}
      {selectedProduct && (
        <BuyNowModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
