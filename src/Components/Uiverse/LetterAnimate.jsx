import React from 'react';
import { motion } from 'framer-motion';

const LetterAnmate= () => {
  const text = "Featured Property";

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: .20, 
      },
    },
  };

  // Each letter variant
  const child = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.h2
      className="text-center text-3xl font-bold mt-5 underline"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default LetterAnmate;
