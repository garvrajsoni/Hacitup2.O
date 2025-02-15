import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Plus, Minus } from "lucide-react";

const FaqCard = () => {

  const [clicked, setClicked] = useState(new Array(8).fill(false));

  const clickHandler = (index) => {
    setClicked(clicked.map((state, i) => (i === index ? !state : state)));
  };
  return (
    <div className='min-h-screen text-green-300 overflow-hidden px-2'>
      <div className="text-4xl font-bold text-center mb-16 text-green-500">FAQ</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 mt-12 mx-4 md:w-1/2 place-self-center">
        {[
          { question: "What is a hackathon?", answer: "A hackathon is a 24-hour event where 'hackers' from all over the globe collaborate on creating functional software and hardware by the end of the event." },
          { question: "Who can participate?", answer: "Anyone with an interest in technology, coding, and innovation can participate. We welcome participants from all disciplines." },
          { question: "Do I need a team?", answer: "You can participate as part of a team. If you don't have a team, you can form one at the event." },
          { question: "What should I bring?", answer: "Bring your laptop, chargers, and any other equipment you need for coding. Snacks and a sleeping bag might also come in handy!" },
          { question: "Are there any prizes?", answer: "Yes, there are awesome prizes for the best projects. Details on the prizes will be announced closer to the event." },
          { question: "Will there be mentors?", answer: "Yes, we will have mentors available to help you throughout the hackathon. They can provide guidance and support for your projects." },
          { question: "What is the schedule?", answer: "The hackathon will start on 27th February 2024. A detailed schedule will be provided to all participants closer to the event." },
          { question: "How do I register?", answer: "You can register on our website. Follow the registration link and fill out the form to secure your spot at HackitUp 2.0." },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-between bg-gradient-green-black-h bg-gradient-to-rp-4 rounded-lg shadow-md items-center py-2 px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1">
              <h1 className="text-xl font-bold">{item.question}</h1>
              <AnimatePresence>
                {clicked[index] && (
                  <motion.p
                    className="mt-2 text-xl font-sans"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={() => clickHandler(index)}
              className="mt-2 text-green-600 hover:underline"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {clicked[index] ? <Minus className='text-xl' /> : <Plus className='text-xl' />}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default FaqCard;