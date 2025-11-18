import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      slug
      description
      imageUrl
      priceCents
      category {
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      title
      slug
      description
      imageUrl
      priceCents
      stock
      category {
        name
      }
    }
  }
`;
