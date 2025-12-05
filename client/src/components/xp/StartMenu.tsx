import React from 'react';
import { cn } from '@/lib/utils';
import { User, LogOut, ChevronRight } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (appId: string) => void;
  userImage: string;
}

export function StartMenu({ isOpen, onClose, onItemClick, userImage }: StartMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-[30px] left-0 w-[280px] sm:w-[350px] bg-white rounded-t-lg shadow-2xl z-50 border-2 border-[#0054E3] overflow-hidden animate-in slide-in-from-bottom-2 duration-150">
      {/* Header */}
      <div className="h-[50px] bg-gradient-to-b from-[#1572E7] to-[#1C5FB8] flex items-center px-2 gap-3 shadow-md relative z-10">
         <div className="w-10 h-10 rounded-[3px] border-2 border-white/50 bg-white overflow-hidden shadow-sm">
            <img src={userImage} alt="User" className="w-full h-full object-cover" />
         </div>
         <span className="text-white font-bold text-shadow text-lg">Sana Siddiqui</span>
      </div>

      {/* Body */}
      <div className="flex h-[380px]">
        {/* Left Column (White) */}
        <div className="flex-1 bg-white p-1 flex flex-col gap-1">
           <div className="flex flex-col gap-1 py-1">
              <StartMenuItem icon="🌐" label="Internet Explorer" subLabel="Browser" onClick={() => onItemClick('internet')} bold />
              <StartMenuItem icon="📧" label="E-mail" subLabel="Contact Me" onClick={() => onItemClick('contact')} bold />
           </div>
           
           <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1" />
           
           <div className="flex flex-col gap-1">
              <StartMenuItem icon="📝" label="My Resume" onClick={() => onItemClick('resume')} />
              <StartMenuItem icon="💻" label="My Projects" onClick={() => onItemClick('projects')} />
              <StartMenuItem icon="💼" label="Experience" onClick={() => onItemClick('experience')} />
              <StartMenuItem icon="👤" label="About Me" onClick={() => onItemClick('profile')} />
           </div>
           
           <div className="mt-auto p-2 text-center text-[10px] text-gray-400">
              All programs
           </div>
        </div>

        {/* Right Column (Blue) */}
        <div className="w-[120px] sm:w-[140px] bg-[#D3E5FA] border-l border-[#95BDE7] p-1 flex flex-col gap-1 text-[#183962]">
           <StartMenuRightItem icon="📂" label="My Documents" onClick={() => onItemClick('resume')} bold />
           <StartMenuRightItem icon="🖼️" label="My Pictures" onClick={() => {}} bold />
           <StartMenuRightItem icon="🎵" label="My Music" onClick={() => {}} bold />
           <StartMenuRightItem icon="💻" label="My Computer" onClick={() => onItemClick('profile')} bold />
           
           <div className="h-[1px] bg-[#95BDE7] my-1" />
           
           <StartMenuRightItem icon="⚙️" label="Control Panel" onClick={() => {}} />
           <StartMenuRightItem icon="🖨️" label="Printers and Faxes" onClick={() => {}} />
           
           <div className="h-[1px] bg-[#95BDE7] my-1" />
           
           <StartMenuRightItem icon="❓" label="Help and Support" onClick={() => {}} />
           <StartMenuRightItem icon="🔍" label="Search" onClick={() => {}} />
           <StartMenuRightItem icon="🏃" label="Run..." onClick={() => {}} />
        </div>
      </div>

      {/* Footer */}
      <div className="h-[40px] bg-gradient-to-b from-[#4282D6] to-[#3665B3] flex items-center justify-end px-3 gap-3 border-t border-[#3E80F3] shadow-[inset_0_2px_2px_rgba(255,255,255,0.2)]">
         <button className="flex items-center gap-1 text-white hover:brightness-110">
            <div className="bg-[#E78F28] p-1 rounded-[2px] border border-white/30">
               <LogOut className="w-3 h-3" />
            </div>
            <span className="text-xs">Log Off</span>
         </button>
         <button className="flex items-center gap-1 text-white hover:brightness-110">
            <div className="bg-[#E94E38] p-1 rounded-[2px] border border-white/30">
               <div className="w-3 h-3 rounded-full border border-white/80" />
            </div>
            <span className="text-xs">Turn Off Computer</span>
         </button>
      </div>
    </div>
  );
}

function StartMenuItem({ icon, label, subLabel, onClick, bold }: any) {
  return (
    <button 
      className="flex items-center gap-2 p-2 hover:bg-[#316AC5] hover:text-white group w-full text-left rounded-[2px] transition-colors"
      onClick={onClick}
    >
       <span className="text-xl sm:text-2xl drop-shadow-md">{icon}</span>
       <div className="flex flex-col">
          <span className={cn("text-xs sm:text-sm text-black group-hover:text-white leading-tight", bold && "font-bold")}>{label}</span>
          {subLabel && <span className="text-[10px] text-gray-500 group-hover:text-gray-200 leading-tight">{subLabel}</span>}
       </div>
    </button>
  );
}

function StartMenuRightItem({ icon, label, onClick, bold }: any) {
   return (
     <button 
       className="flex items-center gap-2 p-1.5 hover:bg-[#316AC5] hover:text-white group w-full text-left rounded-[2px] transition-colors"
       onClick={onClick}
     >
        <span className="text-sm">{icon}</span>
        <span className={cn("text-xs text-[#183962] group-hover:text-white leading-tight", bold && "font-bold")}>{label}</span>
     </button>
   );
 }
