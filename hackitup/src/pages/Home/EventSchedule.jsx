import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, Clock, Users, Sparkles, Trophy } from "lucide-react";

const EventSchedule = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 100%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scheduleEvents = [
    {
      date: "20 Feb 2025",
      day: "Tuesday",
      event: "Registration Opens",
      description: "Kickstart your journey by registering for the hackathon. Secure your spot early!",
      icon: Calendar,
    },
    {
      date: "26 Feb 2025",
      day: "Wednesday",
      event: "Registration Closes",
      description: "The registration window ends. Ensure your team is signed up before the deadline!",
      icon: Users,
    },
    {
      date: "27 Feb 2025",
      day: "Thursday",
      event: "Problem Statement Release",
      description: "Official problem statements will be shared with all registered teams. Start strategizing!",
      icon: Clock,
    },
    {
      date: "27 Feb 2025",
      day: "Thursday",
      event: "Hackathon Kickoff (Day 1)",
      description: "The hackathon officially begins! Collaborate, innovate, and start building your solution.",
      icon: Sparkles,
    },
    {
      date: "28 Feb 2025",
      day: "Friday",
      event: "Hackathon Continues (Day 2)",
      description: "A full day of coding, debugging, and refining your project before the final presentations.",
      icon: Trophy,
    },
    {
      date: "28 Feb 2025",
      day: "Friday",
      event: "Final Presentations & Results",
      description: "Teams will showcase their solutions, followed by jury evaluations and winner announcements.",
      icon: Trophy,
    },
  ];
  
  return (
    <div ref={containerRef} className="relative min-h-[250vh] mx-auto bg-gradient-to-b">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-16 w-full text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
            Schedule
          </h1>
          <p className="text-green-400 text-lg md:text-xl">Event Timeline</p>
        </motion.div>
      <div className="sticky top-0 h-screen flex flex-col items-center">

        {/* Timeline Section */}
        <div className="relative max-w-[800px]  w-full flex flex-col items-center mt-10">
          {/* Vertical Line */}
          <motion.div
            style={{
              scaleY: useTransform(smoothProgress, [0, 1], [0, 1]),
            }}
            className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-green-800"
          />

          {/* Events */}
          {scheduleEvents.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                style={{
                  opacity: useTransform(smoothProgress, [(index - 1) * 0.15, index * 0.2], [0, 1]),
                  x: useTransform(smoothProgress, [(index - 1) * 0.15, index * 0.2], [isEven ? 100 : -100, 0]),
                }}
                className={`relative w-80 mb-10 p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/10 shadow-xl 
                  ${isEven ? "ml-auto mr-4" : "mr-auto ml-4"}`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-gradient-to-r from-green-400 to-green-700 p-2 rounded-full">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="text-neutral-400 text-sm">{item.day}</div>
                <div className="text-2xl font-bold text-white mb-2">{item.date}</div>
                <div className="text-xl bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent font-semibold mb-4">
                  {item.event}
                </div>
                <p className="text-neutral-300">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;
