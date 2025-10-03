/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Signup($name: String!, $email: String!, $password: String!) {\n    signup(name: $name, email: $email, password: $password)\n  }\n": typeof types.SignupDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password)\n  }\n": typeof types.LoginDocument,
    "\n  mutation AddToCart($productId: String!, $quantity: Int!) {\n    addToCart(productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n": typeof types.AddToCartDocument,
    "\n  mutation RemoveFromCart($cartItemId: String!) {\n    removeFromCart(cartItemId: $cartItemId)\n  }\n": typeof types.RemoveFromCartDocument,
    "\n  query GetCart {\n    cart {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProductById($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductByIdDocument,
};
const documents: Documents = {
    "\n  mutation Signup($name: String!, $email: String!, $password: String!) {\n    signup(name: $name, email: $email, password: $password)\n  }\n": types.SignupDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password)\n  }\n": types.LoginDocument,
    "\n  mutation AddToCart($productId: String!, $quantity: Int!) {\n    addToCart(productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n": types.AddToCartDocument,
    "\n  mutation RemoveFromCart($cartItemId: String!) {\n    removeFromCart(cartItemId: $cartItemId)\n  }\n": types.RemoveFromCartDocument,
    "\n  query GetCart {\n    cart {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n": types.GetCartDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProductById($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Signup($name: String!, $email: String!, $password: String!) {\n    signup(name: $name, email: $email, password: $password)\n  }\n"): (typeof documents)["\n  mutation Signup($name: String!, $email: String!, $password: String!) {\n    signup(name: $name, email: $email, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password)\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddToCart($productId: String!, $quantity: Int!) {\n    addToCart(productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddToCart($productId: String!, $quantity: Int!) {\n    addToCart(productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFromCart($cartItemId: String!) {\n    removeFromCart(cartItemId: $cartItemId)\n  }\n"): (typeof documents)["\n  mutation RemoveFromCart($cartItemId: String!) {\n    removeFromCart(cartItemId: $cartItemId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart {\n    cart {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    cart {\n      id\n      quantity\n      product {\n        id\n        name\n        price\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductById($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetProductById($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;