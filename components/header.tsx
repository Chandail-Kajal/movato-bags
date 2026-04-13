export default function Header() {
    return (
        <div className="w-[1920px] h-[146px] bg-white flex flex-col border-2 border-gray-100">


            <div className="w-full h-[43px] flex justify-center items-center bg-[#3D4637]">
                <p className="font-bold text-white">
                    Durable. Stylish. Travel-Ready.
                </p>
            </div>


            <div className="w-full h-[103px] bg-white flex items-center justify-between px-8">

                
                <div className="flex space-x-6">
                    <button className="text-xl text-gray-600 font-semibold font-rubik">Shop</button>
                    <button className="text-xl  text-gray-600 font-rubik">Why Movato</button>
                    <button className="text-xl  text-gray-600 font-rubik">About Us</button>
                    <button className="text-xl  text-gray-600 font-rubik">Track Your Order</button>
                </div>

                <div className="text-3xl font-bold tracking-wide">
                    <img src="/logo.svg"/>
                </div>

               
                <div className="flex items-center space-x-4">

                   
                    <div className="flex items-center bg-[#F0F0E6] px-4 py-2 rounded-full gap-2">
                        <img src="/assets/icons/search.svg"/>
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none"
                            
                        />
                        <img src="/assets/icons/mic.svg"/>
                    </div>

                    <div className="w-10 h-10 bg-[#F0F0E6] rounded-full flex items-center justify-center">
                        <img src="/assets/icons/Vector.svg"/>
                    </div>
                    <div className="w-10 h-10 bg-[#F0F0E6] rounded-full">
                        <img src="/assets/icons/cart.png"/>
                    </div>
                    <div className="w-10 h-10 bg-[#F0F0E6] rounded-full">
                        <img src="assets/icons/person.svg"/>
                    </div>

                </div>

            </div>


        </div>
    );
}