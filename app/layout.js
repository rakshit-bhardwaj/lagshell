import "./globals.css";

export const metadata = {
  title: "Lagshell",
  description: "by rakshit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
