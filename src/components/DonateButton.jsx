import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SuccessMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-10 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
    >
      <CheckCircleIcon className="w-6 h-6 mr-2" />
      Successfully Donated!
    </motion.div>
  );
};

export default SuccessMessage;