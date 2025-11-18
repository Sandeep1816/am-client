"use client";

import { useGetProductsQuery } from "@/generated/graphql";

export default function ProductsPage() {
  const { data, loading, error } = useGetProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {data?.products.map((product) => (
        <div key={product.id} className="p-4 border-b">
          <p className="font-semibold">{product.title}</p>
          <p>₹{product.price / 100}</p>
        </div>
      ))}
    </div>
  );
}
