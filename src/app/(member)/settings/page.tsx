"use client";

import { DashboardPageContainer, PlaceholderPage } from "@/components/dashboard";
import { Settings } from "lucide-react";

export default function MemberSettingsPage() {
  return (
    <DashboardPageContainer>
      <PlaceholderPage
        title="Account Preferences & Security"
        description="Configure your account credentials, security preferences, session tokens, and privacy controls."
        targetStep="Step 9: Account Settings & Security Hub"
        icon={Settings}
        roadmapItems={[
          {
            title: "Password & Credential Updates",
            description: "Change password, update recovery emails, and configure two-factor authentication.",
          },
          {
            title: "Notification & Communication Preferences",
            description: "Choose between instant email alerts, daily digests, or in-app only updates.",
          },
          {
            title: "Active Sessions & Device Management",
            description: "View active browser logins, IP origins, and revoke unfamiliar sessions remotely.",
          },
          {
            title: "Account Data Export & Privacy",
            description: "Download a copy of your community activity and manage data retention policies.",
          },
        ]}
      />
    </DashboardPageContainer>
  );
}

