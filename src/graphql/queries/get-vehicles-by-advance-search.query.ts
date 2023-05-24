import { gql } from "@apollo/client";

export enum GetVehicleCondition {
  "ALL" = "ALL",
  "NEW" = "NEW",
  "USED" = "USED",
}

export interface Website {
  name?: string;
  uuid?: string;
  url?: string;
}

export interface Vehicle {
  uuid?: string;
  url?: string;
  externalId?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  frontImage?: string;
  images?: string;
  createdAt?: string;
  updatedAt?: string;
  location?: string;
  mileage?: number;
  condition?: GetVehicleCondition;
  year?: number;
  status?: string;
  currency?: string;
  website?: Website;
}

export interface GetVehiclesByAdvanceSearchRequest {
  take?: number;
  after?: string;
  searchName?: string;
  city?: string;
  condition?: GetVehicleCondition;
}

export type GetVehiclesResponse<T extends string> = {
  [K in T]: {
    nodes?: Vehicle[];
    totalCount?: number;
    endCursor?: string;
    edges?: {
      nodes?: Vehicle[];
      cursor?: string;
    };
  };
};

export const GET_VEHICLES_BY_ADVANCE_SEARCH = gql`
  query (
    $searchName: String
    $city: String
    $condition: GetVehicleCondition
    $take: Int
    $after: String
  ) {
    getVehiclesByAdvancedSearch(
      searchName: $searchName
      city: $city
      condition: $condition
      take: $take
      after: $after
    ) {
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
