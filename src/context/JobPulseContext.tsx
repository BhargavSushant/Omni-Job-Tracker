import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_DATA_PIPELINES,
  INITIAL_FILTERS,
  INITIAL_JOBS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PIPELINE,
  INITIAL_RESUMES,
  INITIAL_SKILLS,
  INITIAL_TARGET_ROLES,
} from '../data/mockData';
import {
  DataPipeline,
  FilterState,
  JobListing,
  NotificationItem,
  PipelineItem,
  PipelineStage,
  ResumeDocument,
  TabType,
} from '../types';

interface SwipeAction {
  job: JobListing;
  action: 'pass' | 'apply' | 'save';
  previousDeckIndex: number;
}

interface HandoffJobData {
  jobId: string;
  title: string;
  company: string;
  companyLogo: string;
  salaryText: string;
  location: string;
  source: string;
  defaultResume: string;
}

interface JobPulseContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // Pipeline sources
  dataPipelines: DataPipeline[];
  togglePipeline: (id: string) => void;
  addCustomPipeline: (name: string, url: string) => void;

  // Filters
  filters: FilterState;
  addWhitelistTag: (tag: string) => void;
  removeWhitelistTag: (tag: string) => void;
  addBlacklistTag: (tag: string) => void;
  removeBlacklistTag: (tag: string) => void;
  setSalaryRange: (min: number, max: number) => void;
  toggleCompanyStage: (stage: 'Seed' | 'Growth' | 'Scale-up' | 'Enterprise') => void;
  setMaxAgeDays: (days: number) => void;
  setRemoteOnly: (remote: boolean) => void;
  resetFilters: () => void;

  // Resumes & Highlights
  resumes: ResumeDocument[];
  addResume: (file: File) => void;
  removeResume: (id: string) => void;
  setPrimaryResume: (id: string) => void;
  skills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  resetSkills: () => void;
  experienceLevel: 'Junior' | 'Mid-Senior' | 'Lead / Exec';
  setExperienceLevel: (lvl: 'Junior' | 'Mid-Senior' | 'Lead / Exec') => void;
  targetRoles: { title: string; selected: boolean; icon: string }[];
  toggleTargetRole: (title: string) => void;
  minBaseSalary: string;
  setMinBaseSalary: (val: string) => void;

  // Jobs Deck
  allJobs: JobListing[];
  matchingJobs: JobListing[];
  deckIndex: number;
  currentJob: JobListing | null;
  reviewedToday: number;
  shortlistedToday: number;
  remainingCount: number;
  swipeJob: (direction: 'left' | 'right' | 'star') => void;
  rewindLastSwipe: () => void;
  canRewind: boolean;

  // Pipeline Tracker
  pipelineItems: PipelineItem[];
  pipelineStageFilter: 'all' | PipelineStage;
  setPipelineStageFilter: (stage: 'all' | PipelineStage) => void;
  movePipelineStage: (id: string, newStage: PipelineStage) => void;
  addPipelineItem: (item: Omit<PipelineItem, 'id' | 'appliedDate'>) => void;

  // Handoff Return Modal
  handoffModalOpen: boolean;
  handoffData: HandoffJobData | null;
  openHandoffModal: (job: JobListing) => void;
  closeHandoffModal: () => void;

  // Job Details Modal
  viewingJob: JobListing | null;
  openJobDetails: (job: JobListing) => void;
  closeJobDetails: () => void;

  // Notifications
  notifications: NotificationItem[];
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const JobPulseContext = createContext<JobPulseContextType | undefined>(undefined);

