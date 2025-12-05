import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function Window({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  children,
  initialPosition = { x: 50, y: 50 },
  className,
  width = 600,
  height = 'auto',
}: WindowProps) {
  const nodeRef = useRef(null);
  
  if (!isOpen || isMinimized) return null;

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={initialPosition}
      nodeRef={nodeRef}
      onStart={onFocus}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={cn(
          "absolute flex flex-col bg-[#ECE9D8] rounded-t-lg rounded-b-sm border-[3px] border-[#0054E3] xp-window-shadow overflow-hidden",
          className
        )}
        style={{ 
          zIndex,
          width: width,
          height: height
        }}
        onClick={onFocus}
      >
        {/* Title Bar */}
        <div className="window-title-bar h-[30px] flex items-center justify-between px-2 bg-gradient-to-r from-[#0054E3] via-[#2683FF] to-[#0054E3] cursor-default select-none">
          <div className="flex items-center gap-2 text-white font-bold text-shadow-sm truncate">
            {icon && <img src={icon} alt="" className="w-4 h-4" />}
            <span className="font-sans text-[13px] tracking-wide text-white drop-shadow-md" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>{title}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-[22px] h-[22px] bg-[#2683FF] border border-white/40 rounded-[3px] flex items-center justify-center hover:brightness-110 active:brightness-90 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_0px_rgba(0,0,0,0.2)]"
            >
              <Minus className="w-3 h-3 text-white stroke-[3]" />
            </button>
            <button 
              className="w-[22px] h-[22px] bg-[#2683FF] border border-white/40 rounded-[3px] flex items-center justify-center hover:brightness-110 active:brightness-90 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_0px_rgba(0,0,0,0.2)] opacity-50 cursor-not-allowed"
            >
              <Square className="w-3 h-3 text-white stroke-[3]" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-[22px] h-[22px] bg-[#E94E38] border border-white/40 rounded-[3px] flex items-center justify-center hover:brightness-110 active:brightness-90 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_0px_rgba(0,0,0,0.2)] ml-0.5"
            >
              <X className="w-4 h-4 text-white stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-[3px] relative bg-[#ECE9D8]">
           {/* Menu Bar Simulation */}
           <div className="flex gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8] mb-1 text-xs">
              <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
              <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
              <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
              <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
           </div>
           
           <div className="bg-white border border-[#828790] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] h-full overflow-auto p-4 font-sans text-sm text-black">
             {children}
           </div>
        </div>
      </div>
    </Draggable>
  );
}
