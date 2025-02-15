import React, { useEffect, useState } from "react";
import {motion, useScroll, useTransform} from "framer-motion"

import CountdownTimer from "../../components/Countdown";

import logo from "../../assets/hackitup2.png";
import {Calendar, MapPin, Users,} from "lucide-react"
import HackitLogo from "../../components/HackitLogo";

const ParallaxText = ({ children, y = 0 }) => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, y]);

  return <motion.div style={{ y: parallaxY }}>{children}</motion.div>;
};

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      delay,
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }}
  >
    {children}
  </motion.div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* Navigation */}
      <motion.nav
        className={`fixed w-full z-40 transition-colors duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-bold text-green-500"
              whileHover={{ scale: 1.05 }}
            >
              <img
                className="w-20 aspect-1/2 md:w-32 shadow-md shadow-green-500 drop-shadow-lg"
                src={logo}
                alt="Hackathon Logo"
              />
            </motion.div>
            {/* <div className="hidden md:flex space-x-6">
              <NavLink>Home</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Tracks</NavLink>
              <NavLink>Schedule</NavLink>
              <NavLink>FAQ</NavLink>
            </div> */}
            <motion.a
              href="/register"
              className="bg-gradient-to-r from-green-500 via-green-400 to-black px-6 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="section"
        className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900 to-[#00000000]" />

        <div className="flex flex-col w-full md:w-[70%] px-20 justify-center gap-20">
          <ParallaxText y={-100}>
            <div className="container mx-auto px-4 mt-4 text-center relative z-10">
              <motion.h1
                className="text-6xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                  {/* <img src={logo2} alt="Hackathon Logo" className="w-[50rem] object-cover md:w-[600px]  mx-auto"/> */}
                  <HackitLogo />
                  {/* <HackathonLogo/> */}
                </span>
              </motion.h1>

              <motion.p
                className="text-2xl mb-12 text-green-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Transform Your Ideas into Reality
              </motion.p>

              <div className="flex flex-wrap gap-6 justify-center text-lg text-green-200">
                <FloatingElement delay={0.2}>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-green-500" /> Feb 27-28, 2025
                  </div>
                </FloatingElement>
                <FloatingElement delay={0.4}>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-green-500" /> AVP Hall, CTAE Campus
                  </div>
                </FloatingElement>
                <FloatingElement delay={0.6}>
                  <div className="flex items-center gap-2">
                    <Users className="text-green-500" /> 100+ Hackers
                  </div>
                </FloatingElement>
              </div>
            </div>
          </ParallaxText>

          <CountdownTimer />
        </div>
      </section>
    </>
  );
};

export default Header;
