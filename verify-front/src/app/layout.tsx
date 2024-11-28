import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toastProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Verify",
  description: "Especialista em verificação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}