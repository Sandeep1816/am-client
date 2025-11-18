"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateProductMutation,
  useGetCategoriesQuery
} from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

// ---- Form Types ----
type CreateProductForm = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: string;
  categoryId: string;
  isFavourite: boolean;
};

export default function CreateProductPage() {
  const router = useRouter();
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories ?? [];

  const [preview, setPreview] = useState<string | null>(null);

  const [createProduct, { loading }] = useCreateProductMutation();

  // ---- Formik ----
  const formik = useFormik<CreateProductForm>({
    initialValues: {
      title: "",
      slug: "",
      description: "",
      imageUrl: "",
      price: "",
      stock: "",
      categoryId: "",
      isFavourite: false, // ⭐ DEFAULT
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      slug: Yup.string().required("Slug is required"),
      price: Yup.number()
        .min(1, "Price must be greater than 0")
        .required("Price is required"),
      stock: Yup.number()
        .min(0, "Stock cannot be negative")
        .required("Stock is required"),
      categoryId: Yup.string().required("Category is required"),
      imageUrl: Yup.string().required("Image is required"),
    }),

    onSubmit: async (values: CreateProductForm) => {
      try {
        await createProduct({
          variables: {
            data: {
              title: values.title,
              slug: values.slug,
              description: values.description,
              imageUrl: values.imageUrl,
              price: Number(values.price),
              stock: Number(values.stock),
              categoryId: values.categoryId,
              isFavourite: values.isFavourite, // ⭐ NEW FIELD
            }
          }
        });

        alert("Product created successfully!");
        router.push("/admin/products");
      } catch (err: any) {
        alert(err.message);
      }
    }
  });

  // ---- Cloudinary Upload ----
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const upload = await uploadToCloudinary(file);
    formik.setFieldValue("imageUrl", upload.secure_url);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

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

        {/* Price */}
        <div>
          <label className="block font-medium">Price (INR)</label>
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
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 rounded object-cover border"
            />
          )}

          {formik.errors.imageUrl && (
            <p className="text-red-500 text-sm">{formik.errors.imageUrl}</p>
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

        {/* ⭐ isFavourite Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFavourite"
            name="isFavourite"
            checked={formik.values.isFavourite}
            onChange={formik.handleChange}
            className="w-5 h-5"
          />
          <label htmlFor="isFavourite" className="font-medium">
            Mark as Favourite ⭐
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
