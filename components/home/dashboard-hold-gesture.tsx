"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const REQUIRED_FINGERS = 2;
const HOLD_DURATION_MS = 2000;

export function DashboardHoldGesture() {
  const router = useRouter();
  const holdTimerRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const fallbackTimerRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const clearTimers = () => {
      if (!holdTimerRef.current) {
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current);
          fallbackTimerRef.current = null;
        }
      } else {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };

    const navigateToDashboard = () => {
      hasNavigatedRef.current = true;
      router.push("/dashboard");
      // Fallback for environments where client-side routing does not fire.
      fallbackTimerRef.current = setTimeout(() => {
        if (window.location.pathname !== "/dashboard") {
          window.location.assign("/dashboard");
        }
      }, 200);
    };

    const evaluateTouches = (touches: TouchList) => {
      if (hasNavigatedRef.current) {
        return;
      }

      if (touches.length < REQUIRED_FINGERS) {
        clearTimers();
        return;
      }

      if (holdTimerRef.current) {
        return;
      }

      holdTimerRef.current = setTimeout(navigateToDashboard, HOLD_DURATION_MS);
    };

    const onTouchStart = (event: TouchEvent) => evaluateTouches(event.touches);
    const onTouchMove = (event: TouchEvent) => evaluateTouches(event.touches);
    const onTouchEnd = (event: TouchEvent) => evaluateTouches(event.touches);
    const onTouchCancel = () => clearTimers();
    const onWindowBlur = () => clearTimers();
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        clearTimers();
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimers();
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [router]);

  return null;
}
