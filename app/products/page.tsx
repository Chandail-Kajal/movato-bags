"use client";

import Image from "next/image";
import React, { useState } from "react";


type Product = {
    title: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    images: string[];
    sizes: string[];
    colors: string[];
    description: string;
};


const product: Product = {
    title: "Madison Cabin Luggage (55 Cm)",
    subtitle:
        "Rugged, airline-compliant cabin luggage built for frequent short trips and everyday travel reliability.",
    price: 5499,
    originalPrice: 8999,
    images: [
        "/assets/images/product.png",
        "/assets/images/product-3.png",
        "/assets/images/product-4.png",
        "/assets/images/product-2.png",
    ],
    sizes: ["Cabin (55 cm)", "Medium (66 cm)", "Large (76 cm)", "Set of 2", "Set of 3"],
    colors: ["#3D5A40", "#C0392B", "#BDC3C7", "#000000", "#E67E22"],
    description:
        "The Movato Phoenix 55 is lightweight hard-shell luggage built for tough, everyday travel.",
};

export default function ProductSection() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedColor, setSelectedColor] = useState(1);
    const [qty, setQty] = useState(1);

    return (
        <div className="grid grid-cols-2 gap-10 p-10 bg-[#F5F5F5]">
            
            <div>
                <Image
                    src={product.images[selectedImage]}
                    width={500}
                    height={500}
                    alt="product"
                    className="rounded-lg"
                />

                <div className="flex gap-3 mt-4">
                    {product.images.map((img, i) => (
                        <Image
                            key={i}
                            src={img}
                            width={80}
                            height={80}
                            alt="thumb"
                            onClick={() => setSelectedImage(i)}
                            className={`cursor-pointer rounded-md ${selectedImage === i ? "border-2 border-black" : ""
                                }`}
                        />
                    ))}
                </div>
            </div>

            
            <div className="bg-white p-6 flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">{product.title}</h1>
                <p className="text-gray-600 text-sm">{product.subtitle}</p>

                
                <div>
                    <p className="text-sm font-medium">Size : Cabin 55cm</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {product.sizes.map((size, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedSize(i)}
                                className={`px-3 py-1 border text-sm ${selectedSize === i ? "bg-black text-white" : ""
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

            
                <div>
                    <p className="text-sm font-medium">Color : Red</p>
                    <div className="flex gap-2 mt-2">
                        {product.colors.map((color, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedColor(i)}
                                className={`w-5 h-5 rounded-full cursor-pointer ${selectedColor === i ? "ring-2 ring-black" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                
                <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-semibold">₹{product.price}</span>
                    <span className="line-through text-gray-400">
                        ₹{product.originalPrice}
                    </span>
                </div>

                
                <div className="flex items-center gap-3">
                    <button
                        className="border px-2"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                    >
                        -
                    </button>
                    <span>{qty}</span>
                    <button className="border px-2" onClick={() => setQty(qty + 1)}>
                        +
                    </button>
                </div>

                
                <button className="border py-2 w-full">Add To Cart</button>
                <button className="bg-[#304B39] text-white py-2 w-full">
                    Buy Now
                </button>

                
                <p className="text-xs text-gray-500 text-center">
                    FREE SHIPPING | 7-DAY EXCHANGE | REFUND WINDOW | 3-YEAR WARRANTY
                </p>

                
                <div className="mt-4">
                    <h3 className="font-semibold">Description</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
