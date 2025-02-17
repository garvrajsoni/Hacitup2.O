import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CirclePlus, Users, Trophy, Rocket } from "lucide-react";
import { getAllData, setAllData } from "../Database/getMaster.js";
import RegistrationSoon from "../pages/RegisterSoon/RegistrationSoonPage.jsx";

const ParallaxBox = ({ children, delay = 0 }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  
  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const RegisterForm = () => {
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [members, setMembers] = useState([{ name: "", class: "", email: "", mo_no: "" }]);
  const [teams, setTeams] = useState([]);
  const [errors, setErrors] = useState({});
   
  useEffect(() => {
    getAllData('team', setTeams);
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateMobile = (mobile) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(mobile);
  };

  const validateClass = (classYear) => {
    const re = /^([1-4])(st|nd|rd|th)\s+year$/i;
    return re.test(classYear);
  };

  const validateName = (name) => {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  const handleTeamMemberChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [`member${index}_${name}`]: ""
    }));

    // Validate on change
    let error = "";
    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "mo_no":
        if (!validateMobile(value)) {
          error = "Please enter a valid 10-digit mobile number";
        }
        break;
      case "class":
        if (!validateClass(value)) {
          error = "Please enter class as '1st year', '2nd year', etc.";
        }
        break;
      case "name":
        if (!validateName(value)) {
          error = "Please enter a valid name (letters only)";
        }
        break;
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [`member${index}_${name}`]: error
      }));
    }
  };

  const addMember = () => {
    setMembers([...members, { name: "", class: "", email: "", mo_no: "" }]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate team name
    if (!validateName(teamName)) {
      newErrors.teamName = "Please enter a valid team name";
    }

    // Validate team leader
    if (!validateName(teamLeader)) {
      newErrors.teamLeader = "Please enter a valid team leader name";
    }

    // Validate all members
    members.forEach((member, index) => {
      if (!validateName(member.name)) {
        newErrors[`member${index}_name`] = "Please enter a valid name";
      }
      if (!validateEmail(member.email)) {
        newErrors[`member${index}_email`] = "Please enter a valid email address";
      }
      if (!validateMobile(member.mo_no)) {
        newErrors[`member${index}_mo_no`] = "Please enter a valid 10-digit mobile number";
      }
      if (!validateClass(member.class)) {
        newErrors[`member${index}_class`] = "Please enter class as '1st year', '2nd year', etc.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const teamData = [...teams, {
      team_name: teamName,
      email: members[0].email,
      mo_no: members[0].mo_no,
      no_members: members.length,
      team_leader: teamLeader,
      team_members: members,
    }];
    setAllData("team", teamData);
  };

  const targetDate = new Date('2025-02-20T00:00:00');

  return (
  <> { Date.now() < targetDate ?  <RegistrationSoon/> :  (<div className="min-h-screen bg-black overflow-hidden">
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/20 via-black to-green-900/20" />
    <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYsNiIvPjwvc3ZnPg==')] opacity-20" />
    
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl w-full max-w-4xl border border-green-500/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <ParallaxBox>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300"
            >
              <Trophy className="w-12 h-12 text-black" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Team Registration
            </h2>
            <p className="text-green-500 mt-2">Join HackItUp 2.0 - Transform Your Ideas into Reality</p>
          </div>
        </ParallaxBox>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Details Section */}
          <ParallaxBox delay={0.2}>
            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    setErrors(prev => ({ ...prev, teamName: "" }));
                  }}
                  className="w-full px-6 py-4 bg-black/50 border border-green-500/30 rounded-xl text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black/80 px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                  Team Name
                </label>
                {errors.teamName && (
                  <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
                )}
              </div>

              <div className="relative group">
                <input
                  type="text"
                  value={teamLeader}
                  onChange={(e) => {
                    setTeamLeader(e.target.value);
                    setErrors(prev => ({ ...prev, teamLeader: "" }));
                  }}
                  className="w-full px-6 py-4 bg-black/50 border border-green-500/30 rounded-xl text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black/80 px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                  Team Leader
                </label>
                {errors.teamLeader && (
                  <p className="text-red-500 text-sm mt-1">{errors.teamLeader}</p>
                )}
              </div>
            </div>
          </ParallaxBox>

          {/* Team Members Section */}
          {members.map((member, index) => (
            <ParallaxBox key={index} delay={0.3 + index * 0.1}>
              <div className="space-y-6 bg-black/50 p-6 rounded-xl border border-green-500/30">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-green-500">Member {index + 1}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['name', 'class', 'email', 'mo_no'].map((field) => (
                    <div key={field} className="relative group">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={member[field]}
                        onChange={(e) => handleTeamMemberChange(e, index)}
                        className="w-full px-6 py-4 bg-black/50 border border-green-500/30 rounded-xl text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 peer"
                        placeholder=" "
                        required
                      />
                      <label className="absolute text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black/80 px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                        {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                      </label>
                      {errors[`member${index}_${field}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`member${index}_${field}`]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ParallaxBox>
          ))}

          {/* Add Member Button */}
          <ParallaxBox delay={0.4}>
            <motion.button
              type="button"
              onClick={addMember}
              className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 ${
                members.length >= 4 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              } transition-all duration-300`}
              disabled={members.length >= 4}
              whileHover={{ scale: members.length >= 4 ? 1 : 1.05 }}
              whileTap={{ scale: members.length >= 4 ? 1 : 0.95 }}
            >
              <CirclePlus className="w-5 h-5" />
              Add Team Member
            </motion.button>
          </ParallaxBox>

          {/* Submit Button */}
          <ParallaxBox delay={0.5}>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-5 h-5" />
              Register Team
            </motion.button>
          </ParallaxBox>
        </form>
      </motion.div>
    </div>
  </div>)}</>
  );
};

export default RegisterForm;