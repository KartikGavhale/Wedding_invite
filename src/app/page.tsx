"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import EngagementSection from "@/components/EngagementSection";
import HaldiSection from "@/components/HaldiSection";
import WeddingSection from "@/components/WeddingSection";
import VenueSection from "@/components/VenueSection";
import FooterSection from "@/components/FooterSection";
import GlobalBackground from "@/components/GlobalBackground";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <>
      {/* Envelope intro animation */}
      {!envelopeOpen && (
        <EnvelopeOpening onComplete={() => {
          window.scrollTo(0, 0);
          setEnvelopeOpen(true);
        }} />
      )}

      <main
        className={`w-full flex-col items-center justify-center overflow-hidden relative transition-opacity duration-500 ${
          envelopeOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <GlobalBackground />
        <BackgroundMusic />

        {/* Sections: Hero → Engagement → Haldi → Wedding → Venue → Footer */}
        <HeroSection />
        <EngagementSection />
        <HaldiSection />
        <WeddingSection />
        <VenueSection />
        <FooterSection />
      </main>
    </>
  );
}
