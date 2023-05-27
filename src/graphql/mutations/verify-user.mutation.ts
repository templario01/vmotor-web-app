import { gql } from "@apollo/client";

export interface VerifyUserArgs {
  code: string;
}

export interface VerifyUserResponse {
  verifyUser: {
    accessToken: string;
  };
}

export const VERIFY_USER = gql`
  mutation ($code: String!) {
    verifyUser(code: $code) {
      accessToken
    }
  }
`;
