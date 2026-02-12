import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled to disable cursor effect
    const checkMobile = () => {
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-screen">
      <motion.div
        className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,169,106,0.15)_0%,rgba(0,0,0,0)_60%)] rounded-full blur-3xl"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15
        }}
      />
      
      {/* Smaller brighter core */}
      <motion.div
        className="absolute w-24 h-24 bg-[radial-gradient(circle,rgba(250,250,246,0.1)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-xl"
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.05
        }}
      />
    </div>
  );
};

export default CursorEffect;