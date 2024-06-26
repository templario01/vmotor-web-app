import { gql } from "@apollo/client";

export const GET_GENERAL_RECOMMENDED_VEHICLES = gql`
  query {
	getGeneralRecommendedVehicles{
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
`;