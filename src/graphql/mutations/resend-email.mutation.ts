import { gql } from "@apollo/client";

export interface ResendEmailArgs {
  email: string;
}

export interface ResendEmailResponse {
  resendEmail: {
    message: string;
    expirationTime: string;
  };
}

export const RESEND_EMAIL = gql`
  mutation ($email: String!) {
    resendEmail(email: $email) {
      message
      expirationTime
    }
  }
`;
