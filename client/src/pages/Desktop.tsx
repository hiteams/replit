import React, { useState } from 'react';
import { Window } from '@/components/xp/Window';
import { DesktopIcon } from '@/components/xp/DesktopIcon';
import { Taskbar } from '@/components/xp/Taskbar';
import { StartMenu } from '@/components/xp/StartMenu';
import { ExternalLink, Download, Mail, MapPin, Phone, Linkedin, Github, Globe } from 'lucide-react';

// Assets
import wallpaper from '@assets/generated_images/classic_windows_xp_style_grassy_hill_with_blue_sky_and_clouds.png';
import avatar from '@assets/generated_images/pixel_art_icon_of_a_woman_in_blue_hijab.png';
import userPhoto from '@assets/ProfilePicture_1764943511140.jpeg';
import myComputerIcon from '@assets/generated_images/windows_xp_my_computer_icon.png';
import folderIcon from '@assets/generated_images/windows_xp_folder_icon.png';
import notepadIcon from '@assets/generated_images/windows_xp_notepad_icon.png';
import internetIcon from '@assets/generated_images/windows_xp_internet_icon.png';
import recycleIcon from '@assets/generated_images/windows_xp_recycle_bin_icon.png';
import mailIcon from '@assets/generated_images/windows_xp_mail_icon.png';
import skillsIcon from '@assets/generated_images/windows_xp_skills_icon.png';
import certIcon from '@assets/generated_images/windows_xp_certificate_icon.png';
import briefcaseIcon from '@assets/generated_images/windows_xp_briefcase_icon.png';
import pdfFile from '@assets/2025_Sana_Siddiqui_Developer_Resume_1764944896362.pdf';

// Data
const RESUME_PDF_PATH = pdfFile;

const EXPERIENCE_DATA = [
  { company: "Crowe UAE", role: "Software Developer", period: "Mar 2025 – Aug 2025", desc: "Revamped AML Screening app." },
  { company: "Rideware Technologies", role: "Tech Lead", period: "May 2023 – Dec 2024", desc: "Led HRMS solution development." },
  { company: "BMS Solutions", role: "Full Stack Dev", period: "June 2022 – Mar 2023", desc: "Web/Mobile pages & Bug fixing." }
];

