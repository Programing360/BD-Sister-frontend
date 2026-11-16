import type { UserRole } from "./auth";

export interface MemberProfile {
  id: string;
  userId: string;
  fullName: string;
  bio?: string;
  avatarUrl?: string;
  occupation?: string;
  district?: string;
  skills: string[];
  interests: string[];
  role: UserRole;
  isVerified: boolean;
  joinedAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  marketingEmails: boolean;
  communityUpdates: boolean;
  language: "en" | "bn";
}
