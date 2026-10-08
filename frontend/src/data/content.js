/* ==========================================================================
   Portfolio content — the single source of truth for everything rendered.
   Add a new section by appending to the relevant array below; the layout,
   ordering and styling adapt automatically.

   Source of truth: the owner's résumé and LinkedIn profile. Every bullet and
   achievement below is taken from those documents rather than invented.
   ========================================================================== */

export const profile = {
  name: 'Anubhav Bhutani',
  initials: 'AB',
  role: 'Software Development Engineer I',
  roles: [
    'Backend Engineer',
    'Kubernetes Migrations',
    'Observability',
    'Internal Platforms',
  ],
  location: 'Gurugram, Haryana, India',
  availableForWork: true,
  summary:
    'Software developer at Twilio, working on Kubernetes migrations, observability, internal platforms, and reliability for core services. I care about systems that stay up and stay understandable.',
  about: [
    "I'm a Software Development Engineer I at Twilio. That means circuit breakers and failure recovery, an internal insights service for domain-to-domain communication, and moving EC2-based deployments onto Kubernetes — pipelines, app setup, and observability together rather than separately.",
    'Most of my work sits underneath the product: container orchestration, the observability stack, and the CI/test flows that make shipping safer for everyone else. I like systems that are straightforward to operate at 3am, not just in a design doc.',
    'Before Twilio I was a backend intern at Spinny, where I built a partner-facing document view end to end and chased a concurrency bug that showed up in 0.0001% of cases. Earlier I interned at Fidelity Investments designing a GraphQL layer, and took freelance work including a video contest platform and a Wix-to-MERN migration.',
    "Outside work I stay hands-on: 800+ coding problems across LeetCode, CodeStudio, CodeChef and HackerRank, two shipped projects, and a DSA problem-solving channel — @CodeWithAnubhav — that has passed 47,000 impressions.",
  ],
  /* TODO(owner): replace with a hosted PDF that allows direct download.
     The current Google Drive link opens a Drive viewer page. */
  resumeUrl:
    'https://drive.google.com/file/d/1VSWs7sh01nxTv3qFtlqwfh1U_3GZust0/view?usp=sharing',
};

/* Primary navigation. `id` must match a section element id in App.jsx.
   Adding an entry here automatically adds it to the header nav and footer. */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const socials = {
  email: 'avbhutani3@gmail.com',
  github: 'https://github.com/avbhutani',
  linkedin: 'https://www.linkedin.com/in/anubhavbhutani/',
  /* TODO(owner): set to the X profile URL to show the icon, or leave null. */
  x: null,
};

export const experience = [
  {
    id: 'twilio',
    position: 'Software Development Engineer I',
    company: 'Twilio',
    companyUrl: 'https://www.twilio.com',
    duration: 'Jun 2025 — Present',
    location: 'Remote',
    employmentType: 'Full-time',
    tech: ['Kubernetes', 'EC2', 'CI/CD', 'Observability'],
    highlights: [
      'Implemented circuit breaker handling for a core service to improve fault tolerance and failure recovery.',
      'Built an internal insights service for domain-to-domain communication, exposing controlled API access instead of direct event consumption.',
      'Worked on the migration from EC2-based deployments to Kubernetes, covering pipelines, app setup, and observability integration.',
      'Contributed to migrating the observability stack across services.',
      'Improved CI/test pipelines by merging internal and public test flows for smoother execution and maintenance.',
    ],
  },
  {
    id: 'spinny',
    position: 'Backend Intern',
    company: 'Spinny',
    companyUrl: 'https://www.spinny.com',
    duration: 'Mar 2025 — May 2025',
    location: 'Gurugram, Haryana',
    employmentType: 'Internship',
    tech: ['Partner App', 'Concurrency'],
    highlights: [
      'Developed a document view feature on the partner\u2019s app end to end, enabling easy access to documents.',
      'Resolved a rare concurrency issue occurring in 0.0001% of cases, improving system reliability.',
    ],
  },
  {
    id: 'freelance',
    position: 'Software Developer',
    company: 'Freelancer',
    companyUrl: null,
    duration: 'Nov 2024 — Feb 2025',
    location: 'Remote',
    employmentType: 'Contract',
    tech: ['DynamoDB', 'Amazon S3', 'Stripe', 'MERN'],
    highlights: [
      'ClipDuel: developed a video contest platform letting brands view watermark-free videos after payment, using DynamoDB and Amazon S3 for storage and Stripe for payments.',
      'Migrated a Wix site to the MERN stack, optimising performance.',
    ],
  },
  {
    id: 'fidelity',
    position: 'SDE Intern',
    company: 'Fidelity Investments',
    companyUrl: 'https://www.fidelity.com',
    duration: 'Jun 2024 — Aug 2024',
    location: 'Bengaluru, Karnataka',
    employmentType: 'Internship',
    tech: ['GraphQL', 'Spring Boot', 'JUnit'],
    highlights: [
      'Designed and implemented a GraphQL layer to optimise data retrieval, reducing API response times by 10%.',
      'Collaborated with cross-functional teams to deliver solutions, focusing on performance and scalability.',
      'Ensured code quality through best practices, JUnit testing, Spring Boot, and lightweight containers.',
    ],
  },
];

