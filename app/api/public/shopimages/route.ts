/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { shopModel } from "@/models/ShopYourLuggage";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const items = await shopModel
      .find({ isActive: true }) 
      .sort({ order: 1 });      

    return NextResponse.json({ data: items, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}