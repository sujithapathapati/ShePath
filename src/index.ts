export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  location: string;
  educationLevel: string;
  phoneNumber: string;
  preferences: UserPreference[];
  badges: Badge[];
  trustedContact?: TrustedContact;
}

export interface UserPreference {
  type: 'online-jobs' | 'offline-jobs' | 'skill-training' | 'exhibitions';
  active: boolean;
}

export interface TrustedContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  type: 'online' | 'offline';
  location?: string;
  salary: string;
  requirements: string[];
  company: string;
  datePosted: string;
  applicationDeadline: string;
  isBookmarked?: boolean;
  tags: string[];
  status?: 'active' | 'closed' | 'draft';
  employerId?: string;
  applicationsCount?: number;
}

export interface Employer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
  website?: string;
  companySize: string;
  industry: string;
  verified: boolean;
  dateRegistered: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  coverLetter?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: boolean;
  completed: boolean;
  progress: number;
  instructor: string;
  nextBatch: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  priceRange: string;
  quantity: number;
  image?: string;
  ownerName: string;
  contactInfo: string;
  dateRegistered: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface Mentor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  available: boolean;
  languages: string[];
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'event' | 'scheme' | 'success-story' | 'announcement';
  datePosted: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}