import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import NabBar from "../app/components/NavBar";
import { Banner } from "../app/components/Banner";
import SearchSection from "../app/components/SearchSection";

export default function Home() {
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
      <SearchSection />
    </MainLayout>
  );
}
