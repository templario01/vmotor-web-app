import { Fragment, ReactNode, useState } from "react";
import { Location, Star1 } from "iconsax-react";
import { Tag } from "./Tag";
import Buttom from "./Buttom";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import {
  ADD_FAVORITE_VEHICLE_TO_USER,
  AddFavoriteVehicleInput,
  AddFavoriteVehicleToUserResponse,
} from "../../graphql/mutations/add-favorite-vehicle-to-user.mutation";
import { useMutation } from "@apollo/client";
import {
  DELETE_FAVORITE_VEHICLE_TO_USER,
  DeleteFavoriteVehicleInput,
  DeleteFavoriteVehicleToUserResponse,
} from "../../graphql/mutations/delete-favorite-vehicle-to-user.mutation";

export type VehicleProps = {
  uuid?: string;
  index: number;
  url?: string;
  name?: string;
  location?: string;
  description?: string;
  year?: number;
  condition?: string;
  price?: number;
  originalPrice?: number;
  currency?: string;
  frontImage?: string;
  mileage?: number;
  updatedAt?: Date;
  website?: string;
  isFavorite?: boolean;
};
export type CardProps = {
  vehicle: VehicleProps;
  children?: ReactNode;
};

export function parseToDecimal(price: number) {
  if (Number.isInteger(price)) {
    return price.toString() + ".00";
  } else {
    return price.toFixed(2);
  }
}

export const logos = {
  mercadolibre:
    "https://cdnmain-website.latina.pe/wp-content/uploads/2020/03/22015055/43335.jpg",
  neoauto:
    "https://upload.wikimedia.org/wikipedia/commons/0/00/Empresa_de_carros.png",
  autocosmos:
    "data:image/png;base64,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",
};

export const unknownImage =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export const Card = ({ vehicle }: CardProps) => {
  const {
    location = "Perú",
    frontImage = unknownImage,
    description = "Descripción del vehículo",
    mileage = 0,
    year = 0,
    price = 0.0,
    url,
    condition,
    uuid,
    website,
    index,
    isFavorite,
  } = vehicle;
  const [addFavoriteVehicleToUser] = useMutation<
    AddFavoriteVehicleToUserResponse,
    AddFavoriteVehicleInput
  >(ADD_FAVORITE_VEHICLE_TO_USER);
  const [deleteFavoriteVehicleToUser] = useMutation<
    DeleteFavoriteVehicleToUserResponse,
    DeleteFavoriteVehicleInput
  >(DELETE_FAVORITE_VEHICLE_TO_USER);
  const [isActiveStar, setIsActiveStar] = useState<boolean>(!!isFavorite);

  const handleAddFavoriteVehicle = async () => {
    try {
      if (isActiveStar) {
        const { data } = await deleteFavoriteVehicleToUser({
          variables: {
            input: { vehicle: { uuid } },
          },
        });
      } else {
        const { data } = await addFavoriteVehicleToUser({
          variables: {
            input: { vehicle: { uuid } },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className=" w-card lg:flex">
        <div
          className="rounded-l-2xl h-48 lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden"
          style={{
            backgroundImage: `url(${frontImage})`,
          }}
          title="vehículo"
        ></div>
        <div
          className="shadow-2xl w-full border-1 border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light
         bg-white rounded-r-2xl p-4 flex flex-col justify-between leading-normal"
        >
          <div className="mb-8">
            <p className="text-sm text-grey-dark flex items-center">
              <Location />
              {location}
            </p>
            <div className="text-black font-bold text-xl mb-2 mr-8">
              {description}
            </div>
            <div className="flex justify-between">
              <p className="text-grey-darker text-base">
                <span className="font-bold">Kilómetros:</span>
                {` ${mileage ? mileage + " Km" : "Sin información"} `}
              </p>

              <p className="text-grey-darker text-base">
                <span className="font-bold">Condición:</span>
                {` ${condition}`}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-grey-darker text-base">
                <span className="font-bold">Precio:</span>
                {` $${parseToDecimal(price)}`}
              </p>

              <p className="text-grey-darker text-base">
                <span className="font-bold">Año:</span>
                {` ${year}`}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-black leading-none font-bold text-base">
                  Publicado por:&nbsp;
                </p>
              </div>
              <img
                className="w-20 h-auto  mr-4"
                src={`${
                  logos[
                    `${website as "mercadolibre" | "neoauto" | "autocosmos"}`
                  ]
                }`}
                alt="concesionario"
              />
            </div>
            <Link href={`${url}`} target="_blank">
              <Buttom
                color="bg-blue-600"
                text="Ver Publicación"
                hover="bg-blue-700"
              />
            </Link>
          </div>
        </div>
        {index < 3 && <Tag topNumber={index + 1} />}
        <div className="relative">
          <button
            className={`w-auto ${
              isActiveStar ? "bg-orange-600" : "bg-orange-200"
            } ${
              isActiveStar ? "text-orange-200" : "text-orange-700"
            } p-2 cursor-pointer rounded-lg absolute right-0 mt-4 mr-4`}
            data-tooltip-id={"favorite"}
            data-tooltip-content={`${
              isActiveStar ? "Eliminar de favoritos" : "Agregar a favoritos"
            }`}
            onClick={() => {
              setIsActiveStar(!isActiveStar);
              handleAddFavoriteVehicle();
            }}
          >
            <Star1 />
            <Tooltip id={"favorite"} />
          </button>
        </div>
      </div>
    </Fragment>
  );
};
