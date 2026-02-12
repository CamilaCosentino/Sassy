import React, { useState } from 'react';

interface DoorProps {
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
    title: string;
    roomImage?: string;
}
// Custom Victorian Handle Component
const DoorHandle: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
    <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'right-3 md:right-4' : 'left-3 md:left-4'} z-30`}>
        {/* Backplate */}
        <div className="w-3 h-12 md:w-5 md:h-16 bg-gradient-to-b from-[#D4AF37] via-[#B8860B] to-[#8B7355] rounded-[2px] border border-[#F3E5AB]/40 shadow-md flex flex-col items-center justify-between py-2 box-border">
            <div className="w-1 h-1 bg-black/40 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
            <div className="w-1 h-1 bg-black/40 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
        </div>

        {/* The Lever Arm */}
        <div 
          className={`absolute top-1/2 ${side === 'left' ? 'right-1.5' : 'left-1.5'} -translate-y-1/2 w-8 h-2 md:w-10 md:h-2.5 bg-gradient-to-b from-[#F3E5AB] to-[#C5A059] shadow-lg rounded-full flex items-center`}
          style={{ transformOrigin: side === 'left' ? 'right center' : 'left center' }}
        >
             <div className="w-full h-1/2 bg-white/20 rounded-t-full" />
        </div>

        {/* The Pivot Point (Knob) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#FFF8E7,_#D4AF37,_#5C4D35)] shadow-md border border-[#F3E5AB]/40" />
    </div>
);

// Wood Panel Component (The "Squares")
const WoodPanel: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative bg-gradient-to-br from-[#2A1B0E] to-[#1a1109] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)] border-b border-r border-white/5 ${className}`}>
        {/* Inner Bevel */}
        <div className="absolute inset-2 border-4 border-[#1a1109] shadow-[1px_1px_2px_rgba(255,255,255,0.05),_inset_2px_2px_5px_rgba(0,0,0,0.9)]">
             <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-blend-overlay opacity-50" />
        </div>
    </div>
);


const Door: React.FC<DoorProps> = ({ onClick, className, style, title, roomImage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (isOpen) return;
        setIsOpen(true);
        
        // Delay navigation to allow animation to play
        // 1.5s matches the transition duration
   // Delay navigation to allow animation to play
        setTimeout(() => {
            onClick();
        }, 800);
    };

            {/* 1. The Room Image (Revealed Content) */}
            <div className="absolute inset-0 overflow-hidden border border-gold/10 bg-black">
                 <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                    style={{ 
                        backgroundImage: roomImage ? `url(${roomImage})` : undefined,
                        opacity: isOpen ? 0 : 1 
                    }}
                 />
            </div>
      const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        };

    return (
        <div 
            className={`cursor-pointer relative group transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(201,169,106,0.4)] ${className}  `} 
            style={{ ...style, perspective: '1200px' }}
            onClick={handleClick}
            aria-label={`Enter ${title}`}
            title={`Enter ${title}`}
        >
            {/* The Room Behind the Door */}
            <div 
                className="absolute inset-0 bg-cover bg-center -z-10 rounded-sm overflow-hidden transition-opacity duration-1000 ease-in"
                style={{ 
                    backgroundImage: roomImage ? `url(${roomImage})` : undefined,
                    boxShadow: 'inset 0 0 50px #000',
                    opacity: isOpen ? 1 : 0 
                }}
            />

            {/* Door Container */}
            <div className="w-full h-full relative preserve-3d">
                
                {/* Left Door Panel */}
                <div 
                    className="absolute top-0 left-0 w-1/2 h-full bg-[#2A1B0E] border-l-4 border-y-4 border-r border-[#150d07] origin-left z-20 shadow-2xl flex flex-col p-1.5 md:p-2 gap-2 md:gap-4 transition-all duration-[1500ms] ease-in-out"
                    style={{
                        // Rotate Inward (negative angle) and fade out
                        transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)',
                        opacity: isOpen ? 0 : 1
                    }}
                >
                     {/* Door Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 pointer-events-none mix-blend-overlay" />
                    
                    {/* Hover Highlight Overlay */}
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500 pointer-events-none mix-blend-overlay" />

                    <WoodPanel className="h-1/4 w-full" />
                    <WoodPanel className="h-2/4 w-full" />
                    <WoodPanel className="h-1/4 w-full" />

                    <DoorHandle side="left" />
                </div>

                {/* Right Door Panel */}
                <div 
                    className="absolute top-0 right-0 w-1/2 h-full bg-[#2A1B0E] border-r-4 border-y-4 border-l border-[#150d07] origin-right z-20 shadow-2xl flex flex-col p-1.5 md:p-2 gap-2 md:gap-4 transition-all duration-[1500ms] ease-in-out"
                    style={{
                        // Rotate Inward (positive angle) and fade out
                        transform: isOpen ? 'rotateY(110deg)' : 'rotateY(0deg)',
                        opacity: isOpen ? 0 : 1
                    }}
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                    {/* Hover Highlight Overlay */}
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500 pointer-events-none mix-blend-overlay" />

                     <WoodPanel className="h-1/4 w-full" />
                     <WoodPanel className="h-2/4 w-full" />
                     <WoodPanel className="h-1/4 w-full" />

                    <DoorHandle side="right" />
                </div>

            </div>
        </div>
    );
}
export default Door;