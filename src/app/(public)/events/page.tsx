import type { Metadata } from "next";
import Link from "next/link";

import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ROUTES } from "@/config/routes";

import {
  Calendar,
  MapPin,
  Clock,
  Video,
  ArrowRight,
  Filter,
  Users,
  Sparkles,
  ArrowUpRight,
  CalendarDays,
  Globe2,
  Info,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Events, Webinars & Community Gatherings",
  description:
    "Join BDSisters online webinars, business networking circles, and skill workshops across Dhaka, Chittagong, Sylhet, and online.",
};

const illustrativeEvents = [
  {
    id: "ev-1",
    title: "Islamic Business Ethics for Contemporary Digital Entrepreneurs",
    category: "Virtual Webinar",
    date: "Nov 28, 2026",
    day: "28",
    month: "NOV",
    time: "7:00 PM – 8:30 PM BST",
    location: "Zoom Video Meeting",
    isVirtual: true,
    description:
      "An open conversation exploring transparent pricing, customer relationships, and maintaining ethical values in competitive digital spaces.",
    spots: "Open Registration",
    accent: "purple",
  },
  {
    id: "ev-2",
    title: "Dhaka Sisters Meetup: Networking & Creative Collaboration",
    category: "In-Person Circle",
    date: "Dec 05, 2026",
    day: "05",
    month: "DEC",
    time: "3:30 PM – 6:00 PM BST",
    location: "Dhanmondi, Dhaka",
    isVirtual: false,
    description:
      "An informal afternoon meetup for entrepreneurs, designers, and home-based business owners to connect and explore collaborative opportunities.",
    spots: "Limited to 35 Sisters",
    accent: "rose",
  },
  {
    id: "ev-3",
    title: "Freelance Client Contracts & International Invoicing",
    category: "Masterclass",
    date: "Dec 12, 2026",
    day: "12",
    month: "DEC",
    time: "8:00 PM – 9:30 PM BST",
    location: "Google Meet",
    isVirtual: true,
    description:
      "Explore international client agreements, payment handling through banking channels, and practical ways to protect your freelance work.",
    spots: "Open Registration",
    accent: "emerald",
  },
];

