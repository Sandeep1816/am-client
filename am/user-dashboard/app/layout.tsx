"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import { CartProvider } from "@/app/contexts/CartContext";  // 👈 import your CartProvider
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        {/* Wrap ApolloProvider + CartProvider */}
        <ApolloProvider client={client}>
          <CartProvider>
            {children}
          </CartProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
