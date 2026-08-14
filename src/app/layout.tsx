import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "VORA Studio | 미주 뉴스 콘텐츠 제작",
  description: "미국 주식 뉴스를 선별해 인스타그램과 블로그 원고로 만드는 운영자 콘텐츠 스튜디오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
