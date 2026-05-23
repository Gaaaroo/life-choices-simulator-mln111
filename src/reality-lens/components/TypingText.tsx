import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  speedMs?: number;
  onComplete?: () => void;
  className?: string;
};

export function TypingText({
  lines,
  speedMs = 42,
  onComplete,
  className = "",
}: Props) {
  const fullText = lines.join("\n");
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        window.clearInterval(timer);
        setDone(true);
        onComplete?.();
      }
    }, speedMs);
    return () => window.clearInterval(timer);
  }, [fullText, speedMs, onComplete]);

  return (
    <p
      className={`rl-mono whitespace-pre-line text-sm leading-relaxed text-cyan-200/90 sm:text-base ${className} ${!done ? "rl-typing-cursor" : ""}`}
    >
      {displayed}
    </p>
  );
}
