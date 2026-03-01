"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Card = {
  title: string;
  img: string;
};

const cards: Card[] = [
  { title: "AICTE (where applicable)", img: "/AICTE .png" },
  { title: "NAAC Accredited",          img: "/naac.png"  },
  { title: "UGC Recognised",           img: "/UGC .png"   },
  { title: "AIU Recognised",           img: "/aiu.png"   },
];

// ─── Slider config ───────────────────────────────────────────
const CARD_W  = 300; // card width  (px)
const CARD_H  = 128; // card height (px)
const GAP     = 56;  // gap between cards — extra space for half-circle on left
const STEP    = CARD_W + GAP;
const SPEED   = 2.0; // px per frame
// ─────────────────────────────────────────────────────────────

// Triple for seamless infinite loop
const items    = [...cards, ...cards, ...cards];
const LOOP_W   = cards.length * STEP;

export default function AccreditationSlider() {
  const rafRef    = useRef<number>(0);
  const offsetRef = useRef(0);
  const [, tick]  = useState(0);

  useEffect(() => {
    const animate = () => {
      offsetRef.current += SPEED;
      if (offsetRef.current >= LOOP_W) offsetRef.current -= LOOP_W;
      tick((n) => n + 1);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="w-full py-14 bg-gray-100">

      {/*
        overflow-hidden on THIS div only.
        The extra padding-left gives room so the half-circle
        on the very first visible card is never clipped.
      */}
      <div className="overflow-hidden w-full">
        <div
          style={{
            display: "flex",
            gap: `${GAP}px`,
            // shift left by offset, but also add 40px padding so
            // the leftmost circle isn't clipped
            transform: `translateX(calc(40px - ${offsetRef.current}px))`,
            width: `${items.length * STEP}px`,
            willChange: "transform",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          {items.map((card, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                position: "relative",
              }}
            >
              {/* ── Half-outside circle ── */}
              <div
                style={{
                  position: "absolute",
                  left: "-40px",       // half of 80px circle hangs outside
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  width: "80px",
                  height: "80px",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  border: "2px solid #f97316", // orange-500
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* ── Card body ── */}
              <div className="w-full h-full bg-white rounded-2xl shadow-md flex items-center pl-12 pr-5">
                <p className="text-gray-700 font-semibold text-base leading-snug">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}