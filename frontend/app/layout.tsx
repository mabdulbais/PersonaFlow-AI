import type { Metadata, Viewport } from "next";
import {
  Manrope,
  Instrument_Serif,
  Noto_Nastaliq_Urdu,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-nastaliq",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PersonaFlow AI — Communication, attuned.",
  description:
    "Adaptive communication intelligence. PersonaFlow reads tone, emotion, and intent — then rewrites your words to land exactly how you mean them.",
};

export const viewport: Viewport = {
  themeColor: "#0E0E10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${manrope.variable} ${instrumentSerif.variable} ${nastaliq.variable} ${naskh.variable}`}
    >
      <body className="font-sans bg-bg text-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
