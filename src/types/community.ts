export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface LearningCourse {
  id: string;
  instructorId: string;
  title: string;
  summary: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface PlatformEvent {
  id: string;
  title: string;
  description: string;
  isVirtual: boolean;
  location?: string;
  meetingUrl?: string;
  startDate: string;
  endDate: string;
  maxAttendees?: number;
  registrationCount: number;
  createdAt: string;
}
