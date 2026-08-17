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
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C0A09",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vincent Van Coffee | Сеть премиальных кофеен в Иркутске",
  description:
    "Искусство спешелти кофе в Иркутске. 4 уникальные локации: Киевская, Красных Мадьяр, ТРЦ «Сильвермолл», МТЦ «Новый». Авторские напитки, завтраки, ремесленная выпечка и атмосфера галереи.",
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
    title: "Vincent Van Coffee | Живописный спешелти кофе в Иркутске",
    description:
      "4 атмосферные точки в Иркутске. Авторский кофе, премиальное спешелти зерно, завтраки весь день и эстетика Ван Гога.",
    url: "https://vancoffee.ru",
    siteName: "Vincent Van Coffee",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Van Coffee | Сеть кофеен в Иркутске",
    description: "Искусство спешелти кофе и 4 уникальные локации в Иркутске.",
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
      className={`${cormorant.variable} ${jakarta.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0C0A09] text-[#FAF7F2] font-sans antialiased min-h-screen selection:bg-[#D49B45] selection:text-[#0C0A09] relative">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
