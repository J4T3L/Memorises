import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const queryInfo: any = {
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        items: true,
      },
    };

    if (userId) {
      queryInfo.where = { userId };
    }

    const orders = (await prisma.order.findMany(queryInfo)) as any[];

    const mapped = orders.map((o) => ({
      id: o.orderNumber,
      dbId: o.id,
      user: o.user.name,
      amount: "Rp " + o.totalAmount.toLocaleString("id-ID"),
      status: o.status === "PENDING" ? "Menunggu Pembayaran" : 
              o.status === "PROCESSING" ? "Diproses" : 
              o.status === "ACTIVE" ? "Aktif" : 
              o.status === "COMPLETED" ? "Selesai" : 
              o.status === "CANCELLED" ? "Dibatalkan" : "Menunggu",
      date: o.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      itemStr: o.items.length > 0 ? (o.items.length > 1 ? `${o.items.length} item dipesan` : "Pesanan Layanan/Sewa") : "Detail",
      userId: o.userId,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
