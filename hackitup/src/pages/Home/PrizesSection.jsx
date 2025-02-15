import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Trophy, Crown, Award, Medal } from "lucide-react";

const PrizesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Trophy animations
  const trophyScale = useTransform(smoothProgress, [0.3, 0.5], [9, 3]);
  const trophyOpacity = useTransform(smoothProgress, [0, 0.2, 0.5], [0, 1, 0]);
  const trophyY = useTransform(smoothProgress, [0, 0.3], [100, 0]);
  const trophyRotate = useTransform(smoothProgress, [0, 0.3], [45, 0]);

  // Prize positions animations
  const prizeOpacity = useTransform(smoothProgress, [0.3, 0.4], [0, 1]);
  const prizeScale = useTransform(smoothProgress, [0.3, 0.4], [0.8, 1]);

  const prizes = [
    {
      amount: 1000,
      position: "3rd",
      color: "text-green-400",
      gradient: "from-green-400/10 via-green-400/5 to-transparent",
      glowColor: "group-hover:shadow-green-400/20",
      height: "md:h-48",
      icon: Medal,
    },
    {
      amount: 3000,
      position: "1st",
      color: "text-green-400",
      gradient: "from-green-400/10 via-green-400/5 to-transparent",
      glowColor: "group-hover:shadow-green-400/20",
      height: "md:h-80",
      icon: Crown,
    },
    {
      amount: 2000,
      position: "2nd",
      color: "text-green-400",
      gradient: "from-green-400/10 via-green-400/5 to-transparent",
      glowColor: "group-hover:shadow-green-400/20",
      height: "md:h-64",
      icon: Award,
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[100vh] overflow-hidden">
      {/* Header Section */}
      <motion.div
        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [0, 1]) }}
        className="sticky top-0 pt-16 text-center z-10"
      >
        <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
          Prizes
        </h1>
        <p className="text-green-400 text-lg md:text-xl">
          Win Big, Dream Bigger
        </p>
      </motion.div>

      {/* Main Prize Display */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* Central Trophy Animation */}
        <motion.div
          style={{
            scale: trophyScale,
            opacity: trophyOpacity,
            y: trophyY,
            rotate: trophyRotate,
          }}
          className="absolute"
        >
          <Trophy className="w-32 h-32 text-green-500 drop-shadow-[0_0_15px_rgba(5, 255, 47, 0.5)]" />
        </motion.div>

        {/* Prize Podium */}
        <motion.div
          style={{
            opacity: prizeOpacity,
            scale: prizeScale,
          }}
          className="w-full px-4 mt-10 md:mt-24 lg:mt-32"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {prizes.map((prize, index) => {
              const xOffset = (index - 1) * 300;
              const x = useTransform(smoothProgress, [0.3, 0.4], [xOffset, 0]);

              return (
                <motion.div
                  key={index}
                  style={{ x }}
                  className="w-full md:flex-1 max-w-sm"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      className={`w-full  h-56 ${prize.height} rounded-lg
                            backdrop-blur-xl
                            flex flex-col items-center justify-center
                            shadow-lg transition-all duration-300
                            group relative
                            border border-gray-800/50
                            p-4 sm:p-6 md:p-8 lg:p-12
                            ${prize.glowColor}`}
                    >
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-b ${prize.gradient} opacity-100`}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center">
                        <prize.icon
                          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${prize.color} 
                                mb-2 sm:mb-3 md:mb-4 
                                group-hover:scale-110 transition-transform duration-300`}
                        />

                        <div className="flex flex-col items-center gap-1 text-center">
                          <span
                            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${prize.color}`}
                          >
                            ${prize.amount.toLocaleString()}
                          </span>
                          <span
                            className={`text-sm sm:text-base md:text-lg font-medium ${prize.color} 
                                  opacity-80 tracking-wide uppercase`}
                          >
                            {prize.position} Place
                          </span>
                        </div>
                      </div>

                      {/* Highlight effect */}
                      <div
                        className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/5 via-white/0 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Background Effects */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.2, 0.4], [0, 0.15]),
          }}
          className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-cyan-500/5 to-transparent"
        />
      </div>
    </div>
  );
};

export default PrizesSection;
