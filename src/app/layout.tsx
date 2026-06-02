import type { Metadata } from "next";
import "./globals.scss";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

export const metadata: Metadata = {
  title: "Solution Expertise",
  description: "Solutions d'Expertise Médicale Professionnelle",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children, params }: any) {
  return (
    <html lang={params.lang}>
      <body>
        <Header lang={params.lang} />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
