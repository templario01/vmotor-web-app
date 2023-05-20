"use client"
import jwtDecode from "jwt-decode";
import { DecodedJwt, User } from "./types/user.type";

const TOKEN_KEY = "token";

const defaultUser: User = {
  email: "",
  isAuthenticated: false,
  token: "",
  id: -1,
};

const setToken = (token: string) => {
  console.log(token)
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const getToken = () => {
  console.log('trying get token...')
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY) || null;
  }
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const authenticate = (token?: string): User => {
  if (token) {
    setToken(token);
  }

  const _token = token ?? getToken();

  if (!_token) {
    return { ...defaultUser };
  }

  const decoded = <DecodedJwt>jwtDecode(_token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    removeToken();
    return { ...defaultUser };
  }

  return {
    email: decoded.username,
    isAuthenticated: true,
    id: decoded.sub,
    token: _token,
  };
};

export const logout = (): User => {
  removeToken();

  return { ...defaultUser };
};
