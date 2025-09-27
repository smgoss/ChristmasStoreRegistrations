import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@/lib/amplify';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christmas Store Registration",
  description: "Register for the Christmas Store event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
