"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import Button from "@/src/components/ui/button/Button"; // no curly braces


const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Int!
    $imageUrl: String!
    $stock: Int!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      imageUrl: $imageUrl
      stock: $stock
    ) {
      id
      name
      price
      stock
    }
  }
`;

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          name: formData.name,
          description: formData.description,
          price: parseInt(formData.price),
          imageUrl: formData.imageUrl,
          stock: parseInt(formData.stock),
        },
      });
      router.push("/(admin)/products");
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 max-w-2xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Create Product</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              rows={4}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Product"}
              </Button>
<Button
  type="button"
  variant="outline" // <-- change from "default" to "outline" or "primary"
  onClick={() => router.push("/(admin)/products")}
>
  Cancel
</Button>


            </div>

            {error && <p className="text-red-500">Error: {error.message}</p>}
          </form>
        </main>
      </div>
    </div>
  );
}
