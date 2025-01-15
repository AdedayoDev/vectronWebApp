
import { Inter } from 'next/font/google';
import NavBar from "@components/navbar/chatNav";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";

export const metadata = {
  title: "Settings",
  description: "Your intelligent automotive companion",
};

const inter = Inter({
  subsets: ["latin"], 
  variable: "--font-inter", 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute>
    <html lang="en">
      <head>
    
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
      <NavBar />

        {children}
      </body>
    </html>
    </ProtectedRoute>
    </AuthProvider>
  );
}
