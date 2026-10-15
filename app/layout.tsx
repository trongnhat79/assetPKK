import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AssetPKK | Quản lý tài sản IT",
  description: "Hệ thống quản lý tài sản công nghệ thông tin nội bộ."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
