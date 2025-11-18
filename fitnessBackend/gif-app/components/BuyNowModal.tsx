"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function BuyNowModal({ product, onClose }: any) {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
      .required("Phone is required"),
    message: Yup.string().min(10, "Minimum 10 chars").required("Message required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          productTitle: product.title,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data);
        alert("Failed to submit order");
        return;
      }

      alert("Order submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Network Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Buy: {product.title}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">

            <div>
              <label className="font-medium">Name</label>
              <Field name="name" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <Field name="email" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-medium">Phone</label>
              <Field name="phone" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-medium">Message</label>
              <Field
                name="message"
                as="textarea"
                className="w-full p-2 border rounded-lg h-24"
              />
              <ErrorMessage name="message" component="p" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Submit Order
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 mt-2"
            >
              Cancel
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}
