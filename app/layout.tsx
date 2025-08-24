import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/headers/navbar";
import { Footer } from "@/components/footer/footer";
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { FeaturesSection } from "@/components/sections/features-section"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Ecommarce Website in base on Khagrachari",
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

        <main className="max-w-[120rem] mx-auto">
        <Navbar/>
        <div className="mt-16 lg:mt-48">
    {children}
        </div>
   
         <FeaturesSection />
      <NewsletterSection />
          <Footer />
        </main>
       
      </body>
    </html>
  );
}
