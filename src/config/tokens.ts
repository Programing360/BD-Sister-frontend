/**
 * BDSisters.org - Central Design Tokens
 * Reusable constants representing design system foundations
 */

export const colors = {
  primary: {
    DEFAULT: "#7C3AED",
    dark: "#6025C5",
    light: "#F3EAFE",
    hover: "#6D28D9",
    active: "#5B21B6",
    subtle: "#F5EFFE",
  },
  secondary: {
    DEFAULT: "#E9A6B8",
    light: "#FCEEF2",
    dark: "#D67A93",
    hover: "#DF8EA3",
  },
  neutral: {
    background: "#FFFFFF",
    surface: "#FAF9FC",
    surfaceRaised: "#FFFFFF",
    foreground: "#252238",
    muted: "#777386",
    mutedLight: "#A5A1B2",
    border: "#EAE7F0",
    borderStrong: "#D8D3E2",
  },
  dark: {
    background: "#0F0E17",
    surface: "#181726",
    surfaceRaised: "#222035",
    foreground: "#F3F2F8",
    muted: "#9E9BAE",
    mutedLight: "#6F6C80",
    border: "#2E2A42",
    borderStrong: "#413C5C",
    primary: "#9055F6",
    primaryLight: "#2D1C4D",
    secondary: "#F2B8C6",
    secondaryLight: "#442731",
  },
  semantic: {
    success: {
      DEFAULT: "#16A36A",
      light: "#E8F8F0",
      dark: "#22C55E",
    },
    warning: {
      DEFAULT: "#E9A23B",
      light: "#FEF7EC",
      dark: "#F59E0B",
    },
    danger: {
      DEFAULT: "#DC4545",
      light: "#FEECEB",
      dark: "#EF4444",
    },
    info: {
      DEFAULT: "#3985D8",
      light: "#EBF3FC",
      dark: "#3B82F6",
    },
  },
} as const;

export const radii = {
  xs: "0.25rem", // 4px
  sm: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

export const shadows = {
  subtle: "0 1px 2px 0 rgba(37, 34, 56, 0.04)",
  card: "0 2px 8px -2px rgba(37, 34, 56, 0.06), 0 1px 3px -1px rgba(37, 34, 56, 0.04)",
  dropdown: "0 10px 24px -4px rgba(37, 34, 56, 0.12), 0 4px 8px -2px rgba(37, 34, 56, 0.06)",
  modal: "0 20px 40px -8px rgba(37, 34, 56, 0.16), 0 8px 16px -4px rgba(37, 34, 56, 0.08)",
} as const;

export const breakpoints = {
  smallMobile: 320,
  mobile: 375,
  largeMobile: 430,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  largeDesktop: 1920,
} as const;
