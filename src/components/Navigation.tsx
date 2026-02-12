import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, HelpCircle, ArrowLeft, Rotate3d } from 'lucide-react';

interface NavigationProps {
  onPan: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onStopPan: () => void;
  onBack?: () => void;
  showBack?: boolean;
  onHelpClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
    onPan, 
    onStopPan, 
    onBack, 
    showBack, 
    onHelpClick
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-6">
      
      {/* 4-Way Directional Pad */}
      <div className="bg-midnight/90 backdrop-blur-md p-3 rounded-full border border-gold/30 shadow-2xl">
        <div className="grid grid-cols-3 gap-1">
          {/* Top Row */}
          <div />
          <button 
            onMouseDown={() => onPan('up')}
            onTouchStart={() => onPan('up')}
            onMouseUp={onStopPan}
            onMouseLeave={onStopPan}
            onTouchEnd={onStopPan}
            className="p-2 text-gold hover:text-paper hover:bg-gold/20 rounded transition-all active:scale-90 flex justify-center"
            aria-label="Look Up"
          >
            <ChevronUp size={24} />
          </button>
          <div />

          {/* Middle Row */}
          <button 
            onMouseDown={() => onPan('left')}
            onTouchStart={() => onPan('left')}
            onMouseUp={onStopPan}
            onMouseLeave={onStopPan}
            onTouchEnd={onStopPan}
            className="p-2 text-gold hover:text-paper hover:bg-gold/20 rounded transition-all active:scale-90 flex justify-center"
            aria-label="Rotate Left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center justify-center">
             <Rotate3d size={16} className="text-gold/40" />
          </div>

          <button 
            onMouseDown={() => onPan('right')}
            onTouchStart={() => onPan('right')}
            onMouseUp={onStopPan}
            onMouseLeave={onStopPan}
            onTouchEnd={onStopPan}
            className="p-2 text-gold hover:text-paper hover:bg-gold/20 rounded transition-all active:scale-90 flex justify-center"
            aria-label="Rotate Right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Bottom Row */}
          <div />
          <button 
            onMouseDown={() => onPan('down')}
            onTouchStart={() => onPan('down')}
            onMouseUp={onStopPan}
            onMouseLeave={onStopPan}
            onTouchEnd={onStopPan}
            className="p-2 text-gold hover:text-paper hover:bg-gold/20 rounded transition-all active:scale-90 flex justify-center"
            aria-label="Look Down"
          >
            <ChevronDown size={24} />
          </button>
          <div />
        </div>
      </div>

      <div className="flex gap-4">
        {showBack && (
           <button 
           onClick={onBack}
           className="bg-midnight/90 backdrop-blur-md border border-gold/50 text-gold p-4 rounded-full shadow-2xl hover:bg-gold hover:text-midnight transition-all duration-300 group relative"
           aria-label="Return to Hall"
           title="Return to Hall"
         >
           <ArrowLeft size={24} />
           <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             Return to Hall
           </span>
         </button>
        )}
        
        <button 
          onClick={onHelpClick}
          className="bg-midnight/90 backdrop-blur-md border border-slate/50 text-slate p-4 rounded-full shadow-2xl hover:bg-slate hover:text-white transition-all duration-300"
          aria-label="User Guide & Instructions"
          title="User Guide & Instructions"
        >
          <HelpCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;