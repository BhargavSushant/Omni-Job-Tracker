import React, { useRef, useState } from 'react';
import { useJobPulse } from '../context/JobPulseContext';
import { PipelineStage } from '../types';

export const HandoffReturnModal: React.FC = () => {
  const {
    handoffModalOpen,
    handoffData,
    closeHandoffModal,
    addPipelineItem,
    resumes,
    setActiveTab,
    showToast,
  } = useJobPulse();

  const [selectedStatus, setSelectedStatus] = useState<'applied' | 'later' | 'archive'>('applied');
  const [selectedResume, setSelectedResume] = useState(
    handoffData?.defaultResume || resumes.find((r) => r.isPrimary)?.fileName || 'Frontend_Lead_2025.pdf'
  );
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [notes, setNotes] = useState('Referred by Sarah on LinkedIn; applied via Greenhouse portal');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!handoffModalOpen || !handoffData) return null;

  // Particle spray animation matching HTML reference
  const fireConfetti = (onComplete: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      onComplete();
      return;
    }
    canvas.classList.remove('hidden');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onComplete();
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 48 }, () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.72,
      r: Math.random() * 5 + 3,
      color: ['#4edea3', '#8083ff', '#89ceff', '#c0c1ff'][Math.floor(Math.random() * 4)],
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 1.2) * 9,
      alpha: 1,
    }));

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
      });

      frame++;
      if (frame < 55) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.add('hidden');
        onComplete();
      }
    };
    animate();
  };

  const handleConfirm = () => {
    let stage: PipelineStage = 'applied';
    let label = 'Applied';

    if (selectedStatus === 'later') {
      stage = 'applied';
      label = 'Saved for Later';
    } else if (selectedStatus === 'archive') {
      stage = 'archived';
      label = 'Archived';
    }

    addPipelineItem({
      jobId: handoffData.jobId,
      company: handoffData.company,
      role: handoffData.title,
      logo: handoffData.companyLogo,
      stage,
      stageLabel: label,
      salary: handoffData.salaryText,
      location: handoffData.location,
      notes: notes,
      resumeUsed: selectedResume,
      followUpDays: reminderEnabled ? 7 : undefined,
    });

    if (selectedStatus === 'applied') {
      setIsSubmittedSuccess(true);
      fireConfetti(() => {
        showToast(`Added ${handoffData.company} to your Pipeline!`);
        closeHandoffModal();
        setActiveTab('pipeline');
      });
    } else {
      showToast(`Saved ${handoffData.company}`);
      closeHandoffModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col justify-end sm:justify-center items-center bg-[#060e20]/80 backdrop-blur-md">
      {/* Dimmed Background Portal Context */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 opacity-30 filter blur-[4px] pointer-events-none p-4 select-none"
      >
        <div className="bg-[#171f33] rounded-xl p-6 space-y-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#2d3449]"></div>
            <div className="h-4 w-40 bg-[#2d3449] rounded-full"></div>
          </div>
          <div className="h-3 w-full bg-[#2d3449] rounded-full"></div>
          <div className="h-3 w-5/6 bg-[#2d3449] rounded-full"></div>
        </div>
      </div>

      {/* Sheet Container */}
      <div className="relative z-20 w-full max-w-lg px-4 pb-6 pt-2 flex flex-col items-center">
        {/* Tactile Drag Notch */}
        <div className="w-10 h-1 rounded-full bg-[#464554]/60 mb-2"></div>

        {/* Sheet Card */}
        <div className="w-full bg-[#131b2e] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 relative overflow-hidden border border-[#2d3449]/50">
          {/* Top Radiant Aura */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#8083ff]/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Header with Pulsing Success Handoff Orb */}
          <div className="flex items-start gap-3 relative">
            <div className="relative flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-[#00885d]/30 text-[#4edea3]">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4edea3]/20 animate-ping opacity-75"></span>
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                task_alt
              </span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-1.5 text-[#4edea3] font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                Handoff Return Sync
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#dae2fd] leading-tight mt-0.5">
                Welcome back! Did you apply?
              </h2>
            </div>
          </div>

          {/* Job Summary Capsule */}
          <div className="bg-[#171f33] rounded-xl p-2.5 flex items-center gap-3 shadow-sm border border-[#2d3449]/40">
            <div className="w-12 h-12 rounded-lg bg-[#2d3449] flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-inner">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={handoffData.companyLogo}
                alt={handoffData.company}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] truncate">
                  {handoffData.title}
                </h3>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] shrink-0">
                  External Link
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-[#c7c4d7] truncate">
                {handoffData.company} • {handoffData.salaryText}
              </p>
            </div>
          </div>

          {/* Status Selection (Tactile Radio Cards) */}
          <div className="flex flex-col gap-2" role="radiogroup" aria-label="Application Outcome">
            {/* Option 1: Yes, applied just now */}
            <div
              onClick={() => setSelectedStatus('applied')}
              className={`cursor-pointer transition-all duration-200 rounded-xl p-3 shadow-md relative group select-none border ${
                selectedStatus === 'applied'
                  ? 'bg-[#222a3d] border-[#8083ff]/40 shadow-lg'
                  : 'bg-[#171f33] border-[#2d3449]/40 hover:bg-[#222a3d]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#4edea3] text-[#000703] flex items-center justify-center shrink-0 shadow-sm">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-[#dae2fd]">
                      Yes, I applied just now
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-body-sm text-body-sm text-[#4edea3] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span> Today,
                        2:45 PM
                      </span>
                      <span className="text-[#908fa0] text-[10px]">•</span>
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-[#00a2e6]/30 text-[#89ceff]">
                        Applied 🟡
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`material-symbols-outlined text-[22px] ${
                    selectedStatus === 'applied' ? 'text-[#4edea3]' : 'text-[#908fa0]'
                  }`}
                >
                  {selectedStatus === 'applied'
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </span>
              </div>

              {/* Sub-details (Accordion when applied is selected) */}
              {selectedStatus === 'applied' && (
                <div className="mt-3 pt-2 flex flex-col gap-2 border-t border-[#2d3449]/40">
                  {/* Resume Selector Chip */}
                  <div className="bg-[#171f33] rounded-lg p-2 px-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#89ceff] text-[20px]">
                        description
                      </span>
                      <div className="truncate">
                        <span className="block font-label-sm text-label-sm text-[#c7c4d7]">
                          Resume Submitted
                        </span>
                        <span className="font-body-sm text-body-sm text-[#dae2fd] font-medium truncate">
                          {selectedResume}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Cycle through resumes
                        const nextRes =
                          resumes.find((r) => r.fileName !== selectedResume)?.fileName ||
                          selectedResume;
                        setSelectedResume(nextRes);
                        showToast(`Switched resume to ${nextRes}`);
                      }}
                      className="font-label-sm text-label-sm text-[#c0c1ff] px-2 py-1 rounded bg-[#2d3449] hover:bg-[#31394d] active:scale-95 transition-all shrink-0"
                    >
                      Change
                    </button>
                  </div>

                  {/* Follow-up Auto Reminder Switch */}
                  <label className="flex items-center justify-between bg-[#171f33] rounded-lg p-2 px-3 cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">
                        notifications_active
                      </span>
                      <div>
                        <span className="block font-label-md text-label-md text-[#dae2fd]">
                          Follow-up Reminder
                        </span>
                        <span className="font-body-sm text-body-sm text-[#c7c4d7]">
                          Remind me in 7 days (Next Monday)
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={reminderEnabled}
                        onChange={(e) => setReminderEnabled(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        onClick={() => setReminderEnabled(!reminderEnabled)}
                        className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                          reminderEnabled ? 'bg-[#8083ff]' : 'bg-[#2d3449]'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 start-0.5 bg-[#0d0096] rounded-full h-5 w-5 transition-transform ${
                            reminderEnabled ? 'translate-x-4 bg-[#0d0096]' : 'translate-x-0 bg-[#908fa0]'
                          }`}
                        ></span>
                      </div>
                    </div>
                  </label>

                  {/* Quick Note Input */}
                  <div className="bg-[#171f33] rounded-lg p-2 px-3 flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-[#c7c4d7] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">edit_note</span> Quick
                      Notes
                    </span>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add a reference or notes..."
                      className="bg-transparent font-body-sm text-body-sm text-[#dae2fd] focus:outline-none placeholder-[#908fa0] w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: Apply Later */}
            <div
              onClick={() => setSelectedStatus('later')}
              className={`cursor-pointer transition-all duration-200 rounded-xl p-3 relative group select-none border ${
                selectedStatus === 'later'
                  ? 'bg-[#222a3d] border-[#8083ff]/40 shadow-lg'
                  : 'bg-[#171f33] border-[#2d3449]/40 hover:bg-[#222a3d]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2d3449] text-[#c7c4d7] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-[#dae2fd]">
                      Didn't finish - Save to Apply Later
                    </p>
                    <p className="font-body-sm text-body-sm text-[#c7c4d7]">
                      Keep draft in Pipeline 'Saved' stage
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    selectedStatus === 'later' ? 'text-[#c0c1ff]' : 'text-[#908fa0]'
                  }`}
                >
                  {selectedStatus === 'later'
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </span>
              </div>
            </div>

            {/* Option 3: Decided not to apply */}
            <div
              onClick={() => setSelectedStatus('archive')}
              className={`cursor-pointer transition-all duration-200 rounded-xl p-3 relative group select-none border ${
                selectedStatus === 'archive'
                  ? 'bg-[#222a3d] border-[#8083ff]/40 shadow-lg'
                  : 'bg-[#171f33] border-[#2d3449]/40 hover:bg-[#222a3d]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#93000a]/40 text-[#ffb4ab] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-[#dae2fd]">
                      Decided not to apply (Archive)
                    </p>
                    <p className="font-body-sm text-body-sm text-[#c7c4d7]">
                      Remove from active consideration
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    selectedStatus === 'archive' ? 'text-[#c0c1ff]' : 'text-[#908fa0]'
                  }`}
                >
                  {selectedStatus === 'archive'
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer Stack */}
          <div className="flex flex-col gap-1.5 pt-1">
            <button
              type="button"
              onClick={handleConfirm}
              className={`w-full h-12 rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all font-bold ${
                isSubmittedSuccess
                  ? 'bg-[#00885d] text-[#000703]'
                  : selectedStatus === 'applied'
                  ? 'bg-[#8083ff] text-[#0d0096]'
                  : selectedStatus === 'later'
                  ? 'bg-[#00a2e6] text-[#00344e]'
                  : 'bg-[#2d3449] text-[#dae2fd]'
              }`}
            >
              {isSubmittedSuccess ? (
                <span>Application Recorded! 🎉</span>
              ) : selectedStatus === 'applied' ? (
                <>
                  <span>Add to Pipeline Tracker</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              ) : selectedStatus === 'later' ? (
                <>
                  <span>Save to Apply Later</span>
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </>
              ) : (
                <>
                  <span>Archive Job Card</span>
                  <span className="material-symbols-outlined text-[20px]">archive</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={closeHandoffModal}
              className="w-full h-10 rounded-xl bg-transparent text-[#c7c4d7] font-label-md text-label-md hover:text-[#dae2fd] hover:bg-[#171f33] active:scale-[0.98] transition-all"
            >
              Dismiss for Now
            </button>
          </div>
        </div>

        {/* Confetti Canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-50 w-full h-full hidden"
        ></canvas>
      </div>
    </div>
  );
};
