import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LocomotiveTextSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create smooth horizontal movement based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-1000, 1000]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="relative w-full">
        {/* First line moving left */}
        <motion.div
          style={{ x: x1, opacity }}
          className="flex whitespace-nowrap text-6xl md:text-8xl font-bold text-white mb-8"
        >
          <span className="mr-8">INNOVATE</span>
          <span className="mr-8">CODE</span>
          <span className="mr-8">BUILD</span>
          <span className="mr-8">HACK</span>
          <span className="mr-8">SOLVE</span>
          <span>BOLD</span>
        </motion.div>

        {/* Second line moving right */}
        <motion.div
          style={{ x: x2, opacity }}
          className="flex whitespace-nowrap text-6xl md:text-8xl font-bold text-white"
        >
          <span className="mr-8">DESIGN</span>
          <span className="mr-8">DEVELOP</span>
          <span className="mr-8">IDEATE</span>
          <span className="mr-8">SCALE</span>
          <span className="mr-8">WIN</span>
          <span>FLOW</span>
        </motion.div>

        {/* Center static text */}
        <motion.div
          style={{ opacity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     text-xl md:text-2xl text-green-500 font-light tracking-widest w-max"
        >
          CREATE. COLLABORATE. COMPETE.
        </motion.div>
      </div>
    </div>
  );
};

export default LocomotiveTextSection;