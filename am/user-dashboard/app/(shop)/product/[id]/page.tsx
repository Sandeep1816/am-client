"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries/products";
import { useCart } from "@/hooks/useCart";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });
  const { addToCart } = useCart();

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading product</div>;

  const p = data.product;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-[360px] object-cover rounded"
          />
        ) : (
          <div className="h-72 bg-gray-100 flex items-center justify-center">
            No image
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <p className="mt-2 text-gray-700">{p.description}</p>
        <div className="mt-4 text-2xl font-semibold">₹{p.price}</div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => addToCart({ id: p.id, product: p, quantity: 1 })}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
