import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET semua kategori
export async function GET() {
  const kategori = await prisma.kategori.findMany()
  return NextResponse.json(kategori)
}

// POST kategori baru
export async function POST(req: Request) {
  const body = await req.json()
  const { nama } = body

  const newKategori = await prisma.kategori.create({
    data: { nama },
  })

  return NextResponse.json(newKategori)
}
