"use client";
import React, {
  Dispatch,
  FC,
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthActions, AuthReducer, authInitialState } from "../utils/reducers";
import { User } from "../utils/types/user.type";

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthStateContext = createContext<User>(authInitialState);

export const AuthDispatchContext = createContext<Dispatch<AuthActions>>(
  () => undefined
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, authInitialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }

  return context;
};
