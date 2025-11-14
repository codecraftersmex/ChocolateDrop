import { useRef, useState } from "react";

export function useQuoteWizard() {
  const [step, setStep] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);

  // Navigation handlers
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      scrollToProgress();
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep((s) => s - 1);
      scrollToProgress();
    }
  }

  // Scroll to progress component
  function scrollToProgress() {
    const el = progressRef.current;
    if (!el) return;

    // Desired top gap (what your scroll-mt was doing)
    const OFFSET = 85;

    // Get current scroll + element position
    const rect = el.getBoundingClientRect();
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = Math.max(0, currentY + rect.top - OFFSET);

    // Use the root scroller (Safari-safe) and avoid scrollIntoView
    const scroller = document.scrollingElement || document.documentElement;

    // Smooth, no jank with fixed bars
    requestAnimationFrame(() => {
      scroller.scrollTo({ behavior: "smooth", top: targetY });
    });
  }

  return {
    handleNext,
    handlePrev,
    progressRef,
    step,
  };
}
