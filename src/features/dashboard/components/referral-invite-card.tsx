"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Check, ShieldCheck, HeartHandshake } from "lucide-react";
import type { AuthUser } from "@/types/auth";
import { toast } from "react-toastify";

interface ReferralInviteCardProps {
  user: AuthUser | null;
}

export function ReferralInviteCard({ user }: ReferralInviteCardProps) {
  const [copied, setCopied] = useState(false);

  // Generate a predictable, unique member referral code
  const referralCode = user?.id
    ? `BDS-${user.id.slice(-6).toUpperCase()}`
    : "BDS-SISTER-2026";

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "https://bdsisters.org";

  const referralUrl = `${appUrl}/register?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast.success("Sisterhood invite link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Unable to copy to clipboard.");
    }
  };

  return (
    <Card className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-light/30 via-surface to-background p-6 shadow-xs">
      <CardHeader className="p-0 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-foreground">
                Invite a Sister (Sisterhood Referral)
              </CardTitle>
              <CardDescription className="text-xs text-muted">
                BDSisters is a trusted community for Bangladeshi women in business and career.
              </CardDescription>
            </div>
          </div>

          <Badge variant="primary" size="sm" className="text-[10px] shrink-0">
            <HeartHandshake className="h-3 w-3 mr-1" />
            Invite Only Network
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        <p className="text-xs text-muted leading-relaxed">
          Share your verified sisterhood referral link with women entrepreneurs, freelancers, and professionals you vouch for.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-mono text-primary select-all truncate">
            {referralUrl}
          </div>

          <Button
            type="button"
            variant={copied ? "secondary" : "primary"}
            size="sm"
            onClick={handleCopy}
            className="shrink-0 gap-1.5"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </Button>
        </div>

        {copied && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-success/30 bg-success-light/30 p-2.5 text-xs text-success animate-in fade-in-0 duration-150"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Referral link copied! Share it safely with a trusted sister.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
