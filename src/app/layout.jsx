// import '@styles/globals.css'

export const metadata = {
  title: "Vectron webapp",
  description: "Your intelligent automotive companion",
};

export default function RootLayout({ children }) {
  return (
   <>
    <html lang="en">
      <body>{children}</body>
    </html>
   </>
  );
}