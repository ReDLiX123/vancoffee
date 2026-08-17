import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF4ED",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vincent Van Coffee | Сеть кофеен в Иркутске",
  description:
    "Живописный спешелти кофе в Иркутске. 4 уникальные локации: Киевская (Loft), ТРЦ «Сильвермолл» (Scandi), МТЦ «Новый» (Urban Night), Красных Мадьяр (Art Pop).",
  keywords: [
    "кофейня Иркутск",
    "Vincent Van Coffee",
    "спешелти кофе Иркутск",
    "кофе на Киевской",
    "кофе Сильвермолл",
    "кофейня Красных Мадьяр",
    "авторский раф",
    "завтраки Иркутск",
    "лучший кофе Иркутск",
  ],
  authors: [{ name: "Vincent Van Coffee" }],
  openGraph: {
    title: "Vincent Van Coffee | Сеть кофеен в Иркутске",
    description:
      "4 атмосферные точки в Иркутске. Авторский кофе, спешелти зерно свежей обжарки и 4 индивидуальные визуальные темы.",
    url: "https://redlix123.github.io/vancoffee/",
    siteName: "Vincent Van Coffee",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Van Coffee | Сеть кофеен в Иркутске",
    description: "Живописный спешелти кофе и 4 концептуальных локации в Иркутске.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased min-h-screen relative transition-colors duration-500"
        suppressHydrationWarning
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
