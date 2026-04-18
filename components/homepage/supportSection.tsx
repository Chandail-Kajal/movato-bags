"use client";
import Image from "next/image";
import { FaHeadset, FaSuitcase, FaAward } from "react-icons/fa";
import React from "react";

export default function SupportSection() {
  
  const data = {
    heading: "Support That Travels With You.",
    subheading:
      "From warranty coverage to customer support, Movato provides a friction-free ownership experience.",
    buttonText: "Shop Now",
    imageUrl: "/assets/images/support-1.jpg", 

    features: [
      {
        icon: <FaAward />,
        title: "3-YEAR INTERNATIONAL WARRANTY",
        description:
          "Coverage designed for real-world travel, not fine print.",
      },
      {
        icon: <FaHeadset />,
        title: "DEDICATED CUSTOMER SUPPORT",
        description:
          "Support teams that understand travel issues and respond when it matters.",
      },
      {
        icon: <FaSuitcase />,
        title: "BUILT FOR LONG-TERM OWNERSHIP",
        description:
          "Designed to perform consistently across years of frequent travel.",
      },
    ],
  };

  return (
    <section className="bg-[#f5f5f2] px-16 py-20">
      <div className="grid grid-cols-2 gap-16 items-center">
        
        
        <div>
          
          <h1 className="text-5xl font-semibold text-[#2f4635] leading-tight">
            {data.heading}
          </h1>

          
          <p className="text-gray-600 mt-6 text-lg max-w-xl">
            {data.subheading}
          </p>


          <div className="flex gap-10 mt-10">
            {data.features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-3 max-w-[180px]">
                

                <div className="text-3xl text-[#2f4635]">
                  {feature.icon}
                </div>


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


        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
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