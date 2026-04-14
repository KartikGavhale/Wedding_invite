"use client";

import { useEffect, useRef } from "react";

const DEFAULT_SRC = "/assets/wedding-music.mp3";
const FALLBACK_SRCS = [
  DEFAULT_SRC,
  "/assets/wedding-music.mp3"
];

export default function BackgroundMusic({
  src = DEFAULT_SRC,
}: {
  src?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;
    audio.currentTime = 0;
    audio.src = src;
    audioRef.current = audio;

    const playFromStart = async () => {
      if (startedRef.current) return;
      try {
        audio.currentTime = 0;
        await audio.play();
        startedRef.current = true;
      } catch {
        // Autoplay may be blocked until the first user interaction.
      }
    };

    const handleFirstInteraction = () => {
      void playFromStart();
      removeEvents();
    };

    const handleError = async () => {
      for (const candidate of FALLBACK_SRCS) {
        if (candidate === audio.src || candidate.endsWith(src)) continue;
        audio.src = candidate;
        try {
          audio.currentTime = 0;
          await audio.play();
          startedRef.current = true;
          return;
        } catch {
          // Keep trying fallbacks.
        }
      }
    };

    const interactionEvents = ["click", "touchstart", "pointerdown", "keydown"];

    const addEvents = () => {
      interactionEvents.forEach(evt => document.addEventListener(evt, handleFirstInteraction));
    };

    const removeEvents = () => {
      interactionEvents.forEach(evt => document.removeEventListener(evt, handleFirstInteraction));
    };

    void playFromStart();
    addEvents();
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.src = "";
      removeEvents();
      audio.removeEventListener("error", handleError);
    };
  }, [src]);

  return null;
}
