'use client';
import type { Metadata } from "next";
import { AppShell, Burger, MantineProvider } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import { SessionProvider } from 'next-auth/react';
import Header from "./ui/header";
import Sidebar from "./ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MantineProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
