import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Playbook UI",
  description: "A community library of reusable HTML, CSS and Tailwind UI elements.",
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
        {children}
      </body>
    </html>
  );
}
