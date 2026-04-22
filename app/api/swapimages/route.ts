/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { shopModel } from "@/models/ShopYourLuggage";

// ✅ Ensure upload folder exists
const ensureUploadDir = () => {
  const dir = "./public/uploads";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// =======================
// ✅ GET (Fetch All)
// =======================
export async function GET() {
  try {
    await connectDb();

    const data = await shopModel.find().sort({ order: 1 });

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDb();
    ensureUploadDir();

    const formData = await req.formData();
    const order = Number(formData.get("order"));
    const file = formData.get("image") as File | null;

    let imagePath = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = `./public/uploads/${fileName}`;

      fs.writeFileSync(uploadPath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const item = await shopModel.create({
      order,
      image: imagePath,
      isActive: true,
    });

    return NextResponse.json({ data: item, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    ensureUploadDir();

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const file = formData.get("image") as File | null;

    let updateData: any = {};

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = `./public/uploads/${fileName}`;

      fs.writeFileSync(uploadPath, buffer);

      updateData.image = `/uploads/${fileName}`;
    }

    const updated = await shopModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({ data: updated, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const { id, isActive } = body;

    const updated = await shopModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    return NextResponse.json({ data: updated, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const item = await shopModel.findById(id);

    // 🧹 delete image file
    if (item?.image) {
      const filePath = `./public${item.image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await shopModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}