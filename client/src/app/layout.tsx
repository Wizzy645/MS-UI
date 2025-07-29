import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./components/globals.css";

const geistSans = Geist({
  variable: "--fonA-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MamaSecure Admin Dashboard",
  description: "Secure admin dashboard for MamaSecure platform",
  other: {
    'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';",
  },
};

import ParticleBackground from "./components/ParticleBackground";
import { UserProvider } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";

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
        <ErrorBoundary>
          <UserProvider>
            <ParticleBackground />
            {children}
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
