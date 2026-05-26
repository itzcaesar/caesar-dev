import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const applyMode = () => setIsEnabled(mediaQuery.matches);

    applyMode();
    mediaQuery.addEventListener('change', applyMode);

    return () => {
      mediaQuery.removeEventListener('change', applyMode);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      setIsHovering(false);
      setHoverText('');
      return;
    }

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-text]';

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovering(false);
        setHoverText('');
        return;
      }

      const hoverTarget = target.closest(interactiveSelector) as HTMLElement | null;
      const dataText = hoverTarget?.getAttribute('data-cursor-text')?.trim();

      if (dataText) {
        setIsHovering(true);
        setHoverText(dataText);
      } else {
        const isClickable = Boolean(hoverTarget);
        setIsHovering(!!isClickable);
        setHoverText('');
      }
    };

    const hideCursor = () => {
      setIsVisible(false);
      setIsHovering(false);
      setHoverText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', hideCursor);
      window.removeEventListener('blur', hideCursor);
    };
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="w-1 h-1 bg-sw-accent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-white/70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-white/70" />
      </motion.div>

      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] border border-sw-accent flex items-center justify-center"
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%', 
          translateY: '-50%'
        }}
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        animate={{
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] ml-6 mt-6"
        style={{ x: springX, y: springY }}
        animate={{ opacity: hoverText && isVisible ? 1 : 0 }}
      >
        <span className="bg-sw-accent text-sw-black text-[10px] font-mono font-bold px-2 py-1 uppercase">
          {hoverText}
        </span>
      </motion.div>
    </>
  );
};

export default CustomCursor;
