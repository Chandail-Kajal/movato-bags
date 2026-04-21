/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDb } from "@/lib/db";
import HeroBanner from "@/models/HeroBanner";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./public/uploads";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

export async function GET() {
  try {
    await connectDb();

    const heros = await HeroBanner.find().sort({ order: 1 });

    return NextResponse.json({ data: heros, success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}




export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const primaryBtn = formData.get("primaryBtn") as string;
    const secondaryBtn = formData.get("secondaryBtn") as string;
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

    const hero = await HeroBanner.create({
      title,
      description,
      primaryBtn,
      secondaryBtn,
      order,
      image: imagePath, // optional
    });

    return NextResponse.json({ data: hero, success: true });
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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const primaryBtn = formData.get("primaryBtn") as string;
    const secondaryBtn = formData.get("secondaryBtn") as string;

    const file = formData.get("image") as File | null;

    const updateData: any = {
      title,
      description,
      primaryBtn,
      secondaryBtn,
    };

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = `./public/uploads/${fileName}`;

      fs.writeFileSync(uploadPath, buffer);

      updateData.image = `/uploads/${fileName}`;
    }

    const updatedHero = await HeroBanner.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({ data: updatedHero, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDb();

    const { id, isActive } = await req.json();

    const updated = await HeroBanner.findByIdAndUpdate(
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