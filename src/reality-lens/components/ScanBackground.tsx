const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  delay: `${(i % 8) * 0.7}s`,
}));

export function ScanBackground() {
  return (
    <div className="rl-scan-bg" aria-hidden>
      <div className="rl-scan-line" />
      <div className="rl-particles">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
