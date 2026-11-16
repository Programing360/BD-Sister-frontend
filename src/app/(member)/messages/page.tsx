"use client";

import { DashboardPageContainer, PlaceholderPage } from "@/components/dashboard";
import { MessageSquare } from "lucide-react";

export default function MemberMessagesPage() {
  return (
    <DashboardPageContainer>
      <PlaceholderPage
        title="Direct Messages & Inquiries"
        description="Private, moderated communication channels for peer mentorship, client questions, and community connections."
        targetStep="Step 8: Sisterhood Messaging & Collaboration"
        icon={MessageSquare}
        roadmapItems={[
          {
            title: "Safe & Moderated Direct Messaging",
            description: "Encrypted, respectful messaging adhering to BDSisters Islamic community values.",
          },
          {
            title: "Business Inquiry Routing",
            description: "Direct customer inquiries forwarded from your business directory listings.",
          },
          {
            title: "Peer Study & Circle Chats",
            description: "Private group discussions for learning cohorts and local district sisters.",
          },
          {
            title: "Spam & Safety Protection",
            description: "Automated filtering of harassment, unsolicited spam, and policy violations.",
          },
        ]}
      />
    </DashboardPageContainer>
  );
}

