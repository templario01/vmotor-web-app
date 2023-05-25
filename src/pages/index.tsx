"use client";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import NabBar from "../app/components/NavBar";
import { Banner } from "../app/components/Banner";
import SearchSection, {
  cities,
  conditionVehicles,
} from "../app/components/search/SearchSection";
import { useApolloClient } from "@apollo/client";
import { Card, VehicleProps } from "../app/components/Card";
import { useContext, useRef, useState } from "react";
import {
  GET_VEHICLES_BY_ADVANCE_SEARCH,
  GetVehicleCondition,
  GetVehiclesByAdvanceSearchRequest,
  GetVehiclesResponse,
  Vehicle,
} from "../graphql/queries/get-vehicles-by-advance-search.query";
import { GET_RECOMMENDED_VEHICLES } from "../graphql/queries/get-recommended-vehicles.query";
import { GET_FAVORITE_VEHICLES } from "../graphql/queries/get-favorite-vehicles.query";
import { toast } from "react-toastify";
import { errorProps } from "../utils/alert.utils";
import { ToastAlert } from "../app/components/ToastAlert";
import { useAuthState } from "../context/auth.context";
import {
  VehiclesContext,
  VehiclesContextType,
} from "../context/vehicles.context";
import { Footer } from "../app/components/Footer";

export default function Home() {
  const [request, setRequest] = useState<GetVehiclesByAdvanceSearchRequest>({
    searchName: "",
    condition: GetVehicleCondition.ALL,
  });
  const client = useApolloClient();
  const listing = useRef(null);
  const auth = useAuthState();
  const { vehicles, setVehicles } = useContext(
    VehiclesContext
  ) as VehiclesContextType;

  const handleSearch = (e: any) => {
    setRequest(() => ({ ...request, searchName: e.target.value }));
  };

  const scrollToSection = (elementRef: any) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout>
      <NabBar />
      <Banner />
      <Image
        alt="Vehicles"
        src="https://es.chrysler.com/content/dam/fca-brands/na/chrysler/en_us/2023/300c/desktop/2023-chrysler-BM-VLP-300c-hero-perfnlux.jpg"
        className="w-full md:h-auto h-3/4"
        width={1000}
        height={1000}
        priority
      />

      <SearchSection
        onChange={handleSearch}
        handleChangeCity={(e: any) => {
          const key = e.target.value;
          setRequest(() => ({ ...request, city: cities[key] }));
        }}
        handleChangeCondition={(e: any) => {
          const condition = conditionVehicles.find(
            (condition) => condition.key === e.target.value
          )?.key as GetVehicleCondition;
          setRequest(() => ({
            ...request,
            condition: GetVehicleCondition[condition],
          }));
        }}
        handleClickFavorites={async () => {
          try {
            if (!auth?.isAuthenticated) {
              throw new Error(
                "Necesitas estar registrado para usar esta funcionalidad"
              );
            }
            const { data } = await client.query<
              GetVehiclesResponse<"getFavoriteVehicles">
            >({
              query: GET_FAVORITE_VEHICLES,
            });

            scrollToSection(listing);
            setVehicles(data?.getFavoriteVehicles?.nodes);
          } catch (error) {
            toast.error(<ToastAlert error={error} />, errorProps);
          }
        }}
        handleClickRecommended={async () => {
          try {
            if (!auth?.isAuthenticated) {
              throw new Error(
                "Necesitas estar registrado para usar esta funcionalidad"
              );
            }
            const { data } = await client.query<
              GetVehiclesResponse<"getRecommendedVehicles">
            >({
              query: GET_RECOMMENDED_VEHICLES,
            });

            scrollToSection(listing);
            setVehicles(data?.getRecommendedVehicles?.nodes);
          } catch (error) {
            toast.error(<ToastAlert error={error} />, errorProps);
          }
        }}
        onClick={async () => {
          const { data } = await client.query<
            GetVehiclesResponse<"getVehiclesByAdvancedSearch">
          >({
            query: GET_VEHICLES_BY_ADVANCE_SEARCH,
            variables: request,
          });

          scrollToSection(listing);
          setVehicles(data?.getVehiclesByAdvancedSearch?.nodes);
        }}
      />

      <div className="listing container mx-auto w-full min-h-card h-auto" ref={listing}>
        <div className="w-full flex flex-col items-center gap-4">
          {vehicles !== undefined &&
            vehicles.map((vehicle: Vehicle, index) => {
              const vehicleProps: VehicleProps = {
                ...vehicle,
                updatedAt: new Date(vehicle?.updatedAt as string),
                website: vehicle.website?.name,
                index,
              }
              return <Card key={index} vehicle={vehicleProps} />;
            })}
        </div>
      </div>
      <Footer/>
    </MainLayout>
  );
}
