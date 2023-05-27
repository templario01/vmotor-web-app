import { gql } from "@apollo/client";
import { Vehicle } from "../queries/get-vehicles-by-advance-search.query";

export interface DeleteFavoriteVehicleInput {
  input: {
    vehicle: Pick<Vehicle, "uuid">;
  };
}

export interface DeleteFavoriteVehicleToUserResponse {
  deleteFavoriteVehicleToUser: Vehicle[];
}

export const DELETE_FAVORITE_VEHICLE_TO_USER = gql`
  mutation ($input: DeleteFavoriteVehicleInput!) {
    deleteFavoriteVehicleToUser(deleteFavoriteVehicleInput: $input) {
      uuid
      url
      externalId
      description
      price
      originalPrice
      frontImage
      images
      createdAt
      updatedAt
      location
      mileage
      condition
      year
      status
      currency
      website {
        name
        uuid
        url
      }
    }
  }
`;
