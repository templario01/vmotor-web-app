import React, { Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CompactCard } from "../CompactCard";
import { VehicleProps } from "../Card";

type VehicleSliderProps = {
  vehicles?: any[];
  children?: any;
};

export default function VehicleSlider(props: VehicleSliderProps) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "text-gray-900 mb-20",
  };
  return (
    <Slider {...settings}>
      {props.vehicles?.map((vehicle, idx) => {
        return (
          <CompactCard
            key={idx}
            vehicle={{ ...vehicle, website: vehicle.website?.name }}
          ></CompactCard>
        );
      })}
    </Slider>
  );
}
