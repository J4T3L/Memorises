import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, category, image, description, isFeatured } = data;

    const existing = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        category: category !== undefined ? category : existing.category,
        image: image !== undefined ? image : existing.image,
        description: description !== undefined ? description : existing.description,
        isFeatured: typeof isFeatured === "boolean" ? isFeatured : existing.isFeatured,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
  }
}
