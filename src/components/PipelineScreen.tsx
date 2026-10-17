import React, { useState } from 'react';
import { useJobPulse } from '../context/JobPulseContext';
import { PipelineItem, PipelineStage } from '../types';

export const PipelineScreen: React.FC = () => {
  const {
    pipelineItems,
    pipelineStageFilter,
    setPipelineStageFilter,
    movePipelineStage,
    addPipelineItem,
    showToast,
  } = useJobPulse();

  const [modalOpen, setModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStage, setNewStage] = useState<PipelineStage>('applied');
  const [newSalary, setNewSalary] = useState('');
  const [newLocation, setNewLocation] = useState('Remote');

  // Stage counts for badges
  const stageCounts = {
    all: pipelineItems.length,
    applied: pipelineItems.filter((i) => i.stage === 'applied').length,
    screening: pipelineItems.filter((i) => i.stage === 'screening').length,
    interviewing: pipelineItems.filter((i) => i.stage === 'interviewing').length,
    offer: pipelineItems.filter((i) => i.stage === 'offer').length,
    archived: pipelineItems.filter((i) => i.stage === 'archived').length,
  };

  const filteredItems = pipelineItems.filter((item) => {
    if (pipelineStageFilter === 'all') return true;
    return item.stage === pipelineStageFilter;
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    addPipelineItem({
      company: newCompany.trim(),
      role: newRole.trim(),
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-eDS86qcrEzdRRqdxKc96Fq59Y2IMW3UYzDRSealeCkSa-IhT-02M2qtkIrDHMw6sUXnYawsm7m7xAqsgoYio2L77kXboNdAHAvdkPV5Swc4183R2OqQa5KfTqRE5jEs-fRGbZ9UpShnkTCR1kebt5D8d1SsSTbWeA4U37CislSizMF3nkEMoFQlQZvMloG4GLCyzlvscWv2oF9oV9Q75REc-V1hCPZ4dhH3QSBkdk02aEWubdUA',
      stage: newStage,
      stageLabel:
        newStage === 'screening'
          ? 'Screening'
          : newStage === 'interviewing'
          ? 'Interviewing'
          : newStage === 'offer'
          ? 'Formal Offer'
          : newStage === 'applied'
          ? 'Applied'
          : 'Archived',
      salary: newSalary ? `$${newSalary}` : '$170k - $200k',
      location: newLocation,
      resumeUsed: 'Frontend_Lead_2025.pdf',
    });

    setNewCompany('');
    setNewRole('');
    setNewSalary('');
    setModalOpen(false);
  };

  // Next stage progression mapping
  const getNextStage = (curr: PipelineStage): PipelineStage => {
    switch (curr) {
      case 'applied':
        return 'screening';
      case 'screening':
        return 'interviewing';
      case 'interviewing':
        return 'offer';
      case 'offer':
        return 'archived';
      default:
        return 'applied';
    }
  };

  const getNextStageLabel = (curr: PipelineStage): string => {
    switch (curr) {
      case 'applied':
        return 'Promote to Screening';
      case 'screening':
        return 'Move to Interviewing';
      case 'interviewing':
        return 'Record Offer';
      case 'offer':
        return 'Finalize & Archive';
      default:
        return 'Reopen';
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 max-w-lg mx-auto">
      {/* Metrics Snapshot Carousel / Grid */}
      <section className="mt-2 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-[#c7c4d7] tracking-wider uppercase">
            Pipeline Velocity
          </span>
          <span className="font-label-sm text-label-sm text-[#4edea3] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
            Sync Active
          </span>
        </div>

        {/* 4-Stat Ticker Strip */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="bg-[#131b2e] p-3 rounded-xl flex flex-col justify-between border border-[#2d3449]/40">
            <div className="flex items-center justify-between text-[#c7c4d7]">
              <span className="font-label-sm text-label-sm">Tracked</span>
              <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">
                folder_open
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline-md text-headline-md text-[#dae2fd]">
                {pipelineItems.length}
              </span>
              <span className="font-label-sm text-label-sm text-[#c7c4d7] block">Applications</span>
            </div>
          </div>

          <div className="bg-[#131b2e] p-3 rounded-xl flex flex-col justify-between relative overflow-hidden border border-[#2d3449]/40">
            <div className="absolute -right-4 -top-4 w-12 h-12 bg-[#8083ff]/10 rounded-full blur-md"></div>
            <div className="flex items-center justify-between text-[#c7c4d7]">
              <span className="font-label-sm text-label-sm">Interviews</span>
              <span className="material-symbols-outlined text-[18px] text-[#8083ff]">groups</span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md text-[#dae2fd]">
                  {stageCounts.interviewing}
                </span>
                <span className="font-label-sm text-label-sm text-[#4edea3] font-bold">Active</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#c7c4d7] block">
                Next: Tomorrow
              </span>
            </div>
          </div>

          <div className="bg-[#131b2e] p-3 rounded-xl flex flex-col justify-between relative overflow-hidden border border-[#2d3449]/40">
            <div className="absolute -right-4 -top-4 w-12 h-12 bg-[#4edea3]/10 rounded-full blur-md"></div>
            <div className="flex items-center justify-between text-[#c7c4d7]">
              <span className="font-label-sm text-label-sm">Offers</span>
              <span className="material-symbols-outlined text-[18px] text-[#4edea3]">verified</span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md text-[#4edea3]">
                  {stageCounts.offer}
                </span>
                <span className="font-label-sm text-label-sm text-[#6ffbbe] block">Pending</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#c7c4d7] block">4 days left</span>
            </div>
          </div>

          <div className="bg-[#131b2e] p-3 rounded-xl flex flex-col justify-between border border-[#2d3449]/40">
            <div className="flex items-center justify-between text-[#c7c4d7]">
              <span className="font-label-sm text-label-sm">Hit Rate</span>
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">
                trending_up
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline-md text-headline-md text-[#dae2fd]">27%</span>
              <span className="font-label-sm text-label-sm text-[#c7c4d7] block">+4.2% vs avg</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stage Quick Switch Filter Pills */}
      <section className="mb-4 -mx-4 px-4 overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            type="button"
            onClick={() => setPipelineStageFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-sm ${
              pipelineStageFilter === 'all'
                ? 'bg-[#8083ff] text-[#0d0096]'
                : 'bg-[#131b2e] text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <span>All</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#060e20] text-[#dae2fd] font-label-sm text-label-sm">
              {stageCounts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPipelineStageFilter('applied')}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
              pipelineStageFilter === 'applied'
                ? 'bg-[#8083ff] text-[#0d0096] shadow-sm font-bold'
                : 'bg-[#131b2e] text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00a2e6]"></span>
            <span>Applied</span>
            <span className="font-label-sm text-label-sm">{stageCounts.applied}</span>
          </button>

          <button
            type="button"
            onClick={() => setPipelineStageFilter('screening')}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
              pipelineStageFilter === 'screening'
                ? 'bg-[#8083ff] text-[#0d0096] shadow-sm font-bold'
                : 'bg-[#131b2e] text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#89ceff]"></span>
            <span>Screening</span>
            <span className="font-label-sm text-label-sm">{stageCounts.screening}</span>
          </button>

          <button
            type="button"
            onClick={() => setPipelineStageFilter('interviewing')}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
              pipelineStageFilter === 'interviewing'
                ? 'bg-[#8083ff] text-[#0d0096] shadow-sm font-bold'
                : 'bg-[#131b2e] text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#8083ff] animate-pulse"></span>
            <span>Interviewing</span>
            <span className="font-label-sm text-label-sm">{stageCounts.interviewing}</span>
          </button>

          <button
            type="button"
            onClick={() => setPipelineStageFilter('offer')}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
              pipelineStageFilter === 'offer'
                ? 'bg-[#8083ff] text-[#0d0096] shadow-sm font-bold'
                : 'bg-[#131b2e] text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            <span>Offer</span>
            <span className="font-label-sm text-label-sm">{stageCounts.offer}</span>
          </button>

          <button
            type="button"
            onClick={() => setPipelineStageFilter('archived')}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
              pipelineStageFilter === 'archived'
                ? 'bg-[#8083ff] text-[#0d0096] shadow-sm font-bold'
                : 'bg-[#131b2e] text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#908fa0]"></span>
            <span>Archived</span>
            <span className="font-label-sm text-label-sm">{stageCounts.archived}</span>
          </button>
        </div>
      </section>

      {/* Applications Cards Stream */}
      <section className="flex flex-col gap-4">
        {filteredItems.map((item) => {
          // Determine stripe color
          const stripeColor =
            item.stage === 'interviewing'
              ? 'bg-[#8083ff]'
              : item.stage === 'offer'
              ? 'bg-[#4edea3]'
              : item.stage === 'screening'
              ? 'bg-[#89ceff]'
              : item.stage === 'applied'
              ? 'bg-[#00a2e6]'
              : 'bg-[#908fa0]';

          return (
            <article
              key={item.id}
              className="bg-[#131b2e] rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden shadow-md border border-[#2d3449]/40 transition-transform"
            >
              {/* Stage Accent Stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${stripeColor}`}></div>

              {/* Top Meta Row */}
              <div className="flex items-start justify-between gap-2 pl-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#2d3449] flex items-center justify-center shrink-0 p-1 overflow-hidden border border-[#171f33]">
                    <img
                      className="w-full h-full object-contain rounded"
                      src={item.logo}
                      alt={item.company}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-[#dae2fd] truncate">
                        {item.company}
                      </span>
                      {item.stage === 'offer' ? (
                        <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                          check_circle
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                          verified
                        </span>
                      )}
                    </div>
                    <h3 className="font-label-md text-label-md text-[#c7c4d7] truncate">
                      {item.role}
                    </h3>
                  </div>
                </div>

                {/* Stage Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm shrink-0 font-bold ${
                    item.stage === 'offer'
                      ? 'bg-[#4edea3]/20 text-[#4edea3]'
                      : item.stage === 'interviewing'
                      ? 'bg-[#8083ff]/20 text-[#c0c1ff]'
                      : item.stage === 'screening'
                      ? 'bg-[#89ceff]/20 text-[#89ceff]'
                      : 'bg-[#00a2e6]/20 text-[#c9e6ff]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.stage === 'interviewing' ? 'bg-[#8083ff] animate-ping' : 'bg-current'
                    }`}
                  ></span>
                  {item.stageLabel || item.stage}
                </span>
              </div>

              {/* Salary & Timeline Info Strip */}
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[#c7c4d7] font-body-sm text-body-sm pl-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#89ceff]">
                    payments
                  </span>
                  {item.salary}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0]">
                    calendar_today
                  </span>
                  {item.appliedDate}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0]">
                    location_on
                  </span>
                  {item.location}
                </span>
              </div>

              {/* Stage Specific Highlights */}
              {/* If Offer */}
              {item.stage === 'offer' && item.offerDetail && (
                <>
                  <div className="bg-[#4edea3]/10 p-3 rounded-lg flex items-center justify-between border border-[#4edea3]/20">
                    <div>
                      <span className="font-label-sm text-label-sm text-[#4edea3] block uppercase tracking-wider">
                        Total Package
                      </span>
                      <span className="font-headline-sm text-headline-sm text-[#4edea3] font-bold">
                        {item.offerDetail.totalPackage}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-label-sm text-[#c7c4d7] block">
                        Sign-on
                      </span>
                      <span className="font-label-md text-label-md text-[#dae2fd] font-semibold">
                        {item.offerDetail.signOn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#93000a]/20 px-3 py-2 rounded-lg text-[#ffdad6] font-label-sm text-label-sm border border-[#ffb4ab]/20">
                    <span className="flex items-center gap-1.5 text-[#ffb4ab] font-medium">
                      <span className="material-symbols-outlined text-[18px]">
                        hourglass_bottom
                      </span>
                      {item.offerDetail.expiresText}
                    </span>
                    <span className="text-[#ffb4ab] font-bold">Action Needed</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => showToast('Opening Formal Offer Letter PDF')}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#222a3d] text-[#dae2fd] font-label-md text-label-md hover:bg-[#31394d] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#89ceff]">
                        visibility
                      </span>
                      Review Offer
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Counter-Offer Strategy Sheet Loaded')}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#4edea3] text-[#003824] font-label-md text-label-md hover:opacity-90 flex items-center justify-center gap-1.5 font-bold transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[18px]">handshake</span>
                      Prepare Counter
                    </button>
                  </div>
                </>
              )}

              {/* If Interviewing */}
              {item.stage === 'interviewing' && item.interviewDetail && (
                <div className="bg-[#171f33] p-3 rounded-lg flex flex-col gap-1 border border-[#2d3449]/40">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-[#c0c1ff] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">event_upcoming</span>
                      {item.interviewDetail.roundTitle}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#4edea3] font-bold">
                      {item.interviewDetail.timeText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <p className="font-body-sm text-body-sm text-[#c7c4d7] line-clamp-1">
                      {item.interviewDetail.interviewers}
                    </p>
                    <button
                      type="button"
                      onClick={() => showToast('Launching Zoom Meeting Portal...')}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#c0c1ff] text-[#1000a9] font-label-sm text-label-sm font-semibold shrink-0 active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[16px]">videocam</span>
                      Join Zoom
                    </button>
                  </div>
                </div>
              )}

              {/* If Screening */}
              {item.stage === 'screening' && item.screeningDetail && (
                <div className="bg-[#171f33] p-3 rounded-lg flex flex-col gap-2 border border-[#2d3449]/40">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-[#dae2fd] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#89ceff]">
                        assignment_turned_in
                      </span>
                      {item.screeningDetail.taskName}
                    </span>
                    <span className="text-[#89ceff] font-semibold">
                      {item.screeningDetail.statusText}
                    </span>
                  </div>
                  <div className="w-full bg-[#060e20] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#89ceff] h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.screeningDetail.progressPercent}%` }}
                    ></div>
                  </div>
                  <span className="font-body-sm text-body-sm text-[#c7c4d7]">
                    {item.screeningDetail.submittedAgoText}
                  </span>
                </div>
              )}

              {/* If Applied */}
              {item.stage === 'applied' && item.sourceReferral && (
                <div className="flex items-center justify-between bg-[#171f33] px-3 py-2 rounded-lg text-[#c7c4d7] font-body-sm text-body-sm border border-[#2d3449]/40">
                  <span className="flex items-center gap-1.5 text-[#dae2fd]">
                    <span className="material-symbols-outlined text-[16px] text-[#908fa0]">
                      history
                    </span>
                    {item.sourceReferral}
                  </span>
                  {item.followUpDays && (
                    <span className="font-label-sm text-label-sm text-[#00a2e6] bg-[#00a2e6]/10 px-2 py-0.5 rounded">
                      Follow up in {item.followUpDays}d
                    </span>
                  )}
                </div>
              )}

              {/* Notes snippet */}
              {item.notes && (
                <div className="bg-[#060e20]/60 px-3 py-2 rounded-lg text-[#c7c4d7] font-body-sm text-body-sm flex items-start gap-2 border border-[#2d3449]/30">
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0] shrink-0 mt-0.5">
                    sticky_note_2
                  </span>
                  <p className="line-clamp-2 italic">“{item.notes}”</p>
                </div>
              )}

              {/* Card Action Footer */}
              <div className="pt-1 flex items-center justify-between gap-2 pl-1">
                <button
                  type="button"
                  onClick={() => showToast(`Notes logged for ${item.company}`)}
                  className="text-[#c7c4d7] hover:text-[#dae2fd] font-label-sm text-label-sm flex items-center gap-1 py-1 px-2 rounded hover:bg-[#171f33]"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  Notes ({item.notesCount || 1})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nxt = getNextStage(item.stage);
                    movePipelineStage(item.id, nxt);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-label-sm text-label-sm flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
                >
                  <span>{getNextStageLabel(item.stage)}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Empty State Fallback */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#171f33] flex items-center justify-center mb-3 text-[#c7c4d7]">
            <span className="material-symbols-outlined text-[32px]">filter_list_off</span>
          </div>
          <h4 className="font-headline-sm text-headline-sm text-[#dae2fd] mb-1">
            No Applications in this Stage
          </h4>
          <p className="font-body-sm text-body-sm text-[#c7c4d7] max-w-xs mb-4">
            You don't have any opportunities logged here yet. Drag an active application over or add
            a new one.
          </p>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-[#222a3d] text-[#c0c1ff] font-label-md text-label-md active:scale-95 transition-all"
            onClick={() => setPipelineStageFilter('all')}
          >
            Show All Applications
          </button>
        </div>
      )}

      {/* Floating "+ Log New Application" Action Button */}
      <div className="fixed bottom-24 right-4 z-40">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-[#c0c1ff] text-[#1000a9] shadow-xl hover:opacity-95 active:scale-95 transition-all focus:outline-none font-bold"
        >
          <span className="material-symbols-outlined text-[22px]">add</span>
          <span className="font-label-md text-label-md tracking-wide">Log Application</span>
        </button>
      </div>

      {/* Track New Opportunity Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#060e20]/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="w-full max-w-md bg-[#171f33] border border-[#2d3449] rounded-t-2xl sm:rounded-2xl p-4 flex flex-col gap-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#2d3449]">
              <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                Track New Opportunity
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#c7c4d7] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="flex flex-col gap-3 pt-1">
              <div>
                <label className="font-label-sm text-label-sm text-[#c7c4d7] mb-1 block">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stripe, Airbnb, Datadog"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-[#131b2e] border border-[#2d3449] px-3 py-2 rounded-lg text-[#dae2fd] font-body-md text-body-md placeholder:text-[#908fa0] focus:outline-none focus:border-[#8083ff] transition-colors"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-[#c7c4d7] mb-1 block">
                  Role Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Architect"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#131b2e] border border-[#2d3449] px-3 py-2 rounded-lg text-[#dae2fd] font-body-md text-body-md placeholder:text-[#908fa0] focus:outline-none focus:border-[#8083ff] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-label-sm text-[#c7c4d7] mb-1 block">
                    Initial Stage
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as PipelineStage)}
                    className="w-full bg-[#131b2e] border border-[#2d3449] px-3 py-2 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:outline-none"
                  >
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-[#c7c4d7] mb-1 block">
                    Est. Salary ($k)
                  </label>
                  <input
                    type="text"
                    placeholder="180-210k"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full bg-[#131b2e] border border-[#2d3449] px-3 py-2 rounded-lg text-[#dae2fd] font-body-md text-body-md placeholder:text-[#908fa0] focus:outline-none focus:border-[#8083ff]"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-[#c7c4d7] mb-1 block">
                  Location / Mode
                </label>
                <input
                  type="text"
                  placeholder="Remote, San Francisco, Hybrid"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-[#131b2e] border border-[#2d3449] px-3 py-2 rounded-lg text-[#dae2fd] font-body-md text-body-md placeholder:text-[#908fa0] focus:outline-none focus:border-[#8083ff]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-[#c7c4d7] font-label-md text-label-md hover:text-[#dae2fd]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#c0c1ff] text-[#1000a9] font-label-md text-label-md font-bold shadow-md active:scale-95 transition-transform"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
