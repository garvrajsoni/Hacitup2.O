import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {  Send, Github, Linkedin } from "lucide-react";

// import logo2 from '../assets/hacklogo2.O.jpeg';

import NoiseBg from "../../assets/noise-bg.gif";
import GlowingCursor from "../../components/GlowingCursor";
import LocomotiveTextSection from "./LocomotiveTextSection";
import EventSchedule from "./EventSchedule";
import PrizesSection from "./PrizesSection";
import FAQSection from "./FAQs";
import Header from "./Header";
import Footer from "./Footer";



const HomeMain = () => {
  const { scrollYProgress } = useScroll();
  // const controls = useAnimation();

 

  // Progress bar animation
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{ backgroundImage: `url(${NoiseBg})` }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
        />
      <Header />
      <LocomotiveTextSection />

      <EventSchedule />

      <PrizesSection />

      <FAQSection />
      <Footer/>
     
      <GlowingCursor />
    </div>
  );
};

export default HomeMain;
