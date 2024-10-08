import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import SpinnerInfinite from "@/components/spinner";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Management Web",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <SpinnerInfinite />
            </div>
          }>
            <main className="p-10 py-40 md:px-20 overflow-x-hidden md:max-w-7xl lg:max-w-screen-2xl md:m-auto"> 
              {children}
            </main>
            </Suspense>
        </body>
      </html>
    </SessionProvider>
  );
}
