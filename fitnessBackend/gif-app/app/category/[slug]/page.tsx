"use client";

import { use, useState } from "react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/generated/graphql";
import BuyNowModal from "@/components/BuyNowModal";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: Props) {
  // Unwrap params (Next.js 16)
  const { slug } = use(params);

  const { data: categoriesData, loading: loadingCats } =
    useGetCategoriesQuery();
  const { data: productsData, loading: loadingProds } =
    useGetProductsQuery();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  console.log("Slug from URL:", slug);
  console.log("Categories:", categoriesData?.categories);

  if (loadingCats || loadingProds) return <p>Loading...</p>;

  // find category by slug
  const category = categoriesData?.categories?.find(
    (c) => c.slug === slug
  );

  if (!category) {
    return (
      <div className="p-10 text-center text-red-500">
        No such category found for slug: <b>{slug}</b>
      </div>
    );
  }

  // filter products by categoryId
  const filteredProducts = productsData?.products?.filter(
    (p) => p.categoryId === category.id
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

        {filteredProducts?.length === 0 && (
          <p className="text-gray-500">No products found for this category.</p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
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
                ₹{product.price}
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
