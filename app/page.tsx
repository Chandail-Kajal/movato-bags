import Footer from "@/components/footer";
import Header from "@/components/header";
import FAQ from "@/components/homepage/FAQ";
import { Featured } from "@/components/homepage/Featured";
import HelpSection from "@/components/homepage/helpSection";
import { HeroCarousel } from "@/components/homepage/HeroCarousel";
import { ShopYourLuggage } from "@/components/homepage/ShopYourLuggage";
import SupportSection from "@/components/homepage/supportSection";
import { Testimonial } from "@/components/homepage/Testimonial";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import { PropsWithChildren } from "react";

const Section = ({ children }: PropsWithChildren) => {
  return <div className="px-8 pb-8">{children}</div>;
};

export default function Home() {
  const slides = [
    {
      image: "/assets/hero/hero-1.jpg",
      title: "BUILT TO\nPERFORM",
      description:
        "Durable, high-impact hard-shell suitcases engineered for real-world travel.",
      primaryBtn: "Shop Movato",
      secondaryBtn: "Why Movato",
    },
    {
      image: "/assets/hero/hero-1.jpg",
      title: "TRAVEL SMART",
      description: "Designed for modern explorers.",
      primaryBtn: "Explore",
      secondaryBtn: "Learn More",
    },
  ];

  return (
    <div className="min-h-screen bg-white w-full flex flex-col">
      <Header />
      <div className="p-8 W-full">
        <HeroCarousel slides={slides} />
      </div>
      <Section>
        <Featured />
      </Section>

      <Section>
        <ShopYourLuggage />
      </Section>

      <Section>
        <Testimonial />
      </Section>
      <Section>
        <SupportSection/>
      </Section>
        <Section>
          <TestimonialSection/>
        </Section>
        <Section>
          <FAQ/>
        </Section>
        <Section>
          <HelpSection/>
        </Section>
       <Footer /> 
    </div>
  );
}
