import { connectDb } from "@/lib/db";
import { heroModel } from "@/models/hero";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    try {
        await connectDb();
        const heros =await heroModel.find({isActive:true})
     return  NextResponse.json({data:heros,success:true})
        
    } catch (error) {
        return NextResponse.json({success:false},{status:500});
    }
}