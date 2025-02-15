import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Users, Download, Mail, Hash, ChevronRight, Award, Sparkles, Lock } from 'lucide-react';
import * as XLSX from 'xlsx';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAllData } from '../Database/getMaster';

// Card Component
const Card = ({ children, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-800 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative">
        {children}
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
          transformStyle: 'preserve-3d',
        }}
      />
    </motion.div>
  );
};

// ParallaxHeader Component
const ParallaxHeader = ({ children }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <motion.div style={{ y }} className="relative z-10">
      {children}
    </motion.div>
  );
};

// Login Component
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
    } catch (error) {
      setError('Invalid credentials');
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#001a00] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-emerald-900/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-emerald-900/20 rounded-lg py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50"
                  placeholder="Admin Email"
                  required
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-emerald-900/20 rounded-lg py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Main Admin Component
const Admin = () => {
  const [teams, setTeams] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (isAuthenticated) {
      getAllData('team', setTeams);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const exportToExcel = () => {
    const excelData = teams.map(team => ({
      'Team Name': team.team_name,
      'Team Leader': team.team_leader,
      'Email': team.email,
      'Number of Members': team.no_members,
      'Team Members': team.team_members.map(member => 
        `${member.name} (${member.class})`
      ).join(', ')
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teams");
    XLSX.writeFile(wb, "HackItUp_Teams.xlsx");
  };

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-[#001a00] overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20" />
      <div className="fixed inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYsNiIvPjwvc3ZnPg==')] " />

      <div className="relative min-h-screen p-8">
        {/* Header with Logout */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Logout
          </button>
        </div>

        <ParallaxHeader>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">
              HackItUp 2.0 Teams
            </h1>
            <p className="text-gray-400">Transform Your Ideas into Reality</p>
            <button
              onClick={exportToExcel}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Download className="w-4 h-4" />
              Export to Excel
            </button>
          </div>
        </ParallaxHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teams?.map((team, index) => (
            <Card key={index} delay={index * 0.1}>
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-emerald-900/20 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{team.team_name}</h2>
                    <p className="text-gray-400 text-sm">Team #{index + 1}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span>Leader: {team.team_leader}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <span>{team.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Hash className="w-5 h-5 text-emerald-400" />
                    <span>{team.no_members} Members</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Team Members</h3>
                  </div>
                  <ul className="space-y-3">
                    {team['team_members']?.map((member, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/30 transition-colors duration-300"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                          <span className="text-white text-sm">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-gray-400 text-sm">{member.class}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
