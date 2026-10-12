import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Performing Arts Council | Arts Council NIAT",
    template: "%s | Performing Arts Council - Arts Council NIAT",
  },
  description:
    "Official portal of the Performing Arts Council at Arts Council NIAT. Celebrating collegiate talent, classical theater, proscenium staging, musical showcases, and cultural heritage.",
  keywords: [
    "Performing Arts Council",
    "Arts Council NIAT",
    "Campus Theater",
    "Music and Dance",
    "Student Performers",
    "Cultural Council",
  ],
  icons: {
    icon: [
      { url: "/arts_logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/arts_logo.jpeg",
    apple: "/arts_logo.jpeg",
  },
  openGraph: {
    title: "Performing Arts Council | Arts Council NIAT",
    description:
      "Official portal of the Performing Arts Council at Arts Council NIAT. Celebrating student talent, culture, and collegiate stagecraft.",
    siteName: "Performing Arts Council NIAT",
    type: "website",
    images: [{ url: "/arts_logo.jpeg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#23120A] text-[#F5E6D3] flex flex-col selection:bg-[#D98C5B]/40 selection:text-[#F5E6D3]">
        {children}
      </body>
    </html>
  );
}
