import React from 'react';
import { motion } from 'framer-motion';

const SuccessMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
    >
      Successfully Donated!
    </motion.div>
  );
};

export default SuccessMessage;