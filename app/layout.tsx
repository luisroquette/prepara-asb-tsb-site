import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prepara-asb-tsb.vercel.app"),
  title: "Prepara ASB/TSB | Sua vaga começa com um plano",
  description:
    "Preparação para concursos de Auxiliar e Técnico em Saúde Bucal com aulas objetivas, questões comentadas e cronograma de estudos.",
  openGraph: {
    title: "Prepara ASB/TSB | Sua vaga começa com um plano",
    description: "Aulas objetivas, questões comentadas e um plano possível para concursos de ASB e TSB.",
    url: "/",
    siteName: "Prepara ASB/TSB",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/social-preview.png", width: 1200, height: 630, alt: "Prepara ASB/TSB: sua vaga em saúde bucal começa com um plano" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/social-preview.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
