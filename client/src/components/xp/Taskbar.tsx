import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface TaskbarProps {
  windows: Array<{ id: string; title: string; icon?: string; isOpen: boolean; isMinimized: boolean }>;
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: (e: React.MouseEvent) => void;
  isStartOpen: boolean;
}

export function Taskbar({ windows, activeWindowId, onWindowClick, onStartClick, isStartOpen }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[30px] w-full bg-[#245DDA] flex items-center justify-between absolute bottom-0 left-0 z-50 border-t border-[#3E80F3] shadow-md select-none overflow-hidden">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={cn(
          "h-full px-2 sm:px-4 flex items-center gap-1 sm:gap-2 rounded-r-[10px] sm:rounded-r-[15px] shadow-[2px_0_5px_rgba(0,0,0,0.3)] hover:brightness-110 active:brightness-90 transition-all mr-2 shrink-0",
          "bg-gradient-to-b from-[#3E9C43] via-[#3E9C43] to-[#2B7F30]", // XP Green
          isStartOpen && "brightness-90 shadow-inner"
        )}
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 italic font-serif font-bold text-white bg-white rounded-full flex items-center justify-center text-[10px] sm:text-xs shadow-sm text-[#E54625]">
           <span className="text-[#E54625]">W</span>
        </div>
        <span className="font-sans font-bold text-white text-[13px] sm:text-[15px] italic tracking-wide drop-shadow-md">start</span>
      </button>

      {/* Window List */}
      <div className="flex-1 flex items-center gap-1 px-1 overflow-x-auto hide-scrollbar">
        {windows.filter(w => w.isOpen).map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={cn(
              "h-[24px] min-w-[100px] max-w-[160px] flex items-center gap-2 px-2 rounded-[2px] text-xs font-sans text-white truncate transition-colors",
              activeWindowId === window.id && !window.isMinimized
                ? "bg-[#1E52C9] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] bg-opacity-80" // Pressed
                : "bg-[#3C81F3] hover:bg-[#5293FA] shadow-[1px_1px_0px_rgba(255,255,255,0.2)]" // Normal
            )}
          >
            {window.icon && <img src={window.icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />}
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="h-full bg-[#0B9CEE] px-2 sm:px-4 flex items-center gap-2 sm:gap-3 border-l border-[#153E92] shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] shrink-0">
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white/20 rounded-full" /> {/* Shield icon placeholder */}
        <span className="text-white text-xs font-sans font-normal">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
