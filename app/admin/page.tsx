"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTable } from "@/components/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

type hero =
    {
        imageurl: string;
        primaryText: string;
        captionText: string;
        primaryButtonText: string;
        primaryButtonLink: string;
        secondaryButtonText: string;
        secondaryButtonLink: string;
    }
    ;

export default function Admin() {
    const data: hero[] = [
        {
            captionText: "fchgvjjk",
            primaryButtonLink: "fchgvhbvn",
            imageurl: "/assets/hero/hero-1.jpg",
            primaryButtonText: "dxfgchvbj",
            secondaryButtonLink: "xdgfchgvjhb",
            primaryText: "dvbhj",
            secondaryButtonText: "ds"
        }
    ];

    return (
        <div>
            <DataTable columns={[
                { label: "Image", dataIndex: "imageurl",render:(imageurl)=>{return <img src={imageurl} className="h-10 w-14"/>} },
                { label: "Primary Text", dataIndex: "primaryText" },
                { label: "Primary Button Link", dataIndex: "primaryButtonLink" },
                { label: "Caption Text", dataIndex: "captionText" },
                { label: "Primary Button Text", dataIndex:"primaryButtonText" },
                {label:"Secondary Button Text",dataIndex:"secondaryButtonText"},
                {label:"Secondary Button Link",dataIndex:"secondaryButtonLink"},
                {label:"action",render:()=>{return <div className="flex gap-2">
                    <button className="bg-red-500 p-1.5 text-white rounded-md"> <FaTrash size={20}></FaTrash></button>
                    <button className="bg-amber-400 p-1.5 text-white rounded-md"><FaEdit size={20}></FaEdit></button>
                    </div>}}
            ]}

                data={data} />
        </div>
    )
}