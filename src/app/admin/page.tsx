import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Control Center"
        description="Foundation for user management, moderation queue, and platform oversight."
      />
      <Card>
        <CardHeader>
          <CardTitle>System Administration Foundation</CardTitle>
          <CardDescription>
            Administrative features will be configured alongside backend services in upcoming steps.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
