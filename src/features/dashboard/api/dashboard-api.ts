import type {
  DashboardOverviewResponse,
  ProfileCompletionData,
} from "../types";
import type { AuthUser } from "@/types/auth";
import { ROUTES } from "@/config/routes";

/**
 * MISSING BACKEND API CONTRACT SPECIFICATIONS:
 *
 * The following REST endpoints are targeted for the microservices backend:
 * - GET /api/v1/member/dashboard/overview -> returns DashboardOverviewResponse
 * - GET /api/v1/member/notifications -> returns NotificationItem[]
 * - PATCH /api/v1/member/notifications/:id/read -> marks single notification as read
 * - POST /api/v1/member/notifications/read-all -> marks all notifications as read
 * - GET /api/v1/member/announcements -> returns AnnouncementItem[]
 *
 * Current Status:
 * Awaiting Step 6 (Member Profile Microservice) and Step 7 (Business Directory API).
 * In this step (Step 5), the client computes real profile completion from the
 * authenticated user object and supplies structured development data.
 */

export function calculateRealProfileCompletion(user: AuthUser | null): ProfileCompletionData {
  if (!user) {
    return {
      percentage: 0,
      completedCount: 0,
      totalCount: 5,
      items: [],
    };
  }

  const items = [
    {
      id: "name",
      label: "Full Name & Identity",
      description: "Provide your authentic full name for sisterhood trust.",
      completed: Boolean(user.name && user.name.trim().length > 0),
      actionUrl: ROUTES.member.profile,
    },
    {
      id: "email",
      label: "Account Email",
      description: "Your registered login and communication address.",
      completed: Boolean(user.email && user.email.includes("@")),
      actionUrl: ROUTES.member.profile,
    },
    {
      id: "email-verified",
      label: "Email Verification",
      description: "Verify your email to secure your account and join circles.",
      completed: Boolean(user.emailVerified),
      actionUrl: ROUTES.auth.verifyEmail,
    },
    {
      id: "avatar",
      label: "Profile Picture / Avatar",
      description: "Upload a modest avatar or monogram to personalize your presence.",
      completed: Boolean(user.image),
      actionUrl: ROUTES.member.profile,
    },
    {
      id: "role-bio",
      label: "Member Role & Professional Bio",
      description: "Introduce your skills, profession, or entrepreneurial goals (Step 6).",
      completed: Boolean(user.role && user.role !== "member"),
      actionUrl: ROUTES.member.profile,
    },
  ];

  const completedCount = items.filter((i) => i.completed).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  return {
    percentage,
    completedCount,
    totalCount: items.length,
    items,
  };
}

export function getDevelopmentDashboardData(user: AuthUser | null): DashboardOverviewResponse {
  const profileCompletion = calculateRealProfileCompletion(user);

  return {
    stats: [
      {
        id: "profile-views",
        label: "Profile Views",
        value: "0",
        trend: { value: 0, isPositive: true, label: "New account" },
        description: "Views from community sisters this month",
        iconName: "Eye",
      },
      {
        id: "community-connections",
        label: "Sisterhood Circles",
        value: "0",
        trend: { value: 0, isPositive: true, label: "Explore circles" },
        description: "Circles joined across Bangladesh",
        iconName: "Users",
      },
      {
        id: "business-inquiries",
        label: "Business Inquiries",
        value: "0",
        description: "Inquiries received via directory listing",
        iconName: "Briefcase",
      },
      {
        id: "upcoming-events",
        label: "Registered Events",
        value: "0",
        description: "Upcoming workshops & masterclasses",
        iconName: "Calendar",
      },
    ],
    profileCompletion,
    recentActivity: [
      {
        id: "act-1",
        type: "security",
        title: "Account Registered Successfully",
        description: "Welcome to BDSisters.org. Your member account is active.",
        timestamp: user?.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
        iconName: "ShieldCheck",
        actionUrl: ROUTES.member.profile,
      },
      ...(user && !user.emailVerified
        ? [
          {
            id: "act-2",
            type: "security" as const,
            title: "Email Verification Pending",
            description: "Please check your inbox to verify your email address.",
            timestamp: new Date().toISOString(),
            iconName: "Mail",
            actionUrl: ROUTES.auth.verifyEmail,
          },
        ]
        : []),
    ],
    upcomingEvents: [
      {
        id: "ev-1",
        title: "Digital Commerce for Bangladeshi Muslimah Entrepreneurs",
        date: "Thursday, Nov 26, 2026",
        time: "08:00 PM BST (UTC+6)",
        location: "Online (Zoom)",
        category: "Entrepreneurship",
        isVirtual: true,
        attendeesCount: 142,
        registrationUrl: ROUTES.public.events,
      },
      {
        id: "ev-2",
        title: "Halal Financing & Ethical Investments in Bangladesh",
        date: "Saturday, Dec 05, 2026",
        time: "07:30 PM BST (UTC+6)",
        location: "Online / Hybrid Dhaka",
        category: "Islamic Finance",
        isVirtual: true,
        attendeesCount: 98,
        registrationUrl: ROUTES.public.events,
      },
    ],
    recommendations: [
      {
        id: "rec-1",
        title: "BDSisters Women-in-Tech & Freelance Cohort",
        category: "Learning",
        description:
          "Curated 6-week mentorship track covering global remote freelancing and client communication.",
        benefit: "Connect with 50+ senior Bangladeshi tech sisters",
        ctaText: "Explore Track",
        ctaUrl: ROUTES.public.learning,
        badge: "Mentorship",
      },
      {
        id: "rec-2",
        title: "Register Your Business in the BDSisters Directory",
        category: "Partnership",
        description:
          "Showcase your boutique, home bakery, design studio, or consultancy to trusted sisters nationwide.",
        benefit: "Direct customer discovery & wholesale sister-to-sister discounts",
        ctaText: "Register Business",
        ctaUrl: ROUTES.member.myBusiness,
        badge: "Growth",
      },
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Welcome to the BDSisters.org Member Workspace",
        content:
          "Assalamu Alaikum! We are honored to welcome you to Bangladesh's premier digital community for Muslim women in business, career, and learning.",
        priority: "important",
        date: "November 2026",
        actionText: "Read Guidelines",
        actionUrl: ROUTES.public.about,
      },
      {
        id: "ann-2",
        title: "Upcoming Community Circle Launches in Dhaka & Chittagong",
        content:
          "Regional in-person meetups and virtual peer circles are launching next month. Stay tuned for registration details.",
        priority: "info",
        date: "November 2026",
        actionText: "View Circles",
        actionUrl: ROUTES.public.community,
      },
    ],
    notifications: [
      {
        id: "notif-1",
        title: "Welcome Sister!",
        message: "Your member profile workspace has been created. Take a moment to complete your details.",
        type: "system",
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl: ROUTES.member.profile,
      },
      {
        id: "notif-2",
        title: "Security Notice",
        message: "You signed in to BDSisters.org. If this was not you, please reset your password.",
        type: "security",
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl: ROUTES.member.settings,
      },
    ],
  };
}
