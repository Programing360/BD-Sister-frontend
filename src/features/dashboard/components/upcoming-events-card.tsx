"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/routes";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import type { UpcomingEventItem } from "../types";

interface UpcomingEventsCardProps {
  events: UpcomingEventItem[];
}

export function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <Card className="rounded-3xl border border-border/80 bg-surface/40 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="p-0 pb-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
              <CardTitle className="text-sm font-bold text-foreground">
                Upcoming Community Workshops
              </CardTitle>
            </div>
            <Link
              href={ROUTES.public.events}
              className="text-[11px] font-semibold text-primary hover:underline"
            >
              View calendar →
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-3.5">
          {events.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted">
              No upcoming events scheduled right now. Check back soon for new webinars.
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="group rounded-2xl border border-border/70 bg-background/80 p-3.5 transition-all hover:border-primary/40 hover:shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge variant="secondary" size="sm" className="text-[10px]">
                    {event.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-[10px] text-muted">
                    <Users className="h-3 w-3" />
                    {event.attendeesCount} sisters
                  </span>
                </div>

                <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {event.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-primary" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </div>

      <div className="pt-4 mt-2 border-t border-border/60">
        <Link href={ROUTES.public.events} className="block w-full">
          <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
            <span>Browse All Community Events</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

