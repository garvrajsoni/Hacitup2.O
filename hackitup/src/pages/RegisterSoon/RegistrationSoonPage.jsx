import { motion } from 'framer-motion';

export default function RegistrationSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/20 via-black to-green-900/20" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYsNiIvPjwvc3ZnPg==')] opacity-20" />
      
      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl w-full max-w-4xl border border-green-500/20 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
          Registration Will Start Soon
        </h1>
        <p className="text-gray-400 mt-4 text-lg">Stay tuned for updates!</p>
      </motion.div>
    </div>
  );
}
