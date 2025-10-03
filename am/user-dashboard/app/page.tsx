"use client";

import { useQuery } from "@apollo/client";
import { GetProductsDocument, GetProductsQuery } from "@/gql/graphql"; // updated path
import Image from "next/image";

export default function Home() {
  const { data, loading, error } = useQuery<GetProductsQuery>(GetProductsDocument);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data?.products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            {product.imageUrl && (
              <Image
  src={product.imageUrl}
  alt={product.name}
  width={300}
  height={200}
  className="rounded-md object-cover"
  unoptimized
/>

            )}
            <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-xl font-bold mt-2">₹{product.price}</p>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
