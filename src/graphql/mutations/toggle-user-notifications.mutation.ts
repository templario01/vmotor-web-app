import { gql } from "@apollo/client";

export interface ToggleUserNotificationsResponse {
  toggleUserNotifications: {
    hasActiveNotifications: string;
  };
}

export const TOGGLE_NOTIFICATIONS = gql`
  mutation ($value: Boolean!) {
    toggleUserNotifications(hasActiveNotifications: $value) {
      hasActiveNotifications
    }
  }
`;
