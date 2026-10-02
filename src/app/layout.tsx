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
  title: "Performing Arts Council | [Institution Name]",
  description:
    "Official website of the Performing Arts Council at [Institution Name]. Celebrating student talent, classical theater, musical showcases, dance ensembles, and cultural heritage.",
  keywords: [
    "Performing Arts Council",
    "University Cultural Council",
    "Campus Theater",
    "Music and Dance",
    "Student Performers",
  ],
  openGraph: {
    title: "Performing Arts Council | [Institution Name]",
    description:
      "Official website of the Performing Arts Council at [Institution Name]. Celebrating student talent, culture, and collegiate stagecraft.",
    siteName: "Performing Arts Council",
    type: "website",
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
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
