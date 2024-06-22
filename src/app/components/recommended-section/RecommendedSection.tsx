"use client";
import "swiper/css";
import VehicleSlider from "./VehicleSlider";

type RecommendedSection = {
  vehicles?: any[];
  children?: any;
};

export default function RecommendedSection(props: RecommendedSection) {
  return (
    <div className="w-full h-auto bg-white flex justify-center">
      <div className="flex flex-col gap-4 mt-24 px-8 bg-white md:w-4/5 w-full -translate-y-10">
        <h1 className=" mb-16 font-bold tracking-tight text-4xl">
          VEHÍCULOS RECOMENDADOS
        </h1>
        <VehicleSlider vehicles={props.vehicles} />
      </div>
    </div>
  );
}
