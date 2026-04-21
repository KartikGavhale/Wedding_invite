"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeddingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elems = gsap.utils.toArray<HTMLElement>(".wed-elem");

      // Mandala slow spin
      gsap.to(mandalaRef.current, {
        rotate: 60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Phase 1: Animate in
      tl.fromTo(
        contentRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
        0
      );
      elems.forEach((el, i) => {
        tl.fromTo(
          el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
          0.15 + i * 0.04
        );
      });

      // Crown spring on enter
      gsap.from(".wed-crown", {
        scale: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Phase 3: Animate out
      tl.to(
        contentRef.current,
        { y: -80, opacity: 0, scale: 0.95, duration: 0.35, ease: "power2.in" },
        0.65
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="wedding"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-8"
    >
      {/* Spinning mandala ornament */}
      <div
        ref={mandalaRef}
        className="absolute inset-0 z-0 opacity-[0.08] flex items-center justify-center pointer-events-none"
      >
        <div className="w-[140vw] h-[140vw] md:w-[90vw] md:h-[90vw] rounded-full border-[30px] border-dashed border-gold-foil/50" />
        <div className="absolute w-[90vw] h-[90vw] md:w-[55vw] md:h-[55vw] rounded-full border-[15px] border-dotted border-gold-foil/30" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-xl mx-auto px-6"
      >
        <div className="invitation-card relative" style={{
          background: "linear-gradient(135deg, var(--deep-teal), #0D3B38)",
          borderColor: "var(--gold-foil)",
        }}>
          {/* Mandala corner ornaments */}
          {/* <div className="mandala-corner top-left" style={{ filter: "brightness(3)", opacity: 0.2 }} /> */}
          {/* <div className="mandala-corner top-right" style={{ filter: "brightness(3)", opacity: 0.2 }} /> */}
          <div className="mandala-corner bottom-left rotate-270" style={{ filter: "brightness(3)", opacity: 0.2 }} />
          <div className="mandala-corner bottom-right rotate-90" style={{ filter: "brightness(3)", opacity: 0.2 }} />

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Wedding crown / Kalash */}
            <div className="wed-crown wed-elem text-5xl md:text-7xl text-gold-foil mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
              𑁍
            </div>

            <h2 className="wed-elem font-cursive text-4xl md:text-6xl mb-3 text-gold-light">
              The Wedding
            </h2>

            <div className="gold-divider wed-elem" />

            <p className="wed-elem font-serif text-lg md:text-xl text-white/80 italic mb-8 tracking-wide">
              The beginning of our &apos;Always&apos;
            </p>

            {/* Grand date display */}
            <div className="wed-elem w-full max-w-sm bg-deep-teal/50 backdrop-blur-sm border border-gold-foil/30 p-6 md:p-8 rounded-t-[80px] rounded-b-2xl relative mb-4">
              <div className="absolute inset-[3px] rounded-t-[77px] rounded-b-[13px] border border-gold-foil/15" />

              <h1 className="font-serif text-3xl md:text-4xl text-white mb-4 pt-4 relative z-10">
                May 3rd, 2026
              </h1>

              <h3 className="text-lg md:text-xl font-semibold tracking-[0.15em] text-gold-foil mb-2 relative z-10">
                Auspicious Muhurta
              </h3>
              <p className="text-2xl md:text-3xl font-serif text-gold-light relative z-10">
                11:07 AM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
