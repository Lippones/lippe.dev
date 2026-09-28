import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const title = "Filipe Vieira — Mobile & Full-stack Developer";
const description =
  "Desenvolvedor mobile e full-stack em Minas Gerais. React Native, Next.js e Node com TypeScript, da API ao app. Hoje tech lead de mobile e backoffice na Inbazz.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lippe.dev"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Filipe Vieira",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#191919",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
