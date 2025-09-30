"use client";

import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/src/components/layout/Sidebar";
import { Button } from "@/src/components/ui/Button";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $name: String!, $description: String!, $price: Float!) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
    }
  }
`;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data, loading } = useQuery(GET_PRODUCT, { variables: { id } });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    if (data?.product) {
      setForm({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price.toString(),
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct({
      variables: {
        id,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
      },
    });
    router.push("/products");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Update
          </Button>
        </form>
      </main>
    </div>
  );
}
