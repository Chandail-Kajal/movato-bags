import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-480 h-[1119] bg-[#304B39] flex flex-col ">
            <div className="w-[384px] h-232.5 gap-7.5 m-20 ">
                <div className="w-[384px] h-[417.52px] gap-5 pb-20 ">
                    <div className="w-[384px] h-[100.52px] ">
                        <Image src="/assets/icons/Footer-Logo.svg" width={"380"} height={100} alt="test" />
                    </div>
                    <div className="w-[384px] h-44.25 text-white pt-8 gap-8 flex flex-col">
                        <p className="font-rubik">
                            Movato designs performance-driven luggage for real travel, from daily work trips to long journeys. Thoughtfully engineered. Rigorously tested.
                            Built to move with you—wherever life takes you.
                        </p>
                        <p className="font-rubik">
                            #BuiltToPerform
                        </p>
                    </div>
                    <div className="w-95 h-20 pt-8">
                        <Image src="/assets/icons/Otpimg.svg" width={380} height={100} alt="test" />
                    </div>
                </div>
                <div className="w-81.25 h-31.25 gap-6 flex flex-col">
                    <h1 className="text-[#B9D531]">CUSTOMER SUPPORT</h1>
                    <span className="text-white flex ">Call/WhatsApp: +91 9999 999 999<br />
                        email: support@movatobags.com
                        Monday - Saturday / 10 AM - 7 PM
                    </span>
                </div>
                <div className="w-[384px] h-[200.84px] gap-8 pt-8">
                    <h1 className="text-[#B9D531]">STAY UPDATED</h1>
                    <div className="w-[384px] h-[60.48px] bg-white border-1 border-gray-600 flex flex-col justify-end items-end  ">
                        <div className="w-15 h-15 bg-[#304B39] flex flex-col justify-center items-center ">
                            <Image src="/assets/icons/Arrow3.png" width={35} height={40} alt="footer" />
                        </div>

                    </div>
                    <span className="w-95 h-13.5 font-rubik pt-20 ">
                        Product launches, performance insights, and travel stories — straight from the Movato team.
                        No spam. No noise. Just things worth knowing.
                    </span>
                </div>

            </div>

            <div></div>
        </div>
    );
}