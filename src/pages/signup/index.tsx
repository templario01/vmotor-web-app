"use client";
import { Fragment, useContext, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import {
  CurrentFormEnum,
  RegisterContext,
  RegisterContextType,
} from "../../context/register.context";
import * as yup from "yup";
import { toast } from "react-toastify";
import { errorProps } from "../../utils/alert.utils";
import { ToastAlert } from "../../app/components/ToastAlert";

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

const ValitadionForm = () => {
  return (
    <Fragment>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Confirmar Correo Electrónico
      </h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <p className="text-sm text-slate-400 mb-4">
            Hemos enviado un código de verificación de cuatro dígitos a la
            dirección de correo electronico que proporcionaste. El código es
            válido por 1 hora.
          </p>
          <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            Código de verificación:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="00000"
          />
          <div className="mt-3 text-sm">
            <label className="font-light text-gray-500 dark:text-gray-300">
              ¿No recibiste ningún código?{" "}
              <Link
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Reenviar Código
              </Link>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                   py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-red-600"
        >
          Verificar Correo
        </button>
      </form>
    </Fragment>
  );
};

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
});

export const RegisterForm = () => {
  const { setCurrentForm } = useContext(RegisterContext) as RegisterContextType;
  const [form, setForm] = useState<{
    email: string;
    password: string;
    passwordConfirmation: string;
  }>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isCheckedTermsAndCond, setIsCheckedTermsAndCond] = useState(false);

  const handleRegisterButtom = async (e: any) => {
    try {
      e.preventDefault();

      await registerSchema.validate(form, { abortEarly: false });
      if (form.password !== form.passwordConfirmation) {
        throw new Error("Las contraseñas no coinciden");
      }
      if (!isCheckedTermsAndCond) {
        throw new Error("Por favor acepta los términos y condiciones");
      }
      setCurrentForm(CurrentFormEnum.CONFIRMATION);
    } catch (error) {
      toast.error(<ToastAlert error={error} />, errorProps);
    }
  };

  return (
    <Fragment>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Registrarme
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
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
            ocus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, passwordConfirmation: e.target.value })
            }
          />
        </div>
        <div className="flex items-start">
          <div className="flex ite}ms-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700
               dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              onChange={(e: any) => setIsCheckedTermsAndCond(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-light text-gray-500 dark:text-gray-300">
              I accept the{" "}
              <a
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                   py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-red-600"
          onClick={handleRegisterButtom}
        >
          Crear Cuenta
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </a>
        </p>
      </form>
    </Fragment>
  );
};

export default function SignUp() {
  const { currentForm } = useContext(RegisterContext) as RegisterContextType;

  return (
    <MainLayout>
      <AuthLayout>
        {currentForm === CurrentFormEnum.REGISTER ? (
          <RegisterForm />
        ) : (
          <ValitadionForm />
        )}
      </AuthLayout>
    </MainLayout>
  );
}
