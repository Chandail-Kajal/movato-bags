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

  return (
    <div className="w-full overflow-hidden relative rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full shrink-0 flex flex-col md:relative"
          >
            <Image
              src={slide.image}
              alt="slide"
              width={1920}
              height={1280}
              className="w-full h-72 md:h-160 object-cover"
            />

            <div className="md:absolute md:inset-0 flex items-end md:px-10 px-4 py-6">
              <div className="md:w-[38%] w-full text-[#2F3A2F] space-y-4">
                <h1 className="font-black uppercase md:text-8xl text-3xl leading-tight">
                  {slide.title}
                </h1>

                <p className="text-base md:text-lg text-gray-700">
                  {slide.description}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  {slide.primaryBtn && (
                    <button className="bg-[#2F4A36] text-white px-6 py-3">
                      {slide.primaryBtn}
                    </button>
                  )}

                  {slide.secondaryBtn && (
                    <button className="bg-white/70 backdrop-blur px-6 py-3 border">
                      {slide.secondaryBtn}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 flex items-center gap-3 bg-white px-4 py-2 z-10 rounded-tl-xl">
        <button onClick={prevSlide}>
          <Image
            height={12}
            width={12}
            src={"/assets/icons/arrow-btn.svg"}
            className="size-6"
            alt="prev"
          />
        </button>

        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}>
            <Image
              height={10}
              width={10}
              src={"/assets/icons/cross-carousel-indicator.svg"}
              className={`size-4 ${i === current ? "opacity-95" : "-rotate-45"}`}
              alt={"Indicator"}
            />
          </button>
        ))}

        <button onClick={nextSlide}>
          <Image
            height={12}
            width={12}
            src={"/assets/icons/arrow-btn.svg"}
            className="size-6 rotate-180"
            alt="next"
          />
        </button>
      </div>
    </div>
  );
}
