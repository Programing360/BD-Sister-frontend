"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  CalendarCheck,
  Store,
  Copy,
  Check,
  Share2,
  ArrowUpRight,
  MessageSquarePlus,
  Building2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/config/routes";
import { toast } from "react-toastify";

const RECENT_ACTIVITY = [
  {
    id: 1,
    title: "Registered for 'Dhaka Women Entrepreneurs Meetup 2026'",
    time: "2 hours ago",
    category: "Event",
  },
  {
    id: 2,
    title: "Updated storefront catalog for 'Deshi Craft Studio'",
    time: "Yesterday",
    category: "Business",
  },
  {
    id: 3,
    title: "Replied in 'Scaling E-Commerce Logistics Across Bangladesh'",
    time: "3 days ago",
    category: "Forum",
  },
];

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const firstName = user?.name ? user.name.trim().split(" ")[0] : "Sister";
  const wing = "TSPP (Tech & Startup Professionals)";
  const accountStatus = user?.emailVerified ? "Active & Verified" : "Verification Pending";
  const referralCode = user?.id ? `BDS-${user.id.slice(-6).toUpperCase()}` : "BDS-SISTER-842";

  const appOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "https://bdsisters.org";

  const referralUrl = `${appOrigin}/register?ref=${referralCode}`;

  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast.success("Sisterhood referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy referral link:", err);
      toast.error("Failed to copy link to clipboard.");
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-r from-purple-950/90 via-slate-900/95 to-purple-900/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-purple-400/15 blur-2xl" />

        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="primary"
                size="sm"
                className="border border-purple-400/30 bg-purple-500/20 text-purple-200"
              >
                <Sparkles className="mr-1 h-3 w-3 text-purple-300" />
                <span>Active Wing: {wing}</span>
              </Badge>

              <Badge
                variant={user?.emailVerified ? "success" : "warning"}
                size="sm"
                className="border border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
              >
                {accountStatus}
              </Badge>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Assalamu Alaikum, Sister {firstName}!
            </h1>

            <p className="max-w-2xl text-sm text-purple-100/80 sm:text-base">
              Manage your business storefronts, connect with verified sisters across Bangladesh, and
              track your upcoming community events.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href={ROUTES.public.marketplace}>
              <Button
                variant="primary"
                className="bg-purple-500 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-400 gap-1.5"
              >
                <span>Explore Marketplace</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick Stats Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Subscription Status Card */}
        <Card className="rounded-2xl border border-border/80 bg-white p-5 shadow-xs">
          <CardContent className="flex flex-row items-center gap-4 p-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-50 text-emerald-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                Subscription Status
              </p>
              <p className="mt-0.5 text-lg font-bold text-foreground">
                Active / Paid
              </p>
              <p className="text-xs text-emerald-600 font-medium">
                Annual Sisterhood Tier • Valid till Nov 2027
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Registered Events Card */}
        <Card className="rounded-2xl border border-border/80 bg-white p-5 shadow-xs">
          <CardContent className="flex flex-row items-center gap-4 p-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-50 text-purple-600">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                Registered Events
              </p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">
                4
              </p>
              <Link href={ROUTES.public.events} className="text-xs text-purple-600 hover:underline">
                View upcoming schedule →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Business Brands Card */}
        <Card className="rounded-2xl border border-border/80 bg-white p-5 shadow-xs">
          <CardContent className="flex flex-row items-center gap-4 p-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-50 text-indigo-600">
              <Store className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                Business Brands
              </p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">
                2
              </p>
              <Link href={ROUTES.member.myBusiness} className="text-xs text-indigo-600 hover:underline">
                Manage storefronts →
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Referral Link Box & Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Mandatory Referral Link Box (7 columns) */}
        <Card className="rounded-2xl border border-purple-200 bg-white shadow-xs lg:col-span-7">
          <CardHeader className="flex flex-col items-start gap-1 p-6 pb-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg font-bold text-foreground">
                  Invite a Sister (Mandatory Referral)
                </CardTitle>
              </div>
              <Badge variant="secondary" size="sm">
                6 Sisters Joined
              </Badge>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              BDSisters is an invite-only trusted community. Share your unique referral link with
              Bangladeshi women you vouch for.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 p-6 pt-2">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="flex flex-1 items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 font-mono text-xs text-purple-700 sm:text-sm truncate select-all">
                <span className="truncate">{referralUrl}</span>
              </div>

              <Button
                variant={copied ? "secondary" : "primary"}
                onClick={handleCopyReferral}
                className="shrink-0 font-medium gap-1.5"
              >
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </Button>
            </div>

            {/* Interactive Copy Feedback Banner */}
            {copied && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-50 px-3.5 py-2 text-xs text-emerald-800 animate-in fade-in-0 duration-150"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Referral link copied to clipboard! Share it safely with a trusted friend.
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Card (5 columns) */}
        <Card className="rounded-2xl border border-border/80 bg-white shadow-xs lg:col-span-5">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-lg font-bold text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-3 p-6 pt-2">
            <Link
              href={ROUTES.member.myBusiness}
              className="group flex items-center justify-between rounded-xl border border-border bg-surface/50 p-3.5 transition-all hover:border-purple-300 hover:bg-purple-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-purple-700">
                    Manage Business Storefronts
                  </p>
                  <p className="text-xs text-muted">Update catalog, inquiries &amp; trade profile</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-600" />
            </Link>

            <Link
              href={ROUTES.public.marketplace}
              className="group flex items-center justify-between rounded-xl border border-border bg-surface/50 p-3.5 transition-all hover:border-purple-300 hover:bg-purple-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-purple-700">
                    Explore Sister Marketplace
                  </p>
                  <p className="text-xs text-muted">Shop products from Muslimah entrepreneurs</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-600" />
            </Link>

            <Link
              href={ROUTES.public.community}
              className="group flex items-center justify-between rounded-xl border border-border bg-surface/50 p-3.5 transition-all hover:border-purple-300 hover:bg-purple-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <MessageSquarePlus className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-purple-700">
                    Sisterhood Community Forums
                  </p>
                  <p className="text-xs text-muted">Join discussions, advice &amp; local circles</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-600" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 4. Recent Platform Activity */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">Recent Platform Activity</h2>

        <div className="space-y-3">
          {RECENT_ACTIVITY.map((activity) => (
            <Card key={activity.id} className="rounded-xl border border-border/80 bg-white p-4 shadow-xs">
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-0">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-600" />
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="secondary" size="sm">
                    {activity.category}
                  </Badge>
                  <span className="text-xs text-muted">{activity.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}