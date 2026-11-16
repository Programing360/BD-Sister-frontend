export interface DashboardStatItem {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  description?: string;
  iconName: string;
}

export interface ProfileCompletionItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  actionUrl: string;
}

export interface ProfileCompletionData {
  percentage: number;
  completedCount: number;
  totalCount: number;
  items: ProfileCompletionItem[];
}

export interface ActivityItem {
  id: string;
  type: "profile" | "community" | "business" | "event" | "security";
  title: string;
  description: string;
  timestamp: string;
  iconName: string;
  actionUrl?: string;
}

export interface UpcomingEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Entrepreneurship" | "Islamic Finance" | "Tech & Freelancing" | "Wellness" | "Mentorship";
  isVirtual: boolean;
  attendeesCount: number;
  registrationUrl: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: "Grant" | "Mentorship" | "Learning" | "Partnership" | "Circle";
  description: string;
  benefit: string;
  ctaText: string;
  ctaUrl: string;
  badge?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  priority: "info" | "important" | "urgent";
  date: string;
  actionText?: string;
  actionUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "system" | "security" | "community" | "event" | "business";
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface DashboardOverviewResponse {
  stats: DashboardStatItem[];
  profileCompletion: ProfileCompletionData;
  recentActivity: ActivityItem[];
  upcomingEvents: UpcomingEventItem[];
  recommendations: RecommendationItem[];
  announcements: AnnouncementItem[];
  notifications: NotificationItem[];
}

