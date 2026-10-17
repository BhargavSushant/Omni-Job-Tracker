import React, { useState } from 'react';
import { BoardsScreen } from './components/BoardsScreen';
import { BottomNav } from './components/BottomNav';
import { DiscoverScreen } from './components/DiscoverScreen';
import { Header } from './components/Header';
import { HandoffReturnModal } from './components/HandoffReturnModal';
import { JobDetailsModal } from './components/JobDetailsModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { PipelineScreen } from './components/PipelineScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { JobPulseProvider, useJobPulse } from './context/JobPulseContext';

const AppContent: React.FC = () => {
  const { activeTab, toastMessage } = useJobPulse();
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-body-md text-body-md flex flex-col selection:bg-[#8083ff] selection:text-[#0d0096]">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#0b1326]">
        {/* Responsive Frame Container */}
        <div
          className={`w-full mx-auto transition-all duration-300 ${
            deviceFrameMode
              ? 'max-w-[430px] my-4 rounded-3xl border border-[#2d3449] shadow-2xl overflow-hidden bg-[#0b1326]'
              : 'max-w-lg'
          }`}
        >
          {activeTab === 'discover' && <DiscoverScreen />}
          {activeTab === 'pipeline' && <PipelineScreen />}
          {activeTab === 'boards' && <BoardsScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>
      </main>

      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#171f33] border border-[#8083ff]/40 text-[#dae2fd] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce font-label-md text-label-md">
          <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <HandoffReturnModal />
      <JobDetailsModal />
      <NotificationDrawer />

      {/* Fixed Bottom Nav */}
      <BottomNav />

      {/* Desktop Helper Toggle in bottom-left */}
      <div className="hidden lg:flex fixed bottom-4 left-4 z-40 items-center gap-2 bg-[#131b2e]/90 border border-[#2d3449] px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg text-xs text-[#c7c4d7]">
        <button
          type="button"
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="hover:text-white flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">
            {deviceFrameMode ? 'fullscreen' : 'smartphone'}
          </span>
          <span>{deviceFrameMode ? 'Full Viewport' : 'Phone Frame View'}</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <JobPulseProvider>
      <AppContent />
    </JobPulseProvider>
  );
}
