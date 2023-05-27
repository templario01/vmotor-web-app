import { gql } from "@apollo/client";

export interface SignUpInput {
  input: {
    email: string;
    password: string;
  };
}

export interface SignUpResponse {
  signIn: {
    message: string;
    expirationTime: Date;
  };
}

export const SIGN_UP = gql`
  mutation ($input: SignUpInput!) {
    signUp(signUpInput: $input) {
      message
      expirationTime
    }
  }
`;
