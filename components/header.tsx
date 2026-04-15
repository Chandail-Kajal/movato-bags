import { Mic, Search } from "lucide-react";
import { PropsWithChildren } from "react";

const Button = ({
  isActive = false,
  children,
}: PropsWithChildren<{ isActive?: boolean }>) => {
  return (
    <button
      className={`text-base text-gray-600 text-center leading-snug tracking-tight ${
        isActive ? "font-semibold" : "font-normal"
      }`}
    >
      {children}
    </button>
  );
};

export default function Header() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-1.5 flex justify-center items-center bg-[#3D4637]">
        <p className="font-medium text-base text-white">
          Durable. Stylish. Travel-Ready.
        </p>
      </div>

      <div className="w-full bg-white grid grid-cols-3 px-8 py-5 shadow-xl">
        <div className="flex flex gap-6">
          <Button isActive={true}>Shop</Button>
          <Button>Why Movato</Button>
          <Button>About Us</Button>
          <Button>Track Your Order</Button>
        </div>

        <div className="self-center justify-center object-contain flex items-center">
          <img src="/logo.svg" className="h-8" />
        </div>

        <div className="flex items-center gap-3 justify-end">
          <div className="flex items-center bg-[#F0F0E6] px-2.5 py-1.5 w-45 border border-gray-100 rounded-full gap-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="text-gray-700 w-full placeholder:text-gray-400 bg-transparent outline-none"
            />
            <Mic className="text-gray-500" />
          </div>

          <div className="w-9 h-9 bg-[#F0F0E6] rounded-full flex items-center justify-center">
            <img src="/assets/icons/Vector.svg" className="size-5" />
          </div>
          <div className="w-9 h-9 bg-[#F0F0E6] flex items-center justify-center rounded-full">
            <img src="/assets/icons/cart.svg" className="size-5" />
          </div>
          <div className="w-9 h-9 bg-[#F0F0E6] flex items-center justify-center rounded-full">
            <img src="assets/icons/person.svg" className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
