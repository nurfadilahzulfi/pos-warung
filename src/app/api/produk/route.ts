import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const produk = await prisma.produk.findMany({
    include: {
      kategori: true,
    },
  })
  return NextResponse.json(produk)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nama, harga, stok, kategoriId } = body

  const newProduk = await prisma.produk.create({
    data: {
      nama,
      harga,
      stok,
      kategori: {
        connect: { id: kategoriId },
      },
    },
  })

  return NextResponse.json(newProduk)
}
