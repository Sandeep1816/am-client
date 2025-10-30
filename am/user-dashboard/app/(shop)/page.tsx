"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import { ADD_TO_CART } from "@/graphql/mutations/cart";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function HomePage() {
  const { loading, data, error } = useQuery(GET_PRODUCTS);
  const [addToCart] = useMutation(ADD_TO_CART);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading products</div>;

  // ✅ Backend Cart Mutation
  const handleAddToCart = async (product: Product) => {
    try {
      const { data } = await addToCart({
        variables: {
          productId: product.id,
          quantity: 1,
        },
      });
      console.log("✅ Added to cart:", data);
      alert(`${product.name} added to cart`);
    } catch (err: any) {
      console.error("❌ Error adding to cart:", err.message);
      alert("Error adding to cart. Check console for details.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((p: Product) => (
          <ProductCard key={p.id} product={p} onAdd={() => handleAddToCart(p)} />
        ))}
      </div>
    </div>
  );
}
