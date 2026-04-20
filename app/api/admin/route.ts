/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDb } from "@/lib/db";
import { heroModel } from "@/models/hero";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDb();

    const heros = await heroModel.find().sort({ sortOrder: 1 });

    return NextResponse.json({ data: heros, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();

    const hero = await heroModel.create(body);

    return NextResponse.json({ data: hero, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const { id, ...updateData } = body;

    const updatedHero = await heroModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({ data: updatedHero, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}