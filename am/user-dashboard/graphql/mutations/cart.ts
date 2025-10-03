import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      quantity
      product {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartItemId: String!) {
    removeFromCart(cartItemId: $cartItemId)
  }
`;
