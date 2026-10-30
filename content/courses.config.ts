export type CourseConfig = {
  file: string;
  slug: string;
  order: number;
  description: string;
  badge?: string;
};

export const courseConfig: CourseConfig[] = [
  {
    file: 'project-management-onboarding-module.md',
    slug: 'project-management-onboarding',
    order: 1,
    badge: 'Start here',
    description:
      'Takes a new project manager from day one to running client projects across all ten services: process, timelines, tools and client management.',
  },
  {
    file: 'seo-basics-for-pms.md',
    slug: 'seo-basics',
    order: 2,
    description:
      'Enough SEO knowledge to follow specialists, ask the right questions and answer common client questions without overpromising.',
  },
  {
    file: 'performance-marketing-basics-for-pms.md',
    slug: 'performance-marketing-basics',
    order: 3,
    description:
      'Paid advertising on Google Ads and Meta Ads: the terms and formulas you will hear every week, such as CPC, CTR and ROAS.',
  },
  {
    file: 'shopify-ecommerce-basics-for-pms.md',
    slug: 'shopify-ecommerce-basics',
    order: 4,
    description:
      'How online stores and Shopify work, how to read store numbers, scope work sensibly and what to check before launch.',
  },
  {
    file: 'social-media-basics-for-pms.md',
    slug: 'social-media-basics',
    order: 5,
    description:
      'The platforms, the content, the workflow and the numbers, so you can review calendars and reports with confidence.',
  },
  {
    file: 'content-marketing-basics-for-pms.md',
    slug: 'content-marketing-basics',
    order: 6,
    description:
      'What good content is, how it is planned and produced, and how it is measured, so you can review briefs and drafts sensibly.',
  },
  {
    file: 'analytics-reporting-basics-for-pms.md',
    slug: 'analytics-reporting-basics',
    order: 7,
    description:
      'Read data correctly, spot problems in reports, build clear client reports and explain numbers without overpromising.',
  },
];
