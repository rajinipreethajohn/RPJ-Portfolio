import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // adjust the path if needed


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
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="63cPJ2Izcts1+/UV6sQqSg" async></script>
      </head>
      <body className="bg-watercolor font-mono text-gray-800">
        <Navbar />

        {children}
      </body>
    </html>
  );
}
