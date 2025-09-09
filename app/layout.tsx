import "./globals.css";

export const metadata = {
  title: "Atrai — Autoconfiança que conecta",
  description: "Programas práticos de autoconfiança para relacionamentos com leveza.",
  openGraph: {
    title: "Atrai — Autoconfiança que conecta",
    siteName: "Atrai",
  },
  twitter: { card: "summary_large_image", title: "Atrai" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  );
}
