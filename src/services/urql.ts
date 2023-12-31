import { Client, cacheExchange, fetchExchange } from "urql";

export const urqlClient = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
