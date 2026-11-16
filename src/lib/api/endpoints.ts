export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    session: "/auth/session",
    refreshToken: "/auth/refresh-token",
    verifyEmail: "/auth/verify-email",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  members: {
    list: "/members",
    detail: (id: string) => `/members/${id}`,
    profile: "/members/me",
    updateProfile: "/members/me",
  },
  businesses: {
    list: "/businesses",
    detail: (id: string) => `/businesses/${id}`,
    create: "/businesses",
    update: (id: string) => `/businesses/${id}`,
    delete: (id: string) => `/businesses/${id}`,
    mine: "/businesses/me",
  },
  marketplace: {
    products: "/marketplace/products",
    productDetail: (id: string) => `/marketplace/products/${id}`,
    categories: "/marketplace/categories",
  },
  community: {
    posts: "/community/posts",
    postDetail: (id: string) => `/community/posts/${id}`,
    createPost: "/community/posts",
    comments: (postId: string) => `/community/posts/${postId}/comments`,
  },
  learning: {
    courses: "/learning/courses",
    courseDetail: (id: string) => `/learning/courses/${id}`,
    enroll: (id: string) => `/learning/courses/${id}/enroll`,
  },
  events: {
    list: "/events",
    detail: (id: string) => `/events/${id}`,
    register: (id: string) => `/events/${id}/register`,
  },
  admin: {
    metrics: "/admin/metrics",
    users: "/admin/users",
    updateUserRole: (userId: string) => `/admin/users/${userId}/role`,
    moderationQueue: "/admin/moderation",
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
