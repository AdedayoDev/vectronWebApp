import "./globals.css";
import { Inter } from 'next/font/google';
import '@splidejs/react-splide/css';

export const metadata = {
  title: "Vectron webapp",
  description: "Your intelligent automotive companion",
};

const inter = Inter({
  subsets: ["latin"], // you can add subsets if needed
  variable: "--font-inter", // optional custom CSS variable name
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

      

        

        {/* Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
