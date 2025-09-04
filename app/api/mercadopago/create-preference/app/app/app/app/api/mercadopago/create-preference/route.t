import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const CATALOG: Record<string, { title: string; price: number; recurring?: boolean }> = {
  'atrai-21':        { title: 'Atrai 21 — Programa de Autoconfiança',       price: 79 },
  'atrai-play':      { title: 'Atrai Play — Autoestima & Assertividade',    price: 197 },
  'atrai-audios':    { title: 'Atrai Áudios — Poder Pessoal',               price: 59 },
  'atrai-voz-corpo': { title: 'Atrai Voz & Corpo (7 dias)',                 price: 97 },
  'atrai-diario':    { title: 'Atrai Diário — Vitórias (PDF + Prompts)',    price: 39 },
  'atrai-premium':   { title: 'Atrai Premium — Assinatura',                 price: 39, recurring: true }
};

export async function POST(req: NextRequest) {
  try {
    const { sku, quantity = 1 } = await req.json();
    const item = CATALOG[sku];
    if (!item) return NextResponse.json({ error: 'SKU inválido' }, { status: 400 });

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
    const preference = new Preference(client);

    const pref = await preference.create({
      body: {
        items: [{ title: item.title, quantity, unit_price: item.price, currency_id: 'BRL' }],
        metadata: { sku },
        auto_return: 'approved',
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/obrigado?sku=${sku}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/obrigado?sku=${sku}&status=failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/obrigado?sku=${sku}&status=pending`
        },
        notification_url: process.env.MP_WEBHOOK_URL || undefined,
        statement_descriptor: 'Atrai'
      }
    });

    return NextResponse.json({ id: pref.id, init_point: pref.init_point, sandbox_init_point: pref.sandbox_init_point });
  } catch (e: any) {
    console.error('MP error', e?.message || e);
    return NextResponse.json({ error: 'Erro ao criar preferência' }, { status: 500 });
  }
}
