import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const imageDir = path.join(process.cwd(), "public/images");
    const files = await fs.readdir(imageDir);
    
    // Filtrer uniquement les images (jpg, png, etc.)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    );

    return NextResponse.json(imageFiles);
  } catch (error) {
    return NextResponse.json({ error: "Could not read images" }, { status: 500 });
  }
}