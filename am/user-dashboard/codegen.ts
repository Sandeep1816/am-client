
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://am-backend-zwsm.onrender.com/graphql",
  documents: "./graphql/**/*.ts",
  generates: {
    "./gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
