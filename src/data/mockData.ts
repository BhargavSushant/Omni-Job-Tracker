import {
  DataPipeline,
  FilterState,
  JobListing,
  NotificationItem,
  PipelineItem,
  ResumeDocument,
} from '../types';

export const APP_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCUii1qYqF_5ZVwLxRbGEYgNboy7iSYNE2torDJYajZxWoU4nJodpf-J-YHeGgs-mOFUc46Xp0ucdzyFWKc2aSh7Eh4KPHIeYTLoxkYva9mYTmvStFzzpYS35N90dls1EMvtRNO76u3t5DPHIlDGgn4y8Alcbwc8SHNvtNh94uBOzcVfL9wWl9MFTTJz7PGkHMc34UwNT87LNkeGKIEfCPAdKPFK_tpmGTNJJ-RRV-JFUyXLVvOIlsT';

export const PROFILE_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCgvzlBin585SsvKDWMFEL6MrbVC620DKYtniYERfWPx4Qwz5qFwXi4nbuosPj8j10YucjAgk1sVnR3uWz_wpqBWQBUV1-aetCO4V5HZI3q02Pxc-V8IaRqK0HPpVRHHJxfxymoGtJv44t1qf_j3JO1ne-fcnKMBee90Ldb_d5YZeNfJI9ySAuLQcHUuu3Rdq0jT7lPMg8aHgAv9YAMaYQbgNwVc9KhEpp-TMx2vBzPmO76O-naPNOS';

export const CARD_BANNER_DEFAULT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ5ebPp1b-SpAqPqNRS5cocCwMqd5cgq6L_H2d_zBzChOdrXxuLKmJip607MAEK7u3mEYNMJ81stE8Fg32loZ-1X-2KzgY_jGIsJIelFu7vS3f6UQZK_qUDafTXA0JfPO8C149LTD4BsgAGySqeiYsGZqff8ljwUeOymCLvipt6XYHxgi_EClnDI9kADR2PFjkXUTgNDYLSWFEtGesXZAIt94h5XUxogCzgR4PAImS5De3lSa1Xlkd';

export const LOGO_PULSECLOUD =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-eDS86qcrEzdRRqdxKc96Fq59Y2IMW3UYzDRSealeCkSa-IhT-02M2qtkIrDHMw6sUXnYawsm7m7xAqsgoYio2L77kXboNdAHAvdkPV5Swc4183R2OqQa5KfTqRE5jEs-fRGbZ9UpShnkTCR1kebt5D8d1SsSTbWeA4U37CislSizMF3nkEMoFQlQZvMloG4GLCyzlvscWv2oF9oV9Q75REc-V1hCPZ4dhH3QSBkdk02aEWubdUA';

export const LOGO_FINTECHX =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkQOhfk6RBU9XO48uC-RV7gdTqfOdX45IdO35Z7F8zP86ft84mIjYrfXGPn4LVcorBrRQQ3p3praHCWhu50ueIjBU9ez9SpvMsPU7ZoFIpQLh8WGDvoKFKOZgs7h2KxndHIOh1iQjWKCHWjo0PTQOqidl6nX85uBBqDhlDrmqaL3NallxufBv3_exYnGZh1UlWnJSx-6yF4Y0LbmPco10mtFAxBM6GzRQt2ly_oeu1Ou1OtKLl_kap';

export const LOGO_FIGMA =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBRNLSYakndASK7kZhnrMQpADm00dTeNVs1RX1zYpQ5Q8U_dyJcRj-3c_7lcpgzayOs2GK0JNZz3DqYAv-0UnyXR5-K6fj_X9ygQhXMg1LZbP14RfNwRP1PgwNHHh2_CY3UCFH3fsfA4Zc2_LtSDoOOatWQKf-1cYJtOggGT2AftMYzqtBLbFHLRzimR-E_vF-5BUuZXEExatY02MEoXYE-n9BLDOBSQmGYv8Nt1kp6O0kmIJs4yzwF';

export const LOGO_VERCEL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAiC3Ms4ziJzV8570rBNhVEpGP5-tOBv76NbBonPw4CqhnfwJwAWBOjg3EsGmM-uW5Z0F1-9THH99UAe07xuegW8aKl9hRdXHVD40uTowa0iQV8rqDoStXtTEFs3Mgl8S3rc8XfS6OCYsl3kPxdOlNbHy6zKYPn84ec_MCt0mfX8xM-57QCh4dGBtrcKowj8GpbWu8QVu-c9vCkzjHkMXWyjKC243b-qaIIRwxgveWxrMsi-MNsBfrV';

