import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  cookies().set('user_id', String(user.id), { path: '/' })

  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}