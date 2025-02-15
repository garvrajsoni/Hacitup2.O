import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion"
import { Github, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  const [emailbody, setEmailbody] = useState("");
    
  return (
    <footer className="bg-black py-12 relative">
    <motion.div
      className="container mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-bold mb-4 text-green-500">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/register"
                className="text-green-200 hover:text-green-400 transition-colors duration-300"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="#Schedule"
                className="text-green-200 hover:text-green-400 transition-colors duration-300"
              >
                Schedule
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="text-green-200 hover:text-green-400 transition-colors duration-300"
              >
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
              <NavLink to={"https://github.com/ctaecoderscarousel"}>
                <Github className="w-6 h-6" />
              </NavLink>
            </motion.a>
            <motion.a
              href="#"
              className="text-green-200 hover:text-green-400"
              whileHover={{ scale: 1.2, rotate: -10 }}
            >
              <NavLink
                to={
                  "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A86431371&keywords=ctae%20coders%20carousel&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=5d91be1e-9341-4ebc-a07d-c09eb408b709&sid=NtR&spellCorrectionEnabled=true"
                }
              >
                <Linkedin className="w-6 h-6" />
              </NavLink>
            </motion.a>
          </div>
        </motion.div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-green-500">
            Contact Us
          </h3>
          <motion.div className="flex" whileHover={{ scale: 1.02 }}>
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
  )
}

export default Footer
