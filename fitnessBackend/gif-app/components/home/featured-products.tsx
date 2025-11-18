"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useGetProductsQuery } from "@/generated/graphql";

export default function FeaturedProducts() {
  const { data, loading, error } = useGetProductsQuery();

  if (loading) return <p className="p-6">Loading featured products...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load products</p>;

  // ⭐ Filter only favourite products
  const featuredProducts =
    data?.products?.filter((p) => p.isFavourite === true) ?? [];

  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Your Favourite Picks
            </h2>
            <p className="text-muted-foreground mt-2">Packed with love</p>
          </div>
          <button className="text-primary hover:text-accent font-semibold">
            View All →
          </button>
        </div>

        {/* If no favourite products */}
        {featuredProducts.length === 0 && (
          <p className="text-center text-gray-500">
            No featured products found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group"
            >
              {/* Image */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />

                <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-muted transition">
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-accent" />
                </button>

                {/* Badge (optional – you can map badge from DB if added later) */}
                <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-2">
                  {product.title}
                </h3>

                {/* Rating – for now fixed 5 stars */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">5.0</span>
                </div>

                {/* Price & Button */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    ₹{product.priceInr}
                  </span>
                  <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
