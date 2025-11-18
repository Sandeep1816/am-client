"use client";

import { useGetProductQuery } from "@/generated/graphql";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductPage() {
  const { slug } = useParams();

  const { data, loading, error } = useGetProductQuery({
    variables: { id: slug as string },  
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  if (!data?.product) return <p>Product not found</p>;

  const product = data.product;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-10">

        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-xl font-semibold mt-4">
            {(product.price / 100).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <p className="mt-2 text-gray-500">
            Category ID: {product.categoryId || "None"}
          </p>
        </div>

      </div>
    </main>
  );
}
