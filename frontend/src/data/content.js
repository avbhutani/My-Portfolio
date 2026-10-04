/* ==========================================================================
   Portfolio content — the single source of truth for everything rendered.
   Add a new section by appending to the relevant array below; the layout,
   ordering and styling adapt automatically.

   ⚠️  TODO(owner): fields marked `TODO` need real values before publishing.
       They are intentionally left empty so nothing false is published.
   ========================================================================== */

export const profile = {
  name: 'Anubhav Bhutani',
  initials: 'AB',
  role: 'Software Engineer',
  roles: [
    'Backend Engineer',
    'Distributed Systems',
    'Platform Engineering',
    'Reliability & Observability',
  ],
  location: 'Chennai, India',
  availableForWork: true,
  summary:
    'Backend engineer focused on distributed systems, infrastructure, and platform engineering. Currently at Twilio, working on Kubernetes migrations, observability, internal platforms, and reliability improvements for core services. I enjoy building systems that are simple, scalable, and practical.',
  about: [
    "I'm a backend engineer at Twilio, working on Kubernetes migrations, observability, internal platforms, and reliability improvements for core services. My focus is infrastructure and distributed systems — the unglamorous layer that decides whether a product stays up when traffic spikes.",
    'Most of my work lives close to the metal: container orchestration, service reliability, and the tooling that makes shipping safer for the teams around me. I care about systems that are simple to reason about and straightforward to operate at 3am.',
    'Before Twilio I worked as a backend intern at Spinny on large-scale commerce systems, as an SDE intern at Fidelity Investments, and took on freelance backend work — a mix that taught me to move fast without cutting corners on correctness.',
    "Outside of work I keep a habit of shipping side projects and grinding DSA problems, because the best way to get better at system design is to keep designing systems.",
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
  /* TODO(owner): fill in the LinkedIn profile URL, or set to null to hide. */
  linkedin: null,
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
    tech: ['Kubernetes', 'Observability', 'Platform Engineering'],
    /* TODO(owner): 2–4 concrete bullets per role. Specific beats generic. */
    highlights: [],
  },
  {
    id: 'spinny',
    position: 'Backend Engineering Intern',
    company: 'Spinny',
    companyUrl: 'https://www.spinny.com',
    duration: 'Mar 2025 — May 2025',
    location: 'Gurugram, Haryana',
    employmentType: 'Internship',
    tech: ['Node.js', 'Backend Systems'],
    highlights: [],
  },
  {
    id: 'freelance',
    position: 'Freelance Backend Developer',
    company: 'Independent',
    companyUrl: null,
    duration: 'Nov 2024 — Feb 2025',
    location: 'Remote',
    employmentType: 'Contract',
    tech: [],
    highlights: [],
  },
  {
    id: 'fidelity',
    position: 'Software Development Engineer Intern',
    company: 'Fidelity Investments',
    companyUrl: 'https://www.fidelity.com',
    duration: 'Jun 2024 — Aug 2024',
    location: 'Bengaluru, Karnataka',
    employmentType: 'Internship',
    tech: [],
    highlights: [],
  },
];

export const education = [
  {
    id: 'srm',
    stage: 'Undergraduate',
    degree: 'B.Tech, Computer Science & Engineering',
    institute: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    session: '2021 — 2025',
    grade: 'CGPA 9.70',
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
    title: 'SRM JEE Merit Scholarship',
    description:
      'Awarded a merit scholarship covering 100% of tuition fees, worth ₹7,50,000.',
    icon: 'award',
    tag: 'Academic',
  },
  {
    id: 'codestudio',
    title: 'CodeStudio Rating 2000+',
    description:
      'Maintained a CodeStudio competitive-programming rating of 2000 or above.',
    icon: 'trophy',
    tag: 'Competitive programming',
  },
  {
    id: 'code-for-good',
    title: 'JPMorgan Chase — Code for Good 2024',
    description:
      'Selected to participate in Code for Good 2024, JPMorgan Chase’s flagship hackathon for social-impact projects.',
    icon: 'spark',
    tag: 'Hackathon',
  },
];