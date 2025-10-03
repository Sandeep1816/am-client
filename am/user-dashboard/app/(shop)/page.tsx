"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

export default function HomePage() {
  const { loading, data, error } = useQuery(GET_PRODUCTS);
  const { addToCart } = useCart();

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading products</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((p: Product) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => addToCart({ id: p.id, product: p, quantity: 1 })}
          />
        ))}
      </div>
    </div>
  );
}
