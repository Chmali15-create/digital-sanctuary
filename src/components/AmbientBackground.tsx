export function AmbientBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="ambient-orb animate-float"
          style={{
            width: 600,
            height: 600,
            top: "-10%",
            left: "-10%",
            background: "radial-gradient(circle, oklch(0.82 0.16 82 / 0.35), transparent 70%)",
          }}
        />
        <div
          className="ambient-orb animate-float"
          style={{
            width: 700,
            height: 700,
            bottom: "-20%",
            right: "-15%",
            background: "radial-gradient(circle, oklch(0.55 0.15 35 / 0.3), transparent 70%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="ambient-orb animate-float"
          style={{
            width: 400,
            height: 400,
            top: "40%",
            left: "55%",
            background: "radial-gradient(circle, oklch(0.65 0.12 60 / 0.2), transparent 70%)",
            animationDelay: "-3s",
          }}
        />
      </div>
      <div className="noise-overlay" />
    </>
  );
}