"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import {
  CreateProductDocument,
  UpdateProductDocument,
  GetProductsDocument,
  ProductModel,
} from "@/src/gql_generated/graphql";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/forms/input/InputField";
import Label from "@/src/components/forms/Label";

interface ProductsModalProps {
  product?: ProductModel;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Price is required"),
  stock: Yup.number().typeError("Must be a number").min(0, "Stock cannot be negative"),
  imageUrl: Yup.string().url("Must be a valid URL").nullable(),
});

const ProductsModal: React.FC<ProductsModalProps> = ({ product, onClose }) => {
  const [createProduct] = useMutation(CreateProductDocument, {
    refetchQueries: [{ query: GetProductsDocument }],
    onCompleted: () => onClose(),
    onError: (error) => console.error("Create error:", error.message),
  });

  const [updateProduct] = useMutation(UpdateProductDocument, {
    refetchQueries: [{ query: GetProductsDocument }],
    onCompleted: () => onClose(),
    onError: (error) => console.error("Update error:", error.message),
  });

  const formik = useFormik({
    initialValues: {
      id: product?.id || "",
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      imageUrl: product?.imageUrl || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const { id, ...input } = values;
      if (id) {
        await updateProduct({ variables: { id, ...input } });
      } else {
        await createProduct({ variables: input });
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <Label>Product Name *</Label>
            <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description *</Label>
            <Input
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <Label>Price *</Label>
            <Input
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <Label>Stock</Label>
            <Input
              name="stock"
              type="number"
              value={formik.values.stock}
              onChange={formik.handleChange}
            />
            {formik.errors.stock && formik.touched.stock && (
              <p className="text-red-500 text-sm">{formik.errors.stock}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <Label>Image URL</Label>
            <Input
              name="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
            />
            {formik.errors.imageUrl && formik.touched.imageUrl && (
              <p className="text-red-500 text-sm">{formik.errors.imageUrl}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update" : "Create"} Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsModal;
