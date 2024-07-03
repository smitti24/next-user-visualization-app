"use client";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClerkProvider } from "@clerk/nextjs";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <html lang="en" className="dark">
          <body className="min-h-screen flex">
            <Toaster />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
