export type TabType = 'discover' | 'pipeline' | 'boards' | 'profile';

export type PipelineStage = 'applied' | 'screening' | 'interviewing' | 'offer' | 'archived';

export interface DataPipeline {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  newToday: number;
  syncInfo: string;
  enabled: boolean;
  requiresAuth?: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  bannerImg: string;
  stageBadge: string;
  source: string;
  postedAgo: string;
  postedHours: number;
  matchScore: number;
  salaryMin: number;
  salaryMax: number;
  salaryText: string;
  equityText?: string;
  remote: boolean;
  location: string;
  matchedCompetencies: string[];
  niceToHaveCompetencies: string[];
  impactPoints: string[];
  fullDescription: string;
  companyStage: 'Seed' | 'Growth' | 'Scale-up' | 'Enterprise';
  companyHeadcount: string;
  externalUrl: string;
}

export interface ResumeDocument {
  id: string;
  fileName: string;
  fileSize: string;
  parsedPercent: number;
  isPrimary: boolean;
  uploadedAt: string;
}

export interface PipelineItem {
  id: string;
  jobId?: string;
  company: string;
  role: string;
  logo: string;
  stage: PipelineStage;
  stageLabel?: string;
  salary: string;
  appliedDate: string;
  location: string;
  notes?: string;
  notesCount?: number;
  resumeUsed: string;
  followUpDays?: number;
  interviewDetail?: {
    roundTitle: string;
    timeText: string;
    interviewers: string;
    meetingUrl?: string;
  };
  offerDetail?: {
    totalPackage: string;
    equity: string;
    signOn: string;
    expiresDays: number;
    expiresText: string;
    recruiter: string;
  };
  screeningDetail?: {
    taskName: string;
    statusText: string;
    progressPercent: number;
    submittedAgoText: string;
  };
  sourceReferral?: string;
}

export interface FilterState {
  keywordWhitelist: string[];
  negativeDealbreakers: string[];
  salaryMin: number;
  salaryMax: number;
  companyStages: ('Seed' | 'Growth' | 'Scale-up' | 'Enterprise')[];
  maxAgeDays: number;
  remoteOnly: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  isUnread: boolean;
  type: 'sync' | 'offer' | 'interview' | 'pipeline';
}
