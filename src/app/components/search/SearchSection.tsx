"use client";
import dynamic from "next/dynamic";
import { useAuthState } from "../../../context/auth.context";
import Select from "../Select";
import { Search } from "./Search";
const Buttom = dynamic(() => import("../Buttom"), {
  ssr: false,
});

export interface SearchSectionProps {
  onChange: (e: any) => void;
  onClick: () => Promise<void>;
  handleClickRecommended: () => Promise<void>;
  handleClickFavorites: () => Promise<void>;
  handleChangeCity: (e: any) => void;
  handleChangeCondition: (e: any) => void;
}

export const cities = [
  "Todas",
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
];

export const conditionVehicles = [
  { label: "cualquiera", key: "ALL" },
  { label: "nuevo", key: "NEW" },
  { label: "usado", key: "USED" },
];

export default function SearchSection({
  onChange,
  onClick,
  handleClickRecommended,
  handleClickFavorites,
  handleChangeCity,
  handleChangeCondition,
}: SearchSectionProps) {
  const auth = useAuthState();

  return (
    <div className=" w-full h-auto bg-white flex justify-center">
      <div className="shadow-2xl flex flex-col gap-4 py-8 px-8 mx-10 rounded-2xl bg-white w-4/5 -translate-y-10">
        <div className="flex gap-4">
          <Search onChange={onChange} />
          <Buttom onClick={onClick} />
        </div>
        <div className="flex justify-between items-end border-red-400 border-2 flex-wrap">
          <div className="flex gap-4">
            <Select
              handleChange={handleChangeCity}
              defaultValue={0}
              label={"Ubicación:"}
            >
              {cities.map((city, i) => (
                <option key={i} value={i}>
                  {city}
                </option>
              ))}
            </Select>
            <Select
              handleChange={handleChangeCondition}
              defaultValue={"ALL"}
              label={"Condición:"}
            >
              {conditionVehicles.map(({ label, key }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-4">
            <Buttom
              border={
                auth.isAuthenticated ? "border-blue-500" : "border-disabled-2"
              }
              hover={
                auth.isAuthenticated
                  ? "hover:text-white hover:bg-blue-700"
                  : "hover:text-disabled-3 hover:bg-disabled-1"
              }
              fontColor={
                auth.isAuthenticated ? "text-blue-800" : "text-disabled-3"
              }
              text="Mis carros favoritos"
              color={auth.isAuthenticated ? "bg-blue-50" : "bg-disabled-1"}
              toolTipId="favorites"
              toolTipText="inicia sesión para usar esta funcionalidad"
              onClick={handleClickFavorites}
            />
            <Buttom
              border={
                auth.isAuthenticated ? "border-blue-500" : "border-disabled-2"
              }
              hover={
                auth.isAuthenticated
                  ? "hover:text-white hover:bg-blue-700"
                  : "hover:text-disabled-3 hover:bg-disabled-1"
              }
              fontColor={
                auth.isAuthenticated ? "text-blue-800" : "text-disabled-3"
              }
              text="Carros Recomendados"
              color={auth.isAuthenticated ? "bg-blue-50" : "bg-disabled-1"}
              toolTipId="recommended"
              toolTipText="inicia sesión para usar esta funcionalidad"
              onClick={handleClickRecommended}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
