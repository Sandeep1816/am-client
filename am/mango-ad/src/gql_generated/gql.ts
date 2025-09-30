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
    "mutation CreateProduct($name: String!, $description: String!, $price: Int!, $imageUrl: String!, $stock: Int!) {\n  createProduct(\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}": typeof types.CreateProductDocument,
    "mutation DeleteProduct($id: String!) {\n  deleteProduct(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteProductDocument,
    "mutation UpdateProduct($id: String!, $name: String, $description: String, $price: Int, $imageUrl: String, $stock: Int) {\n  updateProduct(\n    id: $id\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}": typeof types.UpdateProductDocument,
    "query GetProducts {\n  products {\n    id\n    name\n    description\n    price\n    imageUrl\n    stock\n    createdAt\n    updatedAt\n  }\n}": typeof types.GetProductsDocument,
    "query GetProduct($id: String!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    createdAt\n    updatedAt\n    imageUrl\n    stock\n  }\n}": typeof types.GetProductDocument,
};
const documents: Documents = {
    "mutation CreateProduct($name: String!, $description: String!, $price: Int!, $imageUrl: String!, $stock: Int!) {\n  createProduct(\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}": types.CreateProductDocument,
    "mutation DeleteProduct($id: String!) {\n  deleteProduct(id: $id) {\n    id\n    name\n  }\n}": types.DeleteProductDocument,
    "mutation UpdateProduct($id: String!, $name: String, $description: String, $price: Int, $imageUrl: String, $stock: Int) {\n  updateProduct(\n    id: $id\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}": types.UpdateProductDocument,
    "query GetProducts {\n  products {\n    id\n    name\n    description\n    price\n    imageUrl\n    stock\n    createdAt\n    updatedAt\n  }\n}": types.GetProductsDocument,
    "query GetProduct($id: String!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    createdAt\n    updatedAt\n    imageUrl\n    stock\n  }\n}": types.GetProductDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateProduct($name: String!, $description: String!, $price: Int!, $imageUrl: String!, $stock: Int!) {\n  createProduct(\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}"): (typeof documents)["mutation CreateProduct($name: String!, $description: String!, $price: Int!, $imageUrl: String!, $stock: Int!) {\n  createProduct(\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteProduct($id: String!) {\n  deleteProduct(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteProduct($id: String!) {\n  deleteProduct(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateProduct($id: String!, $name: String, $description: String, $price: Int, $imageUrl: String, $stock: Int) {\n  updateProduct(\n    id: $id\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}"): (typeof documents)["mutation UpdateProduct($id: String!, $name: String, $description: String, $price: Int, $imageUrl: String, $stock: Int) {\n  updateProduct(\n    id: $id\n    name: $name\n    description: $description\n    price: $price\n    imageUrl: $imageUrl\n    stock: $stock\n  ) {\n    id\n    name\n    price\n    stock\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProducts {\n  products {\n    id\n    name\n    description\n    price\n    imageUrl\n    stock\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetProducts {\n  products {\n    id\n    name\n    description\n    price\n    imageUrl\n    stock\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProduct($id: String!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    createdAt\n    updatedAt\n    imageUrl\n    stock\n  }\n}"): (typeof documents)["query GetProduct($id: String!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    createdAt\n    updatedAt\n    imageUrl\n    stock\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;