export default function Desktop() {
  const [windows, setWindows] = useState([
    { id: 'welcome', title: 'Welcome', icon: notepadIcon, isOpen: true, isMinimized: false, content: 'welcome', type: 'text', zIndex: 1 }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>('welcome');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(10);

  const openWindow = (id: string, title: string, icon: string, content: any, type: string = 'text') => {
    setNextZIndex(z => z + 1);
    setIsStartOpen(false); // Close start menu if open

    // Check if window exists
    const existing = windows.find(w => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w));
      } else {
        setWindows(windows.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
      }
      setActiveWindowId(id);
      return;
    }

    // Create new window
    setWindows([...windows, { id, title, icon, isOpen: true, isMinimized: false, content, type, zIndex: nextZIndex }]);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const focusWindow = (id: string) => {
    setNextZIndex(z => z + 1);
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: nextZIndex + 1 } : w));
    setActiveWindowId(id);
  };

  const toggleStartMenu = () => setIsStartOpen(!isStartOpen);

  return (
    <div 
      className="w-screen h-screen overflow-hidden relative bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={() => setIsStartOpen(false)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-2 left-2 flex flex-col gap-4 h-[calc(100vh-40px)] flex-wrap content-start p-2 z-0">
        <DesktopIcon 
          id="about" 
          label="About Me" 
          icon={avatar} 
          onDoubleClick={() => openWindow('profile', 'About Me', avatar, 'profile', 'custom')} 
        />
        <DesktopIcon 
          id="experience" 
          label="Experience" 
          icon={briefcaseIcon} 
          onDoubleClick={() => openWindow('experience', 'Experience', briefcaseIcon, 'experience', 'folder')} 
          className="translate-y-[80px]"
        />
        {/* New Icons matching the request */}
      </div>

      {/* Windows */}
      {windows.map((win: any) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          zIndex={win.zIndex || 10}
          width={win.type === 'browser' ? 800 : win.type === 'custom' ? 700 : 600}
        >
          {win.type === 'text' && (
            <div className="font-mono whitespace-pre-wrap text-sm leading-relaxed p-2">
              {win.content === 'welcome' ? (
                <div className="text-center py-10">
                   <h1 className="text-xl font-bold mb-4">Welcome to Sana's Portfolio!</h1>
                   <p>This is an interactive resume built to look like Windows XP.</p>
                   <p className="mt-2">Double click on the icons to explore.</p>
                   <p className="mt-4 text-xs text-gray-500">Built with React + Tailwind</p>
                </div>
              ) : win.content}
            </div>
          )}

          {/* About Me / Profile Window */}
          {win.type === 'custom' && win.content === 'profile' && (
             <div className="flex flex-col sm:flex-row gap-6 p-4">
                <div className="shrink-0 flex flex-col items-center gap-2">
                   <div className="w-[180px] h-[220px] bg-white border shadow p-1">
                      <img src={userPhoto} alt="Sana" className="w-full h-full object-cover" />
                   </div>
                   <span className="text-xs text-gray-500 italic">Sana Siddiqui</span>
                </div>
                <div className="flex-1">
                   <h2 className="text-2xl font-bold text-[#0054E3] mb-2 font-serif">Sana Siddiqui</h2>
                   <p className="text-lg font-bold mb-4">Software Developer (Full Stack)</p>
                   
                   <div className="space-y-3 text-sm">
                      <div className="bg-[#FFFFE1] border border-[#E2C779] p-3 rounded">
                         <p className="font-bold mb-1">About Me:</p>
                         <p>Dedicated Software Developer with 4+ years of full-stack experience in .NET Core, Angular, and SQL Server. I build scalable, secure, and user-friendly web applications.</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                         <a 
                           href="http://www.linkedin.com/in/sana-cs" 
                           target="_blank" 
                           className="text-blue-600 underline hover:text-blue-800 flex items-center gap-1"
                         >
                            Visit LinkedIn Profile
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* CV Window */}
          {win.type === 'custom' && win.content === 'cv' && (
             <div className="flex flex-col items-center justify-center h-[300px] bg-[#F5F5F5] border-t border-white">
                <div className="bg-white p-8 shadow-md border border-gray-300 flex flex-col items-center gap-4 w-[300px]">
                   <div className="w-16 h-20 bg-red-600 rounded-sm flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-lg">PDF</span>
                   </div>
                   <div className="text-center">
                      <p className="font-bold text-lg">Sana_Siddiqui_Resume.pdf</p>
                      <p className="text-gray-500 text-sm">PDF Document</p>
                   </div>
                   <div className="flex gap-2 w-full mt-2">
                      <a 
                        href={RESUME_PDF_PATH} 
                        download="Sana_Siddiqui_Resume.pdf"
                        className="flex-1 py-2 bg-[#0054E3] text-white rounded shadow hover:bg-[#0046bd] flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                      >
                         <Download size={16} /> Download CV
                      </a>
                      <a 
                        href={RESUME_PDF_PATH} 
                        target="_blank"
                        className="flex-1 py-2 bg-[#ECE9D8] text-black border border-gray-400 rounded shadow hover:bg-white flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                      >
                         <ExternalLink size={16} /> View
                      </a>
                   </div>
                </div>
             </div>
          )}

          {/* Contact Window */}
          {win.type === 'custom' && win.content === 'contact' && (
             <div className="p-4 flex flex-col gap-4 bg-[#F5F5F5] h-full">
                <h3 className="font-bold text-[#0054E3] border-b border-gray-300 pb-2">Contact Information</h3>
                
                <div className="flex flex-col gap-3">
                   <ContactItem icon={<Mail className="text-white" />} color="bg-[#E94E38]" label="Email" value="sanasiddiqui.cs@gmail.com" href="mailto:sanasiddiqui.cs@gmail.com" />
                   <ContactItem icon={<Phone className="text-white" />} color="bg-[#3E9C43]" label="Phone" value="+971 502 968 897" href="tel:+971502968897" />
                   <ContactItem icon={<MapPin className="text-white" />} color="bg-[#E78F28]" label="Location" value="Dubai, UAE" />
                   <ContactItem icon={<Linkedin className="text-white" />} color="bg-[#0077B5]" label="LinkedIn" value="linkedin.com/in/sana-cs" href="http://www.linkedin.com/in/sana-cs" />
                   <ContactItem icon={<Github className="text-white" />} color="bg-[#333]" label="GitHub" value="github.com/sana-cs" href="https://github.com/sana-cs" />
                   <ContactItem icon={<Globe className="text-white" />} color="bg-[#245DDA]" label="Portfolio" value="This Interactive Resume" href="#" />
                </div>
             </div>
          )}

          {/* Skills Window */}
          {win.type === 'custom' && win.content === 'skills' && (
             <div className="p-4 bg-white h-full overflow-y-auto">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <SkillSection title="Frontend Development">
                       <SkillItem name="Angular" level={95} />
                       <SkillItem name="React" level={85} />
                       <SkillItem name="TypeScript / JS" level={90} />
                       <SkillItem name="Tailwind CSS" level={90} />
                       <SkillItem name="HTML5 / CSS3" level={95} />
                    </SkillSection>
                    
                    <SkillSection title="Backend Development">
                       <SkillItem name=".NET Core 7/8" level={90} />
                       <SkillItem name="C#" level={90} />
                       <SkillItem name="ASP.NET MVC" level={85} />
                       <SkillItem name="Web API" level={90} />
                       <SkillItem name="Entity Framework" level={85} />
                    </SkillSection>

                    <SkillSection title="Database">
                       <SkillItem name="MS SQL Server" level={90} />
                       <SkillItem name="MySQL" level={80} />
                       <SkillItem name="Stored Procedures" level={85} />
                    </SkillSection>

                    <SkillSection title="Tools & DevOps">
                       <SkillItem name="Git / GitHub" level={90} />
                       <SkillItem name="Azure DevOps" level={80} />
                       <SkillItem name="Docker" level={70} />
                       <SkillItem name="AWS" level={65} />
                    </SkillSection>
                 </div>
             </div>
          )}

          {win.type === 'folder' && win.content === 'experience' && (
             <div className="grid grid-cols-1 gap-1">
                {EXPERIENCE_DATA.map((job, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 hover:bg-[#E8F1FC] border border-transparent hover:border-[#9BC2E7] cursor-default group transition-colors">
                      <img src={folderIcon} alt="" className="w-10 h-10" />
                      <div>
                         <h3 className="font-bold text-[#0054E3] group-hover:underline">{job.company}</h3>
                         <p className="font-bold text-sm">{job.role}</p>
                         <p className="text-xs text-gray-500 mb-1">{job.period}</p>
                         <p className="text-sm text-gray-700">{job.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          )}
          
          {win.type === 'folder' && win.content === 'projects' && (
             <div className="grid grid-cols-3 gap-4 p-2">
                {['Rideware HRMS', 'AML Screening', 'Retail AI Copilot'].map((proj, i) => (
                   <div key={i} className="flex flex-col items-center gap-2 p-4 hover:bg-[#E8F1FC] border border-transparent hover:border-[#9BC2E7] cursor-pointer rounded">
                      <img src={folderIcon} alt="" className="w-12 h-12" />
                      <span className="text-center text-sm font-medium">{proj}</span>
                   </div>
                ))}
             </div>
          )}

          {win.type === 'browser' && (
            <div className="flex flex-col h-full bg-[#f1f1f1]">
               <div className="h-[30px] bg-[#ECE9D8] border-b flex items-center px-2 gap-2 shadow-sm">
                  <div className="flex gap-1">
                     <button className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">←</button>
                     <button className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center shadow-sm">→</button>
                  </div>
                  <div className="flex-1 bg-white border border-gray-400 h-[22px] flex items-center px-2 text-xs text-gray-600 font-sans">
                     {win.content === 'internet' ? 'http://www.linkedin.com/in/sana-cs' : 'https://github.com/sana-cs'}
                  </div>
               </div>
               <div className="flex-1 bg-white p-4 flex flex-col items-center justify-center gap-4">
                  <img src={internetIcon} alt="Internet" className="w-16 h-16 opacity-50" />
                  <p className="text-gray-500 mb-2">External Link - {win.content === 'internet' ? 'LinkedIn' : 'GitHub'}</p>
                  <a 
                     href={win.content === 'internet' ? 'http://www.linkedin.com/in/sana-cs' : 'https://github.com/sana-cs'} 
                     target="_blank"
                     className="px-6 py-2 bg-[#0054E3] text-white rounded shadow hover:bg-[#0046bd] transition-colors"
                  >
                     Open Profile in New Tab
                  </a>
               </div>
            </div>
          )}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId} 
        onWindowClick={(id) => {
           const win = windows.find(w => w.id === id);
           if (win?.isMinimized) {
              setNextZIndex(z => z + 1);
              setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w));
              setActiveWindowId(id);
           } else if (activeWindowId === id) {
              minimizeWindow(id);
           } else {
              focusWindow(id);
           }
        }}
        onStartClick={(e) => {
           e.stopPropagation();
           toggleStartMenu();
        }}
        isStartOpen={isStartOpen}
      />

      {/* Start Menu */}
      <StartMenu 
         isOpen={isStartOpen} 
         onClose={() => setIsStartOpen(false)} 
         onItemClick={(action) => {
            if (action === 'profile') openWindow('profile', 'About Me', avatar, 'profile', 'custom');
            if (action === 'experience') openWindow('experience', 'Experience', briefcaseIcon, 'experience', 'folder');
            if (action === 'skills') openWindow('skills', 'Technical Skills', skillsIcon, 'skills', 'custom');
            if (action === 'projects') openWindow('projects', 'My Projects', folderIcon, 'projects', 'folder');
            if (action === 'contact') openWindow('contact', 'Contact', mailIcon, 'contact', 'custom');
            if (action === 'cv') openWindow('cv', 'My CV', certIcon, 'cv', 'custom');
            if (action === 'internet') openWindow('internet', 'LinkedIn', internetIcon, 'internet', 'browser');
            if (action === 'github') openWindow('github', 'GitHub', internetIcon, 'github', 'browser');
            setIsStartOpen(false);
         }}
         userImage={userPhoto}
      />
    </div>
  );
}

// Helper Components
function ContactItem({ icon, color, label, value, href }: any) {
   const Content = () => (
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors w-full">
         <div className={`w-10 h-10 ${color} rounded flex items-center justify-center shrink-0 shadow-sm`}>
            {icon}
         </div>
         <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="font-medium text-gray-900 truncate">{value}</p>
         </div>
         {href && <ExternalLink size={14} className="text-gray-400" />}
      </div>
   );

   if (href) {
      return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} className="block w-full">{<Content />}</a>;
   }
   return <Content />;
}

function SkillSection({ title, children }: any) {
   return (
      <div className="mb-4">
         <h3 className="font-bold text-[#0054E3] border-b border-gray-200 pb-1 mb-3">{title}</h3>
         <div className="space-y-3">
            {children}
         </div>
      </div>
   );
}

function SkillItem({ name, level }: any) {
   return (
      <div>
         <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{name}</span>
            <span className="text-gray-500">{level}%</span>
         </div>
         <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
               className="h-full bg-gradient-to-r from-[#245DDA] to-[#2683FF]" 
               style={{ width: `${level}%` }}
            />
         </div>
      </div>
   );
}
