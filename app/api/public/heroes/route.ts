/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDb } from "@/lib/db";
import HeroBanner from "@/models/HeroBanner";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const heros = await HeroBanner
      .find({ isActive: true })
      .sort({ order: 1 });

    return NextResponse.json({ data: heros, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}