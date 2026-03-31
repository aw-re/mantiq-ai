import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring configuration for the outer ring trailing effect
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mouse device (hide on mobile touch)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If hovering over links, buttons, or interactable elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-hoverable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Massive Background Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[1] mix-blend-screen bg-blue-500/10 blur-[80px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.3 : 0.15
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Tiny inner strict dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[99999] mix-blend-screen shadow-[0_0_10px_#22d3ee]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      
      {/* Outer trailing ring (spring follow + scale on hover) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-blue-500/50 flex items-center justify-center mix-blend-screen"
        animate={{
          width: isHovering ? 60 : 36,
          height: isHovering ? 60 : 36,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(34, 211, 238, 0.8)' : 'rgba(59, 130, 246, 0.5)',
          boxShadow: isHovering ? '0 0 20px rgba(34, 211, 238, 0.4)' : '0 0 0px transparent'
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
         <motion.div 
           className="w-full h-full rounded-full border border-cyan-300/30"
           animate={{ rotate: 360, scale: isHovering ? [1, 1.1, 1] : 1 }}
           transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 1, repeat: Infinity } }}
           style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
         />
      </motion.div>
    </>
  );
}
