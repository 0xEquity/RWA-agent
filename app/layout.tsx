import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers/AppContex";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "0xequity Agent",
  description: "Agent powered by 0xequity"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>0xequity Agent</title>
        <meta name="description" content="Agent powered by 0xequity" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <AppProviders>
          <header className="p-6 flex items-center justify-center relative">
            <img
              src="https://cdn.prod.website-files.com/6680bd18ac8704e3e2a1b0bd/6680bd18ac8704e3e2a1b10d_Logo.svg"
              width={180}
              height={180}
              alt="0xequity"
            />
          </header>

          <main className="flex-grow flex items-center justify-center px-4">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
