import NavBar from '@components/navbar/navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <NavBar/> */}
      <body>{children}</body>
    </html>
  );
}
