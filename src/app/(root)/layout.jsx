import "@styles/globals.css";
import Nav from "./Nav";

export const metadata = {
  title: "Car Ai Assistant",
  description: "Your intelligent automotive companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Nav />
      <body>
        {children}
      </body>
    </html>
  );
}
