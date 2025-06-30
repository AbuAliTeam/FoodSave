import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, include: { store: true } });
  const productsWithCoordinates = products.map(product => ({
    ...product,
    store: product.store ? {
      ...product.store,
      coordinates: {
        lat: product.store.lat,
        lng: product.store.lng
      }
    } : null
  }));
  return NextResponse.json(productsWithCoordinates);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const product = await prisma.product.create({ data });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
} 