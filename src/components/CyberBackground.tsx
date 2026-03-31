import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CyberBackground() {
  const { scrollY } = useScroll();
  
  // Smooth the scroll values so the parallax doesn't feel jumpy
  const smoothY = useSpring(scrollY, {
    damping: 25,
    stiffness: 70,
    mass: 0.5
  });

  // Calculate different parallax speeds based on the scroll position
  // Far background (slowest)
  const yBg1 = useTransform(smoothY, [0, 2000], [0, -150]);
  const yBg2 = useTransform(smoothY, [0, 2000], [0, -300]);
  // Mid ground
  const yMid1 = useTransform(smoothY, [0, 2000], [0, -450]);
  const yMid2 = useTransform(smoothY, [0, 2000], [0, 300]); // Moves opposite direction
  // Foreground elements
  const yFg1 = useTransform(smoothY, [0, 2000], [0, -600]);
  
  // Rotations for abstract tech elements
  const rotate1 = useTransform(smoothY, [0, 2000], [0, 180]);
  const rotate2 = useTransform(smoothY, [0, 2000], [0, -120]);

  // Use state to detect mouse position for subtle interactive 3D feel
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-[#030712]">
      
      {/* Dynamic Base Grid Masked with Radial Gradient */}
      <div 
        className="absolute inset-0 bg-grid-white opacity-10 transition-transform duration-700 ease-out" 
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }} 
      />

      {/* Massive Glowing Nodes (Slow Parallax) */}
      <motion.div 
        style={{ y: yBg1 }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/15 blur-[120px]"
      />
      <motion.div 
        style={{ y: yBg2 }}
        className="absolute top-[30%] right-[-10vw] w-[50vw] h-[60vw] rounded-full bg-indigo-600/10 blur-[140px]"
      />
      <motion.div 
        style={{ y: yMid2 }}
        className="absolute bottom-[-30%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/15 blur-[130px]"
      />

      {/* Geometric AI Elements (Mid Parallax) */}
      <motion.div 
        style={{ y: yMid1, rotate: rotate1 }} 
        className="absolute top-[15%] right-[10%] opacity-30 mix-blend-screen"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="150" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="200" cy="200" r="100" stroke="#06b6d4" strokeWidth="2" strokeDasharray="10 30" />
          <path d="M200 0V400M0 200H400" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.5"/>
          <path d="M50 50L350 350M50 350L350 50" stroke="#2563eb" strokeWidth="0.5" opacity="0.3"/>
          <circle cx="200" cy="200" r="190" stroke="url(#paint0_linear)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cybernetic Code Rain / Data Clusters (Fast Parallax) */}
      <motion.div 
        style={{ 
          y: yFg1, 
          x: mousePosition.x * 1.5,
        }} 
        className="absolute top-[45%] left-[5%] text-blue-400/20 font-mono text-[10px] leading-relaxed tracking-widest whitespace-pre"
      >
        {`01011001 01000101 01010011\n[SYS.NET_INIT] -> 0x8F9A\nALLOC_MEMORY(100MB)...\nBUFFER_READY();`}
      </motion.div>

      <motion.div 
        style={{ 
          y: yMid1, 
          rotate: rotate2,
          x: mousePosition.x * -1,
        }} 
        className="absolute top-[70%] right-[25%] opacity-20"
      >
         <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="80" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 6" fill="transparent"/>
            <rect x="25" y="25" width="50" height="50" stroke="#06b6d4" strokeWidth="1" fill="transparent"/>
            <circle cx="50" cy="50" r="5" fill="#3b82f6" className="animate-pulse" />
         </svg>
      </motion.div>

      <motion.div 
        style={{ y: yBg1 }} 
        className="absolute top-[20%] left-[30%] text-indigo-400/10 font-mono text-xs whitespace-pre"
      >
        {`const model = await loadLLM();\nmodel.predict(tensor);\n/* MANTIQ AI KERNEL */`}
      </motion.div>

      {/* Global Vignette to ensure content readability */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}