export const education = [
  {
    id: 'srm',
    stage: 'Undergraduate',
    degree: 'B.Tech, Computer Science & Engineering (AI/ML)',
    institute: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    session: '2021 — 2025',
    grade: 'CGPA 9.60',
  },
  {
    id: 'dav-12',
    stage: 'Senior Secondary',
    degree: 'Class 12, Senior Secondary (Science)',
    institute: 'DAV Public School, Sector 48 & 49',
    location: 'Gurugram, Haryana',
    session: '2020 — 2021',
    grade: '93.4%',
  },
  {
    id: 'dav-10',
    stage: 'Secondary',
    degree: 'Class 10',
    institute: 'DAV Public School, Sector 48 & 49',
    location: 'Gurugram, Haryana',
    session: '2018 — 2019',
    grade: '94%',
  },
];

/* Quick-facts shown beside the About prose. Derived from `profile` /
   `education` so the two can never drift apart. */
export const aboutFacts = [
  {
    icon: 'briefcase',
    label: 'Current role',
    value: `${profile.role} at ${experience[0].company}`,
    note: experience[0].duration,
  },
  {
    icon: 'code',
    label: 'Focus areas',
    value: 'Distributed systems',
    note: experience[0].tech.join(' · ') || 'Backend and platform engineering',
  },
  {
    icon: 'graduation',
    label: 'Education',
    value: education[0].degree,
    note: education[0].institute,
  },
  {
    icon: 'mapPin',
    label: 'Based in',
    value: profile.location,
    note: 'Open to remote roles',
  },
];

export const achievements = [
  {
    id: 'merit-scholarship',
    title: 'SRMJEE Merit Scholarship',
    description:
      'Selected as a Top 1% SRMJEE merit scholar — a full tuition fee waiver worth \u20b910 Lakhs.',
    icon: 'award',
    tag: 'Academic',
  },
  {
    id: 'code-for-good',
    title: 'JPMorgan Chase — Code for Good 2024',
    description:
      'Competed in Code for Good 2024, placing in the top 1% of 50,000 applicants.',
    icon: 'spark',
    tag: 'Hackathon',
  },
  {
    id: 'coding-questions',
    title: '800+ Coding Problems',
    description:
      'Solved 800+ questions across LeetCode, CodeStudio, CodeChef, and HackerRank.',
    icon: 'trophy',
    tag: 'Competitive',
  },
  {
    id: 'youtube-channel',
    title: 'DSA Problem-Solving Channel',
    description:
      'Run @CodeWithAnubhav, a DSA problem-solving channel that has passed 47,000 impressions.',
    icon: 'spark',
    tag: 'Teaching',
  },
];
