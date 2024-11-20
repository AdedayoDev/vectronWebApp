import type { Metadata } from "next";
import "../../../styles/globals.css";
import Nav from "@app/(root)/Nav";

export const metadata: Metadata = {
  title: "Car Ai Assistant",
  description: "Your intelligent automotive companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
