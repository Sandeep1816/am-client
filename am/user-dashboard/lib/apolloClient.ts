// "use client";

// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
//   credentials: "include"
// });

// export const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql", // replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});
