export type ReferralContact = {
  id: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl: string;
  verified: boolean;
};

export const referrals: ReferralContact[] = [

  // Google Referrals

  {
    id: "google-1",
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Google",
    linkedinUrl: "https://www.linkedin.com/",
    verified: true,
  },

  {
    id: "google-2",
    name: "Priya Singh",
    role: "Software Developer",
    company: "Google",
    linkedinUrl: "https://www.linkedin.com/",
    verified: true,
  },

  {
    id: "google-3",
    name: "Aman Verma",
    role: "Senior Software Engineer",
    company: "Google",
    linkedinUrl: "https://www.linkedin.com/",
    verified: true,
  },


  // Accenture Referrals

  {
    id: "accenture-1",
    name: "Neha Gupta",
    role: "Software Engineer",
    company: "Accenture",
    linkedinUrl: "https://www.linkedin.com/",
    verified: true,
  },

  {
    id: "accenture-2",
    name: "Rohit Kumar",
    role: "Application Developer",
    company: "Accenture",
    linkedinUrl: "https://www.linkedin.com/",
    verified: true,
  },

  {
    id: "accenture-3",
    name: "Anjali Singh",
    role: "Associate Software Engineer",
    company: "Accenture",
    linkedinUrl: "https://www.linkedin.com/",
    verified: true,
  },

];