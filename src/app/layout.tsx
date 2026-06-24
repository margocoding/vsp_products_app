import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { CheckCircle2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import CartDrawer from "@/components/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "AllRailways";
const siteDesc = "All Railways — профессиональное железнодорожное оборудование и комплектующие с доставкой по всей России.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: siteDesc,
  keywords: [
    "allrailways",
    "железнодорожное оборудование",
    "комплектующие для поездов",
    "рельсы",
    "шпалы",
    "магазин",
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName,
    title: siteName,
    description: siteDesc,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <CartDrawer/>
        {children}
        <ToastContainer
          position="top-right"
          toastClassName="bg-black/90 backdrop-blur-xl border border-red-500/30 text-white rounded-lg shadow-[0_0_20px_rgba(255,40,40,0.15)]"
          progressClassName="bg-red-500"
          icon={<CheckCircle2 className="text-red-500" size={20} />}
        />
      </body>
    </html>
  );
}