import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "./src/gql_generated/": {
      preset: "client",      // modern client preset
      plugins: [],           // no extra plugins needed
      presetConfig: {
        gqlTagName: "gql",   // use `gql` for tagged queries
      },
    },
  },
};

export default config;
