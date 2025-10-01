import { PhoneIncoming as HomeIcon, List as ListIcon, Plus as PlusIcon, Settings as SettingsIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";

interface SidebarProps {
  activeView: 'dashboard' | 'reports' | 'settings';
  onViewChange: (view: 'dashboard' | 'reports' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigationItems = [
    {
      icon: HomeIcon,
      label: "Dashboard",
      isActive: activeView === 'dashboard',
      bgClass: activeView === 'dashboard' ? "bg-gray-800" : "bg-black",
      onClick: () => onViewChange('dashboard'),
    },
    {
      icon: ListIcon,
      label: "Reports",
      isActive: activeView === 'reports',
      bgClass: activeView === 'reports' ? "bg-gray-800" : "bg-black",
      onClick: () => onViewChange('reports'),
    },
    {
      icon: SettingsIcon,
      label: "Settings",
      isActive: activeView === 'settings',
      bgClass: activeView === 'settings' ? "bg-gray-800" : "bg-black",
      onClick: () => onViewChange('settings'),
    },
  ];

  return (
    <aside className="flex flex-col w-16 md:w-[280px] lg:w-[312px] h-screen items-start justify-between px-2 md:px-4 py-4 md:py-8 relative bg-black transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-start gap-6 md:gap-10 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col w-full items-center md:items-start gap-2.5 relative flex-[0_0_auto]">
          <div className="inline-flex items-center justify-center md:justify-start gap-[11.6px] relative flex-[0_0_auto] w-full">
            <div className="relative w-[28.14px] h-[32.54px] bg-[url(/vector.png)] bg-[100%_100%] flex-shrink-0" />
            <div className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-[23.2px] tracking-[-0.16px] leading-[31.9px] whitespace-nowrap hidden md:block">
              ESGC
            </div>
          </div>
        </div>

        <nav className="inline-flex flex-col items-center md:items-start gap-3 md:gap-6 relative flex-[0_0_auto] w-full">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={item.onClick}
              className={`flex w-12 md:w-full min-h-12 items-center justify-center md:justify-start gap-2 px-2 md:px-3 py-2.5 relative flex-[0_0_auto] ${item.bgClass} rounded-full overflow-hidden h-auto hover:bg-gray-800 transition-all duration-300`}
              title={item.label}
            >
              <div className="flex items-center gap-2 relative md:flex-1 md:grow">
                <item.icon className="relative w-6 h-6 text-white" />
                <div className="relative flex-1 [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-base tracking-[-0.11px] leading-[22px] text-left hidden md:block">
                  {item.label}
                </div>
              </div>
            </Button>
          ))}
        </nav>
      </div>

      <div className="inline-flex flex-col items-center md:items-start gap-6 relative flex-[0_0_auto] w-full">
        <div className="flex w-full items-end gap-2 md:gap-4 pt-6 pb-0 px-0 relative flex-[0_0_auto] border-t [border-top-style:solid] border-slate-600">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 relative flex-1 grow">
            <Avatar className="relative w-10 h-10 rounded-[76.88px]">
              <AvatarImage src="/avatar.png" alt="Azunyan U. Wu" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="flex flex-col h-[46px] items-center md:items-start gap-0.5 relative flex-1 grow hidden md:flex">
              <div className="relative self-stretch mt-[-1.00px] font-text-md-bold font-[number:var(--text-md-bold-font-weight)] text-gray0-white text-[length:var(--text-md-bold-font-size)] tracking-[var(--text-md-bold-letter-spacing)] leading-[var(--text-md-bold-line-height)] [font-style:var(--text-md-bold-font-style)]">
                Azunyan U. Wu
              </div>
              <div className="relative self-stretch [font-family:'Inter',Helvetica] font-medium text-gray-20 text-sm tracking-[-0.08px] leading-5">
                Admin
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex w-10 h-10 items-center justify-center gap-2.5 p-2 md:p-4 relative rounded-[123px] overflow-hidden h-auto hover:bg-gray-800 hidden md:flex"
            title="Add new"
          >
            <PlusIcon className="relative w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </aside>
  );
};