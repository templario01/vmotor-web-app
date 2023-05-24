import { gql } from "@apollo/client";

export const GET_RECOMMENDED_VEHICLES = gql`
  query {
    getRecommendedVehicles {
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
