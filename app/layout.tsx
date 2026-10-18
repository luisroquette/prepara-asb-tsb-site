import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prepara ASB/TSB | Sua vaga começa com um plano",
  description:
    "Preparação para concursos de Auxiliar e Técnico em Saúde Bucal com aulas objetivas, questões comentadas e cronograma de estudos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