const eventFilters = ["All Events", "Virtual Webinars", "In-Person Meetups", "Masterclasses"];

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <Section spacing="lg" className="relative overflow-hidden bg-white dark:bg-[#160D24]">
        <MainContainer size="lg">
          {/* Background Decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-40 -left-32 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/5"
          />

          {/* Page Header */}
          <div className="relative z-10" data-aos="fade-up">
            <PageHeader
              title="Events & Workshops"
              description="Connect, learn, and grow through virtual webinars, regional sisterhood gatherings, and practical skill workshops designed for our community."
              breadcrumbs={
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-[#A99DB4]">
                  <Link
                    href={ROUTES.public.home}
                    className="transition-colors hover:text-purple-700 dark:hover:text-[#C4A7FF]"
                  >
                    Home
                  </Link>

                  <span>/</span>

                  <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">Events</span>
                </div>
              }
              actions={
                <Link href={ROUTES.public.contact}>
                  <Button
                    variant="primary"
                    rightIcon={<Calendar className="h-4 w-4" />}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Host a Workshop
                  </Button>
                </Link>
              }
            />
          </div>

          {/* Event Introduction */}
          <section
            className="relative z-10 mt-10 overflow-hidden rounded-3xl bg-[#F8F5FC] p-6 sm:p-8 dark:bg-[#21152F]"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <Badge variant="primary" className="mb-3">
                  Come Together
                </Badge>

                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
                  Meaningful Connections Start Here.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  From professional conversations to friendly community gatherings, discover
                  opportunities to meet inspiring women, exchange ideas, and learn something new.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-[#F9F5FF]">
                    Learn Together
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-[#A99DB4]">
                    Connect & collaborate
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Event Filters */}
          <section className="relative z-10 mt-14">
            <div
              className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
              data-aos="fade-up"
            >
              <div>
                <Badge variant="secondary" className="mb-3">
                  Community Calendar
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Upcoming Events
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-[#B8AFC3]">
                  Explore gatherings and learning opportunities.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-[#C4A7FF]">
                <CalendarDays className="h-4 w-4" />
                Community Schedule
              </div>
            </div>

            <div
              className="mt-7 flex flex-col gap-4 rounded-2xl bg-[#F8F5FC] p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-[#21152F]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-[#B8AFC3]">
                  <Filter className="h-3.5 w-3.5" />
                  Filter:
                </span>

                {eventFilters.map((filter, index) => (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={index === 0}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                      index === 0
                        ? "bg-purple-700 text-white shadow-md shadow-purple-700/15 dark:bg-[#B794F6] dark:text-[#20132D]"
                        : "bg-white text-gray-600 hover:bg-purple-100 hover:text-purple-700 dark:bg-[#2B1D38] dark:text-[#B8AFC3] dark:hover:bg-[#342442] dark:hover:text-[#C4A7FF]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 dark:text-[#A99DB4]">
                Preview of community event formats
              </p>
            </div>

            <div
              className="mt-5 flex items-start gap-2 rounded-xl bg-[#F8F5FC] p-4 dark:bg-[#21152F]"
              data-aos="fade-up"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />

              <p className="text-xs leading-6 text-gray-600 dark:text-[#B8AFC3]">
                These event entries are illustrative previews for the website design. Actual event
                schedules, registration availability, venues, and meeting links will be published
                after confirmation.
              </p>
            </div>
          </section>

          {/* Event Schedule */}
          <section className="relative z-10 mt-8 space-y-5">
            {illustrativeEvents.map((event, index) => (
              <Card
                key={event.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group overflow-hidden border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-xl dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
              >
                <div className="flex flex-col gap-6 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
                  {/* Event Information */}
                  <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                    {/* Date Card */}
                    <div className="flex h-[88px] min-w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm transition-all duration-300 group-hover:scale-105 dark:bg-[#342442] dark:text-[#C4A7FF]">
                      <span className="text-xs font-bold tracking-widest">{event.month}</span>

                      <span className="mt-1 text-3xl font-black leading-none">{event.day}</span>

                      <span className="mt-1 text-[10px] font-semibold text-gray-500 dark:text-[#A99DB4]">
                        2026
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant={event.isVirtual ? "primary" : "secondary"} size="sm">
                          {event.category}
                        </Badge>

                        <span className="text-xs font-medium text-gray-500 dark:text-[#A99DB4]">
                          {event.spots}
                        </span>
                      </div>

                      <CardTitle className="text-base font-bold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF] sm:text-lg">
                        {event.title}
                      </CardTitle>

                      <CardDescription className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                        {event.description}
                      </CardDescription>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-gray-500 dark:text-[#A99DB4]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />
                          {event.time}
                        </span>

                        <span className="flex items-center gap-1.5">
                          {event.isVirtual ? (
                            <Video className="h-3.5 w-3.5 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />
                          ) : (
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-300" />
                          )}

                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Action */}
                  <div className="flex shrink-0 items-center justify-between gap-3 md:flex-col md:items-end">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#A99DB4]">
                      {event.isVirtual ? (
                        <Globe2 className="h-3.5 w-3.5" />
                      ) : (
                        <Users className="h-3.5 w-3.5" />
                      )}

                      {event.isVirtual ? "Online Event" : "Local Gathering"}
                    </span>

                    <Button
                      variant="primary"
                      size="md"
                      className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      rightIcon={<ArrowUpRight className="h-4 w-4" />}
                    >
                      RSVP / Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* Host an Event CTA */}
          <section
            className="relative z-10 mx-auto mt-20 max-w-3xl overflow-hidden rounded-3xl bg-[#F8F5FC] p-7 text-center sm:p-10 dark:bg-[#21152F]"
            data-aos="fade-up"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10"
            />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
                <Sparkles className="h-6 w-6" />
              </div>

              <Badge variant="primary" className="mb-3">
                Community Contribution
              </Badge>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF]">
                Have Something Worth Sharing?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                If you have knowledge, experience, or an inspiring idea that could benefit other
                women, we would love to hear your workshop proposal.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={ROUTES.public.contact}>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Submit Event Proposal
                  </Button>
                </Link>

                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#A99DB4]">
                  <Heart className="h-3.5 w-3.5 text-rose-500" />
                  Build connections. Create impact.
                </span>
              </div>
            </div>
          </section>

          {/* Closing Message */}
          <div className="relative z-10 mt-16 text-center" data-aos="fade-up">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
              Every Gathering Is an Opportunity to Grow.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
              Share experiences, discover new perspectives, and build meaningful relationships with
              women who inspire you.
            </p>
          </div>
        </MainContainer>
      </Section>
    </div>
  );
}
