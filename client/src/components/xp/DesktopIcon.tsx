import React from 'react';
import { cn } from '@/lib/utils';
import Draggable from 'react-draggable';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  onDoubleClick: () => void;
  className?: string;
}

export function DesktopIcon({ id, label, icon, onDoubleClick, className }: DesktopIconProps) {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <Draggable bounds="parent" defaultPosition={{x: 0, y: 0}} grid={[10, 10]}>
      <div 
        className={cn(
          "absolute flex flex-col items-center gap-1 w-[80px] cursor-pointer group p-1 rounded-sm",
          isSelected && "bg-[#0b61ff]/20 border border-[#0b61ff]/30",
          className
        )}
        onDoubleClick={onDoubleClick}
        onClick={() => setIsSelected(!isSelected)}
        // Simple click-outside handler could be added at desktop level, but this toggle works for now
      >
        <img 
          src={icon} 
          alt={label} 
          className={cn(
            "w-[48px] h-[48px] object-contain drop-shadow-md transition-opacity",
            isSelected ? "opacity-100" : "opacity-90 group-hover:opacity-100"
          )} 
        />
        <span 
          className={cn(
            "text-white text-xs text-center font-sans leading-tight px-1 py-0.5 rounded-[2px]",
            "shadow-[0px_1px_2px_rgba(0,0,0,0.8)]", // Text shadow simulation via filter is better but this is ok
            isSelected ? "bg-[#0b61ff] text-white" : "text-white"
          )}
          style={{ textShadow: isSelected ? 'none' : '1px 1px 2px black' }}
        >
          {label}
        </span>
      </div>
    </Draggable>
  );
}
