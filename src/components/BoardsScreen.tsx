import React, { useState } from 'react';
import { useJobPulse } from '../context/JobPulseContext';

export const BoardsScreen: React.FC = () => {
  const {
    dataPipelines,
    togglePipeline,
    addCustomPipeline,
    filters,
    addWhitelistTag,
    removeWhitelistTag,
    addBlacklistTag,
    removeBlacklistTag,
    setSalaryRange,
    toggleCompanyStage,
    setMaxAgeDays,
    matchingJobs,
    setActiveTab,
    showToast,
  } = useJobPulse();

  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [isAddingKeyword, setIsAddingKeyword] = useState(false);

  const [newDealbreakerInput, setNewDealbreakerInput] = useState('');
  const [isAddingDealbreaker, setIsAddingDealbreaker] = useState(false);

  const activeSourcesCount = dataPipelines.filter((p) => p.enabled).length;

  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    addCustomPipeline(customName.trim(), customUrl.trim());
    setCustomName('');
    setCustomUrl('');
    setCustomModalOpen(false);
  };

  const handleAddKeywordSubmit = () => {
    if (newKeywordInput.trim()) {
      addWhitelistTag(newKeywordInput.trim());
      setNewKeywordInput('');
      setIsAddingKeyword(false);
      showToast(`Added keyword: ${newKeywordInput.trim()}`);
    }
  };

  const handleAddDealbreakerSubmit = () => {
    if (newDealbreakerInput.trim()) {
      addBlacklistTag(newDealbreakerInput.trim());
      setNewDealbreakerInput('');
      setIsAddingDealbreaker(false);
      showToast(`Added dealbreaker: ${newDealbreakerInput.trim()}`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 max-w-lg mx-auto">
      {/* Top Banner & Heading */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00885d]/20 text-[#4edea3] font-label-sm text-label-sm shadow-sm backdrop-blur-md">
            <span
              className="material-symbols-outlined text-[14px] text-[#4edea3] animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            0ms Client-Side Processing
          </span>
          <span className="inline-flex items-center gap-1 text-[#c7c4d7] font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            Memory Cache: 1.4 MB
          </span>
        </div>

        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-[#dae2fd] tracking-tight mt-1">
          Connected Sources &amp; Instant Local Filters
        </h1>
        <p className="font-body-sm text-body-sm text-[#c7c4d7]">
          High-throughput local ingestion engine filters thousands of postings in-memory on your device without server latency.
        </p>
      </div>

      {/* Section 1: Data Pipelines */}
      <section className="mt-2 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#89ceff] text-[20px]">hub</span>
            <h2 className="font-headline-sm text-headline-sm text-[#dae2fd]">Data Pipelines</h2>
          </div>
          <span className="font-label-sm text-label-sm text-[#89ceff] bg-[#222a3d] px-2 py-0.5 rounded-full">
            {activeSourcesCount} Active Sources
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {dataPipelines.map((pipe) => (
            <div
              key={pipe.id}
              className={`rounded-xl p-3.5 shadow-md flex items-center justify-between transition-colors ${
                pipe.enabled ? 'bg-[#171f33]' : 'bg-[#131b2e] opacity-85'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg bg-[#2d3449] flex items-center justify-center shrink-0 shadow-inner ${
                    pipe.enabled ? pipe.iconColor : 'text-[#908fa0]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{pipe.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg text-[#dae2fd] truncate">
                      {pipe.name}
                    </span>
                    {pipe.enabled && (
                      <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.6)]"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#c7c4d7] font-body-sm text-body-sm truncate">
                    {pipe.newToday > 0 ? (
                      <>
                        <span className="text-[#4edea3] font-label-sm text-label-sm">
                          {pipe.newToday} new today
                        </span>
                        <span>•</span>
                        <span className="truncate">{pipe.syncInfo}</span>
                      </>
                    ) : (
                      <span className="text-[#908fa0] font-body-sm text-body-sm truncate">
                        {pipe.syncInfo}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={pipe.enabled}
                onClick={() => {
                  togglePipeline(pipe.id);
                  showToast(
                    `${pipe.name} ${pipe.enabled ? 'disabled' : 'enabled for in-memory sync'}`
                  );
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none ${
                  pipe.enabled ? 'bg-[#c0c1ff]' : 'bg-[#2d3449]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full shadow-sm transform transition-transform mt-0.5 ml-0.5 ${
                    pipe.enabled
                      ? 'translate-x-5 bg-[#1000a9]'
                      : 'translate-x-0.5 bg-[#908fa0]'
                  }`}
                ></span>
              </button>
            </div>
          ))}

          {/* Add custom feed button */}
          <button
            type="button"
            onClick={() => setCustomModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-[#222a3d]/60 hover:bg-[#222a3d] text-[#c0c1ff] font-label-md text-label-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Custom RSS / Greenhouse feeds
          </button>
        </div>
      </section>

      <div className="mx-4 my-4 h-px bg-[#2d3449]/40"></div>

      {/* Section 2: Local Fast-Filter Rules */}
      <section className="px-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">tune</span>
            <h2 className="font-headline-sm text-headline-sm text-[#dae2fd]">
              Local Fast-Filter Rules
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-[#c0c1ff] bg-[#8083ff]/20 px-2 py-0.5 rounded-full">
            Instant Eval
          </span>
        </div>

        {/* 1. Keyword Whitelist */}
        <div className="bg-[#171f33] rounded-xl p-4 shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                check_circle
              </span>
              <span className="font-label-md text-label-md text-[#dae2fd]">Keyword Whitelist</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#c7c4d7]">Must Match Any</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 items-center">
            {filters.keywordWhitelist.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00885d]/25 text-[#4edea3] font-label-md text-label-md"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  aria-label={`Remove tag ${tag}`}
                  onClick={() => removeWhitelistTag(tag)}
                  className="ml-0.5 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}

            {isAddingKeyword ? (
              <div className="inline-flex items-center gap-1 bg-[#222a3d] px-2 py-1 rounded-full">
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Next.js"
                  value={newKeywordInput}
                  onChange={(e) => setNewKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddKeywordSubmit();
                    if (e.key === 'Escape') setIsAddingKeyword(false);
                  }}
                  className="bg-transparent text-xs text-white outline-none w-20"
                />
                <button
                  type="button"
                  onClick={handleAddKeywordSubmit}
                  className="text-[#4edea3] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingKeyword(false)}
                  className="text-[#908fa0] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingKeyword(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#222a3d] text-[#c7c4d7] font-label-md text-label-md hover:bg-[#2d3449] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Add
              </button>
            )}
          </div>
        </div>

        {/* 2. Negative Dealbreakers */}
        <div className="bg-[#171f33] rounded-xl p-4 shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">block</span>
              <span className="font-label-md text-label-md text-[#dae2fd]">
                Negative Dealbreakers
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-[#ffb4ab]/90 bg-[#93000a]/20 px-2 py-0.5 rounded-full">
              Auto-Drop
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 items-center">
            {filters.negativeDealbreakers.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#93000a]/25 text-[#ffb4ab] font-label-md text-label-md"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  aria-label={`Remove dealbreaker ${tag}`}
                  onClick={() => removeBlacklistTag(tag)}
                  className="ml-0.5 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}

            {isAddingDealbreaker ? (
              <div className="inline-flex items-center gap-1 bg-[#222a3d] px-2 py-1 rounded-full">
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. On-call 24/7"
                  value={newDealbreakerInput}
                  onChange={(e) => setNewDealbreakerInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddDealbreakerSubmit();
                    if (e.key === 'Escape') setIsAddingDealbreaker(false);
                  }}
                  className="bg-transparent text-xs text-white outline-none w-24"
                />
                <button
                  type="button"
                  onClick={handleAddDealbreakerSubmit}
                  className="text-[#ffb4ab] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingDealbreaker(false)}
                  className="text-[#908fa0] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingDealbreaker(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#222a3d] text-[#c7c4d7] font-label-md text-label-md hover:bg-[#2d3449] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Block
              </button>
            )}
          </div>
        </div>

        {/* 3. Base Salary Corridor */}
        <div className="bg-[#171f33] rounded-xl p-4 shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#89ceff] text-[18px]">payments</span>
              <span className="font-label-md text-label-md text-[#dae2fd]">
                Base Salary Corridor
              </span>
            </div>
            <span
              className="font-label-md text-label-md text-[#89ceff] bg-[#222a3d] px-2.5 py-1 rounded-full"
              id="salary-label"
            >
              ${Math.round(filters.salaryMin / 1000)}k - ${Math.round(filters.salaryMax / 1000)}k
            </span>
          </div>

          <div className="py-2">
            <div className="relative w-full h-2 bg-[#2d3449] rounded-full flex items-center">
              <div
                className="absolute h-full bg-gradient-to-r from-[#89ceff] to-[#c0c1ff] rounded-full"
                style={{
                  left: `${((filters.salaryMin - 80000) / (250000 - 80000)) * 100}%`,
                  right: `${100 - ((filters.salaryMax - 80000) / (250000 - 80000)) * 100}%`,
                }}
              ></div>

              {/* Min Handle */}
              <input
                type="range"
                min="80000"
                max="250000"
                step="5000"
                value={filters.salaryMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= filters.salaryMax - 10000) {
                    setSalaryRange(val, filters.salaryMax);
                  }
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />

              <div
                className="absolute -translate-x-1/2 w-5 h-5 bg-[#004c6e] rounded-full shadow-lg flex items-center justify-center cursor-pointer pointer-events-none"
                style={{
                  left: `${((filters.salaryMin - 80000) / (250000 - 80000)) * 100}%`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-[#89ceff]"></div>
              </div>

              {/* Max Handle */}
              <div
                className="absolute translate-x-1/2 w-5 h-5 bg-[#2f2ebe] rounded-full shadow-lg flex items-center justify-center cursor-pointer pointer-events-none"
                style={{
                  left: `${((filters.salaryMax - 80000) / (250000 - 80000)) * 100}%`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-[#c0c1ff]"></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[#908fa0] font-label-sm text-label-sm mt-3 px-1">
              <span>$80k</span>
              <span>$150k</span>
              <span>$250k+</span>
            </div>
          </div>
        </div>

        {/* 4. Company Stage & Headcount */}
        <div className="bg-[#171f33] rounded-xl p-4 shadow-md flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">apartment</span>
            <span className="font-label-md text-label-md text-[#dae2fd]">
              Company Stage &amp; Headcount
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {(
              [
                { stage: 'Seed', label: 'Seed (1-10)' },
                { stage: 'Growth', label: 'Growth (11-50)' },
                { stage: 'Scale-up', label: 'Scale-up (51-250)' },
                { stage: 'Enterprise', label: 'Enterprise (250+)' },
              ] as const
            ).map((item) => {
              const isSelected = filters.companyStages.includes(item.stage);
              return (
                <button
                  key={item.stage}
                  type="button"
                  onClick={() => toggleCompanyStage(item.stage)}
                  className={`flex items-center justify-between p-2.5 rounded-lg font-label-sm text-label-sm active:scale-[0.98] transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#8083ff] text-[#0d0096]'
                      : 'bg-[#222a3d] text-[#c7c4d7] hover:text-[#dae2fd]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isSelected ? 'text-[#0d0096]' : 'text-[#908fa0]'
                    }`}
                  >
                    {isSelected ? 'check_circle' : 'add'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Max Age of Posting */}
        <div className="bg-[#171f33] rounded-xl p-4 shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#89ceff] text-[18px]">history</span>
              <span className="font-label-md text-label-md text-[#dae2fd]">
                Max Age of Posting
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-[#4edea3] bg-[#00885d]/20 px-2 py-0.5 rounded-full">
              Fresh only
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {[
              { days: 1, label: '24h' },
              { days: 3, label: '3 days' },
              { days: 7, label: '< 7 days' },
              { days: 14, label: '14 days' },
            ].map((item) => {
              const isSelected = filters.maxAgeDays === item.days;
              return (
                <button
                  key={item.days}
                  type="button"
                  onClick={() => setMaxAgeDays(item.days)}
                  className={`py-2 text-center rounded-lg font-label-sm text-label-sm transition-colors ${
                    isSelected
                      ? 'bg-[#8083ff] text-[#0d0096] shadow-sm font-bold'
                      : 'bg-[#222a3d] text-[#c7c4d7] hover:text-[#dae2fd]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Launch Swipe Deck CTA Bar */}
      <div className="mt-6 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#131b2e] text-[#4edea3] text-center shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping"></span>
          <span className="font-label-md text-label-md font-semibold">
            {matchingJobs.length} matching jobs loaded into local cache
          </span>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('discover')}
          className="w-full h-12 rounded-xl bg-[#c0c1ff] text-[#1000a9] font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.35)] active:scale-[0.98] transition-transform font-bold"
        >
          <span>Launch Swipe Deck ({matchingJobs.length} Jobs)</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>

      {/* Custom RSS Modal */}
      {customModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#171f33] border border-[#2d3449] rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#2d3449]">
              <h3 className="font-headline-sm text-[#dae2fd]">Add Custom Source Feed</h3>
              <button
                type="button"
                onClick={() => setCustomModalOpen(false)}
                className="text-[#c7c4d7] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddFeed} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-[#c7c4d7] mb-1 block">Feed Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greenhouse (Linear), Lever (Stripe)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-[#131b2e] border border-[#2d3449] rounded-lg px-3 py-2 text-sm text-[#dae2fd] focus:outline-none focus:border-[#8083ff]"
                />
              </div>
              <div>
                <label className="text-xs text-[#c7c4d7] mb-1 block">RSS / JSON Endpoint URL</label>
                <input
                  type="url"
                  placeholder="https://api.greenhouse.io/v1/boards/..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-[#131b2e] border border-[#2d3449] rounded-lg px-3 py-2 text-sm text-[#dae2fd] focus:outline-none focus:border-[#8083ff]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(false)}
                  className="px-3 py-2 text-sm text-[#c7c4d7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c0c1ff] text-[#1000a9] rounded-lg text-sm font-semibold active:scale-95"
                >
                  Connect Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
