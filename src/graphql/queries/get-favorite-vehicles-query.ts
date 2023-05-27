import { gql } from "@apollo/client";

export const GET_RFAVORITE_VEHICLES = gql`
  query {
    getFavoriteVehicles(take: 1000) {
      nodes {
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
  }
`;
