import  { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';

const BinaryBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
    <div className="absolute inset-0 flex flex-wrap text-[8px] text-green-500 font-mono">
      {Array(100).fill('').map((_, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.span>
      ))}
    </div>
  </div>
);

const GlitchText = ({ children, className, delay = 0 }) => {
  const controls = useAnimationControls();
  
  const triggerGlitch = async () => {
    await controls.start({
      x: [0, -2, 2, -1, 0],
      y: [0, 1, -1, 0],
      transition: { duration: 0.2 }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onHover={triggerGlitch}
    >
      {/* Main text */}
      <motion.div 
        animate={controls}
        className="relative font-mono"
        style={{ textShadow: '0 0 10px rgba(0,255,0,0.5)' }}
      >
        {/* CRT scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan" />
        
        {/* Base text */}
        <span className="relative z-10 block text-white mix-blend-screen">
          {children}
        </span>

        {/* Tech circuit lines */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-0 right-0 h-[1px] bg-green-500 top-0" />
          <div className="absolute left-0 right-0 h-[1px] bg-green-500 bottom-0" />
        </div>
      </motion.div>

      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-green-500 opacity-70"
        animate={{
          x: [0, 2, -2, 1, -1, 0],
          clipPath: [
            'inset(0% 0% 0% 0%)',
            'inset(10% 0% 90% 0%)',
            'inset(0% 0% 0% 0%)',
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-cyan-500 opacity-70"
        animate={{
          x: [0, -2, 2, -1, 1, 0],
          clipPath: [
            'inset(0% 0% 0% 0%)',
            'inset(90% 0% 10% 0%)',
            'inset(0% 0% 0% 0%)',
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {children}
      </motion.span>

      {/* Digital noise effect */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        animate={{
          background: [
            'radial-gradient(circle, transparent 0%, transparent 100%)',
            'radial-gradient(circle, rgba(0,255,0,0.1) 0%, transparent 100%)',
            'radial-gradient(circle, transparent 0%, transparent 100%)'
          ]
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

const HackitLogo = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ rotate, scale }}
      className="relative flex items-start justify-center p-2"
    >
      <BinaryBackground />
      
      {/* Matrix-style rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full font-mono text-green-500/20 text-sm whitespace-nowrap"
          animate={{
            y: ["0%", "100%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array(20).fill('').map((_, i) => (
            <div key={i}>HACK THE SYSTEM_</div>
          ))}
        </motion.div>
      </div>

      {/* Main logo container */}
      <div className="flex items-start relative transform scale-75 md:scale-[200%]">
        <GlitchText className="text-8xl font-black tracking-tighter" delay={0}>
          HACK
        </GlitchText>
        <GlitchText className="text-8xl font-black tracking-tighter" delay={0.1}>
          IT
        </GlitchText>
        <GlitchText className="text-6xl font-black mt-2 ml-2" delay={0.2}>
          UP
        </GlitchText>
        <GlitchText className="text-4xl font-black mt-2" delay={0.3}>
          2.0
        </GlitchText>
      </div>
    </motion.div>
  );
};

export default HackitLogo;

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import logo2 from "../assets/hacklogo2.O.jpeg"; // Replace with actual path

// const HackathonLogo = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [mouseX, setMouseX] = useState(0);
//   const [mouseY, setMouseY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleMouseMove = (e) => {
//       setMouseX((e.clientX / window.innerWidth) * 2 - 1);
//       setMouseY((e.clientY / window.innerHeight) * 2 - 1);
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div className="relative flex justify-center items-center  overflow-hidden">
//       {/* Glitch Layers */}
//       <motion.div
//         className="absolute inset-0 w-full h-full opacity-10"
//         animate={{ x: [-2, 2, -2] }}
//         transition={{ duration: 0.1, repeat: Infinity }}
//       />

//       {/* Main Logo with Glitch & 3D Tilt */}
//       <motion.img
//         src={logo2}
//         alt="Hackathon Logo"
//         className="w-[320px] md:w-[600px] drop-shadow-2xl"
//         style={{
//           transform: `translateY(${scrollY * 0.2}px) rotateY(${mouseX * 10}deg) rotateX(${mouseY * 10}deg)`,
//         }} // Parallax + 3D effect
//         animate={{
//           opacity: [0, 1],
//           scale: [0.95, 1],
//         }}
//         transition={{
//           duration: 1,
//           ease: "easeOut",
//         }}
//         whileHover={{
//           filter: "drop-shadow(0px 0px 35px rgba(0, 255, 128, 0.9))",
//         }}
//       />

//       {/* RGB Glitch Effect */}
//       <motion.div
//         className="absolute w-full h-full top-0 left-0 mix-blend-overlay pointer-events-none"
//         animate={{
//           x: [-3, 3, -3],
//           opacity: [0.7, 1, 0.7],
//         }}
//         transition={{
//           duration: 0.1,
//           repeat: Infinity,
//         }}
//         style={{
//           background: "linear-gradient(90deg, rgba(0,255,128,0.2) 0%, rgba(255,0,0,0.2) 100%)",
//           filter: "blur(3px)",
//         }}
//       />

//       {/* Glitch Text Overlay */}
//       <motion.div
//         className="absolute bottom-5 text-green-400 font-mono text-xl opacity-40 tracking-wide"
//         animate={{
//           x: [-5, 5, -5],
//           opacity: [0.7, 1, 0.7],
//         }}
//         transition={{ duration: 0.1, repeat: Infinity }}
//       >
//         {"// HACKIT 2.0 _"}
//       </motion.div>
//     </div>
//   );
// };

// export default HackathonLogo;
