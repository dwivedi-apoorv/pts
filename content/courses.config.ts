/**
 * Courses are shown under these headings, in this order. A course's `category`
 * must be one of them. Within a heading, courses follow their `order` number.
 */
export const courseCategories = [
  'HR and Culture',
  'Conduct and Ethics',
  'Data and Security',
  'General Policies',
  'Role Training',
] as const;

export type CourseCategory = (typeof courseCategories)[number];

export type CourseConfig = {
  file: string;
  slug: string;
  order: number;
  category: CourseCategory;
  description: string;
  badge?: string;
};

export const courseConfig: CourseConfig[] = [
  {
    file: 'project-management-onboarding-module.md',
    slug: 'project-management-onboarding',
    order: 13,
    category: 'Role Training',
    description:
      'Takes a new project manager from day one to running client projects across all ten services: process, timelines, tools and client management.',
  },
  {
    file: 'seo-basics-for-pms.md',
    slug: 'seo-basics',
    order: 14,
    category: 'Role Training',
    description:
      'Enough SEO knowledge to follow specialists, ask the right questions and answer common client questions without overpromising.',
  },
  {
    file: 'performance-marketing-basics-for-pms.md',
    slug: 'performance-marketing-basics',
    order: 15,
    category: 'Role Training',
    description:
      'Paid advertising on Google Ads and Meta Ads: the terms and formulas you will hear every week, such as CPC, CTR and ROAS.',
  },
  {
    file: 'shopify-ecommerce-basics-for-pms.md',
    slug: 'shopify-ecommerce-basics',
    order: 16,
    category: 'Role Training',
    description:
      'How online stores and Shopify work, how to read store numbers, scope work sensibly and what to check before launch.',
  },
  {
    file: 'social-media-basics-for-pms.md',
    slug: 'social-media-basics',
    order: 17,
    category: 'Role Training',
    description:
      'The platforms, the content, the workflow and the numbers, so you can review calendars and reports with confidence.',
  },
  {
    file: 'content-marketing-basics-for-pms.md',
    slug: 'content-marketing-basics',
    order: 18,
    category: 'Role Training',
    description:
      'What good content is, how it is planned and produced, and how it is measured, so you can review briefs and drafts sensibly.',
  },
  {
    file: 'analytics-reporting-basics-for-pms.md',
    slug: 'analytics-reporting-basics',
    order: 19,
    category: 'Role Training',
    description:
      'Read data correctly, spot problems in reports, build clear client reports and explain numbers without overpromising.',
  },
  {
    file: 'cyber-security-basics-for-everyone.md',
    slug: 'cyber-security-basics',
    order: 7,
    category: 'Data and Security',
    description:
      'For everyone in the organisation: stay safe from phishing, malware and scams, handle passwords and client access properly, and know how to report an incident.',
  },
  {
    file: 'posh-awareness-for-everyone.md',
    slug: 'posh-awareness',
    order: 4,
    category: 'Conduct and Ethics',
    description:
      'For everyone: what sexual harassment is, what the POSH Act requires, and how to act, report and support others, with a clear guide to the Internal Committee process.',
  },
  {
    file: 'code-of-conduct-and-ethics-for-everyone.md',
    slug: 'code-of-conduct',
    order: 3,
    category: 'Conduct and Ethics',
    description:
      'The standards of behaviour we expect of everyone: honesty, respect, fair dealing with clients, ethical marketing and how to make good decisions.',
  },
  {
    file: 'data-privacy-and-confidentiality-for-everyone.md',
    slug: 'data-privacy',
    order: 6,
    category: 'Data and Security',
    description:
      "Handle personal data and confidential information safely, and understand what India's DPDP Act means for our work with client stores.",
  },
  {
    file: 'acceptable-use-of-it-and-ai-tools-for-everyone.md',
    slug: 'it-and-ai-use',
    order: 8,
    category: 'Data and Security',
    description:
      'What you may and may not do with company devices, software, accounts and AI tools, and how to use AI safely with client work.',
  },
  {
    file: 'speaking-up-whistleblowing-and-grievances-for-everyone.md',
    slug: 'speaking-up',
    order: 5,
    category: 'Conduct and Ethics',
    description:
      'How to raise a concern or a grievance, what happens next, and how you are protected from retaliation.',
  },
  {
    file: 'hr-policies-handbook-for-everyone.md',
    slug: 'hr-policies',
    order: 1,
    category: 'HR and Culture',
    description:
      'A friendly guide to the employment lifecycle: working hours, leave, pay, reviews, conduct, notice and exit.',
  },
  {
    file: 'social-media-and-public-communication-for-everyone.md',
    slug: 'social-media-communication',
    order: 9,
    category: 'General Policies',
    description:
      'What you can and cannot say online and in public about the company and our clients, and how to handle media and complaints.',
  },
  {
    file: 'health-safety-and-wellbeing-for-everyone.md',
    slug: 'health-safety-wellbeing',
    order: 11,
    category: 'General Policies',
    description:
      'Stay safe and well at work: emergencies, ergonomics, travel safety, mental health and how to report an incident.',
  },
  {
    file: 'business-continuity-for-everyone.md',
    slug: 'business-continuity',
    order: 12,
    category: 'General Policies',
    description:
      'What to do when something disrupts our work, from outages to a key person leaving, and how to protect client delivery.',
  },
  {
    file: 'expense-and-travel-policy-for-everyone.md',
    slug: 'expense-and-travel',
    order: 10,
    category: 'General Policies',
    description:
      'How to spend, claim and document company and client money correctly, including travel and approvals.',
  },
  {
    file: 'company-culture-and-values-for-everyone.md',
    slug: 'culture-and-values',
    order: 2,
    category: 'HR and Culture',
    description:
      'Our mission, values and ways of working, who does what, and how to settle in during your first 90 days.',
  },
];
