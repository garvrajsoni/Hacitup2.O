import { useEffect, useRef } from 'react';
import { useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-emerald-900 to-gray-900"
    >
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Floating Tech Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-lg bg-emerald-500/10 backdrop-blur-sm"
          style={{
            width: Math.random() * 100 + 50 + 'px',
            height: Math.random() * 100 + 50 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            transform: `translate(${mousePosition.x * (i + 1) * -5}px, ${
              mousePosition.y * (i + 1) * -5
            }px) rotate(${i * 45}deg)`,
            transition: 'transform 0.3s ease-out',
            animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out alternate`,
          }}
        />
      ))}

      {/* Glowing Orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full bg-emerald-400/30 blur-xl"
          style={{
            width: Math.random() * 200 + 100 + 'px',
            height: Math.random() * 200 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            transform: `translate(${mousePosition.x * (i + 1) * -10}px, ${
              mousePosition.y * (i + 1) * -10
            }px)`,
            transition: 'transform 0.4s ease-out',
            animation: `pulse ${Math.random() * 3 + 4}s infinite ease-in-out alternate`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;