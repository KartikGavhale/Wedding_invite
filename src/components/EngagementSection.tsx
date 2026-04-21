"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EngagementSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elems = gsap.utils.toArray<HTMLElement>(".eng-elem");

      // Parallax spinning orb background
      gsap.to(orbRef.current, {
        rotate: -45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Master timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Phase 1: Card sweeps in
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

      // Ring icon elastic pop
      gsap.from(".eng-ring-icon", {
        scale: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Ring glow pulse
      gsap.to(".ring-glow", {
        boxShadow: "0 0 50px rgba(14, 116, 144, 0.4)",
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
      id="engagement"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-8"
    >
      {/* Spinning concentric orbs — like wedding mandala but ice-blue themed */}
      <div
        ref={orbRef}
        className="absolute inset-0 z-0 opacity-[0.06] flex items-center justify-center pointer-events-none"
      >
        <div className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full border-[25px] border-dashed border-deep-teal/40" />
        <div className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full border-[12px] border-dotted border-deep-teal/25" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-xl mx-auto px-6"
      >
        {/* Rich card with gradient bg like wedding section */}
        <div className="invitation-card relative" style={{
          background: "linear-gradient(135deg, #E0F2FE, #F0F9FF, #ECFEFF)",
          borderColor: "var(--deep-teal)",
          borderWidth: "2px",
        }}>
          {/* Mandala corner ornaments */}
          {/* <div className="mandala-corner top-left" style={{ opacity: 0.2, filter: "hue-rotate(160deg)" }} /> */}
          {/* <div className="mandala-corner top-right" style={{ opacity: 0.2, filter: "hue-rotate(160deg)" }} /> */}
          <div className="mandala-corner bottom-left rotate-270" style={{ opacity: 0.2, filter: "hue-rotate(160deg)" }} />
          <div className="mandala-corner bottom-right rotate-90" style={{ opacity: 0.2, filter: "hue-rotate(160deg)" }} />

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Ring icon with elastic pop & glow */}
            <div className="eng-ring-icon eng-elem ring-glow w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "radial-gradient(circle, rgba(14,116,144,0.15), rgba(14,116,144,0.05))",
                border: "2px solid rgba(14,116,144,0.25)",
                boxShadow: "0 0 25px rgba(14,116,144,0.2)",
              }}
            >
              <img src="/assets/engagement_ring.png" alt="Engagement ring" className="w-18 h-18 object-contain" />
            </div>

            <p className="eng-elem text-deep-teal text-xs md:text-sm uppercase tracking-[0.4em] font-semibold mb-1">
              ✦ Sākhar Puda ✦
            </p>

            <h2 className="eng-elem font-cursive text-4xl md:text-6xl mb-3 text-deep-teal">
              The Engagement
            </h2>



            <p className="eng-elem font-serif text-lg md:text-xl italic mb-6 text-deep-teal/70">
              Two hearts, one soul, and a promise of forever.
            </p>

            <div className="gold-divider eng-elem" style={{ background: "linear-gradient(to right, transparent, var(--deep-teal), transparent)", opacity: 0.3, height: "1px" }} />

            {/* Date display — arch-shaped like wedding section */}
            <div className="eng-elem w-full max-w-xs bg-white/50 backdrop-blur-sm border border-deep-teal/20 p-6 md:p-8 rounded-t-[70px] rounded-b-2xl relative mt-0 mb-8">
              <div className="absolute inset-[3px] rounded-t-[67px] rounded-b-[13px] border border-deep-teal/10" />

              <span className="text-xs font-bold text-deep-teal tracking-[0.3em] uppercase relative z-10">
                May 02
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-deep-teal my-2 relative z-10">
                3:00 PM
              </h3>
              <span className="text-sm tracking-[0.2em] text-deep-teal/60 font-semibold relative z-10">
                2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
