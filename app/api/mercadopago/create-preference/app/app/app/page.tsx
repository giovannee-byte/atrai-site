"use client";

import React, { useMemo, useState } from "react";

/**
 * Atrai — Landing Page (Next.js App Router + Tailwind)
 * - Programas focados em autoconfiança para relacionamentos
 * - Conteúdo diário automático (rotaciona por dia do ano)
 * - Botões "Comprar" chamam /api/mercadopago/create-preference (Checkout Pro)
 */

export default function Landing() {
  const [email, setEmail] = useState("");

  // Conteúdo diário — autoconfiança aplicada
  const dailyTips = [
    { title: "Micro-ação #1: Postura de Poder (2 min)", body: "Antes de falar com alguém, abra o peito, relaxe ombros e respire fundo. Seu corpo comunica confiança antes das palavras." },
    { title: "Micro-ação #2: Diário de Vitórias (3 itens)", body: "Anote 3 pequenas vitórias de hoje. Evidências acumuladas constroem autoestima estável." },
    { title: "Micro-ação #3: Respiração 4-7-8", body: "Inspire 4s, segure 7s, solte 8s. Reduz ativação e deixa sua presença mais serena em conversas." },
    { title: "Micro-ação #4: Reframe Interno", body: "Troque ‘e se eu errar?’ por ‘e se eu aprender?’. Curiosidade > medo." },
    { title: "Micro-ação #5: Micro-objetivo Social", body: "Cumprimente 1 pessoa com contato visual e sorriso genuíno. Progresso pequeno e consistente." },
    { title: "Micro-ação #6: Voz & Pausas", body: "Fale 10% mais devagar e pause após ideias. Pausas comunicam segurança." },
    { title: "Micro-ação #7: Roupa que te Veste", body: "Escolha uma peça que te faça sentir bem no corpo. Autoimagem elevada, linguagem corporal melhora." },
    { title: "Micro-ação #8: Autocompaixão", body: "Fale consigo como falaria com um amigo. Erros são dados, não sentenças." },
    { title: "Micro-ação #9: Exposição Gradual", body: "Escolha uma situação levemente desconfortável e pratique hoje (pequeno passo)." },
    { title: "Micro-ação #10: Script de Convite Claro", body: "“Topa um café na terça às 17h?” Clareza reduz ansiedade e aumenta respostas." },
    { title: "Micro-ação #11: Visualização Vitoriosa", body: "Por 3 min, veja-se calmo, sorrindo, escutando e conduzindo com leveza. Depois 1 ação real." },
    { title: "Micro-ação #12: Bio & Postura Digital", body: "Atualize 1 linha do perfil para refletir seus valores. Alinhe o online ao seu melhor offline." },
    { title: "Micro-ação #13: Rotina de Energia", body: "Sono, movimento e luz solar. Confiança é sustentada por fisiologia." },
    { title: "Micro-ação #14: Debrief sem Julgamento", body: "Após uma conversa, anote 1 ponto forte e 1 ajuste. Iterar > se criticar." },
  ];

  const tipIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff =
      (now.getTime() - start.getTime()) +
      ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return day % dailyTips.length;
  }, []);

  const tip = dailyTips[tipIndex];

  // Programas (SKUs alinhados ao backend)
  const products = [
    { sku: "atrai-21",        title: "Atrai 21 — Programa de Autoconfiança",        desc: "Sequência guiada de 21 dias com hábitos, desafios sociais graduais e métricas simples.", price: "R$ 79", amount: 79, badge: "Comece aqui" },
    { sku: "atrai-play",      title: "Atrai Play — Autoestima & Assertividade",     desc: "Mapas mentais, scripts éticos e checklists para falar com clareza e firmeza.",          price: "R$ 197", amount: 197, badge: "Mais vendido" },
    { sku: "atrai-audios",    title: "Atrai Áudios — Poder Pessoal",                desc: "4 trilhas: presença, confiança, serenidade e foco antes do contato.",                   price: "R$ 59", amount: 59 },
    { sku: "atrai-voz-corpo", title: "Atrai Voz & Corpo (7 dias)",                  desc: "Treino de voz, pausas, ritmo e linguagem corporal para carisma natural.",               price: "R$ 97", amount: 97 },
    { sku: "atrai-diario",    title: "Atrai Diário — Vitórias (PDF + Prompts)",     desc: "Modelo imprimível + 60 prompts para consolidar autoestima baseada em evidências.",     price: "R$ 39", amount: 39 },
    { sku: "atrai-premium",   title: "Atrai Premium — Assinatura",                  desc: "Conteúdo diário, desafios e Q&A mensal. Cancele quando quiser.",                        price: "R$ 39/mês", amount: 39, recurring: true, badge: "Assinatura" },
  ];

  function onSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Inscrição recebida! Em breve você receberá seu insight diário.");
    setEmail("");
  }

  async function buy(sku: string) {
    try {
      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, quantity: 1 }),
      });
      const data = await res.json();
      if (data?.init_point) {
        window.location.href = data.init_point; // Checkout Pro
      } else if (data?.point_of_interaction?.transaction_data?.ticket_url) {
        window.open(data.point_of_interaction.transaction_data.ticket_url, "_blank");
      } else {
        alert("Não foi possível iniciar o pagamento agora. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao conectar com o Mercado Pago.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 text-slate-900">
      <Nav />
      <Hero />

      {/* Pilares */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Autoconfiança baseada em evidências",
            "Assertividade & limites saudáveis",
            "Linguagem corporal e voz",
            "Mindset de crescimento (Lei da Atração prática)",
            "Hábitos & energia diária",
          ].map((p) => (
            <div
              key={p}
              className="rounded-2xl border bg-white/70 p-4 text-center text-sm shadow-sm backdrop-blur"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Programas */}
      <section id="produtos" className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Programas de Autoconfiança</h2>
          <p className="mt-2 text-slate-600">
            Programas práticos e aplicáveis para construir autoestima, presença e confiança social — sem promessas milagrosas.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              {p.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                  {p.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">{p.price}</span>
                <button
                  onClick={() => buy(p.sku)}
                  className="rounded-xl border border-rose-300 bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500"
                >
                  Comprar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Conteúdo diário */}
      <section id="diario" className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Conteúdo do dia</h2>
          <p className="mt-1 text-slate-600">Uma ação pequena hoje &gt; 100 intenções amanhã.</p>
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 p-6">
            <h3 className="text-xl font-semibold">{tip.title}</h3>
            <p className="mt-2 text-slate-700">{tip.body}</p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { name: "João",   quote: "Em duas semanas parei de me sabotar. Minha voz ficou firme e as conversas fluem." },
            { name: "Laila",  quote: "Os exercícios diários são simples e poderosos. Hoje me sinto preparada para convidar sem medo." },
            { name: "Rafael", quote: "Aprendi a pausar, ouvir e falar com clareza. A autoconfiança virou hábito." },
          ].map((t) => (
            <figure key={t.name} className="rounded-3xl border bg-white p-6 shadow-sm">
              <blockquote className="text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Ética & LGPD */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Princípios éticos</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>Respeito, consentimento e bem-estar emocional acima de qualquer técnica.</li>
            <li>Sem promessas irreais. Progresso incremental e sustentável.</li>
            <li>LGPD: dados tratados com transparência e opção de descadastro a qualquer momento.</li>
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <section id="inscricao" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Receba um insight diário de autoconfiança (Atrai)</h2>
          <p className="mt-1 text-slate-600">Envio em horário comercial, com 1 ação prática por dia.</p>
          <form onSubmit={onSubscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full flex-1 rounded-xl border px-4 py-3 outline-none ring-rose-300 focus:ring"
            />
            <button
              type="submit"
              className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-500"
            >
              Quero receber
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-bold">Atrai</span>
        </a>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#produtos" className="hover:underline">Programas</a>
          <a href="#diario" className="hover:underline">Conteúdo diário</a>
          <a href="#inscricao" className="hover:underline">Newsletter</a>
        </nav>
        <a
          href="#produtos"
          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500"
        >
          Começar agora
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroArt />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Autoconfiança que conecta. <span className="text-rose-600">Relacionamentos com leveza.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Programas práticos para elevar autoestima, presença e comunicação — baseados em psicologia,
            ciência do comportamento e estratégia ética. Sem jogos, sem promessas milagrosas.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#produtos"
              className="rounded-xl bg-rose-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-rose-500"
            >
              Ver programas
            </a>
            <a
              href="#diario"
              className="rounded-xl border border-rose-300 bg-white px-6 py-3 text-center font-semibold text-rose-700 shadow-sm transition hover:bg-rose-50"
            >
              Conteúdo do dia
            </a>
          </div>
        </div>
        <div className="relative">
          <ImpactImage />
        </div>
      </div>
    </section>
  );
}

function ImpactImage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox="0 0 600 600" className="h-full w-full">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fda4af" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff1f2" stopOpacity="0.6" />
          </radialGradient>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>
        <g filter="url(#blur)">
          <path
            d="M300 500 C 50 360, 60 180, 180 140 C 260 120, 300 200, 300 220 C 300 200, 340 120, 420 140 C 540 180, 550 360, 300 500 Z"
            fill="url(#g)"
          />
        </g>
        <circle cx="220" cy="210" r="6" fill="white" opacity="0.8" />
        <circle cx="380" cy="210" r="4" fill="white" opacity="0.7" />
        <circle cx="300" cy="300" r="3" fill="white" opacity="0.6" />
      </svg>
      <div className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function HeroArt() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#lg)" />
      <path d="M0,500 C300,420 900,580 1200,500 L1200,600 L0,600 Z" fill="#fff" opacity="0.6" />
      <path d="M0,520 C300,460 900,600 1200,520 L1200,600 L0,600 Z" fill="#fff" opacity="0.4" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white/70">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-600">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Atrai — Autoconfiança que conecta. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Termos</a>
            <a href="#" className="hover:underline">Privacidade (LGPD)</a>
            <a href="#" className="hover:underline">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20c-5-3-8-5.5-8-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.5-3 6-8 9z" fill="#fb7185" />
    </svg>
  );
}
