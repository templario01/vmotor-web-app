import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const url = process.env.NEXT_PUBLIC_API_URL;

const httpLink = new HttpLink({ uri: `${url}/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "ngrok-skip-browser-warning": "69420",
    },
  });

  return forward(operation);
});

export const apolloCache = new InMemoryCache({ resultCacheMaxSize: 1 });
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: apolloCache,
  defaultOptions,
});
