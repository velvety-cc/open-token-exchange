import "./globals.css";
import { Toaster } from "../components/ui/sonner";

export const metadata = {
  metadataBase: new URL("https://opentokenexchange.com"),
  title: "Open Intelligence | Market for Commoditized Intelligence",
  description:
    "AI inference tokens are becoming a commodity. Open Intelligence is building the price index and the instruments to hedge them, index-first: a redeemable voucher, then cash-settled futures.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Open Intelligence | Market for Commoditized Intelligence",
    description:
      "AI inference tokens are becoming a commodity. We're building the index and the instruments to hedge them.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
