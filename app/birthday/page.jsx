'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

// ✅ Your imported images
import img1 from '@/public/images/1.jpg';
import img2 from '@/public/images/2.jpg';
import img3 from '@/public/images/3.jpg';
import img4 from '@/public/images/4.jpg';
import img5 from '@/public/images/5.jpg';
import img6 from '@/public/images/6.jpg';

const images = [img1, img2, img3, img4, img5, img6];

// ✅ Custom Hook for window size
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export default function BirthdayPage() {
  const [width, height] = useWindowSize();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Confetti */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={500} // Increased number of pieces
        gravity={0.3} // Slightly slower gravity for more floaty effect
        initialVelocityX={{ min: -10, max: 10 }} // Spread in X direction
        initialVelocityY={{ min: 10, max: 30 }} // Spread in Y direction
        recycle={true} // Keeps confetti looping
        colors={['#FF0D57', '#00D1D1', '#FFD700', '#FF6347', '#800080', '#32CD32']} // Vibrant color set
        tweenDuration={5000} // Duration for confetti to keep falling
        confettiSource={{ x: width / 2, y: 0 }} // Start from top center
      />

      {/* 📸 Tiled Image Background */}
      <div className="absolute inset-0 z-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 opacity-80">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="border-4 border-white rounded-xl overflow-hidden shadow-sm">
            <Image
              src={images[i % images.length]}
              alt="memory"
              width={400} // Increased image width
              height={500} // Increased image height
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* 🌈 Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-pink-200/60 z-10 backdrop-blur-sm" />

      {/* 🎂 Birthday Message */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 " >
        <div className="flex flex-col items-center justify-center text-center">
          {/* Happy Birthday */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="text-7xl md:text-7xl font-extrabold text-pink-600 mb-4 md:mb-0 drop-shadow-md"
            style={{marginBottom: '20px'}}
          >
            Happy Birthday
          </motion.div>

          {/* Siri */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 25 }}
            className="text-transparent font-vibes bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-9xl md:text-9xl font-extrabold ml-2"
            style={{marginBottom: '20px'}}
          >
            Siri
          </motion.div>
        </div>

        {/* Typewriter Effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl to-purple-600  max-w-xl mt-6 md:mt-0"
        >
          <Typewriter
            words={[
              'Hope your day is as amazing as you are 💖',
              'Wishing you endless joy and memories!',
              'Cheers to you and your journey ahead 🎂',
            ]}
            loop={true}
            cursor
            cursorStyle="✨"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2500}
          />
        </motion.p>
      </div>
    </div>
  );
}
