import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { AppDataProvider } from "./context/AppDataContext";
import WhatsAppWidget from "./components/WhatsAppWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOKUS — Sewa Kamera, Studio & Jasa Fotografi Profesional",
  description:
    "Fokus menyediakan layanan sewa kamera profesional, studio foto modern, dan jasa fotografi berkualitas tinggi. Wujudkan momen terbaik Anda bersama kami.",
  keywords: "sewa kamera, studio foto, jasa foto, fotografi profesional, rental kamera, photography service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          <AppDataProvider>
            {children}
            <WhatsAppWidget />
          </AppDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
