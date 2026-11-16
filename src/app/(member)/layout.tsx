import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { requireAuth } from "@/lib/auth/server-session";

export const metadata: Metadata = {
  title: {
    template: "%s | BDSisters Member Workspace",
    default: "Member Workspace | BDSisters.org",
  },
  description:
    "Centralized digital workspace for Bangladeshi Muslim women in business, career, and community learning.",
};

async function ServerAuthGuard({ children }: { children: ReactNode }) {
  const reqHeaders = await headers();
  const currentPath = reqHeaders.get("x-bdsisters-pathname") || "/dashboard";
  await requireAuth(currentPath);

  return <>{children}</>;
}

interface MemberLayoutProps {
  children: ReactNode;
}

export default function MemberLayout({ children }: MemberLayoutProps) {
  return (
    <Suspense fallback={null}>
      <ServerAuthGuard>{children}</ServerAuthGuard>
    </Suspense>
  );
}
