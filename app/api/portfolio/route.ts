import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, category, image, description, isFeatured } = data;

    if (!title || !category || !image) {
      return NextResponse.json({ error: "Missing required fields: title, category, and image are required" }, { status: 400 });
    }

    const created = await prisma.portfolio.create({
      data: {
        title,
        category,
        image,
        description: description || null,
        isFeatured: typeof isFeatured === "boolean" ? isFeatured : false,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
