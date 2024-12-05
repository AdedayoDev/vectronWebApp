// import "./globals.css";
// import Navbar from "@components/navbar/navbar";

export const metadata = {
  title: "Car Ai Assistant",
  description: "Your intelligent automotive companion",
};

export default function RootLayout({ children }) {
  return (
   <>
    <html lang="en">
      {/* <Navbar /> */}
      <body>{children}</body>
    </html>
   </>
  );
}