"use client";

import { useEffect, useRef, useCallback } from "react";

const DEFAULT_SRC = "/assets/wedding-music.mp3";

/**
 * BackgroundMusic — renders a real <audio> element in the DOM (required for
 * Android Chrome) and starts playback on the very first user gesture.
 *
 * Key Android fixes:
 *  1. The <audio> element MUST be in the DOM — `new Audio()` is unreliable.
 *  2. `.play()` must be called synchronously inside the gesture handler
 *     (no awaiting anything before the play call).
 *  3. We listen to touchstart, click, pointerdown and keydown to cover
 *     every device/browser combination.
 */
export default function BackgroundMusic({
  src = DEFAULT_SRC,
}: {
  src?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  /* ── Synchronous play helper (no async before .play()) ────────── */
  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return;

    // Must call play() synchronously in the gesture stack
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        startedRef.current = true;
      }).catch(() => {
        // Autoplay still blocked — will retry on next interaction
      });
    }
  }, []);

  useEffect(() => {
    const events = ["touchstart", "click", "pointerdown", "keydown"];

    const onInteraction = () => {
      tryPlay();
      if (startedRef.current) {
        events.forEach((e) => document.removeEventListener(e, onInteraction, true));
      }
    };

    // Try autoplay first (works on desktop, may fail on mobile)
    tryPlay();

    // Register on the capture phase so we fire before any stopPropagation
    events.forEach((e) =>
      document.addEventListener(e, onInteraction, true)
    );

    return () => {
      events.forEach((e) =>
        document.removeEventListener(e, onInteraction, true)
      );
    };
  }, [tryPlay]);

  return (
    // A real DOM <audio> element — Android requires this to be in the document
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      ref={audioRef}
      src={src}
      loop
      preload="auto"
      playsInline
      style={{ display: "none" }}
    />
  );
}
