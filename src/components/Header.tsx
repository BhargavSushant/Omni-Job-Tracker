import React from 'react';
import { useJobPulse } from '../context/JobPulseContext';
import { APP_LOGO, PROFILE_AVATAR } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    unreadNotificationsCount,
    setNotificationsOpen,
    notificationsOpen,
    setActiveTab,
    activeTab,
  } = useJobPulse();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#060e20]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('discover')}
          className="flex items-center gap-2 active:scale-95 transition-transform"
        >
          <img
            alt="JobPulse App Logo"
            className="h-8 w-auto object-contain"
            src={APP_LOGO}
          />
          <span className="font-headline-md text-headline-md tracking-tight text-[#dae2fd]">
            JobPulse
          </span>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Notification Button */}
          <button
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#c7c4d7] hover:text-[#dae2fd] hover:bg-[#222a3d]/40 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#4edea3] ring-2 ring-[#060e20] animate-pulse"></span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            aria-label="Open Profile"
            onClick={() => setActiveTab('profile')}
            className={`w-11 h-11 flex items-center justify-center rounded-full hover:opacity-90 transition-all ml-1 ${
              activeTab === 'profile' ? 'ring-2 ring-[#c0c1ff]' : ''
            }`}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={PROFILE_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
