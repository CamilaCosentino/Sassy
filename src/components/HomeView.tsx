import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomData } from '../../types';
import Navigation from './Navigation';
import Door from './Door';


import { HOME_IMAGE } from '../constants';



interface HomeViewProps {
  rooms: RoomData[];
  onSelectRoom: (roomId: string) => void;
  onHelpClick: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ rooms, onSelectRoom, onHelpClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Refined portal positions to align with the visual doors in the background image
  // The doors are rectangular wood panels inside the stone arches.
const portals = [
  {
    roomId: rooms[0].id,
    left: '17.2%',
  width: '14.1%',
    scaleX: 0.95
  },
  {
    roomId: rooms[1].id,
    left: '35.5%',
  width: '14.1%',
    scaleX: 1
  },
  {
    roomId: rooms[2].id,
    left: '53.5%',
  width: '14.1%',
    scaleX: 1
  },
  {
    roomId: rooms[3].id,
    left: '71.3%',
  width: '14.1%',
    scaleX: 0.95
  }
];


  return (
    <div className="relative w-full h-screen overflow-hidden bg-midnight">
        {/* Loading Overlay */}
        <AnimatePresence>
            {!isImageLoaded && (
                 <motion.div 
                 initial={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-midnight"
               >
                 <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center animate-pulse">
                     <div className="w-10 h-10 rounded-full bg-gold/10" />
                 </div>
               </motion.div>
            )}
        </AnimatePresence>

        {/* Background */}
        <div className="absolute inset-0">
            <img 
                src={HOME_IMAGE} 
                alt="Main Hall" 
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ imageRendering: 'high-quality' as any }} 
            />
        </div>

        {/* Interactive Invisible Doors */}
        {isImageLoaded && portals.map((portal) => {
            const room = rooms.find(r => r.id === portal.roomId);
            if (!room) return null;

            return (
                <div
                    key={room.id}
                    className="absolute z-20"
                    style={{ 
                        left: portal.left, 
                        width: portal.width,
                        top: '20.8%',    // Starts just below the arch text
                        bottom: '26%'  // Ends at the floor line
                    }}
                >
                   <Door 
                      title={room.title}
                      roomImage={room.image}
                      onClick={() => onSelectRoom(room.id)}
                      className="w-full h-full"
                   />
                </div>
            );
        })}

        {/* Navigation */}
        <Navigation 
            onPan={() => {}} 
            onStopPan={() => {}}
            showBack={false}
            onHelpClick={onHelpClick}
        />
    </div>
  );
};


export default HomeView;