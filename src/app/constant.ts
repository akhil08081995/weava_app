// src/app/constants/constants.ts

export const CHANNEL_OPTIONS = {
  CHROME_STORE: 'Chrome Store',
  SEARCH_ENGINE: 'Search Engine',
  FACEBOOK: 'Facebook',
  YOUTUBE: 'Youtube',
  FRIENDS: 'Friends',
  SCHOOL: 'School',
  EMAIL: 'Email',
  TWITTER: 'Twitter',
  LINKEDIN: 'LinkedIn',
};

export const PURPOSE_OPTIONS = {
  K12: 'K-12 School',
  COLLEGE: 'College/ University',
  WORK: 'Work',
  PERSONAL: 'Personal',
};

export const K12_ROLES = {
  STUDENT: 'Student',
  TEACHER: 'Teacher',
  OTHERS: 'Others',
};

export const K12_ROLES_EXTENDED = {
  PRINCIPAL: 'Principal',
  CONSULTANT: 'Advisor/Consultant',
  TECH: 'Technology Officer',
  SCHOOL_ADMIN: 'School Administrator',
  DISTRICT_ADMIN: 'District Administrator',
  NOT_LISTED: 'Not Listed',
};

export const COLLEGE_ROLES = {
  UNDERGRADUATE: 'Undergraduate',
  POSTGRADUATE: 'Postgraduate',
};

export const WORK_INDUSTRY_OPTIONS = {
  EDUCATION: 'Education',
  BUSINESS: 'Business',
  LEGAL: 'Legal Services',
  TECHNOLOGY: 'Technology',
  MEDICAL: 'Medical/ Health',
  ARTS: 'Arts',
  OTHERS: 'Others',
};

export const ALIASES = {
  K12: 'K-12/Primary-Secondary School',
  COLLEGE: 'University',
};

export const SHOW_REFERRAL_CODE_BOX = true;

export const k12RolesArray = [
  ...Object.values(K12_ROLES_EXTENDED),
  'Teacher',
  'Technology Officer',
  'Student',
];
