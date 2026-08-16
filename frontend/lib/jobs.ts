import { Job } from "@/types/job";

export const jobs: Job[] = [
  {
    id: "1",
    slug: "google-software-engineer",

    title: "Software Engineer",

    company: "Google",

    category: "Private",

    location: "Bangalore",

    salary: "₹28 LPA",

    experience: "0-2 Years",

    jobType: "Full Time",

    posted: "2 days ago",

    verified: true,

    applyUrl: "https://careers.google.com",

    description:
      "Google is hiring Software Engineers for backend and full-stack development.",

    eligibility: [
      "B.Tech",
      "MCA",
      "BCA"
    ],

    skills: [
      "DSA",
      "C++",
      "Java",
      "System Design"
    ],

    lastDate: "30 Aug 2026",
  },

  {
    id: "2",

    slug: "ssc-cgl-2026",

    title: "SSC CGL 2026",

    company: "Government of India",

    category: "Government",

    location: "India",

    salary: "Level 7",

    experience: "Freshers",

    jobType: "Full Time",

    posted: "Today",

    verified: true,

    applyUrl: "https://ssc.gov.in",

    description:
      "SSC CGL Recruitment 2026 Notification.",

    eligibility: [
      "Graduate"
    ],

    skills: [
      "Reasoning",
      "Math",
      "English"
    ],

    lastDate: "15 Sept 2026",
  },
];