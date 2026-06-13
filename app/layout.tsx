import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";

import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalFloatingButtons from "@/components/ConditionalFloatingButtons";

export const metadata: Metadata = {
  title: "VT STROY — Строительно-монтажные работы",
  description: "Строительно-монтажные работы в Алматы",
  verification: {
    google: "sPWPq5RZVhBI_GbdjDrqMD6rDkNG9sJzVkUCpSyLoX0", 
  },
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MSDPN4NF');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x4xej6mo4g");
          `}
        </Script>
      </head>

      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50`}
      >
        <ConditionalNavbar />
        {children}
        <ConditionalFooter />
        <ConditionalFloatingButtons />
      </body>
    </html>
  );
}