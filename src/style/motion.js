import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line  react/prop-types
export const ScaleUp = ({ children }) => (
  <motion.div
    initial={{ scale: 0.45, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0, ease: 'easeInOut' }}
    exit={{ x: '100%' }}
  >
    {children}
  </motion.div>
);

// eslint-disable-next-line  react/prop-types
export const Draggable = ({ children }) => (
  <motion.div
    drag
    dragConstraints={{
      top: -50,
      left: -50,
      right: 50,
      bottom: 50,
    }}
  >
    {children}
  </motion.div>
);
