"use client";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="dark">
        <body className="min-h-screen flex">
          <Toaster />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
