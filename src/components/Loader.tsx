import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="relative flex items-center justify-center p-8"
      >
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl" />
        <Network className="w-12 h-12 text-blue-500 relative z-10" />
      </motion.div>
    </div>
  );
}

