import { CodegenConfig } from "@graphql-codegen/cli";

console.log("first", process.env.GRAPHQL_API_URL);

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_API_URL,
  documents: ["src/graphql/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher

  generates: {
    "./src/gql/generated.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-urql",
        "named-operations-object",
      ],
      config: {
        fetcher: fetch,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

export default config;
