import Image from "next/image";
import { PropsWithChildren } from "react";

const Button = ({
  children,
  isActive = false,
}: PropsWithChildren<{ isActive?: boolean }>) => {
  return (
    <div
      className={`text-sm flex-1 font-sans border-2 border-[#3D4637] text-[#304B39] text-center rounded-xs px-4 py-2.5 ${isActive && "font-medium"}`}
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
    <div className="flex flex-col items-center pt-8 gap-8">
      <div className="flex flex-col gap-4">
        <h4 className="font-sohne-halbfett text-5xl text-[#3D4637]">
          Shop Your Luggage
        </h4>
        <p className="text-black font-sans text-lg leading-tight text-center font-normal">
          Different journeys demand different luggage. <br /> Choose by size,
          collection, or how you travel.
        </p>
        <div className="mt-4 flex flex-row items-center gap-4">
          <Button isActive>Ship By Size</Button>
          <Button>Shop By collection</Button>
          <Button>Shop By Trip</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <Image
            alt={img}
            className="h-125 object-cover w-full rounded-xs"
            height={300}
            width={400}
            src={img}
            key={`image_${index}`}
          />
        ))}
      </div>
      <div className="flex w-full justify-center items-center">
            <button className="w-1/4 font-sans font-normal text-white text-base bg-[#304B39] p-4">Shop All</button>
      </div>
    </div>
  );
}
