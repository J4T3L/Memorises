import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const existing = await prisma.studio.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 });
    }

    const updated = await prisma.studio.update({
      where: { id },
      data: {
        name: data.name !== undefined ? data.name : existing.name,
        description: data.description !== undefined ? data.description : existing.description,
        pricePerHour: data.pricePerHour !== undefined ? data.pricePerHour : existing.pricePerHour,
        capacity: data.capacity !== undefined ? data.capacity : existing.capacity,
        facilities: data.facilities !== undefined ? JSON.stringify(data.facilities || []) : existing.facilities,
        image: data.image !== undefined ? data.image : existing.image,
        isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
      },
    });

    const mapped = {
      id: updated.id,
      name: updated.name,
      description: updated.description || "",
      pricePerHour: updated.pricePerHour,
      capacity: updated.capacity,
      facilities: updated.facilities ? JSON.parse(updated.facilities) : [],
      image: updated.image || "",
      isActive: updated.isActive,
      createdAt: updated.createdAt.toISOString(),
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error updating studio:", error);
    return NextResponse.json({ error: "Failed to update studio" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.studio.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 });
    }

    // Check if there are active bookings
    const hasBookings = await prisma.studioBooking.findFirst({
      where: { studioId: id },
    });

    if (hasBookings) {
      await prisma.studio.update({
        where: { id },
        data: { isActive: false },
      });
      return NextResponse.json({ message: "Studio contains active bookings. Marked as inactive instead of deleting." });
    }

    await prisma.studio.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Studio deleted successfully" });
  } catch (error) {
    console.error("Error deleting studio:", error);
    return NextResponse.json({ error: "Failed to delete studio" }, { status: 500 });
  }
}
