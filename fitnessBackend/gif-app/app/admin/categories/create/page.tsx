"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateCategoryMutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";

// ---- Category Form Type ----
type CreateCategoryForm = {
  name: string;
  slug: string;
};

export default function CreateCategoryPage() {
  const router = useRouter();
  const [createCategory, { loading }] = useCreateCategoryMutation();

  // ---- Auto Slug Function ----
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
      .replace(/\s+/g, "-"); // convert spaces to hyphens
  };

  // ---- Formik ----
  const formik = useFormik<CreateCategoryForm>({
    initialValues: {
      name: "",
      slug: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      slug: Yup.string().required("Slug is required")
    }),

    onSubmit: async (values: CreateCategoryForm) => {
      try {
        await createCategory({
          variables: {
            data: {
              name: values.name,
              slug: values.slug
            }
          }
        });

        alert("Category created successfully!");
        router.push("/admin/categories");
      } catch (err: any) {
        alert(err.message);
      }
    }
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create Category</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Category Name */}
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            name="name"
            type="text"
            className="border p-2 w-full rounded"
            value={formik.values.name}
            onChange={(e) => {
              const nameValue = e.target.value;
              formik.setFieldValue("name", nameValue);
              formik.setFieldValue("slug", generateSlug(nameValue)); // auto update slug
            }}
          />
          {formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium">Slug</label>
          <input
            name="slug"
            type="text"
            className="border p-2 w-full rounded"
            value={formik.values.slug}
            onChange={(e) => formik.handleChange(e)} // allow manual edit
          />
          {formik.errors.slug && (
            <p className="text-red-500 text-sm">{formik.errors.slug}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>

      </form>
    </div>
  );
}
