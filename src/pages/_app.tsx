import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { RegisterProvider } from "../context/register.context";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { AuthProvider } from "../context/auth.context";

yup.setLocale({
  mixed: {
    required: "campo obligatorio",
    notType: "campo invalido o vacio",
  },
  string: {
    email: "correo invalido",
    min: "Este campo debe tener al menos {min} caracteres",
    max: "Este campo debe tener como máximo {max} caracteres",
  },
  number: {
    min: ({ min }) => `Este campo debe ser mayor o igual a ${min}`,
    max: ({ max }) => `Este campo debe ser menor o igual a ${max}`,
  },
});

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <RegisterProvider>
            <Component {...pageProps} />
          </RegisterProvider>
          <ToastContainer />
        </AuthProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
