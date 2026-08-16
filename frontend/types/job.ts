export type Job = {
  id: string;

  slug: string;

  title: string;

  company: string;

  category: string;

  location: string;

  salary: string;

  experience: string;

  jobType: string;

  posted: string;

  verified: boolean;

  applyUrl: string;

  description: string;

  eligibility: string[];

  skills: string[];

  lastDate?: string;
};