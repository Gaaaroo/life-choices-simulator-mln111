import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RealityLensShell } from "../components/RealityLensShell";
import { TypingText } from "../components/TypingText";
import { useRealityLensStore } from "../store/realityLensStore";

const LINES = [
  "Phenomenon analysis completed.",
  "",
  "Understanding the essence is not enough.",
  "",
  "Simulating future possibilities...",
];

export function RLTransitionPage() {
  const setPhase = useRealityLensStore((s) => s.setPhase);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    const t = window.setTimeout(() => setPhase("chapter2"), 2800);
    return () => window.clearTimeout(t);
  }, [ready, setPhase]);

  return (
    <RealityLensShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-lg"
        >
          <div className="rl-hologram-card rounded-xl p-6 sm:p-8">
            <TypingText
              lines={LINES}
              speedMs={45}
              onComplete={() => setReady(true)}
            />
          </div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 w-full"
            >
              <p className="rl-mono text-center text-xs text-cyan-400">
                LOADING SIMULATION...
              </p>
              <div className="rl-progress-bar mt-4 overflow-hidden rounded-full">
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="block h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </RealityLensShell>
  );
}
