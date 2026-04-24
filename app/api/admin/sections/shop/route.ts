/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import { ShopSectionModel } from "@/models";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const ensureUploadDir = () => {
  const dir = "./public/uploads";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const uploadImage = async (file: any) => {
  ensureUploadDir()

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const uploadPath = `./public/uploads/${fileName}`;

  fs.writeFileSync(uploadPath, buffer);
  return `/uploads/${fileName}`;
}

export async function GET() {
  try {
    await connectDb();

    const data = await ShopSectionModel.find().sort({ order: 1 });

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const formData = await req.formData();

    const imageFile = formData.get("image") as File;
    const categoryType = formData.get("categoryType") as string;
    const buttonTitle = formData.get("buttonTitle") as string;
    const caption = formData.get("caption") as string;
    const order = Number(formData.get("order") || 0);

    if (!categoryType) {
      return NextResponse.json(
        { success: false, message: "categoryType required" },
        { status: 400 }
      );
    }

    const imageUrl = imageFile
      ? await uploadImage(imageFile)
      : "";

    const item = await ShopSectionModel.create({
      image: imageUrl,
      categoryType,
      buttonTitle,
      caption,
      order,
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const formData = await req.formData();

    const id = formData.get("id") as string;
    const imageFile = formData.get("image") as File;
    const categoryType = formData.get("categoryType") as string;
    const buttonTitle = formData.get("buttonTitle") as string;
    const caption = formData.get("caption") as string;

    const updateData: any = {
      categoryType,
      buttonTitle,
      caption,
    };

    if (imageFile && imageFile.size > 0) {
      updateData.image = await uploadImage(imageFile);
    }

    const updated = await ShopSectionModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
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

    const updated = await ShopSectionModel.findByIdAndUpdate(
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

    const item = await ShopSectionModel.findById(id);


    if (item?.image) {
      const filePath = `./public${item.image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await ShopSectionModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}