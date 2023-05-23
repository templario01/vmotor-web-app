"use client";
import { Fragment, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import {
  SIGN_IN,
  SignInInput,
  SignInResponse,
} from "../../graphql/mutations/sign-in.mutation";
import * as yup from "yup";
import { toast } from "react-toastify";
import { errorProps } from "../../utils/alert.utils";
import { ToastAlert } from "../../app/components/ToastAlert";
import { useAuthDispatch, useAuthState } from "../../context/auth.context";
import { useRouter } from "next/router";

const AuthLayout = ({ children }: any) => {
  return (
    <section className=" bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">{children}</div>
        </div>
      </div>
    </section>
  );
};

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignInForm = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const authDispatch = useAuthDispatch();
  const auth = useAuthState();
  const router = useRouter();
  const [signIn, { loading }] = useMutation<SignInResponse, SignInInput>(
    SIGN_IN
  );

  useEffect(() => {
    console.log(auth);
    if (auth.isAuthenticated) {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async (e: any) => {
    try {
      e.preventDefault();
      await registerSchema.validate(form, { abortEarly: false });
      const { data } = await signIn({
        variables: {
          input: form,
        },
      });

      authDispatch({ type: "login", token: data?.signIn.accessToken });
      router.reload()
      router.push("/home");
    } catch (error) {
      toast.error(<ToastAlert error={error} />, errorProps);
    }
  };

  return (
    <Fragment>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Iniciar Sesión
      </h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 f
            ocus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="you@mail.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                   py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-red-600"
          onClick={handleSignIn}
        >
          Iniciar Sesión
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          ¿Aún no tienes una cuenta?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Crea una cuenta
          </Link>
        </p>
      </form>
    </Fragment>
  );
};

export default function SignIn() {
  return (
    <MainLayout>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </MainLayout>
  );
}
