import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers/AppContex";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "0xequity Agent",
  description: "Agent powered by 0xequity"
};

const BASE_URL = process.env.BASE_URL;

const NavbarItems = [
  {
    label: "Swap",
    href: "/buy-sell"
  },

  {
    label: "Listings",
    href: "/listings"
  },
  {
    label: "Pools",
    href: "/pools"
  },
  {
    label: "Portfolio",
    href: "/portfolio"
  },
  {
    label: "Analytics",
    href: "/analytics"
  },
  {
    label: "Loans",
    href: "/loans"
  },
  {
    label: "Blog",
    href: "https://www.0xequity.com/blog"
  }
];

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
          <header className="p-6 flex items-center justify-between relative mb-8">
            <img src="/logo.svg" />
            <div className="flex gap-12">
              {NavbarItems.map((item) => {
                const isExternal = item.href.startsWith("http");
                const fullHref = isExternal ? item.href : `${BASE_URL}${item.href}`;
                return (
                  <Link
                    target="_blank"
                    key={item.label}
                    href={fullHref}
                    className=" text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex gap-6">
              <Link
                href="https://www.instagram.com/0xequityRWA"
                target="_blank"
              >
                <img src="/instagram.svg" className="w-5 h-5" />
              </Link>
              <Link href="https://t.me/oxequityRWA" target="_blank">
                <img src="/telegram.svg" className="w-5 h-5" />
              </Link>
              <Link href="https://x.com/0xequityRWA" target="_blank">
                <img src="/twitter.svg" className="w-5 h-5" />
              </Link>
            </div>
          </header>

          <main className="flex-grow flex items-center justify-center px-4">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
