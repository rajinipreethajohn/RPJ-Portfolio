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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Load Special Elite font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className="bg-watercolor font-mono text-gray-800">
      <nav className="bg-white border-b border-gray-300 py-4 px-6 sticky top-0 z-50">
        <ul className="flex space-x-6 justify-center text-lg font-semibold">
          <li><a href="/" className="hover:text-yellow-600">Home</a></li>
          <li><a href="/tech" className="hover:text-yellow-600">Tech</a></li>
          <li><a href="/contact" className="hover:text-yellow-600">Contact</a></li>
        </ul>
      </nav>

        {children}
      </body>
    </html>
  );
}
