import type { Metadata } from "next";
import "./globals.css";
import {
  Montserrat,
} from "next/font/google";
import { Providers } from "./providers";


const roboto = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zafalon - Videomaker em Cuiabá | Produção de Vídeos Profissionais",
  description: "Zafalon é um videomaker especializado em criação de vídeos criativos e profissionais em Cuiabá-MT. Entre em contato para transformar suas ideias em imagens incríveis!",
  keywords: "videomaker, produção de vídeos, videomaker Cuiabá, vídeos corporativos, vídeos publicitários, vídeos para empresas, produção audiovisual, Zafalon, Cuiabá MT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}><Providers>
          {children}
        </Providers></body>
    </html>
  );
}
