import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soongle",
    default: "Soongle",
  },
  description: "Soongle's blog",
  openGraph: {
    title: "Soongle Blog",
    description:
      "Welcome to Soongle Blog, a place where I share insights on coding and technology.",
    url: "https://soongle.vercel.app/",
    images: [
      {
        url: "https://soongle.vercel.app/hamster.png",
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
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
