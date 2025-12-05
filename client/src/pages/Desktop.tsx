import React, { useState } from 'react';
import { Window } from '@/components/xp/Window';
import { DesktopIcon } from '@/components/xp/DesktopIcon';
import { Taskbar } from '@/components/xp/Taskbar';
import { StartMenu } from '@/components/xp/StartMenu';

// Assets
import wallpaper from '@assets/generated_images/classic_windows_xp_style_grassy_hill_with_blue_sky_and_clouds.png';
import avatar from '@assets/generated_images/pixel_art_icon_of_a_woman_in_blue_hijab.png';
import userPhoto from '@assets/ProfilePicture_1764943511140.jpeg';
import myComputerIcon from '@assets/generated_images/windows_xp_my_computer_icon.png';
import folderIcon from '@assets/generated_images/windows_xp_folder_icon.png';
import notepadIcon from '@assets/generated_images/windows_xp_notepad_icon.png';
import internetIcon from '@assets/generated_images/windows_xp_internet_icon.png';
import recycleIcon from '@assets/generated_images/windows_xp_recycle_bin_icon.png';

// Data
const RESUME_TEXT = `
SANA SIDDIQUI (B.TECH COMPUTER SCIENCE)
Dubai, UAE | +971502968897 | sanasiddiqui.cs@gmail.com

PROFESSIONAL SUMMARY
Dedicated Software Developer with 4+ years of full-stack experience in .NET Core, Angular, and SQL Server, building and maintaining scalable, secure, and user-friendly web applications. Skilled in C#, ASP.NET MVC, Web API, Entity Framework Core, ADO.NET, and SQL stored procedures.

TECHNICAL SKILLS
Frontend: Angular 12–17, TypeScript, JavaScript (ES6+), jQuery, HTML5, CSS3, Angular Material, RxJS, NGXS
Backend: C#, .NET Framework, .NET Core 7/8, ASP.NET MVC, Web API, RESTful API, ADO.NET, Entity Framework Core
Database: MS SQL Server, MySQL, Stored Procedures, Functions, Views
Cloud & DevOps: Docker, Azure DevOps Pipelines, AWS, IIS, Git

EXPERIENCE

Crowe UAE (Mar 2025 – Aug 2025)
Software Developer
- Revamped an Angular-based AML Screening application with Secure API Gateway
- Developed reusable Angular Material components
- Implemented NgRx state management

Rideware Technologies (May 2023 – Dec 2024)
Software Developer (Technical Lead)
- Led a team of four developers on a custom HRMS solution
- Built encapsulated business logic using Clean Architecture
- Optimized document storage using Lean methodology

BMS Solutions (June 2022 – March 2023)
Software Developer
- Developed multiple web and mobile pages, fixed 600+ complex bugs
- Built MSSQL stored procedures and Telerik reports

PROJECTS
- Rideware HRMS Software (Angular, .NET Core)
- AML Screening and monitoring solution
- Retail Analytics Copilot (AI Project)
`.trim();

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
      <div className="absolute top-2 left-2 flex flex-col gap-4 h-[calc(100vh-40px)] flex-wrap content-start p-2">
        <DesktopIcon 
          id="profile" 
          label="My Profile" 
          icon={avatar} // Using the generated avatar for the icon
          onDoubleClick={() => openWindow('profile', 'My Profile', avatar, 'profile', 'custom')} 
        />
        <DesktopIcon 
          id="resume" 
          label="My Resume" 
          icon={notepadIcon} 
          onDoubleClick={() => openWindow('resume', 'My Resume.txt', notepadIcon, RESUME_TEXT, 'text')} 
          className="translate-y-[80px]"
        />
        <DesktopIcon 
          id="projects" 
          label="My Projects" 
          icon={folderIcon} 
          onDoubleClick={() => openWindow('projects', 'My Projects', folderIcon, 'projects', 'folder')} 
          className="translate-y-[160px]"
        />
        <DesktopIcon 
          id="experience" 
          label="Experience" 
          icon={myComputerIcon} 
          onDoubleClick={() => openWindow('experience', 'My Experience', myComputerIcon, 'experience', 'folder')} 
          className="translate-y-[240px]"
        />
        <DesktopIcon 
          id="internet" 
          label="Internet" 
          icon={internetIcon} 
          onDoubleClick={() => openWindow('internet', 'LinkedIn', internetIcon, 'internet', 'browser')} 
          className="translate-y-[320px]"
        />
         <DesktopIcon 
          id="recycle" 
          label="Recycle Bin" 
          icon={recycleIcon} 
          onDoubleClick={() => {}} 
          className="fixed bottom-[50px] right-4 translate-y-0"
        />
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

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <h3 className="font-bold border-b border-gray-300 mb-1">Frontend</h3>
                            <ul className="list-disc pl-4 text-gray-700">
                               <li>Angular 12-17</li>
                               <li>TypeScript / JS</li>
                               <li>React</li>
                               <li>Tailwind / CSS3</li>
                            </ul>
                         </div>
                         <div>
                            <h3 className="font-bold border-b border-gray-300 mb-1">Backend</h3>
                            <ul className="list-disc pl-4 text-gray-700">
                               <li>.NET Core 7/8</li>
                               <li>C# / ASP.NET</li>
                               <li>SQL Server</li>
                               <li>Entity Framework</li>
                            </ul>
                         </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                         <a 
                           href="https://www.linkedin.com/in/sana-cs" 
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
                     https://www.linkedin.com/in/sana-cs
                  </div>
               </div>
               <div className="flex-1 bg-white p-4 flex flex-col items-center justify-center gap-4">
                  <img src={internetIcon} alt="Internet" className="w-16 h-16 opacity-50" />
                  <p className="text-gray-500 mb-2">External Link - LinkedIn</p>
                  <a 
                     href="https://www.linkedin.com/in/sana-cs" 
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
            if (action === 'profile') openWindow('profile', 'My Profile', avatar, 'profile', 'custom');
            if (action === 'resume') openWindow('resume', 'My Resume.txt', notepadIcon, RESUME_TEXT, 'text');
            if (action === 'experience') openWindow('experience', 'My Experience', myComputerIcon, 'experience', 'folder');
            if (action === 'projects') openWindow('projects', 'My Projects', folderIcon, 'projects', 'folder');
            if (action === 'internet') openWindow('internet', 'LinkedIn', internetIcon, 'internet', 'browser');
            setIsStartOpen(false);
         }}
         userImage={userPhoto}
      />
    </div>
  );
}
