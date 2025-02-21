"use client";
import  { useEffect } from "react";
import confetti from "canvas-confetti";

const Confetti = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      function fireConfetti() {
        let duration = 3 * 1000; // 2 seconds
        let animationEnd = Date.now() + duration;
        let colors = [
          "#ff0000",
          "#ff7300",
          "#ffeb00",
          "#00ff00",
          "#0099ff",
          "#4b0082",
          "#ff00ff",
        ];

        (function frame() {
          let timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return;

          let particleCount = 50 * (timeLeft / duration);
          confetti({
            particleCount: particleCount,
            spread: 80,
            origin: { y: 0.6 },
            colors: colors,
          });

          requestAnimationFrame(frame);
        })();
      }
      fireConfetti();
    }
  }, [trigger]);
  return null;
};

export default Confetti;
