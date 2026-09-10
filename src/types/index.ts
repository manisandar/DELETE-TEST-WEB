export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote';

export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  level: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  tags: string[];
  description: string;
  postedDate: string;
  isFeatured?: boolean;
}

export type ApplicationStatus = 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface Application {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
  interviewDate?: string;
  salaryOffer?: number;
  contactPerson?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface FilterState {
  search: string;
  type: string;
  level: string;
  minSalary: number;
  selectedTag: string;
}