export const LOGO_NOTION =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCjSsGX8xgQed4mrZfpPlPzQoyTSxCtod6KtUZdjV47zZr0aMQ5QOIVQQZ8UOlvqbcgERodD_0CATR-czFMg5q1sPmEHvoAkCrjoZ6WngUdE3BLRlBpwTI95HQOaG2PZc5hW-vBDtJXH-Ixn_w7Q_oEl22pnbbzgC5XtTk6L-PqQeniMZ5jwaQ2ISevnnFi5ERwjCQ0OHP3uD-H51C0oqquXvZZr0929Xhpv5-v3oRyi9dCMrIqtuUo';

export const LOGO_LINEAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQeE6X8qjALmrBJOwziwBx3yuygDU3ckREa8HaUcckseMM3ySG2PxMFQydZWiSn4xi97yEGC2NvZ1QpHHqhmefhrCaxI_89mewcwn0kcd_33qiYE9XjL7J01CBvGM4XdkpCJDyxVKCpE5mLEE2feNSBDo1WDtVSgh5tva59ZKIIzqfwfaO3stgWOgYpzX8OBFuqyLkSDqkDx2c3qQamw1Cbju4OgsPSTl-RLqYkei8GauCeRyKngDo';

export const INITIAL_DATA_PIPELINES: DataPipeline[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn Jobs',
    icon: 'work',
    iconColor: 'text-primary',
    newToday: 42,
    syncInfo: 'synced 12m ago',
    enabled: true,
  },
  {
    id: 'wellfound',
    name: 'Wellfound / AngelList',
    icon: 'rocket_launch',
    iconColor: 'text-secondary',
    newToday: 18,
    syncInfo: 'synced 1h ago',
    enabled: true,
  },
  {
    id: 'remoteok',
    name: 'RemoteOK',
    icon: 'public',
    iconColor: 'text-tertiary',
    newToday: 29,
    syncInfo: 'realtime stream',
    enabled: true,
  },
  {
    id: 'indeed',
    name: 'Indeed Jobs',
    icon: 'badge',
    iconColor: 'text-outline',
    newToday: 0,
    syncInfo: 'Connect account to enable',
    enabled: false,
    requiresAuth: true,
  },
];

export const INITIAL_FILTERS: FilterState = {
  keywordWhitelist: ['React', 'Design Systems', 'TypeScript', 'Founding'],
  negativeDealbreakers: ['Clearance required', 'Unpaid', 'Onsite 5 days', 'Junior'],
  salaryMin: 140000,
  salaryMax: 210000,
  companyStages: ['Growth', 'Scale-up'],
  maxAgeDays: 7,
  remoteOnly: true,
};

export const INITIAL_RESUMES: ResumeDocument[] = [
  {
    id: 'res-1',
    fileName: 'Frontend_Lead_2025.pdf',
    fileSize: '4.2 MB',
    parsedPercent: 98,
    isPrimary: true,
    uploadedAt: 'Today, 10:14 AM',
  },
  {
    id: 'res-2',
    fileName: 'Fullstack_General_v3.pdf',
    fileSize: '2.8 MB',
    parsedPercent: 92,
    isPrimary: false,
    uploadedAt: 'Yesterday, 3:40 PM',
  },
];

export const INITIAL_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'Tailwind CSS',
  'Next.js',
  'System Design',
];

