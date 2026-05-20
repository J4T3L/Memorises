import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapped = users.map((ur) => {
      const { password, ...details } = ur;
      return {
        ...details,
        role: details.role.toLowerCase(), // frontend uses lowercase roles
        joinedAt: details.createdAt.toISOString().split("T")[0],
      };
    });

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
