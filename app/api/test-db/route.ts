import { NextResponse } from 'next/server';
import pool from '@/src/utils/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()');
    return NextResponse.json({ time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}