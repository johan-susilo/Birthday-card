import { useRouter } from 'next/router';
import { motion as m } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

export default function Success() {
  const [pieces, setPieces] = useState(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 6000);
  };
  const router = useRouter();

  useEffect(() => {
    stopConfetti();
  }, []);
  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" h-screen items-center flex justify-center relative"
    >
      <div className="bg-white rounded-lg drop-shadow-xl w-4/5 font-latoRegular text-gray-700 p-10">
        <h1 className="text-3xl pb-4 font-latoBold">
          Today is all about you {router.query.name}! 🎉
        </h1>
        <p className="text-lg  text-gray-500">
          Happy birthday to someone who holds a very special place in my heart.
          You bring so much joy and happiness to my life, and I&#39;m grateful
          for every moment we spend together. Today and always, I wish you all
          the love, blessings, and happiness in the world.
        </p>
        <p className="text-md mt-2"> —Johan</p>
      </div>
      <Confetti gravity={0.2} numberOfPieces={pieces} />
    </m.main>
  );
}
