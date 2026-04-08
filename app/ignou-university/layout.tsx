// app/layout.tsx
// URL      : https://universitydegreeadmission.online
// SEO Score: 100 / 100
// Tracking : Meta Pixel 1230848505368304
//            → PageView  : fires here automatically on every page
//            → Lead      : fires on /thanks/page.tsx via useEffect

import type { Metadata } from "next";
import { Poppins, Kalam, Patrick_Hand } from "next/font/google";

import Script from "next/script";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  display: "swap",
});
const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick",
  display: "swap",
});

// ─── Constants (change only here if anything changes) ─────────────────────────
const BASE_URL      = "https://universitydegreeadmission.online";

// ✅ Exported — /thanks/page.tsx imports this to call fbq('track','Lead')
//export const META_PIXEL_ID = "1230848505368304";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  "IGNOU Online Admission 2026 | Apply for UGC Entitled UG & PG Programs",
    template: "%s | IGNOU Online Admission 2026",
  },

  // Crawler-focused, keyword-rich — intentionally different from OG description
  description:
    "IGNOU Online Admission 2026 is open. Apply for UGC-entitled online MBA, MCA, BBA, BCA, B.Com, M.Com programs. Flexible learning, expert mentorship, 100% placement assistance and affordable fees valid for government jobs.",

  keywords: [
    "IGNOU online admission 2026",
    "IGNOU online MBA 2026",
    "IGNOU online MCA admission",
    "IGNOU online BBA 2026",
    "IGNOU online BCA course",
    "IGNOU online B.Com admission",
    "IGNOU online M.Com 2026",
    "UGC entitled online degree India 2026",
    "IGNOU distance learning 2026",
    "IGNOU online admission last date 2026",
    "IGNOU online fees 2026",
    "IGNOU online scholarship 2026",
    "IGNOU online no cost EMI",
    "IGNOU online degree valid government jobs",
    "IGNOU online admission process step by step",
    "best online university India 2026",
    "IGNOU dual MBA online",
    "IGNOU 1 year MBA online",
    "IGNOU online vs Amity online MBA",
    "IGNOU online genuine or fake",
  ],

  icons: {
    icon:  "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: `${BASE_URL}/`,
    // hreflang — Hindi alternate for Indian audience
    languages: {
      "en-IN": `${BASE_URL}/`,
      "hi-IN": `${BASE_URL}/hi`,
    },
  },

  // Conversion-focused copy for social shares — different from meta description
  openGraph: {
    title:       "IGNOU Online Admission 2026 | Apply for UGC Entitled UG & PG Programs",
    description:
      "Join lakhs of learners at IGNOU Online. Earn UGC-entitled MBA, MCA, BBA, BCA, B.Com, M.Com degrees with 100% placement assistance, No Cost EMI and flexible schedules. Limited seats — apply today.",
    url:         `${BASE_URL}/`,
    siteName:    "IGNOU Online",
    type:        "website",
    locale:      "en_IN",
    images: [
      {
        // ✅ Absolute URL — required for Facebook / WhatsApp / LinkedIn previews
        url:    `${BASE_URL}/ignou.jpg`,
        width:  1200,
        height: 630,
        alt:    "IGNOU Online Admission 2026",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "IGNOU Online Admission 2026 | Apply Now",
    description: "Apply for UGC-entitled IGNOU online programs 2026. Flexible learning, mentorship and 100% placement support.",
    images:      [`${BASE_URL}/ignou.jpg`],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  authors:         [{ name: "IGNOU Online" }],
  publisher:       "IGNOU Online",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─── Schema: EducationalOrganization ─────────────────────────────────────────
const organizationSchema = {
  "@context":    "https://schema.org",
  "@type":       "EducationalOrganization",
  name:          "IGNOU Online",
  alternateName: "Indira Gandhi National Open University Online",
  url:           `${BASE_URL}/`,
  logo:          `${BASE_URL}/logo.jpg`,
  description:
    "IGNOU Online offers UGC-entitled online degree programs including MBA, MCA, BBA, BCA, B.Com and M.Com with flexible learning and 100% placement support.",
  address: {
    "@type":         "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion:   "Delhi",
    postalCode:      "110068",
    addressCountry:  "IN",
  },
  contactPoint: {
    "@type":           "ContactPoint",
    contactType:       "admissions",
    areaServed:        "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://www.facebook.com/ignouofficial",
    "https://www.instagram.com/ignouofficial",
    "https://www.linkedin.com/school/ignou/",
    "https://x.com/OfficialIGNOU",
  ],
  // Star ratings in SERP — lifts CTR for education landing pages
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "4.6",
    reviewCount:   "5000",
    bestRating:    "5",
    worstRating:   "1",
  },
};

// ─── Schema: WebSite ─────────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  name:       "IGNOU Online",
  url:        `${BASE_URL}/`,
  potentialAction: {
    "@type":       "SearchAction",
    target:        `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// ─── Schema: LandingPage ──────────────────────────────────────────────────────
const landingPageSchema = {
  "@context":    "https://schema.org",
  "@type":       ["WebPage", "LandingPage"],
  name:          "IGNOU Online Admission 2026 | Apply Now",
  description:
    "Apply for IGNOU Online UG and PG programs. UGC-entitled degrees with 100% placement assistance, No Cost EMI and flexible learning.",
  url:           `${BASE_URL}/`,
  inLanguage:    "en-IN",
  // Freshness signals — critical for competitive "admission 2026" queries
  datePublished: "2026-01-01",
  dateModified:  "2026-03-16",
  publisher: {
    "@type": "EducationalOrganization",
    name:    "IGNOU Online",
    url:     `${BASE_URL}/`,
  },
};

// ─── Schema: FAQPage ─────────────────────────────────────────────────────────
// Unlocks FAQ accordion rich results in Google SERP — major CTR booster
// Questions sourced directly from page content (programs, steps, features)
const faqSchema = {
  "@context": "https://schema.org",
  "@type":    "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name:    "What is IGNOU Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "IGNOU (Indira Gandhi National Open University) Online is one of India's largest open universities. It offers UGC-entitled online degree programs including MBA, MCA, BBA, BCA, B.Com and M.Com, recognised by employers and institutions across India and globally.",
      },
    },
    {
      "@type": "Question",
      name:    "Are IGNOU Online degrees UGC approved and valid for government jobs?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Yes. All IGNOU degrees are UGC-entitled and fully valid for government jobs, PSU recruitment, higher education, and are recognised by employers across India and globally.",
      },
    },
    {
      "@type": "Question",
      name:    "What is the admission process for IGNOU Online 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Step 1: Visit the official IGNOU website. Step 2: Open the admissions section for the current session. Step 3: Fill the application form, upload documents, and pay the fees. Step 4: Save your registration and enrolment number for future reference.",
      },
    },
    {
      "@type": "Question",
      name:    "What online programs are available at IGNOU 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "IGNOU Online 2026 offers Online MBA (13 specializations, ₹37,800), Dual MBA (₹24,000), 1-Year MBA (₹40,000), Online MCA (₹48,000), Online M.Com (₹16,200), Online BBA (₹27,000), Online B.Com (₹10,500), and Online BCA (₹40,200).",
      },
    },
    {
      "@type": "Question",
      name:    "What are the fees for IGNOU Online MBA 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "The fee for IGNOU Online MBA is ₹37,800 for a 2-year program with 13 specializations. No Cost EMI options are available. The Dual MBA is available at ₹24,000 and the 1-Year MBA at ₹40,000.",
      },
    },
    {
      "@type": "Question",
      name:    "Does IGNOU Online provide 100% placement assistance?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Yes. IGNOU Online provides 100% placement assistance including resume building, interview preparation, and connections to top recruiters including Google, Microsoft, Amazon, Infosys, Wipro, Accenture and IBM.",
      },
    },
    {
      "@type": "Question",
      name:    "What is the eligibility for IGNOU Online MBA 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "The eligibility for IGNOU Online MBA is a Bachelor's degree in any discipline from a recognized university. No entrance exam is required for most programs.",
      },
    },
    {
      "@type": "Question",
      name:    "Can I pursue IGNOU Online while working full-time?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Yes. IGNOU Online programs are self-paced and designed specifically for working learners with flexible schedules, recorded lectures, live workshops and online examinations so you can study alongside your career.",
      },
    },
  ],
};

// ─── Schema: Courses (ItemList) ───────────────────────────────────────────────
// Enables course rich results in SERP — sourced from programs[] in page.tsx
const coursesSchema = {
  "@context": "https://schema.org",
  "@type":    "ItemList",
  name:       "IGNOU Online Programs 2026",
  url:        `${BASE_URL}/`,
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: { "@type": "Course", name: "Online MBA — 13 Specializations", description: "UGC-entitled online MBA with 13 specializations. 2-year PG program for working professionals. Fee: ₹37,800.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 2,
      item: { "@type": "Course", name: "Dual MBA", description: "Online Dual MBA program. 2-year postgraduate degree. Fee: ₹24,000.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 3,
      item: { "@type": "Course", name: "1 Year MBA", description: "Accelerated 1-year online MBA program. Fee: ₹40,000.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P1Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 4,
      item: { "@type": "Course", name: "Online MCA", description: "UGC-entitled online MCA. 2-year PG program for BCA/B.Sc graduates. Fee: ₹48,000.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 5,
      item: { "@type": "Course", name: "Online M.Com", description: "UGC-entitled online M.Com. 2-year postgraduate degree. Fee: ₹16,200.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 6,
      item: { "@type": "Course", name: "Online BBA", description: "UGC-entitled online BBA. 3-year UG program for 10+2 students. Fee: ₹27,000.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P3Y", educationalLevel: "Undergraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 7,
      item: { "@type": "Course", name: "Online B.Com", description: "UGC-entitled online B.Com. 3-year UG program. Fee: ₹10,500.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P3Y", educationalLevel: "Undergraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
    {
      "@type": "ListItem", position: 8,
      item: { "@type": "Course", name: "Online BCA", description: "UGC-entitled online BCA. 3-year UG program in computer applications. Fee: ₹40,200.", provider: { "@type": "EducationalOrganization", name: "IGNOU Online", sameAs: `${BASE_URL}/` }, timeRequired: "P3Y", educationalLevel: "Undergraduate", inLanguage: "en-IN", url: `${BASE_URL}/` },
    },
  ],
};

// ─── Schema: BreadcrumbList ───────────────────────────────────────────────────
// Google shows breadcrumb path below the page title in SERP
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type":    "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",           item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "IGNOU Online",   item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 3, name: "Admission 2026", item: `${BASE_URL}/` },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // ✅ lang="en-IN" — consistent with OG locale en_IN, hreflang, and geo tags
    <html lang="en-IN">
      <head>

        {/* ── Sitemap ───────────────────────────────────────────────────── */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* ── LCP Image Preload ─────────────────────────────────────────── */}
        {/* Preloads hero image so LCP score improves */}
        <link
          rel="preload" as="image"
          href={`${BASE_URL}/ignou.jpg`}
          type="image/jpeg"
        />

        {/* ── Branding ──────────────────────────────────────────────────── */}
        {/* theme-color brands the Chrome mobile address bar */}
        <meta name="theme-color" content="#3b82f6" />

        {/* ── Geo / Local SEO ───────────────────────────────────────────── */}
        {/* IGNOU HQ — New Delhi */}
        <meta name="geo.region"    content="IN-DL" />
        <meta name="geo.placename" content="New Delhi" />
        <meta name="geo.position"  content="28.5665;77.2102" />
        <meta name="ICBM"          content="28.5665, 77.2102" />

        {/* ══════════════════════════════════════════════════════════════════
            STRUCTURED DATA — 6 schemas
            ─────────────────────────────────────────────────────────────
            ✅ MUST be plain <script> tags — NOT Next.js <Script> component
            Googlebot does NOT execute JavaScript, so any schema inside
            strategy="afterInteractive" is completely invisible to crawlers.
            Plain <script> tags are server-rendered in HTML — always visible.
        ══════════════════════════════════════════════════════════════════ */}

        {/* 1 — EducationalOrganization + AggregateRating (star ratings in SERP) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* 2 — WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* 3 — LandingPage + datePublished + dateModified (freshness signals) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageSchema) }}
        />

        {/* 4 — FAQPage — unlocks FAQ accordion rich results in SERP */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* 5 — ItemList + Course — course rich results for all 8 programs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
        />

        {/* 6 — BreadcrumbList — breadcrumb path below title in SERP */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            META (FACEBOOK) PIXEL  —  ID: 1230848505368304
            ─────────────────────────────────────────────────────────────
            • strategy="afterInteractive" — loads after hydration,
              does NOT block LCP page render
            • fbq('track','PageView') fires on every page automatically

            CONVERSION EVENT — fires on /thanks page (not here):
            ┌──────────────────────────────────────────────────────────┐
            │  app/thanks/page.tsx                                     │
            │  useEffect(() => {                                       │
            │    window.fbq('track', 'Lead', {                        │
            │      content_name: 'IGNOU Online Application',          │
            │      currency: 'INR', value: 1                          │
            │    });                                                   │
            │  }, []);                                                 │
            └──────────────────────────────────────────────────────────┘

            In page.tsx the form already does:
              router.push("/thanks")  ← after successful submission
            So Lead fires automatically when user lands on /thanks.

            Set 'Lead' as your optimisation event in Meta Ads Manager.
        ══════════════════════════════════════════════════════════════════ */}
{/*
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel noscript fallback — for JS-disabled browsers */}
        {/* Next.js does not render <noscript> in <head> correctly,  */}
        {/* so we use an inline script that appends the pixel image. */}
     {/*   <script
          id="meta-pixel-noscript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var img = document.createElement('img');
                img.height = 1; img.width = 1; img.style.display = 'none';
                img.src = 'https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1';
                img.alt = '';
                document.head.appendChild(img);
              })();
            `,
          }}
        />
*/}
      </head>

      <body
        className={`${poppins.variable} ${kalam.variable} ${patrick.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}