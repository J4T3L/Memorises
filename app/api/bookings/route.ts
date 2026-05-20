import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.studioBooking.findMany({
      orderBy: { date: "asc" },
      include: {
        user: { select: { name: true } },
        studio: { select: { name: true } },
      }
    });

    const mapped = bookings.map(b => ({
      id: b.id,
      user: b.user.name,
      studio: b.studio.name,
      date: b.date.toISOString().split("T")[0],
      startTime: b.startTime,
      endTime: b.endTime,
      duration: b.duration,
      status: b.status,
      totalPrice: b.totalPrice,
      notes: b.notes,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
