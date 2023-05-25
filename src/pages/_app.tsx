"use client";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../../apollo-client";
import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { RegisterProvider } from "../context/register.context";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { AuthProvider } from "../context/auth.context";
import { VehiclesProvider } from "../context/vehicles.context";

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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <VehiclesProvider>
        <AuthProvider>
          <RegisterProvider>
            <Component {...pageProps} />
          </RegisterProvider>
          <ToastContainer />
        </AuthProvider>
      </VehiclesProvider>
    </ApolloProvider>
  );
}
