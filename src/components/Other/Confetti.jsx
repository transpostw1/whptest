"use client";
import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const Confetti = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [trigger]);
  return null;
};

export default Confetti;
