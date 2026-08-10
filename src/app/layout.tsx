import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Istanbul Meubles — Niamey, Niger",
  description: "Meubles et décoration d'intérieur de qualité à Niamey. Livraison au Niger et en Afrique de l'Ouest.",
  keywords: "meubles, décoration, niamey, niger, salon, chambre, bureau",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geistSans.variable}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
