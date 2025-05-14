import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajini Preetha John",
  description: "Data scientist | Artist | Culinary explorer | Mindful technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load Special Elite font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-watercolor font-mono text-gray-800">
        {children}
      </body>
    </html>
  );
}
