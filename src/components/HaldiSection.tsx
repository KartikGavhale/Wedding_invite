"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HaldiSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sunburstRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elems = gsap.utils.toArray<HTMLElement>(".haldi-elem");

      // Sunburst slow spin — parallax
      gsap.to(sunburstRef.current, {
        rotate: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Glow parallax
      gsap.to(glow1Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(glow2Ref.current, {
        yPercent: -25,
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

      // Phase 3: Animate out
      tl.to(
        contentRef.current,
        { y: -80, opacity: 0, scale: 0.95, duration: 0.35, ease: "power2.in" },
        0.65
      );

      // Turmeric pot elastic pop
      gsap.from(".haldi-pot", {
        scale: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Turmeric pot shimmer
      gsap.to(".haldi-pot", {
        boxShadow: "0 0 50px rgba(245, 158, 11, 0.5)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="haldi"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent py-8"
    >
      {/* Ambient glow blobs with parallax */}
      <div
        ref={glow1Ref}
        className="absolute top-[5%] left-[5%] w-72 h-72 bg-turmeric rounded-full mix-blend-overlay blur-[100px] opacity-50"
      />
      <div
        ref={glow2Ref}
        className="absolute bottom-[5%] right-[5%] w-96 h-96 bg-saffron rounded-full mix-blend-overlay blur-[120px] opacity-40"
      />

      {/* Spinning sunburst rings — like wedding mandala */}
      <div
        ref={sunburstRef}
        className="absolute inset-0 z-0 opacity-[0.07] flex items-center justify-center pointer-events-none"
      >
        <div className="w-[130vw] h-[130vw] md:w-[85vw] md:h-[85vw] rounded-full border-[25px] border-dashed border-yellow-500/50" />
        <div className="absolute w-[85vw] h-[85vw] md:w-[50vw] md:h-[50vw] rounded-full border-[12px] border-dotted border-orange-400/30" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-xl mx-auto px-6"
      >
        {/* Rich card — warm gradient like Wedding's dark gradient */}
        <div className="invitation-card relative" style={{
          background: "linear-gradient(135deg, #B45309, #92400E, #78350F)",
          borderColor: "#F59E0B",
          borderWidth: "2px",
        }}>
          {/* Mandala corner ornaments — brightened for dark bg */}
          <div className="mandala-corner top-left" style={{ filter: "brightness(3) sepia(1) saturate(3) hue-rotate(10deg)", opacity: 0.2 }} />
          <div className="mandala-corner top-right" style={{ filter: "brightness(3) sepia(1) saturate(3) hue-rotate(10deg)", opacity: 0.2 }} />
          <div className="mandala-corner bottom-left" style={{ filter: "brightness(3) sepia(1) saturate(3) hue-rotate(10deg)", opacity: 0.2 }} />
          <div className="mandala-corner bottom-right" style={{ filter: "brightness(3) sepia(1) saturate(3) hue-rotate(10deg)", opacity: 0.2 }} />

          <div className="flex flex-col items-center text-center relative z-10 pt-6">
            {/* Turmeric pot icon — elastic pop + shimmer */}
            <div className="haldi-pot haldi-elem w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.25), rgba(245,158,11,0.08))",
                border: "2px solid rgba(245,158,11,0.4)",
                boxShadow: "0 0 25px rgba(245,158,11,0.3)",
              }}
            >
              <span className="text-3xl md:text-4xl">🌼</span>
            </div>

            <p className="haldi-elem text-yellow-300 text-xs md:text-sm uppercase tracking-[0.4em] font-semibold mb-1">
              ✦ हळद समारंभ ✦
            </p>

            <h2 className="haldi-elem font-cursive text-4xl md:text-6xl mb-3 text-yellow-100 drop-shadow-md">
              The Haldi Ceremony
            </h2>



            <p className="haldi-elem font-serif text-lg md:text-xl italic mb-6 text-white/85">
              A splash of yellow, a dash of fun!
            </p>

            <div className="gold-divider haldi-elem" />

            {/* Date display — arch-shaped like wedding */}
            <div className="haldi-elem w-full max-w-xs backdrop-blur-sm border border-yellow-500/30 p-6 md:p-8 rounded-t-[70px] rounded-b-2xl relative mt-4 mb-4"
              style={{ background: "rgba(120, 53, 15, 0.4)" }}
            >
              <div className="absolute inset-[3px] rounded-t-[67px] rounded-b-[13px] border border-yellow-500/15" />

              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wider relative z-10 pt-2">
                May 3rd, 2026
              </h3>
              <p className="text-lg md:text-xl font-light tracking-[0.2em] uppercase text-yellow-200 mt-2 relative z-10">
                12:00 AM
              </p>
              <span className="text-xs tracking-[0.3em] text-yellow-300/60 uppercase font-semibold relative z-10">
                Onwards (Mid-Night)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
