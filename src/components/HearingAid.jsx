import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HearingAid = ({ donated }) => {
  return (
    <AnimatePresence>
      {donated && (
        <motion.div
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="absolute bottom-0 right-1/4 w-48 h-48"
        >
          <img 
            src='pic2.jpg' 
            alt="Hearing Aid" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HearingAid;