"use client"
import ProductForm from "@/src/components/forms/productForm"

export default function CreateProductPage() {
  const handleCreateProduct = async (values: any) => {
    console.log("Form submitted:", values)
    // 🔥 Here you will call your GraphQL mutation `createProduct`
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create New Product</h1>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  )
}
