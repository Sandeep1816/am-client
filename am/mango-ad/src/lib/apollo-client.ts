// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
//   cache: new InMemoryCache(),
// });

// export default client;



// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  }),
  cache: new InMemoryCache(),
});

export default client;

