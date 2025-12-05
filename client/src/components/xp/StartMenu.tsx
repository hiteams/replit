import React from 'react';
import { cn } from '@/lib/utils';
import { User, LogOut, ChevronRight } from 'lucide-react';

// Icons mapping
const icons: Record<string, string> = {
  about: "👤",
  experience: "💼",
  skills: "🛠️",
  projects: "📂",
  certifications: "📜",
  contact: "📧",
  cv: "📄",
  linkedin: "🔗",
  github: "🐙"
};

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (appId: string) => void;
  userImage: string;
}

export function StartMenu({ isOpen, onClose, onItemClick, userImage }: StartMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-[30px] left-0 w-[300px] sm:w-[380px] bg-white rounded-t-lg shadow-2xl z-50 border-2 border-[#0054E3] overflow-hidden animate-in slide-in-from-bottom-2 duration-150 font-sans">
      {/* Header */}
      <div className="h-[60px] bg-gradient-to-b from-[#1572E7] to-[#1C5FB8] flex items-center px-3 gap-3 shadow-md relative z-10 border-b border-[#003c74]">
         <div className="w-10 h-10 rounded-[3px] border-2 border-white/50 bg-white overflow-hidden shadow-sm shrink-0">
            <img src={userImage} alt="User" className="w-full h-full object-cover" />
         </div>
         <div className="flex flex-col text-white drop-shadow-md">
            <span className="font-bold text-lg leading-tight">Sana Siddiqui</span>
            <span className="text-xs font-light opacity-90">Full-Stack Developer</span>
         </div>
      </div>

      {/* Body */}
      <div className="flex h-[420px]">
        {/* Left Column (White) */}
        <div className="flex-1 bg-white p-2 flex flex-col gap-1">
           <div className="flex flex-col gap-1">
              <StartMenuItem 
                icon={icons.about} 
                label="About Me" 
                subLabel="View professional summary" 
                onClick={() => onItemClick('profile')} 
                bold 
              />
              <StartMenuItem 
                icon={icons.experience} 
                label="Experience" 
                subLabel="Work history" 
                onClick={() => onItemClick('experience')} 
                bold 
              />
              <StartMenuItem 
                icon={icons.skills} 
                label="Skills" 
                subLabel="Technical expertise" 
                onClick={() => onItemClick('skills')} 
                bold 
              />
              <StartMenuItem 
                icon={icons.projects} 
                label="Projects" 
                subLabel="Portfolio work" 
                onClick={() => onItemClick('projects')} 
                bold 
              />
           </div>
           
           <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2" />
           
           <div className="flex flex-col gap-1">
              <StartMenuItem 
                icon={icons.certifications} 
                label="Certifications" 
                subLabel="Credentials & training" 
                onClick={() => onItemClick('certifications')} 
                bold 
              />
              <StartMenuItem 
                icon={icons.contact} 
                label="Contact" 
                subLabel="Get in touch" 
                onClick={() => onItemClick('contact')} 
                bold 
              />
              <StartMenuItem 
                icon={icons.cv} 
                label="My CV" 
                subLabel="Download resume PDF" 
                onClick={() => onItemClick('cv')} 
                bold 
              />
           </div>
        </div>

        {/* Right Column (Blue) */}
        <div className="w-[140px] bg-[#D3E5FA] border-l border-[#95BDE7] p-2 flex flex-col gap-1 text-[#183962]">
           <StartMenuRightItem 
             icon={icons.linkedin} 
             label="LinkedIn Profile" 
             onClick={() => onItemClick('internet')} 
             bold 
           />
           <StartMenuRightItem 
             icon={icons.github} 
             label="GitHub" 
             onClick={() => window.open('https://github.com/sana-cs', '_blank')} 
             bold 
           />
        </div>
      </div>

      {/* Footer */}
      <div className="h-[40px] bg-gradient-to-b from-[#4282D6] to-[#3665B3] flex items-center justify-end px-3 gap-3 border-t border-[#3E80F3] shadow-[inset_0_2px_2px_rgba(255,255,255,0.2)]">
         <button className="flex items-center gap-2 text-white hover:brightness-110 transition-all active:scale-95">
            <div className="bg-[#E94E38] p-1.5 rounded-[3px] border border-white/40 shadow-sm">
               <div className="w-2 h-2 rounded-full border border-white/90" />
            </div>
            <span className="text-xs font-medium drop-shadow-sm">Turn Off Computer</span>
         </button>
      </div>
    </div>
  );
}

function StartMenuItem({ icon, label, subLabel, onClick, bold }: any) {
  return (
    <button 
      className="flex items-center gap-3 p-2 hover:bg-[#316AC5] hover:text-white group w-full text-left rounded-[3px] transition-colors"
      onClick={onClick}
    >
       <div className="w-8 h-8 flex items-center justify-center text-2xl shrink-0 drop-shadow-sm">
          {icon}
       </div>
       <div className="flex flex-col overflow-hidden">
          <span className={cn("text-sm text-black group-hover:text-white leading-none truncate", bold && "font-bold")}>{label}</span>
          {subLabel && <span className="text-[11px] text-gray-500 group-hover:text-gray-200 leading-tight truncate mt-0.5">{subLabel}</span>}
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
        <span className={cn("text-xs text-[#183962] group-hover:text-white leading-tight font-medium", bold && "font-bold")}>{label}</span>
     </button>
   );
 }
