"use client";
import Image from "next/image";
import icon1 from "@/assets/icons/icon-1.svg";
import React from "react";

export default function SupportSection() {
  
  const data = {
    heading: "Support That\nTravels with you",
    subheading:
      "From warranty coverage to customer support, Movato provides a friction-free ownership experience.",
    buttonText: "Shop Now",
    imageUrl: "/assets/images/support-1.jpg", 

    features: [
      {
        path:"/assets/icons/icon-1.svg",
        title: "3-YEAR INTERNATIONAL WARRANTY",
        description:
          "Coverage designed for real-world travel, not fine print.",
      },
      {
        path:"/assets/icons/icon-2.svg",
        title: "DEDICATED CUSTOMER SUPPORT",
        description:
          "Support teams that understand travel issues and respond when it matters.",
      },
      {
        path:"/assets/icons/icon-3.svg",
        title: "BUILT FOR LONG-TERM OWNERSHIP",
        description:
          "Designed to perform consistently across years of frequent travel.",
      },
    ],
  };

  return (
    <section className="bg-[#f5f5f2] md:px-16 md:py-20 px-4 py-2">
      <div className="md:grid md:grid-cols-2 md:gap-16 items-center flex flex-col">
        
        
        <div>
          
          <h1 className="md:text-5xl text-5xl font-sohne-dreivierfett text-[#2f4635] leading-tight whitespace-pre-wrap">
            {data.heading}
          </h1>

          
          <p className="text-gray-600 md:mt-6 text-lg max-w-xl">
            {data.subheading}
          </p>


          <div className="flex md:flex-row md:gap-10 md:mt-10 flex-col gap-2">
            {data.features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-3 max-w-45">
                

                <Image alt={feature.title} className="text-3xl text-black" src={feature.path} width={100} height={100}></Image>
                  


                <h3 className="text-orange-500 font-semibold text-sm uppercase">
                  {feature.title}
                </h3>


                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>


          <button className="mt-10 border border-[#2f4635] px-8 py-3 rounded-md text-[#2f4635] hover:bg-[#2f4635] hover:text-white transition">
            {data.buttonText}
          </button>
        </div>


        <div className="relative w-full md:h-125 h-90 mt-4 md:mt-0 rounded-2xl overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="support"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}