export const JobPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('discover');

  // Load from localStorage if present
  const [dataPipelines, setDataPipelines] = useState<DataPipeline[]>(() => {
    const saved = localStorage.getItem('jobpulse_pipelines');
    return saved ? JSON.parse(saved) : INITIAL_DATA_PIPELINES;
  });

  const [filters, setFilters] = useState<FilterState>(() => {
    const saved = localStorage.getItem('jobpulse_filters');
    return saved ? JSON.parse(saved) : INITIAL_FILTERS;
  });

  const [resumes, setResumes] = useState<ResumeDocument[]>(() => {
    const saved = localStorage.getItem('jobpulse_resumes');
    return saved ? JSON.parse(saved) : INITIAL_RESUMES;
  });

  const [skills, setSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('jobpulse_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [experienceLevel, setExperienceLevel] = useState<'Junior' | 'Mid-Senior' | 'Lead / Exec'>('Mid-Senior');
  const [targetRoles, setTargetRoles] = useState(INITIAL_TARGET_ROLES);
  const [minBaseSalary, setMinBaseSalary] = useState('$145,000 / yr');

  const [allJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [deckIndex, setDeckIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<SwipeAction[]>([]);
  const [reviewedToday, setReviewedToday] = useState(24);
  const [shortlistedToday, setShortlistedToday] = useState(8);

  const [pipelineItems, setPipelineItems] = useState<PipelineItem[]>(() => {
    const saved = localStorage.getItem('jobpulse_pipeline');
    return saved ? JSON.parse(saved) : INITIAL_PIPELINE;
  });

  const [pipelineStageFilter, setPipelineStageFilter] = useState<'all' | PipelineStage>('all');

  const [handoffModalOpen, setHandoffModalOpen] = useState(false);
  const [handoffData, setHandoffData] = useState<HandoffJobData | null>(null);

  const [viewingJob, setViewingJob] = useState<JobListing | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('jobpulse_pipelines', JSON.stringify(dataPipelines));
  }, [dataPipelines]);

  useEffect(() => {
    localStorage.setItem('jobpulse_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('jobpulse_resumes', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem('jobpulse_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('jobpulse_pipeline', JSON.stringify(pipelineItems));
  }, [pipelineItems]);

  // Fast In-Memory Local Filter Evaluator (0ms client processing)
  const matchingJobs = useMemo(() => {
    const enabledSources = new Set(
      dataPipelines.filter((p) => p.enabled).map((p) => p.name.toLowerCase())
    );

    return allJobs.filter((job) => {
      // 1. Source check
      const jobSourceLower = job.source.toLowerCase();
      const matchesSource =
        enabledSources.has(jobSourceLower) ||
        (jobSourceLower.includes('linkedin') && enabledSources.has('linkedin jobs')) ||
        (jobSourceLower.includes('wellfound') && enabledSources.has('wellfound / angellist')) ||
        (jobSourceLower.includes('remoteok') && enabledSources.has('remoteok'));

      if (!matchesSource && dataPipelines.some((p) => p.enabled)) {
        // If all enabled sources don't match, drop
        return false;
      }

      // 2. Remote check
      if (filters.remoteOnly && !job.remote) {
        return false;
      }

      // 3. Salary corridor check: allow job if salary max is >= user minimum corridor
      if (job.salaryMax < filters.salaryMin) {
        return false;
      }

      // 4. Negative dealbreakers check (Auto-Drop if any negative dealbreaker in job text)
      const jobCombinedText = `${job.title} ${job.fullDescription} ${job.impactPoints.join(' ')}`.toLowerCase();
      for (const dealbreaker of filters.negativeDealbreakers) {
        if (dealbreaker.toLowerCase() === 'junior' && job.title.toLowerCase().includes('junior')) {
          return false;
        }
        if (dealbreaker.toLowerCase().includes('clearance') && jobCombinedText.includes('clearance')) {
          return false;
        }
        if (dealbreaker.toLowerCase().includes('unpaid') && jobCombinedText.includes('unpaid')) {
          return false;
        }
        if (dealbreaker.toLowerCase().includes('onsite 5 days') && !job.remote) {
          return false;
        }
      }

      // 5. Whitelist keywords match any
      if (filters.keywordWhitelist.length > 0) {
        const hasKeywordMatch = filters.keywordWhitelist.some((kw) => {
          const kwLow = kw.toLowerCase();
          return (
            jobCombinedText.includes(kwLow) ||
            job.matchedCompetencies.some((c) => c.toLowerCase().includes(kwLow))
          );
        });
        if (!hasKeywordMatch) {
          // If none match
          return false;
        }
      }

      // 6. Max age
      const maxAgeHours = filters.maxAgeDays * 24;
      if (job.postedHours > maxAgeHours) {
        return false;
      }

      return true;
    });
  }, [allJobs, dataPipelines, filters]);

  // Current Card in deck
  const currentJob = useMemo(() => {
    if (matchingJobs.length === 0) return null;
    const safeIndex = deckIndex % matchingJobs.length;
    return matchingJobs[safeIndex];
  }, [matchingJobs, deckIndex]);

  const remainingCount = Math.max(0, 184 - reviewedToday);

  // Toggle Pipeline
  const togglePipeline = (id: string) => {
    setDataPipelines((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const addCustomPipeline = (name: string, _url: string) => {
    const newPipe: DataPipeline = {
      id: `custom-${Date.now()}`,
      name,
      icon: 'rss_feed',
      iconColor: 'text-primary',
      newToday: Math.floor(Math.random() * 15) + 5,
      syncInfo: 'just connected',
      enabled: true,
    };
    setDataPipelines((prev) => [...prev, newPipe]);
    showToast(`Connected feed: ${name}`);
  };

  // Filter modifiers
  const addWhitelistTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || filters.keywordWhitelist.includes(clean)) return;
    setFilters((prev) => ({
      ...prev,
      keywordWhitelist: [...prev.keywordWhitelist, clean],
    }));
  };

  const removeWhitelistTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      keywordWhitelist: prev.keywordWhitelist.filter((t) => t !== tag),
    }));
  };

  const addBlacklistTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || filters.negativeDealbreakers.includes(clean)) return;
    setFilters((prev) => ({
      ...prev,
      negativeDealbreakers: [...prev.negativeDealbreakers, clean],
    }));
  };

  const removeBlacklistTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      negativeDealbreakers: prev.negativeDealbreakers.filter((t) => t !== tag),
    }));
  };

  const setSalaryRange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, salaryMin: min, salaryMax: max }));
  };

  const toggleCompanyStage = (stage: 'Seed' | 'Growth' | 'Scale-up' | 'Enterprise') => {
    setFilters((prev) => {
      const exists = prev.companyStages.includes(stage);
      const updated = exists
        ? prev.companyStages.filter((s) => s !== stage)
        : [...prev.companyStages, stage];
      return { ...prev, companyStages: updated.length ? updated : [stage] };
    });
  };

  const setMaxAgeDays = (days: number) => {
    setFilters((prev) => ({ ...prev, maxAgeDays: days }));
  };

  const setRemoteOnly = (remote: boolean) => {
    setFilters((prev) => ({ ...prev, remoteOnly: remote }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast('Filters reset to default');
  };

  // Resumes
  const addResume = (file: File) => {
    const newDoc: ResumeDocument = {
      id: `res-${Date.now()}`,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      parsedPercent: Math.floor(Math.random() * 8) + 92,
      isPrimary: false,
      uploadedAt: 'Just now',
    };
    setResumes((prev) => [...prev, newDoc]);
    showToast(`Uploaded & parsed ${file.name}`);
  };

  const removeResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    showToast('Resume removed');
  };

  const setPrimaryResume = (id: string) => {
    setResumes((prev) =>
      prev.map((r) => ({ ...r, isPrimary: r.id === id }))
    );
    showToast('Primary resume updated');
  };

  const addSkill = (skill: string) => {
    const clean = skill.trim();
    if (!clean || skills.includes(clean)) return;
    setSkills((prev) => [...prev, clean]);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const resetSkills = () => {
    setSkills(INITIAL_SKILLS);
    showToast('Highlights reset to initial AI parse');
  };

  const toggleTargetRole = (title: string) => {
    setTargetRoles((prev) =>
      prev.map((r) => (r.title === title ? { ...r, selected: !r.selected } : r))
    );
  };

  // Swipe logic
  const swipeJob = (direction: 'left' | 'right' | 'star') => {
    if (!currentJob) return;

    const action = direction === 'left' ? 'pass' : direction === 'right' ? 'apply' : 'save';

    setSwipeHistory((prev) => [
      ...prev,
      { job: currentJob, action, previousDeckIndex: deckIndex },
    ]);

    setReviewedToday((prev) => prev + 1);

    if (direction === 'right') {
      setShortlistedToday((prev) => prev + 1);
      // Trigger Handoff Return Sync modal to record application outcome!
      openHandoffModal(currentJob);
    } else if (direction === 'star') {
      setShortlistedToday((prev) => prev + 1);
      showToast(`Saved ${currentJob.company} to pipeline drafts`);
    }

    setDeckIndex((prev) => prev + 1);
  };

  const rewindLastSwipe = () => {
    if (swipeHistory.length === 0) return;
    const last = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory((prev) => prev.slice(0, -1));
    setDeckIndex(last.previousDeckIndex);
    setReviewedToday((prev) => Math.max(0, prev - 1));
    if (last.action === 'apply' || last.action === 'save') {
      setShortlistedToday((prev) => Math.max(0, prev - 1));
    }
    showToast(`Rewound: ${last.job.company}`);
  };

  const canRewind = swipeHistory.length > 0;

  // Pipeline methods
  const movePipelineStage = (id: string, newStage: PipelineStage) => {
    setPipelineItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
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
            }
          : item
      )
    );
    showToast(`Moved application to ${newStage.toUpperCase()}`);
  };

  const addPipelineItem = (item: Omit<PipelineItem, 'id' | 'appliedDate'>) => {
    const newItem: PipelineItem = {
      ...item,
      id: `pipe-${Date.now()}`,
      appliedDate: 'Applied Today',
    };
    setPipelineItems((prev) => [newItem, ...prev]);
    showToast(`Tracked application for ${item.company}`);
  };

  // Handoff modal handlers
  const openHandoffModal = (job: JobListing) => {
    const primaryRes = resumes.find((r) => r.isPrimary)?.fileName || 'Frontend_Lead_2025.pdf';
    setHandoffData({
      jobId: job.id,
      title: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      salaryText: `${job.salaryText} • ${job.location}`,
      location: job.location,
      source: job.source,
      defaultResume: primaryRes,
    });
    setHandoffModalOpen(true);
  };

  const closeHandoffModal = () => {
    setHandoffModalOpen(false);
    setHandoffData(null);
  };

  // Job Details Modal
  const openJobDetails = (job: JobListing) => {
    setViewingJob(job);
  };

  const closeJobDetails = () => {
    setViewingJob(null);
  };

  // Notifications
  const unreadNotificationsCount = notifications.filter((n) => n.isUnread).length;
  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <JobPulseContext.Provider
      value={{
        activeTab,
        setActiveTab,
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
        setRemoteOnly,
        resetFilters,
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
        allJobs,
        matchingJobs,
        deckIndex,
        currentJob,
        reviewedToday,
        shortlistedToday,
        remainingCount,
        swipeJob,
        rewindLastSwipe,
        canRewind,
        pipelineItems,
        pipelineStageFilter,
        setPipelineStageFilter,
        movePipelineStage,
        addPipelineItem,
        handoffModalOpen,
        handoffData,
        openHandoffModal,
        closeHandoffModal,
        viewingJob,
        openJobDetails,
        closeJobDetails,
        notifications,
        notificationsOpen,
        setNotificationsOpen,
        unreadNotificationsCount,
        markNotificationsAsRead,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </JobPulseContext.Provider>
  );
};

export const useJobPulse = () => {
  const context = useContext(JobPulseContext);
  if (!context) {
    throw new Error('useJobPulse must be used within a JobPulseProvider');
  }
  return context;
};
