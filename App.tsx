import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomeView from './components/HomeView';
import RoomView from './components/RoomView';
import HelpModal from './components/HelpModal';
import CursorEffect from './components/CursorEffect';
import { ROOMS } from './constants';
import { ViewState } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  

  const handleSelectRoom = (roomId: string) => {
    setCurrentRoomId(roomId);
    setViewState(ViewState.ROOM);
  };

  const handleBackToHome = () => {
    setViewState(ViewState.HOME);
    setTimeout(() => setCurrentRoomId(null), 500);
  };

  const currentRoom = ROOMS.find(r => r.id === currentRoomId);

  return (
    <div className="font-sans text-paper antialiased h-screen w-screen overflow-hidden selection:bg-gold selection:text-midnight">
      {/* Global Mouse Effect */}
      <CursorEffect />
      
      {/* Global Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <AnimatePresence mode="wait">
        {viewState === ViewState.HOME && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <HomeView 
                rooms={ROOMS} 
                onSelectRoom={handleSelectRoom} 
                onHelpClick={() => setIsHelpOpen(true)}
            />
          </motion.div>
        )}

        {viewState === ViewState.ROOM && currentRoom && (
          <motion.div
            key="room"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <RoomView 
                room={currentRoom} 
                onBack={handleBackToHome} 
                onHelpClick={() => setIsHelpOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
};


export default App;