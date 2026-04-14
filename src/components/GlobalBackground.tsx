"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    // Marathi Wedding Palette Transitions:
    // 1. Hero: Cream (#FFF8F0)
    // 2. Engagement: Ice Blue (#E0F2FE)
    // 3. Haldi: Turmeric Gold (#F59E0B)
    // 4. Wedding: Deep Teal (#115E59)
    // 5. Venue: Cream (#FFF8F0)
    // 6. Footer: Warm White (#FFFDF9)
    const colors = [
      "#FFF8F0", // Hero — Cream
      "#E0F2FE", // Engagement — Ice Blue
      "#F59E0B", // Haldi — Turmeric
      "#115E59", // Wedding — Deep Teal
      "#FFF8F0", // Venue — Cream
      "#FFFDF9", // Footer — Warm White
    ];

    // Initialize
    gsap.set(bgRef.current, { backgroundColor: colors[0] });

    const sections = document.querySelectorAll("main > section");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, index) => {
      if (index === 0) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(bgRef.current, {
            backgroundColor: colors[index],
            duration: 2,
            ease: "power2.out",
            overwrite: "auto",
          }),
        onEnterBack: () =>
          gsap.to(bgRef.current, {
            backgroundColor: colors[index],
            duration: 2,
            ease: "power2.out",
            overwrite: "auto",
          }),
      });

      triggers.push(trigger);
    });

    // Also handle scrolling back to Hero
    const heroTrigger = ScrollTrigger.create({
      trigger: sections[0],
      start: "top center",
      onEnterBack: () =>
        gsap.to(bgRef.current, {
          backgroundColor: colors[0],
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
        }),
    });
    triggers.push(heroTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 -z-50 pointer-events-none" />
  );
};

export default GlobalBackground;
