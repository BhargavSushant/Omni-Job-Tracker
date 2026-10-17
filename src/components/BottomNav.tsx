import React from 'react';
import { useJobPulse } from '../context/JobPulseContext';
import { TabType } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, pipelineItems } = useJobPulse();

  const pipelineCount = pipelineItems.length;

  const tabs: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'discover', label: 'Discover', icon: 'explore' },
    { id: 'pipeline', label: 'Pipeline', icon: 'view_kanban', badge: pipelineCount },
    { id: 'boards', label: 'Boards', icon: 'tune' },
    { id: 'profile', label: 'Profile', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#060e20]/85 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.4)] border-t border-[#171f33]/40">
      <div className="flex justify-around items-center h-20 px-3 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors ${
                isActive ? 'text-[#c0c1ff]' : 'text-[#c7c4d7] hover:text-[#dae2fd]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[26px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>

                {/* Badge if pipeline */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1.5 min-w-[18px] h-4 rounded-full bg-[#8083ff] text-[#0d0096] font-label-sm text-[10px] leading-4 text-center flex items-center justify-center font-bold shadow-sm">
                    {tab.badge}
                  </span>
                )}

                {/* Active Indicator Dot */}
                <span
                  className={`nav-indicator absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#c0c1ff] transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                ></span>
              </div>
              <span className="font-label-sm text-label-sm mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
