export const QUERY_KEYS = {
  auth: {
    session: ["auth", "session"] as const,
    user: ["auth", "user"] as const,
  },
  members: {
    all: ["members"] as const,
    detail: (id: string) => ["members", id] as const,
    profile: ["members", "profile"] as const,
  },
  businesses: {
    all: ["businesses"] as const,
    detail: (id: string) => ["businesses", id] as const,
    mine: ["businesses", "mine"] as const,
    featured: ["businesses", "featured"] as const,
  },
  marketplace: {
    all: ["marketplace"] as const,
    detail: (id: string) => ["marketplace", id] as const,
  },
  community: {
    posts: ["community", "posts"] as const,
    post: (id: string) => ["community", "posts", id] as const,
  },
  learning: {
    courses: ["learning", "courses"] as const,
    course: (id: string) => ["learning", "courses", id] as const,
  },
  events: {
    all: ["events"] as const,
    detail: (id: string) => ["events", id] as const,
  },
  admin: {
    stats: ["admin", "stats"] as const,
    users: ["admin", "users"] as const,
    auditLogs: ["admin", "audit-logs"] as const,
  },
} as const;

export const STORAGE_KEYS = {
  theme: "bdsisters_theme",
  sidebarState: "bdsisters_sidebar_state",
  language: "bdsisters_lang",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;
