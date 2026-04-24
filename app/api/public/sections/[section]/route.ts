/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDb } from "@/lib/db";
import { HeroSectionModel, ShopSectionModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    await connectDb();
    const { section } = await params;
    const searchParams = req.nextUrl.searchParams;


    console.log("GOT REQUEST", section)
    let data: any[] = []
    if (section === "hero") {
      data = await HeroSectionModel
        .find({ isActive: true })
        .sort({ order: 1 });
    } else if (section === "featured") {
      // data = 
    } else if (section === "shop") {
      const categoryType = searchParams.get("categorytype");
      const query: any = { isActive: true };

      if (categoryType) {
        query.categoryType = categoryType;
      }

      data = await ShopSectionModel.find(query).sort({ order: 1 });
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}