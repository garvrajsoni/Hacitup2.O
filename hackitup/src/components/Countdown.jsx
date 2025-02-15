import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-02-27T00:00:00');
    const startDate = new Date('2024-02-27T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      // const totalDays = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));
      const progress = Math.floor((now - startDate) / (targetDate - startDate) * 100);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          progress: Math.min(Math.max(progress, 0), 100)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBoxVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      className="bg-gradient-green-black-h md:p-8 rounded-2xl border border-green-500/20 backdrop-blur-sm"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4  gap-4">
        {Object.entries(timeLeft).slice(0, 4).map(([unit, value], index) => (
          <motion.div
            key={unit}
            className="text-center"
            variants={timeBoxVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
          >
            <motion.div 
              className="bg-green-950/40 rounded-xl p-6 backdrop-blur-sm border border-green-500/10"
              animate={{ 
                scale: [1, 1.02, 1],
                transition: { 
                  repeat: Infinity, 
                  duration: 2,
                  delay: index * 0.2 
                }
              }}
            >
              <motion.span 
                className="text-4xl md:text-5xl font-bold text-green-400"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {value.toString().padStart(2, '0')}
              </motion.span>
              <p className="text-green-200 text-sm md:text-base mt-2 capitalize">
                {unit}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div 
        className="mt-8 h-2 bg-green-950/30 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="h-full bg-gradient-green-black-h"
          style={{ width: `${timeLeft.progress || 0}%` }}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <p className="text-green-200 text-center mt-4">
        Join us at HackItUp 2.0!
      </p>
    </motion.div>
  );
};

export default CountdownTimer;
