"use client";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import NabBar from "../app/components/NavBar";
import { Banner } from "../app/components/Banner";
import SearchSection from "../app/components/search/SearchSection";
import { gql, useApolloClient } from "@apollo/client";
import { Card } from "../app/components/Card";
import { ReactElement, useRef, useState } from "react";

const QUERY = (searchName = "") => gql`
query{
  getVehiclesByAdvancedSearch(searchName:"${searchName}"){
    nodes{
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
      website{
        name
        uuid
        url
      }
    }
  }
}
`;

export default function Home() {
  const [search, setSearch] = useState("");
  const client = useApolloClient();
  const [vehicles, setVehicles] = useState([]);
  const listing = useRef(null);

  const handleSearch = (e: any) => {
    setSearch(() => e.target.value);
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
      />

      <SearchSection
        onChange={handleSearch}
        onClick={async () => {
          const { data } = await client.query({
            query: QUERY(search),
          });
          scrollToSection(listing);
          setVehicles(data?.getVehiclesByAdvancedSearch?.nodes);
        }}
      />

      <div className="listing container mx-auto w-full h-96" ref={listing}>
        <div className="w-full flex flex-col items-center gap-4">
          {vehicles &&
            vehicles.map((vehicle: any, i) => {
              return <Card key={i} vehicle={{ ...vehicle, index: i }} />;
            })}
        </div>
      </div>
    </MainLayout>
  );
}
