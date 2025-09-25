"use client";

import Sidebar from "@/src/components/Sidebar";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import client from "@/src/lib/apollo-client";   // ✅ reuse existing client
import { gql } from "@apollo/client";
import { GetProductsQuery } from "@/src/gql_generated/graphql";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<GetProductsQuery["products"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await client.query<GetProductsQuery>({
          query: gql`
            query GetProducts {
              products {
                id
                name
                description
                price
              }
            }
          `,
        });
        setProducts(data?.products ?? []); // ✅ safe
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      await client.mutate({
        mutation: gql`
          mutation DeleteProduct($id: ID!) {
            deleteProduct(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      });
      router.refresh();
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link href="/products/create">
            <Button>+ Create Product</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-md">
              <h2 className="font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
              <Button
                onClick={() => handleDelete(product.id)}
                className="mt-2 bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
