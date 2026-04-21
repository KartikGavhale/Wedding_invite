"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elems = gsap.utils.toArray<HTMLElement>(".hero-elem");

      // Card float-in
      gsap.from(".hero-card", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.2,
      });

      // Staggered content reveal
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });

      // Date medallion spring
      gsap.from(".hero-date", {
        scale: 0,
        opacity: 0,
        duration: 1.8,
        ease: "elastic.out(1, 0.4)",
        delay: 1.4,
      });

      // Scroll exit animation — card fades and moves up
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      exitTl.to(contentRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.in",
      });

      // Scroll indicator
      gsap.to(".scroll-line", {
        y: 10,
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
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-8"
    >
      {/* Subtle mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border-[30px] border-dashed border-gold-foil" />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center px-4">
        {/* The invitation card */}
        <div ref={cardRef} className="hero-card invitation-card w-full max-w-lg mx-auto relative">
          {/* Mandala corner ornaments */}
          {/* <div className="mandala-corner top-left" /> */}
          {/* <div className="mandala-corner top-right" /> */}
          <div className="mandala-corner bottom-left rotate-270" />
          <div className="mandala-corner bottom-right rotate-90" />

          {/* Card content */}
          <div className="flex flex-col items-center text-center relative z-10 pt-8">
            {/* Om / Shubh symbol */}
            <p className="hero-elem text-3xl md:text-4xl text-gold-foil mb-2">
              ॐ
            </p>

            <p className="hero-elem text-gold-foil text-xs md:text-sm uppercase tracking-[0.4em] font-semibold mb-1">
              || शुभ विवाह ||
            </p>



            <p className="hero-elem uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-maroon/70 mb-6">
              Together with their families
            </p>

            <h1 className="hero-elem font-cursive text-4xl md:text-6xl lg:text-7xl text-red-dark leading-tight mb-2">
              Kartik Gavhale
            </h1>

            <span className="hero-elem font-cursive text-gold-foil text-4xl md:text-5xl lg:text-6xl my-1">
              &amp;
            </span>

            <h1 className="hero-elem font-cursive text-4xl md:text-6xl lg:text-7xl text-red-dark leading-tight mb-6">
              Vibhuti Neware
            </h1>

            <div className="gold-divider hero-elem" />

            <p className="hero-elem font-serif text-lg md:text-xl text-maroon/80 italic mb-8">
              Request the pleasure of your company
            </p>

            {/* Date medallion */}
            <div className="hero-date date-medallion mb-4">
              <span className="text-xs font-bold text-maroon tracking-[0.3em] uppercase">
                May
              </span>
              <span className="text-3xl md:text-4xl font-serif text-gold-foil my-1">
                02–03
              </span>
              <span className="text-sm tracking-[0.2em] text-maroon font-semibold">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-elem flex flex-col items-center mt-10">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-foil/60 mb-2 font-semibold">
            Scroll to explore
          </span>
          <div className="scroll-line w-[1px] h-10 bg-gold-foil/40" />
        </div>
      </div>
    </section>
  );
}
