"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

export default function EnvelopeOpening({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // Step 1: Seal breaks
    tl.to(sealRef.current, {
      scale: 1.3,
      duration: 0.2,
      ease: "power2.out",
    })
      .to(sealRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.5,
        ease: "power2.in",
      })
      // Step 2: Flap opens
      .to(
        flapRef.current,
        { rotateX: -180, duration: 1, ease: "power3.inOut" },
        "-=0.2"
      )
      // Step 3: Card slides up
      .fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: -80, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      // Step 4: Scale up and fade
      .to(
        [".envelope", cardRef.current],
        { scale: 3, opacity: 0, duration: 1, ease: "power3.in" },
        "+=0.4"
      );
  }, [isOpening, onComplete]);

  // Seal pulse
  useEffect(() => {
    if (!sealRef.current || isOpening) return;
    gsap.to(sealRef.current, {
      scale: 1.06,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [isOpening]);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline();
    // Floating decorative corners
    tl.fromTo(
      ".env-corner",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      0
    )
      // Envelope slides in
      .fromTo(
        ".envelope",
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0.2
      )
      // Text reveals
      .fromTo(
        ".env-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        0.6
      )
      // Tap hint
      .fromTo(
        ".tap-hint",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 0.6, ease: "power2.out" },
        1.2
      );

    // Floating particle loop
    gsap.to(".float-dot", {
      y: -20,
      opacity: 0.6,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.3, from: "random" },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFF8F0 0%, #F5EDE0 40%, #FFF8F0 100%)",
      }}
    >
      {/* Full-page ornate background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url('/assets/envelope-pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Corner mandala ornaments */}
      <img src="/assets/mandala-corner.png" alt="" className="env-corner absolute top-0 left-0 w-28 md:w-44 opacity-25" />
      <img src="/assets/mandala-corner.png" alt="" className="env-corner absolute top-0 right-0 w-28 md:w-44 opacity-25" style={{ transform: "scaleX(-1)" }} />
      <img src="/assets/mandala-corner.png" alt="" className="env-corner absolute bottom-0 left-0 w-28 md:w-44 opacity-25" style={{ transform: "scaleY(-1)" }} />
      <img src="/assets/mandala-corner.png" alt="" className="env-corner absolute bottom-0 right-0 w-28 md:w-44 opacity-25" style={{ transform: "scale(-1,-1)" }} />

      {/* Floating gold dots — deterministic to avoid hydration mismatch */}
      {[
        { w: 4, h: 5, l: 15, t: 20, o: 0.25 },
        { w: 6, h: 4, l: 75, t: 15, o: 0.35 },
        { w: 3, h: 6, l: 30, t: 70, o: 0.28 },
        { w: 7, h: 5, l: 85, t: 45, o: 0.40 },
        { w: 5, h: 3, l: 50, t: 80, o: 0.30 },
        { w: 4, h: 7, l: 20, t: 40, o: 0.22 },
        { w: 6, h: 6, l: 60, t: 25, o: 0.38 },
        { w: 3, h: 4, l: 40, t: 60, o: 0.32 },
        { w: 5, h: 5, l: 70, t: 85, o: 0.27 },
        { w: 7, h: 3, l: 25, t: 50, o: 0.42 },
        { w: 4, h: 6, l: 55, t: 12, o: 0.33 },
        { w: 6, h: 4, l: 45, t: 35, o: 0.29 },
      ].map((dot, i) => (
        <div
          key={i}
          className="float-dot absolute rounded-full bg-gold-foil/30"
          style={{
            width: `${dot.w}px`,
            height: `${dot.h}px`,
            left: `${dot.l}%`,
            top: `${dot.t}%`,
            opacity: dot.o,
          }}
        />
      ))}



      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-4 max-w-lg mx-auto">
        {/* Om symbol */}
        <p className="env-text text-4xl md:text-5xl text-gold-foil drop-shadow-sm">
          ॐ
        </p>

        {/* Greeting text */}
        <div className="text-center">
          <p className="env-text text-xs md:text-sm uppercase tracking-[0.4em] text-gold-foil/80 font-semibold mb-2">
            || शुभ विवाह ||
          </p>
          <p className="env-text font-serif text-lg md:text-2xl text-maroon/80 italic">
            You are cordially invited to the wedding celebration of
          </p>
          <h2 className="env-text font-cursive text-4xl md:text-6xl text-maroon-dark mt-3">
            Kartik & Vibhuti
          </h2>
        </div>



        {/* Envelope */}
        <div className="envelope relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Envelope body with pattern */}
          <div className="envelope-body">
            <div
              className="absolute inset-0 opacity-[0.08] rounded-lg"
              style={{
                backgroundImage: "url('/assets/envelope-pattern.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Card inside */}
          <div
            ref={cardRef}
            className="absolute left-[10%] right-[10%] top-[15%] bottom-[10%] rounded-t-[80px] rounded-b-lg opacity-0"
            style={{
              background: "linear-gradient(to bottom, var(--cream), white)",
              border: "1px solid var(--gold-foil)",
              boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full pt-8">
              <span className="text-gold-foil text-lg font-serif italic">K & V</span>
              <div className="w-12 h-[1px] bg-gold-foil/50 mt-2" />
            </div>
          </div>

          {/* Flap */}
          <div
            ref={flapRef}
            className="envelope-flap"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          />

          {/* Wax seal */}
          <div ref={sealRef} className="wax-seal" onClick={handleOpen}>
            <img src="/assets/wax-seal.png" alt="Open invitation" />
          </div>
        </div>

        {/* Tap hint */}
        <p className="tap-hint text-xs uppercase tracking-[0.3em] text-maroon/50 opacity-0">
          ✦ Tap the seal to open ✦
        </p>
      </div>


    </div>
  );
}
