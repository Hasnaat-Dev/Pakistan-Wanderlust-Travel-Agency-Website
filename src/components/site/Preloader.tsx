import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mountain } from "lucide-react";

/** Branded first-paint preloader; shows once per session. */
export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("pw-preloaded")) return;
    setDone(false);
    const t = setTimeout(() => {
      sessionStorage.setItem("pw-preloaded", "1");
      setDone(true);
    }, 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-200 grid place-items-center bg-ink"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid size-14 place-items-center rounded-full bg-primary-foreground/10 text-gold"
            >
              <Mountain className="size-7" aria-hidden />
            </motion.span>
            <p className="font-display text-lg tracking-wide text-primary-foreground">Pakistan Wanderlust</p>
            <div className="h-px w-40 overflow-hidden bg-primary-foreground/15">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="h-full w-full bg-gold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}