export type UserRole = "guest" | "member" | "business_owner" | "mentor" | "moderator" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: UserRole | string;
  emailVerified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: string | Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface SessionContextValue {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type Permission =
  | "manage:users"
  | "manage:businesses"
  | "moderate:community"
  | "publish:marketplace"
  | "access:admin"
  | "view:profile"
  | "edit:profile";

export interface AuthResponseError {
  status: number;
  message: string;
  code?: string;
}
