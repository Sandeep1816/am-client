"use client";

import { useQuery } from "@apollo/client";
import { GetProductsDocument, GetProductsQuery } from "@/gql/graphql";
import ProductCard from "@/components/ProductCard";

export default function ProductsGrid() {
  const { data, loading, error } = useQuery<GetProductsQuery>(GetProductsDocument);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.products?.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              description: product.description,
              imageUrl: product.imageUrl ?? "",
              price: product.price,
            }}
            onAdd={() => console.log(`Added ${product.name} to cart`)}
          />
        ))}
      </div>
    </div>
  );
}
