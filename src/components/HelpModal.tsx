import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointer2, Rotate3d, BookOpen } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             {/* Backdrop */}
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose} 
                className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" 
             />
             
             {/* Modal Container */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-paper text-midnight p-8 rounded-sm border-2 border-gold max-w-lg w-full shadow-2xl font-serif"
             >
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 text-slate hover:text-gold transition-colors"
                  aria-label="Close Help"
                >
                  <X />
                </button>
                
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2 text-midnight">User Guide</h2>
                    <div className="h-0.5 w-16 bg-gold mx-auto" />
                </div>

                <div className="space-y-6 font-sans text-sm md:text-base text-charcoal/80">
                    <div className="flex items-start gap-4">
                        <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0">
                            <MousePointer2 size={20} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-midnight text-lg">Enter the Chambers</h3>
                            <p>In the Main Hall, hover over the four doors to reveal the rooms inside. Click a door to enter that realm of knowledge.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0">
                            <Rotate3d size={20} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-midnight text-lg">Explore the Room</h3>
                            <p>Once inside, use the navigation controls in the bottom right corner (or drag on touch devices) to pan around the room.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-midnight text-lg">Discover Wisdom</h3>
                            <p>Look for glowing stars and artifacts. Hover over them to see the topic, and click to open the archives and read the posts.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={onClose}
                        className="bg-midnight text-gold px-8 py-2 rounded-sm font-serif hover:bg-gold hover:text-midnight transition-colors duration-300 uppercase tracking-widest text-sm shadow-md"
                    >
                        Begin Journey
                    </button>
                </div>
             </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default HelpModal;