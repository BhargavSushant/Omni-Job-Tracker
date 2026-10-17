import React from 'react';
import { useJobPulse } from '../context/JobPulseContext';

export const JobDetailsModal: React.FC = () => {
  const { viewingJob, closeJobDetails, openHandoffModal } = useJobPulse();

  if (!viewingJob) return null;

  const handleApplyOnPortal = () => {
    const jobToApply = viewingJob;
    closeJobDetails();
    // Simulate opening the job application portal, then show the Handoff Return Sync sheet!
    setTimeout(() => {
      openHandoffModal(jobToApply);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col justify-end sm:justify-center items-center bg-[#060e20]/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="fixed inset-0 -z-10" onClick={closeJobDetails}></div>

      <div className="w-full max-w-lg bg-[#171f33] border border-[#2d3449] rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Banner with Close button */}
        <div className="relative h-40 bg-[#2d3449] shrink-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url('${viewingJob.bannerImg}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-[#171f33]/40 to-transparent"></div>

          <button
            type="button"
            onClick={closeJobDetails}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#060e20]/80 flex items-center justify-center text-[#dae2fd] hover:bg-[#060e20]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {/* Company badge in banner */}
          <div className="absolute bottom-3 left-4 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#060e20] p-1.5 border border-[#2d3449] shadow-md">
              <img
                src={viewingJob.companyLogo}
                alt={viewingJob.company}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-[#dae2fd] leading-tight">
                {viewingJob.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#89ceff]">
                <span>{viewingJob.company}</span>
                <span>•</span>
                <span className="text-[#c7c4d7]">{viewingJob.stageBadge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[#dae2fd]">
          {/* Key metadata pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-[#00885d]/20 text-[#4edea3] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              {viewingJob.matchScore}% Match
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#131b2e] text-[#89ceff] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">payments</span>
              {viewingJob.salaryText}
            </span>
            {viewingJob.equityText && (
              <span className="px-3 py-1.5 rounded-full bg-[#131b2e] text-[#c9e6ff]">
                {viewingJob.equityText}
              </span>
            )}
            <span className="px-3 py-1.5 rounded-full bg-[#131b2e] text-[#c7c4d7] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">public</span>
              {viewingJob.location}
            </span>
          </div>

          {/* About the role */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] mb-1">
              Overview &amp; Mission
            </h3>
            <p className="font-body-md text-body-md text-[#c7c4d7] leading-relaxed">
              {viewingJob.fullDescription}
            </p>
          </div>

          {/* Matched Competencies */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] mb-2">
              Skills &amp; Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {viewingJob.matchedCompetencies.map((comp) => (
                <span
                  key={comp}
                  className="px-2.5 py-1 rounded-full bg-[#222a3d] text-[#4edea3] text-xs font-medium flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                  {comp}
                </span>
              ))}
              {viewingJob.niceToHaveCompetencies.map((nth) => (
                <span
                  key={nth}
                  className="px-2.5 py-1 rounded-full bg-[#131b2e] text-[#c7c4d7] text-xs"
                >
                  {nth}
                </span>
              ))}
            </div>
          </div>

          {/* Role Impact Checklist */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] mb-2">
              Expected Role Impact
            </h3>
            <ul className="space-y-2">
              {viewingJob.impactPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#c0c1ff] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="font-body-sm text-body-sm text-[#c7c4d7] leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#131b2e] border-t border-[#2d3449] flex items-center gap-3">
          <button
            type="button"
            onClick={closeJobDetails}
            className="flex-1 py-3 px-4 rounded-xl bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-label-md text-label-md active:scale-95 transition-all"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleApplyOnPortal}
            className="flex-2 py-3 px-4 rounded-xl bg-[#c0c1ff] text-[#1000a9] font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <span>Apply on Company Site</span>
            <span className="material-symbols-outlined text-[18px]">launch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
