export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Personal Concept Project' | 'Live Project' | 'Hackathon Team Project';
  description: string;
  longDescription?: string;
  thumbnail: string;
  features: string[];
  technologies: string[];
  developmentInfo: string;
  liveUrl?: string;
  githubUrl?: string;
  isPlanned?: boolean;
  highlights?: string[];
}

