import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/feedback/empty-state";
import { ROUTES } from "@/config/routes";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-foreground">
      <MainContainer size="sm">
        <EmptyState
          icon={<Compass className="h-6 w-6 text-primary" />}
          title="Page Not Found (404)"
          description="The sisterhood resource or page you are seeking does not exist or has been moved."
          action={
            <Link href={ROUTES.public.home}>
              <Button variant="primary">Return Home</Button>
            </Link>
          }
        />
      </MainContainer>
    </div>
  );
}
