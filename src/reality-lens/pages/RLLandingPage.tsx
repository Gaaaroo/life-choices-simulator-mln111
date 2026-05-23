import { useState } from "react";
import { motion } from "framer-motion";
import { RealityLensShell } from "../components/RealityLensShell";
import { TypingText } from "../components/TypingText";
import { useRealityLensStore } from "../store/realityLensStore";

const BOOT_LINES = [
  "Reality Lens System v1.0",
  "",
  "Analyzing reality...",
  "Detecting phenomena...",
  "Searching for essence...",
];

export function RLLandingPage() {
  const setPhase = useRealityLensStore((s) => s.setPhase);
  const [bootDone, setBootDone] = useState(false);

  return (
    <RealityLensShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[70vh] flex-col items-center justify-center text-center"
      >
        <p className="rl-mono text-xs tracking-[0.4em] text-violet-400">
          MLN111 · REALITY SCANNER
        </p>

        <div className="rl-hologram-card mt-8 w-full max-w-lg rounded-xl p-6 text-left sm:p-8">
          <TypingText
            lines={BOOT_LINES}
            speedMs={38}
            onComplete={() => setBootDone(true)}
          />
        </div>

        {bootDone && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setPhase("intro")}
            className="rl-btn-primary rl-mono mt-10 rounded-lg px-10 py-4 text-sm font-semibold"
          >
            CHỌN CHAPTER
          </motion.button>
        )}
      </motion.div>
    </RealityLensShell>
  );
}
