import { useEffect, useRef, useState } from "react";

export function useQuoteWizard() {
  const [step, setStep] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const shouldScrollOnStepChange = useRef(false);
  const realignTimeoutRef = useRef<null | number>(null);

  // Navigation handlers
  function handleNext() {
    if (step < 3) {
      shouldScrollOnStepChange.current = true;
      setStep((s) => s + 1);
    }
  }

  function handlePrev() {
    if (step > 0) {
      shouldScrollOnStepChange.current = true;
      setStep((s) => s - 1);
    }
  }

  useEffect(() => {
    if (!shouldScrollOnStepChange.current) {
      return;
    }
    shouldScrollOnStepChange.current = false;

    // First alignment right after the new step renders.
    const rafId = window.requestAnimationFrame(scrollToProgress);

    // Second alignment for mobile keyboard/layout shifts.
    realignTimeoutRef.current = window.setTimeout(scrollToProgress, 220);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (realignTimeoutRef.current !== null) {
        window.clearTimeout(realignTimeoutRef.current);
      }
    };
  }, [step]);

  // Scroll to progress component
  function scrollToProgress() {
    const el = progressRef.current;
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  return {
    handleNext,
    handlePrev,
    progressRef,
    step,
  };
}
