import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Agro Mandala Sinergi - Layanan Pengelolaan Lahan",
  description: "Optimalisasi Produktivitas Lahan dengan Praktik Pertanian Terintegrasi dan Berkelanjutan. Solusi pertanian modern untuk meningkatkan produktivitas lahan Anda.",
  keywords: ["pertanian", "pengelolaan lahan", "farm management", "Agromas", "budidaya", "pertanian terintegrasi"],
  authors: [{ name: "PT. Agro Mandala Sinergi" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Agro Mandala Sinergi - Layanan Pengelolaan Lahan",
    description: "Optimalisasi Produktivitas Lahan dengan Praktik Pertanian Terintegrasi dan Berkelanjutan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
