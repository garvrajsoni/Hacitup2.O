import { useState, useEffect, useCallback } from "react";

const GlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;

    setPosition({ x, y });
  }, []);

  useEffect(() => {
    let animationFrameId;

    const animateGlow = () => {
      setGlowPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1,
      }));

      animationFrameId = requestAnimationFrame(animateGlow);
    };

    animationFrameId = requestAnimationFrame(animateGlow);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity"
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full bg-green-500/30 blur-3xl"
        style={{
          width: "250px",
          height: "250px",
          transform: `translate(${glowPosition.x - 125}px, ${
            glowPosition.y - 125
          }px)`,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default GlowingCursor;
