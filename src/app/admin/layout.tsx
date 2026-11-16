import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-foreground">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">BDSisters Admin Console</span>
          <span className="text-xs text-muted">Role: Admin</span>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
