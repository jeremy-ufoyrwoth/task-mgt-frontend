import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error:
                "bg-red-600 text-gray-100 flex gap-2 items-center text-sm font-normal py-5 px-4 rounded-sm shadow-sm w-full",
              success:
                "bg-green-600 text-gray-100 flex gap-2 items-center text-sm font-normal py-5 px-4 rounded-sm shadow-sm w-full",
              warning:
                "bg-orange-600 text-gray-100 flex gap-2 items-center text-sm font-normal py-5 px-4 rounded-sm shadow-sm w-full",
              info: "bg-blue-600 text-gray-100 flex gap-2 items-center text-sm font-normal py-5 px-4 rounded-sm shadow-sm w-full",
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