export const INITIAL_TARGET_ROLES = [
  { title: 'Senior Frontend Engineer', selected: true, icon: 'business_center' },
  { title: 'Fullstack Tech Lead', selected: true, icon: 'terminal' },
  { title: 'Design Technologist / UI Architect', selected: false, icon: 'palette' },
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-pulsecloud',
    title: 'Senior Staff UI Engineer',
    company: 'PulseCloud',
    companyLogo: LOGO_PULSECLOUD,
    bannerImg: CARD_BANNER_DEFAULT,
    stageBadge: 'Series B • Fast Growth',
    source: 'LinkedIn Jobs',
    postedAgo: '2h ago',
    postedHours: 2,
    matchScore: 96,
    salaryMin: 165000,
    salaryMax: 195000,
    salaryText: '$165,000 - $195,000',
    equityText: '0.15% Equity',
    remote: true,
    location: 'Remote',
    companyStage: 'Growth',
    companyHeadcount: '25-50',
    matchedCompetencies: ['React', 'Next.js', 'Design Systems'],
    niceToHaveCompetencies: ['Rust (Nice to have)'],
    impactPoints: [
      'Architect the foundational design tokens & sub-second render pipelines for next-gen developer telemetry UI.',
      'Lead front-end runtime performance audits, slashing FID and LCP by over 40% across real-time log viewers.',
      'Directly mentor 5 product engineers across design systems, micro-interactions, and accessibility standards.',
    ],
    fullDescription:
      'PulseCloud is building developer observability tooling for distributed cloud systems. We need a Senior Staff UI Engineer to architect telemetry dashboards rendering millions of metrics in-browser with zero latency. You will own our multi-package design system and core charting primitives.',
    externalUrl: 'https://pulsecloud.dev/careers/senior-staff-ui-engineer',
  },
  {
    id: 'job-fintechx',
    title: 'Lead Frontend Architect',
    company: 'FintechX',
    companyLogo: LOGO_FINTECHX,
    bannerImg: CARD_BANNER_DEFAULT,
    stageBadge: 'Series C • Scale-up',
    source: 'Wellfound',
    postedAgo: '4h ago',
    postedHours: 4,
    matchScore: 94,
    salaryMin: 170000,
    salaryMax: 200000,
    salaryText: '$170,000 - $200,000',
    equityText: '0.12% Equity',
    remote: true,
    location: 'Remote (US)',
    companyStage: 'Scale-up',
    companyHeadcount: '120+',
    matchedCompetencies: ['React', 'TypeScript', 'GraphQL', 'System Design'],
    niceToHaveCompetencies: ['WebSockets'],
    impactPoints: [
      'Design sub-millisecond algorithmic trade visualization dashboards with canvas and WebGL.',
      'Standardize micro-frontend architecture across 4 distributed engineering pods.',
      'Spearhead WCAG AAA accessibility compliance across all retail investor mobile and web products.',
    ],
    fullDescription:
      'FintechX powers next-generation cross-border settlement protocols. As Lead Frontend Architect, you will spearhead modern React + TypeScript web platforms processing over $2B monthly transaction volumes.',
    externalUrl: 'https://fintechx.io/jobs/lead-frontend-architect',
  },
  {
    id: 'job-linear',
    title: 'Design Systems Engineer',
    company: 'Linear',
    companyLogo: LOGO_LINEAR,
    bannerImg: CARD_BANNER_DEFAULT,
    stageBadge: 'Series B • High Precision',
    source: 'RemoteOK',
    postedAgo: '1d ago',
    postedHours: 24,
    matchScore: 95,
    salaryMin: 160000,
    salaryMax: 190000,
    salaryText: '$160,000 - $190,000',
    equityText: '0.10% Equity',
    remote: true,
    location: 'Remote',
    companyStage: 'Growth',
    companyHeadcount: '45',
    matchedCompetencies: ['React', 'Design Systems', 'TypeScript', 'Tailwind CSS'],
    niceToHaveCompetencies: ['Figma API'],
    impactPoints: [
      'Build keyboard-first interaction models and sub-16ms smooth micro-interactions.',
      'Maintain Linear’s open-source component library, tokens, and visual consistency engine.',
      'Collaborate directly with designers to bring Figma specs to life with zero fidelity loss.',
    ],
    fullDescription:
      'Linear is crafting the future of issue tracking and project planning for high-performing engineering teams. We care deeply about craft, speed, and subtle interaction details.',
    externalUrl: 'https://linear.app/careers/design-systems-engineer',
  },
  {
    id: 'job-vercel',
    title: 'Principal UI Platform Engineer',
    company: 'Vercel Ecosystem',
    companyLogo: LOGO_VERCEL,
    bannerImg: CARD_BANNER_DEFAULT,
    stageBadge: 'Scale-up • Developer Tools',
    source: 'LinkedIn Jobs',
    postedAgo: '2d ago',
    postedHours: 48,
    matchScore: 97,
    salaryMin: 185000,
    salaryMax: 215000,
    salaryText: '$185,000 - $215,000',
    equityText: '0.18% Equity',
    remote: true,
    location: 'Remote',
    companyStage: 'Scale-up',
    companyHeadcount: '350+',
    matchedCompetencies: ['Next.js', 'React', 'TypeScript', 'System Design'],
    niceToHaveCompetencies: ['Turbopack', 'Edge Compute'],
    impactPoints: [
      'Architect Next.js App Router integrations for enterprise deployment dashboards.',
      'Optimize bundle size and zero-runtime CSS abstractions across thousands of customer apps.',
      'Deliver fluid drag-and-drop workspace layout engines with React Server Components.',
    ],
    fullDescription:
      'Join Vercel in shaping the global developer experience. Work on core web vitals tooling, preview environments, and cloud infrastructure interfaces used by millions of engineers daily.',
    externalUrl: 'https://vercel.com/careers/ui-platform',
  },
  {
    id: 'job-notion',
    title: 'Staff UI Architect',
    company: 'Notion Labs',
    companyLogo: LOGO_NOTION,
    bannerImg: CARD_BANNER_DEFAULT,
    stageBadge: 'Scale-up • Productivity',
    source: 'LinkedIn Jobs',
    postedAgo: '3d ago',
    postedHours: 72,
    matchScore: 93,
    salaryMin: 195000,
    salaryMax: 220000,
    salaryText: '$195,000 - $220,000',
    equityText: '0.14% Equity',
    remote: true,
    location: 'Remote',
    companyStage: 'Scale-up',
    companyHeadcount: '400+',
    matchedCompetencies: ['React', 'System Design', 'TypeScript'],
    niceToHaveCompetencies: ['Rich Text Editors', 'CRDTs'],
    impactPoints: [
      'Scale real-time document block synchronization and high-frequency cursor rendering.',
      'Re-architect Notion database tables and board view renderers for 100k+ block workspaces.',
      'Build seamless offline-first synchronization using IndexedDB and optimistic mutations.',
    ],
    fullDescription:
      'Notion makes connected workspaces for wiki, docs, and projects. We are looking for an experienced Staff UI Architect to push the envelope of client-side performance and complex web editors.',
    externalUrl: 'https://notion.so/careers/staff-ui-architect',
  },
];

