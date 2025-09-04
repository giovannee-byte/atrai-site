import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  console.log('MP webhook:', JSON.stringify(body));
  // FUTURO: consultar o pagamento via API MP e registrar em um DB (ex.: Supabase)
  return NextResponse.json({ ok: true });
}
