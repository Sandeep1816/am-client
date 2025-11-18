"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} from "@/generated/graphql";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";

type EditProductForm = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: string;
  categoryId: string;
  isFavourite: boolean; // ✅ Correct spelling to match backend
};

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  // Fetch categories
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories ?? [];

  // Fetch existing product
  const { data, loading: productLoading } = useGetProductQuery({
    variables: { id: id as string },
  });

  const [updateProduct, { loading: updating }] = useUpdateProductMutation();
  const [preview, setPreview] = useState<string | null>(null);

  // ---------- Formik ----------
  const formik = useFormik<EditProductForm>({
    initialValues: {
      title: "",
      slug: "",
      description: "",
      imageUrl: "",
      price: "",
      stock: "",
      categoryId: "",
      isFavourite: false,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      slug: Yup.string().required("Slug is required"),
      price: Yup.number().min(1).required("Price is required"),
      stock: Yup.number().min(0).required("Stock is required"),
      categoryId: Yup.string().required("Category is required"),
      imageUrl: Yup.string().required("Image is required"),
    }),

    onSubmit: async (values) => {
      try {
        await updateProduct({
          variables: {
            id: id as string,
            data: {
              title: values.title,
              slug: values.slug,
              description: values.description,
              imageUrl: values.imageUrl,
              price: Number(values.price),
              stock: Number(values.stock),
              categoryId: values.categoryId,
              isFavourite: values.isFavourite, // ⭐ Save Favourite state
            },
          },
        });

        alert("Product updated successfully!");
        router.push("/admin/products");
      } catch (err: any) {
        alert(err.message);
      }
    },
  });

  // ---------- Fill form when product loads ----------
  useEffect(() => {
    if (data?.product) {
      formik.setValues({
        title: data.product.title,
        slug: data.product.slug,
        description: data.product.description || "",
        imageUrl: data.product.imageUrl || "",
        price: data.product.price.toString(),
        stock: data.product.stock.toString(),
        categoryId: data.product.categoryId || "",
        isFavourite: data.product.isFavourite ?? false, // ⭐ Load favourite value
      });

      setPreview(data.product.imageUrl || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ---------- Cloudinary Upload ----------
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const upload = await uploadToCloudinary(file);
    formik.setFieldValue("imageUrl", upload.secure_url);
  };

  if (productLoading) return <p className="p-6">Loading product...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            name="title"
            className="border p-2 w-full rounded"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium">Slug</label>
          <input
            name="slug"
            className="border p-2 w-full rounded"
            value={formik.values.slug}
            onChange={formik.handleChange}
          />
        </div>

        {/* Price (INR) */}
        <div>
          <label className="block font-medium">Price (in INR)</label>
          <input
            name="price"
            type="number"
            className="border p-2 w-full rounded"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            className="border p-2 w-full rounded"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="border p-2 w-full rounded"
          />

          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={120}
              height={120}
              className="mt-3 rounded border object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            className="border p-2 w-full rounded"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="categoryId"
            className="border p-2 w-full rounded"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.slug})
              </option>
            ))}
          </select>
        </div>

        {/* ⭐ Favourite Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFavourite"
            name="isFavourite"
            className="w-5 h-5"
            checked={formik.values.isFavourite}
            onChange={formik.handleChange}
          />
          <label htmlFor="isFavourite" className="font-medium">
            Mark as Favourite ⭐
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
