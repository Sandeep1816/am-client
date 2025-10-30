"use client";

import Navbar from "@/components/Navbar";
import ProductsGrid from "@/components/AllProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">🛒 Our Products</h1>
        {/* <ProductsGrid /> */}
      </main>
    </div>
  );
}
