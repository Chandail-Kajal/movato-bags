const Card = ({
  mainText,
  subText,
  caption,
}: {
  mainText: string;
  subText: string;
  caption: string;
}) => {
  return (
    <div className="border border-[#E6E6DC] w-full py-4 px-6">
      <div className="flex flex-col items-center">
        <h5 className="text-[#DB6B30] text-3xl leading-tight font-sans font-bold">
          {mainText}
        </h5>
        <span className="text-[#DB6B30] text-xl leading-tight  font-sans font-semibold">
          {subText}
        </span>
      </div>
      <p className="text-sm text-center leading-snug mt-4 font-sans font-normal text-[#D9D9D6]">
        {caption}
      </p>
    </div>
  );
};

export function Testimonial() {
  const cards: { mainText: string; subText: string; caption: string }[] = [
    {
      mainText: "300X",
      subText: "Handle Cycles",
      caption:
        "Tested under a 30kg load to ensure\n consistent performance during\n repeated lifting.",
    },
    {
      mainText: "3 FT.",
      subText: "Drop Tested",
      caption:
        "Designed to withstand sudden drops\n and rough baggage handling.",
    },
    {
      mainText: "20 KM",
      subText: "Drum Tested",
      caption:
        "Wheel endurance verified across\n abrasive surfaces for long-distance\n reliability.",
    },
    {
      mainText: "300 KG",
      subText: "Pressure Tested",
      caption:
        "Shell tested under 300 kg of applied\n pressure without cracking or\n structural failure.",
    },
  ];

  return (
    <div className="bg-[#25282A] p-16 rounded-3xl px-20 flex items-center">
      <div className="flex w-1/2 flex-col gap-6">
        <h4 className="font-sans-dirt uppercase text-7xl">
          Tested for <br /> everyday <br />
          travel use.
        </h4>
        <p className="text-base font-sans font-normal">
          Movato suitcases are tested under controlled conditions <br /> to
          ensure consist performance across repeated trips and <br /> regular
          handling.
          <span className="block mt-4 text-xs">
            * Tests conducted under controlled conditions to simulate real-world
            conditions.
          </span>
        </p>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Card key={`testimonial_card_${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}
