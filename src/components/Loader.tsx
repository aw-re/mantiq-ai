import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import DecodeText from './DecodeText';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-6">
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
        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-500/50"
        />
        <Cpu className="w-14 h-14 text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
      </motion.div>
      <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
        <DecodeText text="INITIALIZING_CORE_SYSTEMS..." speed={40} />
      </div>
    </div>
  );
}

