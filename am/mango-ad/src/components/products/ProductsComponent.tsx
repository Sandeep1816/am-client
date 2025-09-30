"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GetProductsDocument,
  UpdateProductDocument,
  CreateProductDocument,
  DeleteProductDocument,
  ProductModel,
} from "@/src/gql_generated/graphql";
import ProductsModal from "@/src/components/modals/productsModal";
import EntityTable from "@/src/components/ui/table";
import Button from "@/src/components/ui/button/Button";

export default function ProductsPage() {
  const { data, loading } = useQuery(GetProductsDocument);

  const [deleteProduct] = useMutation(DeleteProductDocument, {
    refetchQueries: [{ query: GetProductsDocument }],
  });

  const [createProduct] = useMutation(CreateProductDocument, {
    refetchQueries: [{ query: GetProductsDocument }],
  });

  const [updateProduct] = useMutation(UpdateProductDocument, {
    refetchQueries: [{ query: GetProductsDocument }],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | undefined>(undefined);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => {
            setSelectedProduct(undefined);
            setIsModalOpen(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      {/* Table */}
      <EntityTable<ProductModel>
        title="Products"
        data={data?.products || []}
        columns={[
          {
            key: "name",
            label: "Product",
            type: "avatar", // shows avatar + subtext
            subTextKey: "description",
          },
          { key: "price", label: "Price", type: "text" },
          { key: "stock", label: "Stock", type: "text" },
          { key: "createdAt", label: "Created At", type: "date" },
          { key: "updatedAt", label: "Updated At", type: "date" },
          {
            key: "actions",
            label: "Actions",
            type: "custom",
            render: (product) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this product?")) {
                      await deleteProduct({ variables: { id: product.id } });
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
      />

      {/* Modal */}
      {isModalOpen && (
        <ProductsModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
