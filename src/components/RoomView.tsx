import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomData, InteractiveObject } from '../../types';
import Hotspot from './Hotspot';
import Modal from './Modal';
import Navigation from './Navigation';

interface RoomViewProps {
  room: RoomData;
  onBack: () => void;
  onHelpClick: () => void;
}

const RoomView: React.FC<RoomViewProps> = ({ room, onBack, onHelpClick }) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedObject, setSelectedObject] = useState<InteractiveObject | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const animationRef = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Drag refs
  const dragStartRef = useRef<{ clientX: number; clientY: number; panX: number; panY: number } | null>(null);

  // Pan settings
  // The image is scaled to 160% (w-[160%]). 
  // Available slack per side is (160 - 100) / 2 = 30%.
  // To be safe, we limit panning to 15% relative to the screen. 
  // Since 15% of 160% width is 24% displacement, it fits within the 30% slack.
  const LIMIT = 15; 
  const PAN_SPEED = 0.5; // Slightly slower for more control

  // Button Pan Handler
  const handleButtonPan = (direction: 'left' | 'right' | 'up' | 'down') => {
    setPan(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (direction === 'left') newX = Math.min(newX + PAN_SPEED, LIMIT);
        if (direction === 'right') newX = Math.max(newX - PAN_SPEED, -LIMIT);
        if (direction === 'up') newY = Math.min(newY + PAN_SPEED, LIMIT);
        if (direction === 'down') newY = Math.max(newY - PAN_SPEED, -LIMIT);

        return { x: newX, y: newY };
    });
    // Continue panning while held
    animationRef.current = requestAnimationFrame(() => handleButtonPan(direction));
  };

  const stopPan = () => {
    if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
    }
  };

  // Mouse Wheel Handler
  const handleWheel = (e: React.WheelEvent) => {
      const sensitivity = 0.05; 
      setPan(prev => {
          const deltaX = e.deltaX * sensitivity;
          const deltaY = e.deltaY * sensitivity;

          let newX = prev.x - deltaX;
          let newY = prev.y - deltaY;

          newX = Math.max(-LIMIT, Math.min(LIMIT, newX));
          newY = Math.max(-LIMIT, Math.min(LIMIT, newY));

          return { x: newX, y: newY };
      });
  };

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        panX: pan.x,
        panY: pan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;

    // Calculate delta pixels
    const deltaXPixels = e.clientX - dragStartRef.current.clientX;
    const deltaYPixels = e.clientY - dragStartRef.current.clientY;

    // Sensitivity factor
    const sensitivity = 0.05; 

    let newX = dragStartRef.current.panX + (deltaXPixels * sensitivity);
    let newY = dragStartRef.current.panY + (deltaYPixels * sensitivity);

    // Clamp
    newX = Math.max(-LIMIT, Math.min(LIMIT, newX));
    newY = Math.max(-LIMIT, Math.min(LIMIT, newY));

    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = {
        clientX: touch.clientX,
        clientY: touch.clientY,
        panX: pan.x,
        panY: pan.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
     if (!isDragging || !dragStartRef.current) return;
     const touch = e.touches[0];
     
     const deltaXPixels = touch.clientX - dragStartRef.current.clientX;
     const deltaYPixels = touch.clientY - dragStartRef.current.clientY;

     const sensitivity = 0.08; 

     let newX = dragStartRef.current.panX + (deltaXPixels * sensitivity);
     let newY = dragStartRef.current.panY + (deltaYPixels * sensitivity);

     newX = Math.max(-LIMIT, Math.min(LIMIT, newX));
     newY = Math.max(-LIMIT, Math.min(LIMIT, newY));

     setPan({ x: newX, y: newY });
  };

  useEffect(() => {
    setPan({ x: 0, y: 0 });
    setIsImageLoaded(false);
    
    const img = new Image();
    img.src = room.image;
    img.decoding = 'async';
    
    if (img.complete) {
        setIsImageLoaded(true);
    } else {
        img.onload = () => setIsImageLoaded(true);
        img.onerror = () => setIsImageLoaded(true); 
    }
  }, [room.id, room.image]);

  const getBoundaryOpacity = (current: number, max: number) => {
      const threshold = max * 0.6;
      const absVal = Math.abs(current);
      if (absVal < threshold) return 0;
      return Math.min((absVal - threshold) / (max - threshold), 1);
  };

  return (
    <div 
        className={`relative w-full h-screen overflow-hidden bg-black select-none outline-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        tabIndex={-1} 
    >
        {/* Loading State Overlay */}
        <AnimatePresence>
          {!isImageLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-midnight pointer-events-none"
            >
              <div className="w-12 h-12 border-2 border-slate/20 border-t-gold rounded-full animate-spin mb-4" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boundary Visual Cues (Vignettes) */}
        <div 
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/40 to-transparent pointer-events-none transition-opacity duration-200 z-30 mix-blend-overlay"
            style={{ opacity: pan.y >= 0 ? getBoundaryOpacity(pan.y, LIMIT) : 0 }}
        />
        <div 
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gold/40 to-transparent pointer-events-none transition-opacity duration-200 z-30 mix-blend-overlay"
            style={{ opacity: pan.y <= 0 ? getBoundaryOpacity(pan.y, LIMIT) : 0 }}
        />
        <div 
            className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gold/40 to-transparent pointer-events-none transition-opacity duration-200 z-30 mix-blend-overlay"
            style={{ opacity: pan.x >= 0 ? getBoundaryOpacity(pan.x, LIMIT) : 0 }}
        />
        <div 
            className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gold/40 to-transparent pointer-events-none transition-opacity duration-200 z-30 mix-blend-overlay"
            style={{ opacity: pan.x <= 0 ? getBoundaryOpacity(pan.x, LIMIT) : 0 }}
        />

        {/* Ambient Overlay for Atmosphere */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* The Room Container */}
        {/* Adjusted scale to 160% to allow for safe panning without edges */}
        <motion.div 
            className="absolute w-[160%] h-[160%] flex items-center justify-center origin-center"
            style={{ 
                top: '-30%', 
                left: '-30%' 
            }}
            animate={{ 
                x: `${pan.x}%`, 
                y: `${pan.y}%` 
            }}
            transition={{ 
                type: 'spring', 
                mass: isDragging ? 0.1 : 0.2,
                stiffness: isDragging ? 300 : 120, 
                damping: isDragging ? 30 : 18 
            }} 
        >
            <div className="relative w-full h-full">
                {/* Background Image */}
                <img 
                    ref={imgRef}
                    src={room.image} 
                    alt={room.title} 
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Hotspots Layer */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    {room.objects.map((obj) => (
                        <Hotspot 
                            key={obj.id} 
                            object={obj} 
                            onClick={setSelectedObject} 
                        />
                    ))}
                </div>
            </div>
        </motion.div>

        {/* Room Title Overlay */}
        <div className={`absolute top-8 left-8 z-20 pointer-events-none transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-3xl md:text-5xl font-serif text-white drop-shadow-2xl tracking-wide">{room.title}</h1>
            <div className="h-1 w-24 bg-gold mt-4" />
            <p className="text-mist/80 mt-2 font-sans max-w-md text-sm leading-relaxed backdrop-blur-sm p-2 rounded bg-black/20">
                {room.description}
            </p>
        </div>

        {/* Navigation Controls */}
        <Navigation 
            onPan={handleButtonPan}
            onStopPan={stopPan}
            onBack={onBack}
            showBack={true}
            onHelpClick={onHelpClick}
        />

        {/* Detail Modal */}
        <Modal 
            isOpen={!!selectedObject} 
            onClose={() => setSelectedObject(null)} 
            data={selectedObject}
        />
    </div>
  );
};

export default RoomView;