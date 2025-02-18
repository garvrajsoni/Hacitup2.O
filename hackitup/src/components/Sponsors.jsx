import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import matelogo from '../assets/MATEpreview.png';

const Sponsors = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Smooth fade-in and fade-out effect
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Background floating effect for depth
  const parallaxElements = Array.from({ length: 10 }, (_, i) => {
    return {
      x: useTransform(scrollYProgress, [0, 1], [Math.random() > 0.5 ? -150 : 150, Math.random() > 0.5 ? 150 : -150]),
      y: useTransform(scrollYProgress, [0, 1], [Math.random() * -200, Math.random() * 200]),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, Math.random() * 0.5 + 1, 0.5]),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.2, 0.2, 0])
    };
  });

  const sponsors = [
    { name: "MATE", image: matelogo },
  ];

  return (
    <motion.div 
      ref={containerRef} 
      className="relative overflow-hidden py-16 min-h-screen flex flex-col justify-center"
      style={{ opacity: fadeOpacity, y: translateY }}
    >
      {/* Background parallax elements */}
      {parallaxElements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 bg-green-500 rounded-full mix-blend-overlay"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(40px)',
            x: element.x,
            y: element.y,
            scale: element.scale,
            opacity: element.opacity
          }}
        />
      ))}

      <motion.h1 
        className='text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-16 flex items-center justify-center shadow-md drop-shadow-xl relative z-10'
        style={{ opacity: fadeOpacity, y: translateY }}
      >
        Sponsors
      </motion.h1>

      <motion.div 
        className={`${sponsors.length== 1 ? 'flex justify-center items-center' : 'grid grid-cols-1'} md:grid-cols-2 lg:grid-cols-4 gap-12 place-items-center relative z-10`}
      >
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.08, rotateY: 10 }}
          >
            <motion.div 
              className="m-4 w-56 h-56 flex items-center justify-center bg-white-900/50 backdrop-blur-xl p-6 shadow-lg relative rounded-lg overflow-hidden "
              whileHover={{ 
                boxShadow: "0px 0px 30px rgba(74, 222, 128, 0.5)", 
                rotateY: 10,
                borderColor: "rgba(74, 222, 128, 0.8)"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-green-900/80"
                style={{ 
                  opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]) 
                }}
              />
              
              <motion.img 
  src={sponsor.image} 
  alt={sponsor.name} 
  className="w-full h-full object-contain relative z-10 
             drop-shadow-[0_0_120px_rgba(0,176,255,1)] 
             brightness-200 contrast-150" 
  whileHover={{ scale: 1.15 }}
/>
              
              <motion.div 
                className="absolute top-0 left-0 w-full h-full border-0 border-green-500/30 rounded-lg"
                whileHover={{ 
                  borderColor: "rgba(74, 222, 128, 0.8)",
                  boxShadow: "inset 0 0 20px rgba(74, 222, 128, 0.3)"
                }}
              />
            </motion.div>
            
            <motion.h3 
              className='text-green-400 text-lg md:text-2xl font-bold flex items-center justify-center my-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
              viewport={{ once: false }}
            >
              {sponsor.name}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sponsors;