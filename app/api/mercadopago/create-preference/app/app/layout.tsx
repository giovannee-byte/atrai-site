export const metadata = {
  title: "Atrai — Autoconfiança que conecta",
  description: "Programas práticos de autoconfiança para relacionamentos com leveza."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head />
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  );
}
