import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    { question: "What is a hackathon?", answer: "A hackathon is a 24-hour event where 'hackers' from all over the globe collaborate on creating functional software and hardware by the end of the event." },
    { question: "Who can participate?", answer: "Anyone with an interest in technology, coding, and innovation can participate. We welcome participants from all disciplines." },
    { question: "Do I need a team?", answer: "You can participate as part of a team. If you don't have a team, you can form one at the event." },
    { question: "What should I bring?", answer: "Bring your laptop, chargers, and any other equipment you need for coding. Snacks and a sleeping bag might also come in handy!" },
    { question: "Are there any prizes?", answer: "Yes, there are awesome prizes for the best projects. Details on the prizes will be announced closer to the event." },
    { question: "Will there be mentors?", answer: "Yes, we will have mentors available to help you throughout the hackathon. They can provide guidance and support for your projects." },
    { question: "What is the schedule?", answer: "The hackathon will start on 27th February 2024. A detailed schedule will be provided to all participants closer to the event." },
    { question: "How do I register?", answer: "You can register on our website. Follow the registration link and fill out the form to secure your spot at HackitUp 2.0." },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
           <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
           FAQs
          </h1>
          <p className="text-green-400 text-lg md:text-xl">Everything you need to know about HackitUp 2.0</p>
        </motion.div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="group cursor-pointer"
            >
              <div className="backdrop-blur-sm border border-green-900/20 rounded-lg overflow-hidden transition-all duration-300 hover:bg-green-800/70">
                {/* Question */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <HelpCircle className="w-5 h-5 text-green-400/70 group-hover:text-green-400 transition-colors duration-300" />
                    <h3 className="text-lg font-medium text-green-50 group-hover:text-green-400 transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-green-400/70 transition-transform duration-300 
                              ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  />
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-300/90">
                        <div className="pt-4 border-t border-green-900/20">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-green-500/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default FAQSection;