export const INITIAL_PIPELINE: PipelineItem[] = [
  {
    id: 'pipe-figma',
    jobId: 'job-figma',
    company: 'Figma',
    role: 'Senior Product Engineer',
    logo: LOGO_FIGMA,
    stage: 'interviewing',
    stageLabel: 'Interviewing (Rd 3)',
    salary: '$175k – $195k',
    appliedDate: 'Applied Oct 12',
    location: 'San Francisco (Hybrid)',
    notes:
      'Spoke with hiring manager Alex; deep-dive focus on canvas WebGL state sync and reactive cursor rendering.',
    notesCount: 4,
    resumeUsed: 'Frontend_Lead_2025.pdf',
    interviewDetail: {
      roundTitle: 'Round 3: System Design',
      timeText: 'Tomorrow • 2:00 PM',
      interviewers: 'Alex (Staff Eng) + Morgan (Design Systems)',
      meetingUrl: 'https://zoom.us/j/figma-interview-3',
    },
  },
  {
    id: 'pipe-vercel',
    jobId: 'job-vercel',
    company: 'Vercel Ecosystem',
    role: 'Lead Frontend Developer',
    logo: LOGO_VERCEL,
    stage: 'offer',
    stageLabel: 'Formal Offer',
    salary: '$185,000 + 0.12% Equity',
    appliedDate: 'Applied Oct 4',
    location: 'Remote',
    resumeUsed: 'Frontend_Lead_2025.pdf',
    offerDetail: {
      totalPackage: '$185,000 + 0.12% Equity',
      equity: '0.12% Equity',
      signOn: '$15,000',
      expiresDays: 4,
      expiresText: 'Offer expires in 4 days (Friday 5:00 PM)',
      recruiter: 'Sarah Jenks',
    },
  },
  {
    id: 'pipe-notion',
    jobId: 'job-notion',
    company: 'Notion Labs',
    role: 'Staff UI Architect',
    logo: LOGO_NOTION,
    stage: 'screening',
    stageLabel: 'Screening',
    salary: '$200k-$220k • Remote',
    appliedDate: 'Applied Oct 9',
    location: 'Remote',
    resumeUsed: 'Fullstack_General_v3.pdf',
    screeningDetail: {
      taskName: 'Take-home Assessment Submitted',
      statusText: 'Under Review',
      progressPercent: 66,
      submittedAgoText: 'Submitted 2 days ago • Average review time is 3-5 days.',
    },
  },
  {
    id: 'pipe-linear',
    jobId: 'job-linear',
    company: 'Linear',
    role: 'Full Stack Engineer',
    logo: LOGO_LINEAR,
    stage: 'applied',
    stageLabel: 'Applied',
    salary: '$160k-$190k',
    appliedDate: 'Applied Oct 14',
    location: 'Remote',
    sourceReferral: 'Applied 3 days ago via Referral',
    followUpDays: 4,
    resumeUsed: 'Frontend_Lead_2025.pdf',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Vercel Offer Deadline Approaching',
    description: 'You have 4 days remaining to review and finalize your formal offer.',
    timeAgo: '15m ago',
    isUnread: true,
    type: 'offer',
  },
  {
    id: 'notif-2',
    title: 'Figma System Design Round Tomorrow',
    description: 'Round 3 with Alex & Morgan scheduled for 2:00 PM PST. Zoom link ready.',
    timeAgo: '1h ago',
    isUnread: true,
    type: 'interview',
  },
  {
    id: 'notif-3',
    title: 'LinkedIn Jobs Pipeline Synced',
    description: '42 fresh postings parsed into local cache with 0ms evaluation.',
    timeAgo: '2h ago',
    isUnread: false,
    type: 'sync',
  },
  {
    id: 'notif-4',
    title: 'Notion Assessment Under Review',
    description: 'Your take-home UI architecture project is in review with the staff panel.',
    timeAgo: '1d ago',
    isUnread: false,
    type: 'pipeline',
  },
];
