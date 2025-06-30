import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const stores = await prisma.store.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(stores);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const store = await prisma.store.create({ data });
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
} 