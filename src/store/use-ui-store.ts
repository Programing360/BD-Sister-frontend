import { create } from "zustand";

interface UIState {
  // Public navigation
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Member Dashboard Navigation
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;

  // Dashboard Modals & Drawers
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;

  isNotificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  toggleNotifications: () => void;

  // Generic Modal
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

/**
 * Global UI Client State Store (Zustand)
 *
 * ARCHITECTURAL GUIDELINE:
 * - Use this store ONLY for ephemeral, client-side UI states.
 * - Do NOT store server data, entity caches, or API responses here.
 * - Server state belongs strictly in TanStack Query.
 */
export const useUIStore = create<UIState>((set) => ({
  // Public navigation
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  // Member Dashboard
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

  // Search Palette
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  // Notification Panel
  isNotificationsOpen: false,
  setNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
  toggleNotifications: () =>
    set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),

  // Modals
  activeModal: null,
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
