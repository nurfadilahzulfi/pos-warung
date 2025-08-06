import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const riwayat = await prisma.transaksi.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        itemTransaksi: {
          include: { produk: true }
        }
      }
    });

    return NextResponse.json(riwayat, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Gagal mengambil riwayat transaksi' }, { status: 500 });
  }
}
