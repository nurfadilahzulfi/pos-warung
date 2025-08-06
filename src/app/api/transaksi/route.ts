import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { total, bayar, kembalian, items } = await request.json()

  try {
    const transaksi = await prisma.transaksi.create({
      data: {
        total,
        bayar,
        kembalian,
        itemTransaksi: {
          create: items.map((item: any) => ({
            produk: { connect: { id: item.id } },
            jumlah: item.qty,
            subTotal: item.subTotal,
          })),
        },
      },
    })

    // Kurangi stok produk
    for (const item of items) {
      await prisma.produk.update({
        where: { id: item.id },
        data: {
          stok: {
            decrement: item.qty,
          },
        },
      })
    }

    return NextResponse.json({ id: transaksi.id }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menyimpan transaksi.' },
      { status: 500 }
    )
  }
}
