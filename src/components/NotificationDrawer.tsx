import React from 'react';
import { useJobPulse } from '../context/JobPulseContext';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    notificationsOpen,
    setNotificationsOpen,
    markNotificationsAsRead,
    setActiveTab,
  } = useJobPulse();

  if (!notificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop tap to close */}
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setNotificationsOpen(false)}
      ></div>

      <div className="w-full max-w-sm bg-[#171f33] border border-[#2d3449] rounded-2xl shadow-2xl p-4 mt-2 overflow-hidden flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#2d3449] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#89ceff] text-[20px]">
              notifications_active
            </span>
            <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
              Activity &amp; Alerts
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotificationsAsRead}
              className="text-[#c0c1ff] font-label-sm text-label-sm hover:underline"
            >
              Mark read
            </button>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#c7c4d7] hover:bg-[#222a3d]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto no-scrollbar">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'offer' || item.type === 'interview' || item.type === 'pipeline') {
                  setActiveTab('pipeline');
                } else {
                  setActiveTab('boards');
                }
                setNotificationsOpen(false);
              }}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                item.isUnread
                  ? 'bg-[#222a3d] border border-[#8083ff]/30 shadow-sm'
                  : 'bg-[#131b2e] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {item.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-[#4edea3] shrink-0 animate-pulse"></span>
                  )}
                  <h4 className="font-label-md text-label-md text-[#dae2fd] truncate">
                    {item.title}
                  </h4>
                </div>
                <span className="text-[11px] text-[#908fa0] shrink-0 font-body-sm">
                  {item.timeAgo}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-[#c7c4d7] mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
