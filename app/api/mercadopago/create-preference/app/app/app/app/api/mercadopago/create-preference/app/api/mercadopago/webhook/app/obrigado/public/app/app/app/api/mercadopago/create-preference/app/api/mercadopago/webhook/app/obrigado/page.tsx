"use client";
import { useSearchParams } from "next/navigation";

export default function Obrigado() {
  const p = useSearchParams();
  const sku = p.get("sku") || "";
  const status = p.get("status") || "approved";

  const mapa: Record<string, { titulo: string; entrega: string }> = {
    "atrai-21":        { titulo: "Atrai 21 — Programa de Autoconfiança",       entrega: "Você receberá o acesso por e-mail e na área do cliente." },
    "atrai-play":      { titulo: "Atrai Play — Autoestima & Assertividade",    entrega: "Link do Playbook será enviado ao seu e-mail." },
    "atrai-audios":    { titulo: "Atrai Áudios — Poder Pessoal",               entrega: "Baixe os áudios no link enviado por e-mail." },
    "atrai-voz-corpo": { titulo: "Atrai Voz & Corpo (7 dias)",                 entrega: "Calendário e vídeos liberados por e-mail." },
    "atrai-diario":    { titulo: "Atrai Diário — Vitórias",                    entrega: "PDF disponível por link seguro enviado ao e-mail." },
    "atrai-premium":   { titulo: "Atrai Premium — Assinatura",                 entrega: "Você receberá login da área Premium no e-mail." }
  };

  const item = mapa[sku] || { titulo: "Seu produto", entrega: "Em instantes, você receberá o acesso por e-mail." };

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Obrigado pela compra!</h1>
      <p className="mt-2 text-slate-600">Status: <b>{status}</b></p>
      <div className="mt-6 rounded-2xl border p-6 bg-white">
        <h2 className="text-xl font-semibold">{item.titulo}</h2>
        <p className="mt-2 text-slate-700">{item.entrega}</p>
        <p className="mt-4 text-slate-600">
          Dúvidas: <a className="underline" href="mailto:oi@atrai.com.br">oi@atrai.com.br</a>
        </p>
      </div>
    </main>
  );
}
