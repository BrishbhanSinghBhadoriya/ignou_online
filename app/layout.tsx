import type { Metadata } from "next";
import { Poppins, Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const kalam = Kalam({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-kalam", display: "swap" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick", display: "swap" });

export const metadata: Metadata = {
  title: "Ignou Online Admission 2026",
  description: "Apply for Ignou Online Admission 2026. UGC-entitled online UG & PG programs with flexible learning, mentorship, and placement support.",
  keywords: ["Ignou Online", "Ignou Admission 2026", "Online MBA", "Online BCA", "Online BBA", "Distance Learning"],
  metadataBase: new URL("https://universitydegreeadmission.online/"),
  openGraph: {
    title: "Ignou Online Admission 2026 | Lovely Professional University",
    description: "Enroll in Ignou's UGC-entitled online UG/PG programs. Learn anywhere with flexible schedules and industry-focused curriculum.",
    url: "https://universitydegreeadmission.online/",
    siteName: "Ignou Online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignou Online Admission 2026",
    description: "Apply now for Ignou Online Admissions 2026. UGC-entitled programs with mentorship and placement support.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Meta Pixel - PageView fires on every page */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1230848505368304');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1230848505368304&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${poppins.variable} ${kalam.variable} ${patrick.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}