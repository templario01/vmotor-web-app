"use client";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import NabBar from "../app/components/NavBar";
import SearchSection, {
  cities,
  conditionVehicles,
} from "../app/components/search-section/SearchSection";
import { useApolloClient } from "@apollo/client";
import { Card, VehicleProps } from "../app/components/Card";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
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
import RecommendedSection from "../app/components/recommended-section/RecommendedSection";
import { GET_GENERAL_RECOMMENDED_VEHICLES } from "../graphql/queries/get-general-recommended-vehicles";

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
  const [favoriteVehicles, setFavoriteVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedVehicles, setRecommendedVehicles] = useState<Vehicle[]>();

  const handleSearch = (e: any) => {
    setRequest(() => ({ ...request, searchName: e.target.value }));
  };

  const scrollToSection = (elementRef: any) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleSearchVehicles = async () => {
    setIsLoading(true);
    const { data } = await client.query<
      GetVehiclesResponse<"getVehiclesByAdvancedSearch">
    >({
      query: GET_VEHICLES_BY_ADVANCE_SEARCH,
      variables: request,
    });

    const vehicles = data?.getVehiclesByAdvancedSearch?.nodes?.map(
      (vehicle) => {
        const isFavorite = favoriteVehicles.some(
          (favoriteVehicle) => favoriteVehicle.uuid === vehicle.uuid
        );

        return { ...vehicle, isFavorite };
      }
    );

    scrollToSection(listing);
    setVehicles(vehicles);
    setIsLoading(false);
  };

  const handleAddFavoriteVehicles = async () => {
    try {
      if (!auth?.isAuthenticated) {
        throw new Error(
          "Necesitas estar registrado para usar esta funcionalidad"
        );
      }
      setIsLoading(true);
      const { data } = await client.query<
        GetVehiclesResponse<"getFavoriteVehicles">
      >({
        query: GET_FAVORITE_VEHICLES,
      });

      const vehicles = data?.getFavoriteVehicles?.nodes?.map((vehicle) => ({
        ...vehicle,
        isFavorite: true,
      }));

      scrollToSection(listing);
      setVehicles(vehicles);
      setIsLoading(false);
    } catch (error) {
      toast.error(<ToastAlert error={error} />, errorProps);
    }
  };

  const handleRecommendedVehicles = async () => {
    try {
      if (!auth?.isAuthenticated) {
        throw new Error(
          "Necesitas estar registrado para usar esta funcionalidad"
        );
      }
      setIsLoading(true);
      const { data } = await client.query<
        GetVehiclesResponse<"getRecommendedVehicles">
      >({
        query: GET_RECOMMENDED_VEHICLES,
      });

      const vehicles = data?.getRecommendedVehicles?.nodes?.map((vehicle) => {
        const isFavorite = favoriteVehicles.some(
          (favoriteVehicle) => favoriteVehicle.uuid === vehicle.uuid
        );

        return { ...vehicle, isFavorite };
      });

      scrollToSection(listing);
      setVehicles(vehicles);
      setIsLoading(false);
    } catch (error) {
      toast.error(<ToastAlert error={error} />, errorProps);
    }
  };

  const handleChangeCondition = (e: any) => {
    const condition = conditionVehicles.find(
      (condition) => condition.key === e.target.value
    )?.key as GetVehicleCondition;
    setRequest(() => ({
      ...request,
      condition: GetVehicleCondition[condition],
    }));
  };

  const handleChangeCity = (e: any) => {
    const key = e.target.value;
    setRequest(() => ({ ...request, city: cities[key] }));
  };

  useEffect(() => {
    (async () => {
      const { data } = await client.query<
        GetVehiclesResponse<"getFavoriteVehicles">
      >({
        query: GET_FAVORITE_VEHICLES,
      });
      const vehicles = (data?.getFavoriteVehicles.nodes as Vehicle[]) || [];
      setFavoriteVehicles(vehicles);
    })();
  }, [client]);

  useEffect(() => {
    (async () => {
      const { data } = await client.query<any>({
        query: GET_GENERAL_RECOMMENDED_VEHICLES,
      });
      setRecommendedVehicles(data.getGeneralRecommendedVehicles);
      console.log(recommendedVehicles)
    })();
  }, []);

  return (
    <MainLayout>
      <NabBar />

      {/*       <div className="overflow-hidden">
        <img
          src="https://es.chrysler.com/content/dam/fca-brands/na/chrysler/en_us/2023/300c/desktop/2023-chrysler-BM-VLP-300c-hero-perfnlux.jpg"
          alt="vehiculo"
          className="sm:w-full"
        />
      </div> */}
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            "url('https://es.chrysler.com/content/dam/fca-brands/na/chrysler/en_us/2023/300c/desktop/2023-chrysler-BM-VLP-300c-hero-perfnlux.jpg')",
          height: "600px",
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.55)] bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                El carro de tus sueños a un
                <br />
                <span>click de distancia</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <SearchSection
        onChange={handleSearch}
        handleChangeCity={handleChangeCity}
        handleChangeCondition={handleChangeCondition}
        handleClickFavorites={handleAddFavoriteVehicles}
        handleClickRecommended={handleRecommendedVehicles}
        onClick={handleSearchVehicles}
      />
      <div
        className="listing container mx-auto w-full min-h-card h-auto"
        ref={listing}
      >
        {vehicles && (
          <div className="listing container mx-28 w-full min-h-card h-auto">
            <span className="text-2xl">Resultados:</span>{" "}
            <span className="text-2xl">{vehicles.length}</span>
          </div>
        )}
        <div className="w-full flex flex-col items-center gap-4">
          {!vehicles && isLoading === true && (
            <Fragment>
              <div className="flex items-center gap-2">
                <div className="text-gray-700">cargando</div>
                <Image
                  src={
                    "https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
                  }
                  height={36}
                  width={36}
                  alt={`loading`}
                  unoptimized={true}
                ></Image>
              </div>
            </Fragment>
          )}

          {vehicles &&
            vehicles.map((vehicle: Vehicle, index) => {
              const vehicleProps: VehicleProps = {
                ...vehicle,
                description: vehicle.description ?? vehicle.name,
                updatedAt: new Date(vehicle?.updatedAt as string),
                website: vehicle.website?.name,
                index,
              };
              return <Card key={index} vehicle={vehicleProps} />;
            })}
        </div>
      </div>
      <RecommendedSection vehicles={recommendedVehicles} />
      <Footer />
    </MainLayout>
  );
}
