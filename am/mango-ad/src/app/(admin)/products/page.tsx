
import ProductsPage from "@/src/components/products/ProductsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Products | Avala Mangoes ",
  description: "",
};

export default function Exhibitors() {
  return <ProductsPage />;
}
