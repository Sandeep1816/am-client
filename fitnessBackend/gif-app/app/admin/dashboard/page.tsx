"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useDeleteProductMutation,
} from "@/generated/graphql";

export default function AdminDashboard() {
  const { data: productsData } = useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const products = productsData?.products ?? [];
  const totalProducts = products.length;
  const totalCategories = categoriesData?.categories?.length ?? 0;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct({ variables: { id } });
      alert("Product deleted");
      window.location.reload();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
          <p className="text-4xl font-bold mt-3 text-blue-600">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Categories</h2>
          <p className="text-4xl font-bold mt-3 text-green-600">{totalCategories}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">New Features</h2>
          <p className="text-xl font-medium mt-3 text-gray-500">Coming soon...</p>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Products</h2>

        {totalProducts === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Image</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.slice(0, 5).map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="p-3">
                    <Image
                      src={p.imageUrl || "/placeholder.png"}
                      alt={p.title}
                      width={60}
                      height={60}
                      className="rounded object-cover border"
                    />
                  </td>

                  {/* Title + Slug */}
                  <td className="p-3">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-gray-500">{p.slug}</p>
                  </td>

                  {/* Price */}
                  <td className="p-3 font-medium text-blue-700">
                    ₹{(p.price / 100).toLocaleString("en-IN")}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right flex items-center gap-4 justify-end">

                    {/* Edit */}
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
