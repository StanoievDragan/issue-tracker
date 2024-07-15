export const dynamic = "force-dynamic";

import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "@/app/NavBar";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "@/app/QueryClientProvider";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue-Tracker",
  description: "Issue-Tracker",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} `}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="purple">
              <NavBar></NavBar>
              <main className={"p-5"}>
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
