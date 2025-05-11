'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import './game.css'; // For flip effect
import img1 from '@/public/images/1.jpg';
import img2 from '@/public/images/2.jpg';
import img3 from '@/public/images/3.jpg';
import img4 from '@/public/images/4.jpg';
import img5 from '@/public/images/5.jpg';
import img6 from '@/public/images/6.jpg';

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6
];

function shuffleArray(array) {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((img, index) => ({
      id: index,
      img,
      flipped: false,
      matched: false,
    }));
}

export default function GamePage() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false); // To track if game is completed

  useEffect(() => {
    setCards(shuffleArray(images));
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].img === cards[second].img) {
        const updated = [...cards];
        updated[first].matched = true;
        updated[second].matched = true;
        setCards(updated);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const updated = [...cards];
          updated[first].flipped = false;
          updated[second].flipped = false;
          setCards(updated);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setGameCompleted(true); // Mark game as completed
    }
  }, [cards]);

  useEffect(() => {
    if (gameCompleted) {
      setTimeout(() => {
        router.push('/birthday'); // Navigate after the transition animation
      }, 1200); // Delay to allow the animation to complete
    }
  }, [gameCompleted, router]);

  const handleCardClick = (index) => {
    if (cards[index].flipped || cards[index].matched || flippedCards.length === 2) return;

    const updated = [...cards];
    updated[index].flipped = true;
    setCards(updated);
    setFlippedCards([...flippedCards, index]);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-purple-100 to-blue-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }} // Animation for exiting the page
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold mb-6 text-gray-800"
      >
        Match the Images 🎯
      </motion.h2>

      {/* Adjust the grid for mobile with 3 cards per row */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-5xl px-4">
        {cards.map((card, index) => (
          <div key={card.id} className="aspect-square w-full">
            <div
              className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <div className="card-front bg-pink-200 rounded-xl shadow-md"></div>
                <div className="card-back rounded-xl overflow-hidden">
                  <Image src={card.img} alt="card" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full screen transition overlay */}
      {gameCompleted && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white opacity-90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="text-4xl font-bold text-gray-800"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Congratulations! 🎉
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
