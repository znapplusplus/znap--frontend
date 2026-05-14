import type { Metadata } from "next";
import { Geist_Mono, Montserrat, Noto_Sans_Thai, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Znap++ — เปลี่ยนทุกการท่องเที่ยวให้เป็นสตูดิโอส่วนตัว",
  description:
    "แพลตฟอร์มจองช่างภาพแบบ On-demand — สแกน QR เริ่มถ่ายได้ทันที ไม่ต้องโหลดแอป",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${montserrat.variable} ${poppins.variable} ${geistMono.variable} ${notoSansThai.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}