"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VenueSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elems = gsap.utils.toArray<HTMLElement>(".venue-elem");

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
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
        0
      );
      elems.forEach((el, i) => {
        tl.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
          0.15 + i * 0.04
        );
      });

      // Phase 3: Animate out
      tl.to(
        contentRef.current,
        { y: -70, opacity: 0, duration: 0.35, ease: "power2.in" },
        0.65
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 bg-transparent overflow-hidden"
    >
      {/* Subtle mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border-[20px] border-dashed border-maroon/30" />
      </div>

      <div
        ref={contentRef}
        className="w-full max-w-xl mx-auto flex flex-col items-center text-center"
      >
        {/* Map pin icon */}
        <div className="venue-elem w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mb-6">
          <MapPin size={32} className="text-maroon" />
        </div>

        <h2 className="venue-elem font-cursive text-4xl md:text-6xl mb-3 text-maroon-dark">
          The Venue
        </h2>

        <div className="gold-divider venue-elem" />

        <h3 className="venue-elem font-serif text-2xl md:text-4xl text-maroon mb-2">
          Marigold Celebration Hall
        </h3>

        <p className="venue-elem text-lg md:text-xl text-maroon/60 font-light tracking-wide mb-6">
          Hingna, Nagpur
        </p>

        {/* Map embed card */}
        <div className="venue-elem w-full rounded-2xl overflow-hidden border-2 border-gold-foil/30 shadow-xl mb-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.9!2d79.0!3d21.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA2JzAwLjAiTiA3OcKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue location"
          />
        </div>

        <p className="venue-elem text-base text-maroon/70 italic max-w-md mx-auto mb-6 font-serif">
          &quot;Your presence is our blessing.&quot;
        </p>

        {/* CTA button */}
        <a
          href="https://www.google.com/maps/search/Marigold+Celebration+Hall+Hingna+Nagpur"
          target="_blank"
          rel="noopener noreferrer"
          className="venue-elem inline-flex flex-row items-center gap-3 px-8 py-4 bg-maroon text-white rounded-full font-semibold shadow-lg hover:bg-maroon-dark hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <MapPin size={18} />
          View on Google Maps
        </a>
      </div>
    </section>
  );
}
