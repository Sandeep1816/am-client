"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// ✅ Define your GraphQL endpoint
const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
  credentials: "include", // include cookies if needed for auth
});

// ✅ Create Apollo client instance
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
