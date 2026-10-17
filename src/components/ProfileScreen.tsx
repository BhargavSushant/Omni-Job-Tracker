import React, { useRef, useState } from 'react';
import { useJobPulse } from '../context/JobPulseContext';

export const ProfileScreen: React.FC = () => {
  const {
    resumes,
    addResume,
    removeResume,
    setPrimaryResume,
    skills,
    addSkill,
    removeSkill,
    resetSkills,
    experienceLevel,
    setExperienceLevel,
    targetRoles,
    toggleTargetRole,
    minBaseSalary,
    setMinBaseSalary,
    filters,
    setRemoteOnly,
    setActiveTab,
    showToast,
  } = useJobPulse();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newSkillText, setNewSkillText] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        addResume(files[i]);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        addResume(files[i]);
      }
    }
  };

  const handleAddSkillSubmit = () => {
    if (newSkillText.trim()) {
      addSkill(newSkillText.trim());
      newSkillText.trim();
      setNewSkillText('');
      setIsAddingSkill(false);
      showToast(`Added skill: ${newSkillText.trim()}`);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-12 max-w-lg mx-auto">
      {/* Progress & Pulse Ambient Header */}
      <div className="relative pt-4 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#222a3d] text-[#4edea3]">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Step 1 of 3 • Profile Setup
            </span>
          </div>
          <span className="font-label-md text-label-md text-[#c0c1ff]">85% Complete</span>
        </div>

        {/* Progress track */}
        <div className="w-full h-1.5 bg-[#131b2e] rounded-full overflow-hidden mt-1 shadow-inner">
          <div className="h-full bg-gradient-to-r from-[#8083ff] via-[#c0c1ff] to-[#4edea3] w-[85%] rounded-full transition-all duration-700 ease-out"></div>
        </div>
      </div>

      {/* Header Welcome Messaging */}
      <div className="mt-2 mb-4">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-[#dae2fd] tracking-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[#c0c1ff] to-[#89ceff] bg-clip-text text-transparent">
            JobPulse
          </span>
        </h1>
        <p className="font-body-md text-body-md text-[#c7c4d7] mt-1 leading-relaxed">
          Upload your resumes and set your baseline preferences to unlock AI-matched opportunities.
        </p>
      </div>

      {/* Multi-Resume Dropzone Container */}
      <div className="relative bg-[#131b2e] rounded-xl p-4 shadow-sm mb-4 overflow-hidden group border border-[#2d3449]/40">
        {/* Glow halo decoration */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#8083ff]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-headline-sm text-headline-sm text-[#dae2fd] flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#c0c1ff] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cloud_upload
            </span>
            Resume Intelligence
          </span>
          <span className="font-label-sm text-label-sm text-[#908fa0] px-2 py-0.5 rounded-full bg-[#2d3449]">
            PDF, DOCX
          </span>
        </div>

        {/* Dropzone Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative rounded-lg p-4 bg-[#171f33]/70 active:scale-[0.99] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center border border-dashed border-[#2d3449] hover:border-[#8083ff]/50"
        >
          <div className="w-12 h-12 rounded-full bg-[#222a3d] flex items-center justify-center mb-1 text-[#c0c1ff] shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[26px]">post_add</span>
          </div>
          <p className="font-label-lg text-label-lg text-[#dae2fd] font-semibold">
            Drop resumes or{' '}
            <span className="text-[#89ceff] underline decoration-[#89ceff]/40 underline-offset-4">
              tap to browse
            </span>
          </p>
          <p className="font-body-sm text-body-sm text-[#c7c4d7] mt-0.5">
            Supports multi-version career profiles (up to 15MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Uploaded Resume Cards Stack */}
        <div className="mt-4 flex flex-col gap-2">
          {resumes.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#222a3d]/90 rounded-lg p-3 flex items-center justify-between shadow-sm hover:bg-[#31394d]/80 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg bg-[#2d3449] flex items-center justify-center shrink-0 ${
                    doc.isPrimary ? 'text-[#c0c1ff]' : 'text-[#89ceff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {doc.isPrimary ? 'picture_as_pdf' : 'description'}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-md text-label-md text-[#dae2fd] truncate max-w-[150px]">
                      {doc.fileName}
                    </span>
                    {doc.isPrimary ? (
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-[#00885d]/30 text-[#4edea3] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                        Primary
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPrimaryResume(doc.id)}
                        className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-[#060e20] text-[#c7c4d7] hover:text-[#c0c1ff]"
                      >
                        Set Primary
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-body-sm text-body-sm text-[#c7c4d7] mt-0.5">
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span className="text-[#4edea3] font-medium">Parsed {doc.parsedPercent}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                {doc.isPrimary ? (
                  <button
                    type="button"
                    title="Verified Parser"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#4edea3] hover:bg-[#171f33] transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      title="Reparse Document"
                      onClick={() => showToast(`Reparsed ${doc.fileName}`)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#c7c4d7] hover:text-[#89ceff] hover:bg-[#171f33] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">sync</span>
                    </button>
                    <button
                      type="button"
                      title="Remove Resume"
                      onClick={() => removeResume(doc.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#c7c4d7] hover:text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extracted Parsed Highlights Card (User Editable) */}
      <div className="bg-[#131b2e] rounded-xl p-4 shadow-sm mb-6 flex flex-col gap-4 border border-[#2d3449]/40">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#4edea3] text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#dae2fd]">Parsed Highlights</h2>
              <p className="font-body-sm text-body-sm text-[#c7c4d7]">
                Verified by JobPulse AI • Edit anytime
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetSkills}
            className="text-[#c0c1ff] font-label-md text-label-md hover:underline flex items-center gap-0.5"
          >
            <span>Reset</span>
          </button>
        </div>

        {/* Top Skills Pills */}
        <div>
          <label className="block font-label-md text-label-md text-[#c7c4d7] uppercase tracking-wider mb-2">
            Extracted Top Skills
          </label>
          <div className="flex flex-wrap gap-1.5 items-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#222a3d] text-[#dae2fd] font-label-md text-label-md hover:bg-[#2d3449] transition-colors"
              >
                {skill}
                <button
                  type="button"
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                  className="text-[#908fa0] hover:text-white leading-none ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}

            {isAddingSkill ? (
              <div className="inline-flex items-center gap-1 bg-[#222a3d] px-2 py-1 rounded-full">
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. AWS"
                  value={newSkillText}
                  onChange={(e) => setNewSkillText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSkillSubmit();
                    if (e.key === 'Escape') setIsAddingSkill(false);
                  }}
                  className="bg-transparent text-xs text-white outline-none w-20"
                />
                <button
                  type="button"
                  onClick={handleAddSkillSubmit}
                  className="text-[#4edea3] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingSkill(false)}
                  className="text-[#908fa0] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingSkill(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff] hover:bg-[#c0c1ff]/20 font-label-md text-label-md transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Experience Level Selector */}
        <div>
          <label className="block font-label-md text-label-md text-[#c7c4d7] uppercase tracking-wider mb-2">
            Experience Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Junior', label: 'Junior', sub: '1-2 yrs' },
              { id: 'Mid-Senior', label: 'Mid-Senior', sub: '5+ yrs' },
              { id: 'Lead / Exec', label: 'Lead / Exec', sub: '8+ yrs' },
            ].map((lvl) => {
              const active = experienceLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() =>
                    setExperienceLevel(lvl.id as 'Junior' | 'Mid-Senior' | 'Lead / Exec')
                  }
                  className={`py-2.5 px-2 rounded-lg font-label-md text-label-md text-center transition-all ${
                    active
                      ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-md shadow-[#8083ff]/20'
                      : 'bg-[#171f33] text-[#c7c4d7] hover:bg-[#222a3d]'
                  }`}
                >
                  {lvl.label}
                  <span className={`block text-[10px] ${active ? 'font-bold' : 'opacity-70'}`}>
                    {lvl.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desired Target Roles */}
        <div>
          <label className="block font-label-md text-label-md text-[#c7c4d7] uppercase tracking-wider mb-2">
            Desired Target Roles
          </label>
          <div className="flex flex-col gap-2">
            {targetRoles.map((role) => (
              <button
                key={role.title}
                type="button"
                onClick={() => toggleTargetRole(role.title)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[#dae2fd] transition-colors ${
                  role.selected ? 'bg-[#222a3d]' : 'bg-[#171f33] opacity-75'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[#89ceff] text-[18px]">
                    {role.icon}
                  </span>
                  <span className="font-label-lg text-label-lg truncate">{role.title}</span>
                </div>
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    role.selected ? 'text-[#4edea3]' : 'text-[#908fa0]'
                  }`}
                >
                  {role.selected ? 'check' : 'add'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Compensation & Remote Preference Inset */}
        <div className="grid grid-cols-1 gap-2 pt-1">
          {/* Minimum Base Salary input */}
          <div>
            <label className="block font-label-md text-label-md text-[#c7c4d7] uppercase tracking-wider mb-1.5">
              Minimum Base Salary
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#c0c1ff] font-headline-sm text-headline-sm pointer-events-none">
                $
              </span>
              <input
                type="text"
                value={minBaseSalary}
                onChange={(e) => setMinBaseSalary(e.target.value)}
                className="w-full bg-[#171f33] text-[#dae2fd] font-headline-sm text-headline-sm rounded-lg pl-8 pr-20 py-2.5 outline-none focus:bg-[#222a3d] border border-[#2d3449]/40 focus:border-[#8083ff] transition-colors"
              />
              <span className="absolute right-3 font-label-sm text-label-sm text-[#4edea3] px-1.5 py-0.5 rounded bg-[#4edea3]/10">
                Top 15%
              </span>
            </div>
          </div>

          {/* Remote Preference Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#171f33] mt-1 border border-[#2d3449]/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#222a3d] flex items-center justify-center text-[#c0c1ff]">
                <span className="material-symbols-outlined text-[20px]">home_work</span>
              </div>
              <div>
                <div className="font-label-lg text-label-lg text-[#dae2fd]">Remote only</div>
                <div className="font-body-sm text-body-sm text-[#c7c4d7]">
                  Prioritize 100% remote positions
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={filters.remoteOnly}
              onClick={() => {
                setRemoteOnly(!filters.remoteOnly);
                showToast(`Remote only: ${!filters.remoteOnly ? 'Enabled' : 'Disabled'}`);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                filters.remoteOnly ? 'bg-[#8083ff]' : 'bg-[#2d3449]'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  filters.remoteOnly
                    ? 'translate-x-5 bg-[#0d0096]'
                    : 'translate-x-0.5 bg-[#908fa0]'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Area */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('boards')}
          className="w-full h-12 bg-[#c0c1ff] text-[#1000a9] font-headline-sm text-headline-sm rounded-xl shadow-lg shadow-[#8083ff]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150 font-bold"
        >
          <span>Continue to Job Boards &amp; Filters</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('discover')}
          className="py-2 px-4 text-[#c7c4d7] hover:text-[#dae2fd] font-label-md text-label-md transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};
