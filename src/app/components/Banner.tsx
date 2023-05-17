export const Banner = () => {
  return (
    <div
      className="container mx-auto w-auto absolute right-0 left-0 h-28 items-center
    flex justify-between z-50 top-60"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-white text-5xl font-bold ">
          El carro de tus sueños <br></br>a un click
        </h1>
        <p className="text-white text-lg leading-relaxed">
          VMOTOR busca por tí el vehículo mas económico en los principales{" "}
          <br></br> concesionarios y Marketplaces del Perú.
        </p>
      </div>
    </div>
  );
};
