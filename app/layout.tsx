import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/store/Provider";
import AppLayout from "@/layout/layout";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharon Quiz",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${noto.className} h-full bg-gray-100 `}>
        <AppLayout />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
