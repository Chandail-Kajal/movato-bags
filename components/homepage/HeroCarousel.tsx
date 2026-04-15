"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = {
  image: string;
  title: string;
  description: string;
  primaryBtn?: string;
  secondaryBtn?: string;
};

type Props = {
  slides: Slide[];
};

export function HeroCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const openSlide = (index: number) => {
    setCurrent(() => index);
  };

  return (
    <div className="w-full md:h-160 h-125 relative overflow-hidden rounded-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`w-full h-full transition-opacity duration-500 absolute inset-0 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt="slide"
          />

          <div className="absolute inset-0 flex justify-start items-end px-10 ">
            <div className="w-full flex mb-10">
              <div className="w-[38%] text-[#2F3A2F] space-y-4">
                <h1 className="w-full font-sohne-extrafett font-black text-8xl leading-22 tracking-normal uppercase">
                  {slide.title}
                </h1>

                <p className="text-lg font-semibold font-sans text-gray-700">
                  {slide.description}
                </p>

                <div className="flex flex-col gap-4 pt-4">
                  {slide.primaryBtn && (
                    <button className="bg-[#2F4A36] font-sans w-full text-white px-6 py-4">
                      {slide.primaryBtn}
                    </button>
                  )}

                  {slide.secondaryBtn && (
                    <button className="w-full bg-white/70 font-sans backdrop-blur px-6 py-4 border">
                      {slide.secondaryBtn}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div
        className="absolute bottom-0 right-0 flex items-center gap-3 bg-white px-4 py-2 z-99"
        style={{ borderRadius: "10px 0 0 0" }}
      >
        <button onClick={prevSlide}>
          {/* <img src="/assets/icons/arrow-btn.svg" className="size-5 " /> */}
          <Image
            height={12}
            width={12}
            src={"/assets/icons/arrow-btn.svg"}
            className={`size-6`}
            alt={"Indicator"}
          />
        </button>

        {slides.map((_, i) => (
          <button key={`indicator-${i}`} onClick={() => openSlide(i)}>
            <Image
              height={10}
              width={10}
              src={"/assets/icons/cross-carousel-indicator.svg"}
              className={`size-4 ${i === current ? "opacity-95" : "-rotate-45"}`}
              alt={"Indicator"}
            />
          </button>
        ))}

        <button onClick={nextSlide} className="text-xl">
          <Image
            height={12}
            width={12}
            src={"/assets/icons/arrow-btn.svg"}
            className={`size-6 rotate-180`}
            alt={"Indicator"}
          />
        </button>
      </div>
    </div>
  );
}
