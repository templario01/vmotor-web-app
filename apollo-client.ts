import {
  ApolloClient,
  ApolloLink,
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
    },
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ resultCaching: false }),
});
