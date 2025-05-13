import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers/AppContex";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "Onchain Agent",
  description: "Agent powered by AgentKit",
};

/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          {/* Header (Fixed Height) */}
          <header className="p-6 flex items-center justify-center relative">
            <img src="https://cdn.prod.website-files.com/6680bd18ac8704e3e2a1b0bd/6680bd18ac8704e3e2a1b10d_Logo.svg" width={180} height={180} alt="0xequity"/>
          </header>

          {/* Main Content (Dynamic, Grows but Doesn't Force Scroll) */}
          <main className="flex-grow flex items-center justify-center px-4">{children}</main>

        </AppProviders>
      </body>
    </html>
  );
}
