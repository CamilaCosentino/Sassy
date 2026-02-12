import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveObject } from '../types';
import { 
  BookOpen, 
  Telescope, 
  FlaskConical, 
  Scroll, 
  Map, 
  Scale, 
  Gavel, 
  Sparkles, 
  Component, 
  Search,
  Eye
} from 'lucide-react';

interface HotspotProps {
  object: InteractiveObject;
  onClick: (obj: InteractiveObject) => void;
}

const getIconForObject = (name: string, description: string) => {
  const text = (name + " " + description).toLowerCase();
  
  if (text.includes('telescope') || text.includes('metaphysics')) return <Telescope size={20} />;
  if (text.includes('flask') || text.includes('alchemy')) return <FlaskConical size={20} />;
  if (text.includes('scroll') || text.includes('ancient')) return <Scroll size={20} />;
  if (text.includes('map') || text.includes('influence')) return <Map size={20} />;
  if (text.includes('scale') || text.includes('justice')) return <Scale size={20} />;
  if (text.includes('law') || text.includes('seal') || text.includes('authority')) return <Gavel size={20} />;
  if (text.includes('diagram') || text.includes('logic')) return <Component size={20} />;
  if (text.includes('book') || text.includes('archive') || text.includes('desk') || text.includes('table')) return <BookOpen size={20} />;
  
  return <Sparkles size={20} />;
};

const Hotspot: React.FC<HotspotProps> = ({ object, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle Enter key for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(object);
    }
  };

  return (
    <div
      className="absolute z-30 flex items-center justify-center outline-none group"
      style={{ top: object.top, left: object.left, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => onClick(object)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${object.name}`}
    >
      {/* Icon Container */}
      <motion.div 
        className={`
          relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full 
          bg-midnight/80 border border-gold/50 text-gold shadow-[0_0_15px_rgba(201,169,106,0.3)]
          transition-colors duration-300
          ${isHovered ? 'bg-gold text-midnight border-white' : ''}
        `}
        animate={{ 
          scale: isHovered ? 1.15 : 1,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Ring for Visibility */}
        {!isHovered && (
          <div className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-50" />
        )}

        {getIconForObject(object.name, object.description)}
      </motion.div>

      {/* Tooltip / Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 18, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-48 z-40"
          >
            <div className="bg-midnight/95 border border-gold/30 p-3 rounded-sm shadow-xl text-center backdrop-blur-md relative">
              {/* Little triangle pointing up */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-midnight/95 border-l border-t border-gold/30 rotate-45" />
              
              <h4 className="text-paper font-serif text-sm font-semibold leading-tight mb-1">{object.name}</h4>
              <p className="text-gold/80 text-[10px] font-sans uppercase tracking-wider">{object.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hotspot;