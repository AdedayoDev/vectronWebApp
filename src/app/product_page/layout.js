import "../globals.css";
import { Inter } from "next/font/google";
import "@splidejs/react-splide/css";
import Navbar from "./component/Navbar";

export const metadata = {
  title: "Product Page",
  description: "Your intelligent automotive companion",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="overflow-x-hidden bg-[#2e2f38] text-white"
      >
        <Navbar />
        <div className="bg-[#2e2f38] text-white">{children}</div>
      </body>
    </html>
  );
}
