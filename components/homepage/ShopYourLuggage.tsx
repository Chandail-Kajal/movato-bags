import Image from "next/image";
import { PropsWithChildren } from "react";

const Button = ({
  children,
  isActive = false,
}: PropsWithChildren<{ isActive?: boolean }>) => {
  return (
    <div
      className={`md:text-sm text-xs flex-1 font-sans border-2 border-[#3D4637] text-[#304B39] flex items-center justify-center text-center rounded-xs md:px-4 md:py-2.5 p-2 ${isActive && "font-medium"}`}
    >
      {children}
    </div>
  );
};

export function ShopYourLuggage() {
  const images = Array.from({ length: 4 }).map(
    (_, idx) => `/assets/images/shop-luggage-${idx + 1}.png`,
  );

  return (
    <div className="flex flex-col items-center md:pt-8 md:gap-8 p-4">
      <div className="flex flex-col gap-4">
        <h4 className="font-sohne-halbfett md:text-5xl text-3xl text-[#3D4637]">
          Shop Your Luggage
        </h4>
        <p className="text-black font-sans md:text-lg text-base leading-tight text-center font-normal">
          Different journeys demand different luggage. <br /> Choose by size,
          collection, or how you travel.
        </p>
        <div className="md:mt-4 mt-2 flex flex-row md:items-center gap-4">
          <Button isActive>Ship By Size</Button>
          <Button>Shop By collection</Button>
          <Button>Shop By Trip</Button>
        </div>
      </div>
      <div className="md:mt-0 mt-4 grid md:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <Image
            alt={img}
            className="md:h-125 h-100 object-cover w-full rounded-xs"
            height={300}
            width={400}
            src={img}
            key={`image_${index}`}
          />
        ))}
      </div>
      <div className="flex w-full justify-center items-center">
            <button className="md:w-1/4 w-full md:mt-0 mt-4 font-sans font-normal text-white text-base bg-[#304B39] p-4">Shop All</button>
      </div>
    </div>
  );
}
