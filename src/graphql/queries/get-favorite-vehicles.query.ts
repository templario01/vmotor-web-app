import { gql } from "@apollo/client";

export const GET_FAVORITE_VEHICLES = gql`
  query {
    getFavoriteVehicles {
      nodes {
        uuid
        url
        name
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