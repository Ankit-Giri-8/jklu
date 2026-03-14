import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeriFlow - Verify the Truth in Seconds",
  description: "Combat misinformation with neural-network analysis. Real-time fake news detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-black text-zinc-100 antialiased selection:bg-orange-500/30 selection:text-orange-200`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
