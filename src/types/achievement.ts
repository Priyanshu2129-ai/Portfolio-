export type AchievementCategory =
  | 'Hackathons'
  | 'Certifications'
  | 'Awards'
  | 'Competitions'
  | 'Academic'
  | 'Projects'
  | 'Milestones';

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  description: string;
  date: string;
  organization: string;
  location?: string | null;
  certificate_url?: string | null;
  external_url?: string | null;
  is_published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type AchievementInput = Omit<Achievement, 'id' | 'created_at' | 'updated_at'>;
