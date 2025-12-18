import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Rigid, mechanical movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      
      const dataText = target.getAttribute('data-cursor-text');
      if (dataText) {
        setHoverText(dataText);
        setIsHovering(true);
      } else {
        const isClickable = 
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button');
        
        setIsHovering(!!isClickable);
        setHoverText(isClickable ? '' : '');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Crosshair Center */}
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-exclusion"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-1 h-1 bg-sw-accent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-white/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-white/50" />
      </motion.div>
      
      {/* Target Box */}
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] border border-sw-accent flex items-center justify-center"
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%', 
          translateY: '-50%'
        }}
        animate={{
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          opacity: 1,
          backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.1)' : 'transparent',
        }}
        transition={{ duration: 0.15 }}
      >
      </motion.div>

      {/* Label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] ml-6 mt-6"
        style={{ x: springX, y: springY }}
        animate={{ opacity: hoverText ? 1 : 0 }}
      >
        <span className="bg-sw-accent text-sw-black text-[10px] font-mono font-bold px-2 py-1 uppercase">
          {hoverText}
        </span>
      </motion.div>
    </>
  );
};

export default CustomCursor;