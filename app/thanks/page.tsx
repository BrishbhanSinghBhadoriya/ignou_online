"use client";
// /thanks/page.tsx
//
// Conversion logic (page-based, not traffic-based):
//   "meta"   → form submitted from root home page (app/page.tsx)
//              fires: Meta fbq('track','Lead')
//   "openai" → form submitted from ignou-university page
//              fires: OpenAI oaiq("measure","lead_created")
//
// Source is written to sessionStorage immediately after successful API
// response in the form's submit handler — NOT on page load or button click.
//
// Rules:
//   ✅ Fires ONCE — sessionStorage is cleared after firing
//   ✅ useRef guard prevents React StrictMode double-invoke
//   ✅ No pixel SDK init here — both inited in app/layout.tsx
//   ✅ No Google Ads tracking

import Link from "next/link";
import { useEffect, useRef, Suspense } from "react";

// ─── Inner component ──────────────────────────────────────────────────────────
function ThankYouContent() {
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent double-fire from React StrictMode
    if (hasRun.current) return;
    hasRun.current = true;

    // ── Read source set by the form's submit handler ───────────────────────
    let source = "";
    try {
      source = sessionStorage.getItem("lead_source") || "";
      // Clear immediately so a page refresh doesn't re-fire
      if (source) sessionStorage.removeItem("lead_source");
    } catch (_) { /* storage blocked */ }

    if (!source) {
      console.log("ℹ️ No valid traffic source detected — no conversion fired.");
      return;
    }

    // ── Meta conversion ────────────────────────────────────────────────────
    if (source === "meta") {
      const fire = () => {
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "Lead");
          console.log("✅ Meta Lead conversion fired");
        } else {
          // SDK loads via afterInteractive — retry after short delay
          setTimeout(fire, 1000);
        }
      };
      fire();
      return;
    }

    // ── OpenAI conversion ──────────────────────────────────────────────────
    if (source === "openai") {
      const fire = () => {
        if (typeof (window as any).oaiq === "function") {
          (window as any).oaiq("measure", "lead_created", { type: "customer_action" });
          console.log("✅ OpenAI lead_created conversion fired");
        } else {
          setTimeout(fire, 1000);
        }
      };
      fire();
      return;
    }

    console.log("ℹ️ No valid traffic source detected — no conversion fired.");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-green-500 animate-ping opacity-25"></div>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Thank You!
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Your enquiry has been successfully submitted. Our admission counsellor will contact you shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/ignou-university"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Back to Home
        </Link>
        <a
          href="tel:7042646766"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
      </div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-red-500 to-green-500"></div>
      <div className="mt-16 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Ignou University Online. All rights reserved.
      </div>
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────
export default function ThankYouPage() {
  return (
    // Suspense not strictly needed now (no useSearchParams) but kept for safety
    <Suspense fallback={null}>
      {/*
        NO pixel SDK init here.
        Meta Pixel  → initialised once in app/layout.tsx (id="meta-pixel")
        OpenAI oaiq → initialised once in app/layout.tsx (id="openai-pixel")
        Google Ads  → REMOVED
      */}
      <ThankYouContent />
    </Suspense>
  );
}
