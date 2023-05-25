import { gql } from "@apollo/client";
import { Vehicle } from "../queries/get-vehicles-by-advance-search.query";

export interface AddFavoriteVehicleInput {
  input: {
    vehicle: Pick<Vehicle, "uuid">;
  };
}

export interface AddFavoriteVehicleToUserResponse {
  addFavoriteVehicleToUser: Vehicle;
}

export const ADD_FAVORITE_VEHICLE_TO_USER = gql`
  mutation ($input: AddFavoriteVehicleInput!) {
    addFavoriteVehicleToUser(addFavoriteVehicleInput: $input) {
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
