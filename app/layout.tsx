import type { Metadata } from "next";
import { Poppins, Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Script from "next/script"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});
const kalam = Kalam({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-kalam", display: "swap" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick", display: "swap" });

export const metadata: Metadata = {
  title: "Ignou Online Admission 2026 ",
  description:
    "Apply for Ignou Online Admission 2026. UGC-entitled online UG & PG programs with flexible learning, mentorship, and placement support.",
  keywords: [
    "Ignou Online",
    
    "Ignou Admission 2026",
    "Online MBA",
    "Online BCA",
    "Online BBA",
    "Distance Learning",
  ],
  metadataBase: new URL("https://ignou-online-7atb.vercel.app/"),
  openGraph: {
    title: "Ignou Online Admission 2026 | Lovely Professional University",
    description:
      "Enroll in Ignou's UGC-entitled online UG/PG programs. Learn anywhere with flexible schedules and industry-focused curriculum.",
    url: "https://ignou-online-7atb.vercel.app/",
    siteName: "Ignou Online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignou Online Admission 2026 | ",
    description:
      "Apply now for Ignou Online Admissions 2026. UGC-entitled programs with mentorship and placement support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${kalam.variable} ${patrick.variable} font-sans antialiased`}
      >
        {children}

       
       

      </body>
    </html>
  );
}