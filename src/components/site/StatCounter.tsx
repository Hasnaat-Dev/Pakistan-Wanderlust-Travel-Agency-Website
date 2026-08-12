import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Animated count-up that fires once when scrolled into view. */
export function StatCounter({
  value,
  suffix = "",
  decimals = 0,
  label,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo for a confident settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-semibold text-primary sm:text-5xl">
        {display.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}