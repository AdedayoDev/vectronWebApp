import "./globals.css";

export const metadata = {
  title: "Vectron webapp",
  description: "Your intelligent automotive companion",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="overflow-x-hidden">{children}</body>
      </html>
    </>
  );
}
