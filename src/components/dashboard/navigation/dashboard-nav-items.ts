import {
  LayoutDashboard,
  User,
  Store,
  Users,
  ShoppingBag,
  GraduationCap,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/config/routes";

export interface DashboardNavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  isExternal?: boolean;
  comingSoon?: boolean;
}

export const MAIN_DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    id: "overview",
    title: "Overview",
    href: ROUTES.member.dashboard,
    icon: LayoutDashboard,
  },
  {
    id: "profile",
    title: "My Profile",
    href: ROUTES.member.profile,
    icon: User,
  },
  {
    id: "business",
    title: "My Business",
    href: ROUTES.member.myBusiness,
    icon: Store,
  },
  {
    id: "community",
    title: "Community",
    href: ROUTES.public.community,
    icon: Users,
  },
  {
    id: "marketplace",
    title: "Marketplace",
    href: ROUTES.public.marketplace,
    icon: ShoppingBag,
  },
  {
    id: "learning",
    title: "Learning",
    href: ROUTES.public.learning,
    icon: GraduationCap,
  },
  {
    id: "events",
    title: "Events",
    href: ROUTES.public.events,
    icon: Calendar,
  },
  {
    id: "messages",
    title: "Messages",
    href: ROUTES.member.messages,
    icon: MessageSquare,
    badge: "0",
  },
  {
    id: "notifications",
    title: "Notifications",
    href: ROUTES.member.notifications,
    icon: Bell,
  },
];

export const ACCOUNT_DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    id: "settings",
    title: "Settings",
    href: ROUTES.member.settings,
    icon: Settings,
  },
  {
    id: "help",
    title: "Help & Support",
    href: ROUTES.public.contact,
    icon: HelpCircle,
  },
];

