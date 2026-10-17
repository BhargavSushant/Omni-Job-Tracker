import React, { useRef, useState } from 'react';
import { useJobPulse } from '../context/JobPulseContext';

export const DiscoverScreen: React.FC = () => {
  const {
    currentJob,
    matchingJobs,
    deckIndex,
    reviewedToday,
    shortlistedToday,
    remainingCount,
    swipeJob,
    rewindLastSwipe,
    canRewind,
    openJobDetails,
    openHandoffModal,
    setActiveTab,
  } = useJobPulse();

  const cardRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isSavedHover, setIsSavedHover] = useState(false);

  // Next card preview in stack
  const nextJob =
    matchingJobs.length > 1
      ? matchingJobs[(deckIndex + 1) % matchingJobs.length]
      : null;

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    setDragOffset({ x: diffX, y: diffY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset.x > 110) {
      // Swiped right -> Apply
      swipeJob('right');
    } else if (dragOffset.x < -110) {
      // Swiped left -> Pass
      swipeJob('left');
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = dragOffset.x * 0.06;
  const passOpacity = Math.min(Math.max(-dragOffset.x / 90, 0), 1);
  const applyOpacity = Math.min(Math.max(dragOffset.x / 90, 0), 1);

  if (!currentJob) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#171f33] flex items-center justify-center mb-3 text-[#c0c1ff]">
          <span className="material-symbols-outlined text-[32px]">filter_alt_off</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] mb-1">
          No Jobs Match Your Filters
        </h3>
        <p className="font-body-sm text-body-sm text-[#c7c4d7] max-w-xs mb-4">
          Try expanding your salary corridor, toggling more sources, or clearing dealbreaker tags.
        </p>
        <button
          onClick={() => setActiveTab('boards')}
          className="px-4 py-2.5 rounded-xl bg-[#c0c1ff] text-[#1000a9] font-headline-sm text-headline-sm font-semibold active:scale-95 transition-transform"
        >
          Adjust Local Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full relative px-3 select-none overflow-hidden max-w-lg mx-auto">
      {/* Top Status Header */}
      <div className="flex items-center justify-between mb-2 mt-1">
        <div className="inline-flex items-center gap-1.5 bg-[#222a3d] px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
          <p className="font-label-sm text-label-sm text-[#dae2fd]">
            Today: <span className="text-[#c0c1ff] font-bold">{reviewedToday}</span> reviewed{' '}
            <span className="text-[#464554]">•</span>{' '}
            <span className="text-[#4edea3] font-bold">{shortlistedToday}</span> shortlisted{' '}
            <span className="text-[#464554]">•</span>{' '}
            <span className="text-[#c7c4d7]">{remainingCount} remaining</span>
          </p>
        </div>

        <button
          aria-label="Deck Preferences"
          onClick={() => setActiveTab('boards')}
          className="w-8 h-8 rounded-full bg-[#171f33] flex items-center justify-center text-[#c7c4d7] hover:text-[#dae2fd] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
        </button>
      </div>

      {/* Card Stack Container */}
      <div className="relative w-full h-[540px] flex items-center justify-center mb-3">
        {/* Deep background card (ghost 3rd) */}
        <div className="absolute w-[92%] h-[490px] rounded-xl bg-[#131b2e] shadow-sm translate-y-3 scale-[0.94] opacity-50 pointer-events-none flex flex-col p-4 border border-[#2d3449]/30">
          <div className="w-12 h-12 rounded-lg bg-[#171f33] mb-3"></div>
          <div className="h-4 w-3/4 bg-[#171f33] rounded-full mb-2"></div>
          <div className="h-3 w-1/2 bg-[#171f33] rounded-full"></div>
        </div>

        {/* 2nd Card Preview (behind active card) */}
        {nextJob && (
          <div className="absolute w-[96%] h-[505px] rounded-xl bg-[#171f33] shadow-md translate-y-1.5 scale-[0.97] opacity-80 pointer-events-none flex flex-col p-4 justify-between border border-[#2d3449]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={nextJob.companyLogo}
                  alt={nextJob.company}
                  className="w-10 h-10 rounded-lg object-contain bg-[#060e20] p-1"
                />
                <div>
                  <h4 className="font-headline-sm text-[#dae2fd] line-clamp-1">
                    {nextJob.title}
                  </h4>
                  <p className="font-label-sm text-[#89ceff]">{nextJob.company}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] font-label-sm">
                {nextJob.matchScore}% Match
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-[#2d3449] rounded-full"></div>
              <div className="h-3 w-4/5 bg-[#2d3449] rounded-full"></div>
            </div>
          </div>
        )}

        {/* Active Top Swipe Card */}
        <div
          ref={cardRef}
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={handleDragEnd}
          style={{
            transform: `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.4}px, 0) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity 0.2s ease',
          }}
          className="absolute inset-0 w-full h-full bg-[#171f33] rounded-xl shadow-xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing will-change-transform z-10 border border-[#2d3449]/50"
        >
          {/* PASS STAMP */}
          <div
            style={{ opacity: passOpacity }}
            className="absolute top-8 right-6 z-30 pointer-events-none rotate-12 transition-opacity duration-150"
          >
            <div className="bg-[#93000a] text-[#ffdad6] px-4 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 border border-[#ffb4ab]/40">
              <span className="material-symbols-outlined text-[20px] font-bold">cancel</span>
              <span className="font-headline-sm text-headline-sm tracking-wider uppercase font-extrabold">
                PASS
              </span>
            </div>
          </div>

          {/* APPLY / SAVE STAMP */}
          <div
            style={{ opacity: applyOpacity }}
            className="absolute top-8 left-6 z-30 pointer-events-none -rotate-12 transition-opacity duration-150"
          >
            <div className="bg-[#00885d] text-[#000703] px-4 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 border border-[#4edea3]/50">
              <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span>
              <span className="font-headline-sm text-headline-sm tracking-wider uppercase font-extrabold">
                APPLY / SAVE
              </span>
            </div>
          </div>

          {/* Banner Graphic Header */}
          <div className="relative w-full h-36 bg-[#2d3449] shrink-0 overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url('${currentJob.bannerImg}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-[#171f33]/60 to-transparent"></div>

            {/* Source Chip */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#060e20]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[#c7c4d7] shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-[#89ceff]">hub</span>
              <span className="font-label-sm text-label-sm">
                via {currentJob.source} • {currentJob.postedAgo}
              </span>
            </div>

            {/* Resume Match Chip */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#8083ff]/90 backdrop-blur-md text-[#0d0096] px-3 py-1 rounded-full shadow-[0_0_16px_-2px_rgba(99,102,241,0.5)]">
              <span
                className="material-symbols-outlined text-[16px] text-[#0d0096]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label-md text-label-md font-bold tracking-tight">
                {currentJob.matchScore}% Resume Match
              </span>
            </div>

            {/* Company Avatar & Role Lockup */}
            <div className="absolute bottom-2 left-3 flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#060e20] flex items-center justify-center shadow-md p-1.5 border border-[#2d3449]">
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={currentJob.companyLogo}
                  alt={currentJob.company}
                />
              </div>
              <div className="min-w-0 pr-2">
                <h2 className="font-headline-sm text-headline-sm text-[#dae2fd] leading-tight truncate">
                  {currentJob.title}
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md text-[#89ceff]">
                    {currentJob.company}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#908fa0]"></span>
                  <span className="font-label-sm text-label-sm text-[#c7c4d7]">
                    {currentJob.stageBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="flex-1 flex flex-col p-4 justify-between overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-2">
              {/* Compensation Capsule */}
              <div className="flex items-center gap-2 bg-[#131b2e] px-3 py-2 rounded-lg text-[#dae2fd] shadow-sm flex-wrap">
                <span className="material-symbols-outlined text-[18px] text-[#4edea3]">
                  payments
                </span>
                <span className="font-label-md text-label-md font-bold text-[#dae2fd] tracking-tight">
                  {currentJob.salaryText}
                </span>
                {currentJob.equityText && (
                  <>
                    <span className="text-[#464554] font-label-sm text-label-sm">•</span>
                    <span className="font-label-sm text-label-sm text-[#c9e6ff]">
                      {currentJob.equityText}
                    </span>
                  </>
                )}
                <span className="text-[#464554] font-label-sm text-label-sm">•</span>
                <span className="font-label-sm text-label-sm text-[#c7c4d7] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">public</span>{' '}
                  {currentJob.location}
                </span>
              </div>

              {/* Matched Competencies */}
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-[#c7c4d7] mb-1.5">
                  Matched Competencies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentJob.matchedCompetencies.map((comp) => (
                    <span
                      key={comp}
                      className="inline-flex items-center gap-1 bg-[#222a3d] px-2.5 py-1 rounded-full text-[#4edea3] font-label-sm text-label-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                      {comp}
                    </span>
                  ))}
                  {currentJob.niceToHaveCompetencies.map((nth) => (
                    <span
                      key={nth}
                      className="inline-flex items-center gap-1 bg-[#131b2e] px-2 py-1 rounded-full text-[#c7c4d7] font-label-sm text-label-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#908fa0]"></span>
                      {nth}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role Impact Bullets */}
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-[#c7c4d7] mb-1">
                  Role Impact
                </p>
                <ul className="space-y-1.5">
                  {currentJob.impactPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#c0c1ff] shrink-0 mt-0.5">
                        check
                      </span>
                      <span className="font-body-sm text-body-sm text-[#c7c4d7] leading-snug">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Read Complete JD link & Hint */}
            <div className="pt-2 flex items-center justify-between text-[#c7c4d7]">
              <button
                type="button"
                aria-label="View Full Job Spec"
                onClick={(e) => {
                  e.stopPropagation();
                  openJobDetails(currentJob);
                }}
                className="font-label-sm text-label-sm text-[#c0c1ff] flex items-center gap-1 hover:underline"
              >
                <span>Read complete JD</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
              <span className="font-label-sm text-label-sm text-[#908fa0]">
                Swipe left/right or tap action dock
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Dock (4 Buttons) */}
      <div className="flex items-center justify-center gap-4 px-3 mb-2">
        {/* Rewind */}
        <button
          type="button"
          aria-label="Undo Last Swipe"
          disabled={!canRewind}
          onClick={rewindLastSwipe}
          className={`w-12 h-12 rounded-full bg-[#171f33] flex items-center justify-center text-[#89ceff] hover:bg-[#222a3d] active:scale-90 transition-all shadow-md ${
            !canRewind ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">replay</span>
        </button>

        {/* Pass (X) */}
        <button
          type="button"
          aria-label="Pass / Reject Job"
          onClick={() => swipeJob('left')}
          className="w-16 h-16 rounded-full bg-[#222a3d] flex items-center justify-center text-[#ffb4ab] hover:bg-[#93000a] hover:text-[#ffdad6] active:scale-90 transition-all shadow-lg border border-[#ffb4ab]/20"
        >
          <span className="material-symbols-outlined text-[32px] font-bold">close</span>
        </button>

        {/* Save Star */}
        <button
          type="button"
          aria-label="Save Job for Later"
          onClick={() => {
            setIsSavedHover(true);
            swipeJob('star');
            setTimeout(() => setIsSavedHover(false), 500);
          }}
          className={`w-12 h-12 rounded-full bg-[#171f33] flex items-center justify-center active:scale-90 transition-all shadow-md ${
            isSavedHover ? 'text-[#c9e6ff] scale-110' : 'text-[#00a2e6] hover:bg-[#222a3d]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        </button>

        {/* Apply Check */}
        <button
          type="button"
          aria-label="Direct Apply / Match"
          onClick={() => {
            openHandoffModal(currentJob);
          }}
          className="w-16 h-16 rounded-full bg-[#222a3d] flex items-center justify-center text-[#4edea3] hover:bg-[#00885d] hover:text-[#000703] active:scale-90 transition-all shadow-lg border border-[#4edea3]/30"
        >
          <span className="material-symbols-outlined text-[32px] font-bold">done</span>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-1.5 mb-1">
        <span className="w-6 h-1 rounded-full bg-[#c0c1ff]"></span>
        <span className="w-1.5 h-1 rounded-full bg-[#2d3449]"></span>
        <span className="w-1.5 h-1 rounded-full bg-[#2d3449]"></span>
        <span className="w-1.5 h-1 rounded-full bg-[#2d3449]"></span>
      </div>
    </div>
  );
};
