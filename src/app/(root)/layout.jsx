import "@styles/globals.css";
import Nav from "@app/pages/chat/Nav";

export const metadata = {
  title: "Car Ai Assistant",
  description: "Your intelligent automotive companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
