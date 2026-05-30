import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        name: data.name !== undefined ? data.name : existing.name,
        category: data.category !== undefined ? data.category : existing.category,
        description: data.description !== undefined ? data.description : existing.description,
        priceStart: data.priceStart !== undefined ? data.priceStart : existing.priceStart,
        duration: data.duration !== undefined ? data.duration : existing.duration,
        includes: data.includes !== undefined ? JSON.stringify(data.includes || []) : existing.includes,
        isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
      },
    });

    const mapped = {
      id: updated.id,
      name: updated.name,
      category: updated.category,
      description: updated.description || "",
      priceStart: updated.priceStart,
      duration: updated.duration || "",
      includes: updated.includes ? JSON.parse(updated.includes) : [],
      isActive: updated.isActive,
      createdAt: updated.createdAt.toISOString(),
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Check if there are related orders using this service
    const hasOrders = await prisma.orderItem.findFirst({
      where: { serviceId: id },
    });

    if (hasOrders) {
      await prisma.service.update({
        where: { id },
        data: { isActive: false },
      });
      return NextResponse.json({ message: "Service contains active bookings. Marked as inactive instead of deleting." });
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
