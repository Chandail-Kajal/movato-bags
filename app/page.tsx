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
import { getHeroBanners } from "@/lib/api";
import { PropsWithChildren } from "react";

const Section = ({ children }: PropsWithChildren) => {
  return <div className="md:px-8 md:pb-8 px-2 pb-2">{children}</div>;
};

export default async function Home() {
  const slides = await getHeroBanners()

  return (
    <div className="min-h-screen bg-white w-full flex flex-col relative">
      <Header />

      <div className="md:p-8 px-2 py-2 w-full">
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
        <SupportSection />
      </Section>
      <Section>
        <TestimonialSection />
      </Section>
      <Section>
        <FAQ />
      </Section>
      <Section>
        <HelpSection />
      </Section>
      <Footer />
    </div>
  );
}
