import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/src/components/Navbar"
import Sidebar from "@/src/components/Sidebar"
import ApolloWrapper from "@/src/lib/ApolloWrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mango Admin",
  description: "Admin dashboard built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Navbar />
        <div className="flex">
          <Sidebar />
          <ApolloWrapper>
            <main className="flex-1 p-6">{children}</main>
          </ApolloWrapper>
        </div>
      </body>
    </html>
  )
}
