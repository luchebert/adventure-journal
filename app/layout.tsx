import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "My Adventure Journal",
  description: "My Adventure Journal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryProvider>
          <div className="min-h-screen bg-gray-100 grid grid-rows-[auto,1fr,auto]">
            <Header />
            {children}
          </div>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
