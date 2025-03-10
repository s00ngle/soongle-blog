import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Head from "next/head";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Soongle",
    default: "Soongle",
  },
  description: "Soongle's blog",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon-apple.png",
  },
  openGraph: {
    title: "Soongle Blog",
    description:
      "Welcome to Soongle Blog, a place where I share insights on coding and technology.",
    url: "https://soongle.vercel.app/",
    images: [
      {
        url: "https://soongle.vercel.app/og-banana-image.png",
        width: 1200,
        height: 630,
        alt: "Soongle Blog",
      },
    ],
    siteName: "Soongle",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-hide">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon-apple.png" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <Header />

        {children}

        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
