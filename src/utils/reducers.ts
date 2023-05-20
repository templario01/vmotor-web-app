import { authenticate, logout } from "./auth.utils";
import { User } from "./types/user.type";
import { produce } from "immer";

export type AuthActions =
  | {
      type: "login";
      token?: string;
    }
  | {
      type: "logout";
    };

export const authInitialState = authenticate();

export const AuthReducer = produce((state: User, action: AuthActions): User => {
  switch (action.type) {
    case "login":
      state = authenticate(action.token);
      return state;
    case "logout":
      state = logout();
      return state;
    default:
      return state;
  }
});
