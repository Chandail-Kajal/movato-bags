/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { fetchPublicData } from "@/lib/api";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";

const Button = ({
  children,
  isActive = false,
  onClick
}: PropsWithChildren<{ isActive?: boolean, onClick: () => void }>) => {
  return (
    <button
      onClick={onClick}
      className={`md:text-sm text-xs flex-1 font-sans border-2 border-[#3D4637] text-[#304B39] flex items-center justify-center text-center rounded-xs md:px-4 md:py-2.5 p-2 ${isActive && "font-medium border-3"}`}
    >
      {children}
    </button>
  );
};

export function ShopYourLuggage() {
  const [images, setImages] = useState([])
  const [categorytype, setCategorytype] = useState<"size" | "collection" | "trip">("size")

  useEffect(() => {
    (async () => {
      const data = await fetchPublicData(
        "shop", { categorytype }
      )
      console.log(data)
      setImages(data || [])
    })()
  }, [categorytype])


  return (
    <div className="flex flex-col items-center md:pt-8 md:gap-8 p-2">
      <div className="flex flex-col gap-4">
        <h4 className="font-sohne-halbfett md:text-5xl text-3xl text-[#3D4637]">
          Shop Your Luggage
        </h4>
        <p className="text-black font-sans md:text-lg text-base leading-tight text-center font-normal">
          Different journeys demand different luggage. <br /> Choose by size,
          collection, or how you travel.
        </p>
        <div className="md:mt-4 mt-2 flex flex-row md:items-center gap-4">
          {
            [
              { category: "size", label: "Shop By Size" },
              { category: "collection", label: "Shop By Collection" },
              { category: "trip", label: "Shop By Trip" },
            ].map((c, index) => <Button key={`button_${index}`} isActive={categorytype === c.category} onClick={() => setCategorytype(c.category)} >{c.label}</Button>)
          }
        </div>
      </div>
      <div className="md:mt-0 mt-4 grid md:grid-cols-4 gap-3">
        {images.map((img: any, index) => (
          <Image
            alt={img.image}
            className="md:h-125 h-100 object-cover w-full rounded-xs"
            height={300}
            width={400}
            src={img.image}
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
