"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FooterSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Simple fade in from below
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-transparent py-8"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center text-center px-6"
      >
        {/* Monogram */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold-foil flex items-center justify-center mb-6" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.1), transparent)" }}>
          <span className="font-cursive text-2xl md:text-3xl text-gold-foil">
            K & V
          </span>
        </div>

        <p className="font-serif text-xl md:text-2xl text-maroon/80 italic mb-4 max-w-md">
          We can&apos;t wait to celebrate this beautiful journey with you.
        </p>

        <p className="text-sm text-maroon/50 tracking-[0.2em] uppercase mb-6">
          May 2–3, 2026 • Nagpur
        </p>

        {/* Hearts */}
        <div className="flex gap-2 text-maroon/30 text-lg mb-4">
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
        </div>

        <p className="text-xs text-gold-foil/50 tracking-[0.15em]">
          Made with love
        </p>
      </div>
    </section>
  );
}
