export const runtime = "nodejs";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";


const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
];


const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        const uploadPath = "./public/uploads";

        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});


const fileFilter = (req: any, file: any, cb: any) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only SVG, PNG, JPG, JPEG files are allowed"), false);
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, 
    },
});


function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}


export async function POST(req: NextRequest) {
    try {
        const reqAny = req as any;
        const resAny = {} as any;

        await runMiddleware(reqAny, resAny, upload.single("file"));

        const file = reqAny.file;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            url: `/uploads/${file.filename}`, 
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Upload failed",
            },
            { status: 500 }
        );
    }
}