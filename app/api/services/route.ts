import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapped = services.map((svc) => ({
      id: svc.id,
      name: svc.name,
      category: svc.category,
      description: svc.description || "",
      priceStart: svc.priceStart,
      duration: svc.duration || "",
      includes: svc.includes ? JSON.parse(svc.includes) : [],
      isActive: svc.isActive,
      createdAt: svc.createdAt.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const created = await prisma.service.create({
      data: {
        name: data.name,
        slug: generateSlug(data.name),
        category: data.category,
        description: data.description,
        priceStart: data.priceStart,
        duration: data.duration,
        includes: JSON.stringify(data.includes || []),
        isActive: data.isActive,
      },
    });

    const mapped = {
      id: created.id,
      name: created.name,
      category: created.category,
      description: created.description || "",
      priceStart: created.priceStart,
      duration: created.duration || "",
      includes: created.includes ? JSON.parse(created.includes) : [],
      isActive: created.isActive,
      createdAt: created.createdAt.toISOString(),
    };

    return NextResponse.json(mapped, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
