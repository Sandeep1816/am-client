"use client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").positive(),
  stock: Yup.number().required("Stock is required").integer().min(0),
  imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
})

export default function ProductForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
      }}
      validationSchema={ProductSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values)
        resetForm()
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 bg-white shadow p-6 rounded-lg">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Field name="title" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <Field name="description" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <Field type="number" name="price" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <Field type="number" name="stock" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <Field name="imageUrl" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </button>
        </Form>
      )}
    </Formik>
  )
}
