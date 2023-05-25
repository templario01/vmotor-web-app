"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export enum CurrentFormEnum {
  "REGISTER" = "REGISTER",
  "CONFIRMATION" = "CONFIRMATION",
}

export type RegisterContextType = {
  currentForm: CurrentFormEnum;
  setCurrentForm: Dispatch<SetStateAction<CurrentFormEnum>>;
};

export const RegisterContext = createContext<RegisterContextType | null>(null);

export const RegisterProvider = ({ children }: any) => {
  const [currentForm, setCurrentForm] = useState<CurrentFormEnum>(
    CurrentFormEnum.REGISTER
  );

  return (
    <RegisterContext.Provider
      value={{
        currentForm,
        setCurrentForm,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
