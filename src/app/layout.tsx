import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Floyd Menu",
  description: "Floyd Food Factory Menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
