'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/game');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-200 to-blue-100 relative overflow-hidden">
      {/* Background Glow Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-300 opacity-20 z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut',
          repeatType: 'loop',
        }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        className="text-4xl md:text-6xl font-bold text-gray-800 text-center px-4 z-10"
      >
        A Little Challenge Awaits...
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
        className="text-lg md:text-xl mt-4 text-gray-600 text-center px-6 z-10"
      >
        Are you ready to unlock your birthday surprise?
      </motion.p>

      {/* Button with Smooth Entrance */}
      <motion.button
        onClick={handleStart}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1.2, ease: 'easeOut' }}
        whileHover={{
          scale: 1.08,
          textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
          boxShadow: '0px 0px 20px rgba(255,105,135,0.6)',
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="mt-10 px-8 py-3 bg-pink-500 text-white text-lg rounded-full shadow-lg hover:bg-pink-600 transition z-10"
      >
        Accept the Challenge
      </motion.button>
    </div>
  );
}
