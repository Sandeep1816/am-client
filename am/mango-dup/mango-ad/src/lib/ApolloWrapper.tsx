"use client";

import { ApolloProvider } from "@apollo/client/react"; // ✅ correct
import client from "./apollo-client";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
