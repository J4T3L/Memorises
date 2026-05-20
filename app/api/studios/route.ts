import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const studios = await prisma.studio.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapped = studios.map((st) => ({
      id: st.id,
      name: st.name,
      description: st.description || "",
      pricePerHour: st.pricePerHour,
      capacity: st.capacity,
      facilities: st.facilities ? JSON.parse(st.facilities) : [],
      isActive: st.isActive,
      createdAt: st.createdAt.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching studios:", error);
    return NextResponse.json({ error: "Failed to fetch studios" }, { status: 500 });
  }
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const created = await prisma.studio.create({
      data: {
        name: data.name,
        slug: generateSlug(data.name),
        description: data.description,
        pricePerHour: data.pricePerHour,
        capacity: data.capacity,
        facilities: JSON.stringify(data.facilities || []),
        isActive: data.isActive,
      },
    });

    const mapped = {
      id: created.id,
      name: created.name,
      description: created.description || "",
      pricePerHour: created.pricePerHour,
      capacity: created.capacity,
      facilities: created.facilities ? JSON.parse(created.facilities) : [],
      isActive: created.isActive,
      createdAt: created.createdAt.toISOString(),
    };

    return NextResponse.json(mapped, { status: 201 });
  } catch (error) {
    console.error("Error creating studio:", error);
    return NextResponse.json({ error: "Failed to create studio" }, { status: 500 });
  }
}
