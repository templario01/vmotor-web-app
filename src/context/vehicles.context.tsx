"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Vehicle } from "../graphql/queries/get-vehicles-by-advance-search.query";

export type VehiclesContextType = {
  vehicles: Vehicle[] | undefined;
  setVehicles: Dispatch<SetStateAction<Vehicle[] | undefined>>;
};

export const VehiclesContext = createContext<VehiclesContextType | null>(null);

export const VehiclesProvider = ({ children }: any) => {
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        setVehicles,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};
