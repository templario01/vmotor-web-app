import { gql } from "@apollo/client";

export interface SignInInput {
  input: {
    email: string;
    password: string;
  };
}

export interface SignInResponse {
  signIn: {
    accessToken: string;
  };
}

export const SIGN_IN = gql`
  mutation ($input: SignInInput!) {
    signIn(signInInput: $input) {
      accessToken
    }
  }
`;
