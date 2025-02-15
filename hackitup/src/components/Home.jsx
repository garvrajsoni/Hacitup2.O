import  { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Calendar, MapPin, Users, Send, Github, Linkedin, Trophy, } from 'lucide-react';
import CountdownTimer from './Countdown';
import FaqCard from './FaqCard';

import logo from '../assets/hackitup2.png';
// import logo2 from '../assets/hacklogo2.O.jpeg';

import { NavLink } from 'react-router-dom';
import HackitLogo from './HackitLogo';

const Card3D = ( {children} ) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (event.clientY - centerY) / 20;
    const rotateY = -(event.clientX - centerX) / 20;
    
    x.set(rotateY);
    y.set(rotateX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      className="h-full"
    >
      <motion.div
        className="bg-gradient-to-br from-green-800 to-black p-6 rounded-xl
                   border border-green-500 border-opacity-20 h-full
                   backdrop-blur-sm"
        style={{
          rotateX: y,
          rotateY: x,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const ParallaxText = ({ children, y = 0 }) => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, y]);

  return (
    <motion.div style={{ y: parallaxY }}>
      {children}
    </motion.div>
  );
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
        ease: "easeInOut"
      }
    }}
  >
    {children}
  </motion.div>
);

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  // const controls = useAnimation();
  const [emailbody, setEmailbody] = useState('');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progress bar animation
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <motion.nav
        className={`fixed w-full z-40 transition-colors duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
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
              <img className='w-20 aspect-1/2 md:w-32 shadow-md shadow-green-500 drop-shadow-lg' src={logo} alt="Hackathon Logo" />
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
      <section id= "section" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
     
        <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900 to-black" />

        
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
                <HackitLogo/>
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
        
        <CountdownTimer/>
        
        </div>
      </section>

      {/* Tracks Section */}
      <section id="Schedule" className="py-20 relative">
        <ParallaxText y={50}>
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16 text-green-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Schedule
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "18 Feb 2025",
                  description: "Registration Begin"
                },
                {
                  title: "26 Feb 2025",
                  description: "Registration Ends"
                },

                {
                  title: "27 Feb 2025",
                  description: "Problem Statement will be given"
                },
                {
                  title: "27 Feb 2025",
                  description: "Day 1 of Hacathon"
                },
                {
                  title: "28 Feb 2025",
                  description: "Day 2 of Hacathon"
                }
              ].map((track, index) => (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card3D>
                    <h3 className="text-2xl font-bold mb-4 text-green-400">{track.title}</h3>
                    <p className="text-green-200">{track.description}</p>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxText>
      </section>

      {/* Prizes Section */}
      <section className="py-20 relative overflow-hidden">
        <ParallaxText y={-50}>
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16 text-green-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Prizes
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { place: "1st Place", prize: "₹ 3,000" },
                { place: "2nd Place", prize: "₹ 2,000" },
                { place: "3rd Place", prize: "₹ 1,000" }
              ].map((prize, index) => (
                <motion.div
                  key={prize.place}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card3D>
                    <Trophy className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-300 flex justify-center items-center">{prize.place}</h3>
                    <p className="f text-4xl font-bold text-green-500 mt-2 flex justify-center items-center">{prize.prize}</p>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxText>
      </section>

      <div id="faq" className="w-full" ><FaqCard/></div>

      {/* Footer */}
      <footer className="bg-black py-12 relative">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-4 text-green-500">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/register" className="text-green-200 hover:text-green-400 transition-colors duration-300">
                    Register
                  </a>
                </li>
                <li>
                  <a href="#Schedule" className="text-green-200 hover:text-green-400 transition-colors duration-300">
                    Schedule
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-green-200 hover:text-green-400 transition-colors duration-300">
                    FAQ
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-4 text-green-500">Connect</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-green-200 hover:text-green-400"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <NavLink to={'https://github.com/ctaecoderscarousel'}><Github className="w-6 h-6" /></NavLink>
                </motion.a>
                <motion.a
                  href="#"
                  className="text-green-200 hover:text-green-400"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                >
                  <NavLink to={'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A86431371&keywords=ctae%20coders%20carousel&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=5d91be1e-9341-4ebc-a07d-c09eb408b709&sid=NtR&spellCorrectionEnabled=true'}><Linkedin className="w-6 h-6" /></NavLink>
                  
                </motion.a>
              </div>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-500">Contact Us</h3>
              <motion.div
                className="flex"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  placeholder="Type your Query Here"
                  className="flex-1 px-4 py-2 bg-black border border-green-500 border-opacity-20
                           rounded-l-lg focus:outline-none focus:border-green-400"
                           onChange={(e) => setEmailbody(e.target.value)}
                />
                <motion.a 
                href={`mailto:ctaecodercarousal@gmail.com?subject=${"Query Regarding Hackathon"}&body=${emailbody}`}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-r-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </footer>
     
    </div>
  );
};

export default HomePage;