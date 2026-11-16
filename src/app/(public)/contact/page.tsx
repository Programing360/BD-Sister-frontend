"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { Alert } from "@/components/ui/alert";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import {
  Mail,
  Building2,
  HelpCircle,
  Send,
  ArrowRight,
  MessageCircle,
  Clock3,
  ShieldCheck,
  Sparkles,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  category: z.string().min(1, "Please select an inquiry category"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(15, "Message must be at least 15 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactChannels = [
  {
    title: "General Support",
    description: "Questions about membership and the platform.",
    value: siteConfig.links.supportEmail,
    icon: Mail,
    iconStyle: "bg-purple-100 text-purple-700 dark:bg-purple-400/15 dark:text-[#C4A7FF]",
    href: `mailto:${siteConfig.links.supportEmail}`,
  },
  {
    title: "Business Directory",
    description: "Help with business profiles and listings.",
    value: "directory@bdsisters.org",
    icon: Building2,
    iconStyle: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-[#E8AFC0]",
    href: "mailto:directory@bdsisters.org",
  },
  {
    title: "Community Safety",
    description: "Share a concern or report a community issue.",
    value: "safety@bdsisters.org",
    icon: ShieldCheck,
    iconStyle: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-[#9ED9B5]",
    href: "mailto:safety@bdsisters.org",
  },
];

const inquiryOptions = [
  { value: "general", label: "General Question" },
  { value: "business", label: "Business Directory Support" },
  { value: "learning", label: "Workshops & Mentorship" },
  { value: "partnership", label: "Organizational Partnership" },
  { value: "technical", label: "Website Feedback" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      category: "general",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    void _data;
    setIsSubmitting(true);
    setSubmissionNotice(null);

    // Temporary frontend-only validation demonstration.
    // Connect the API endpoint before enabling real inquiry submissions.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionNotice(
        "Your information passed validation successfully. Message delivery is not active yet. Please contact us directly using one of the email addresses provided."
      );
      reset();
    }, 600);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white text-gray-900 dark:bg-[#160D24] dark:text-[#F9F5FF]">
      <Section spacing="lg">
        <MainContainer size="lg">
          <PageHeader
            title="Contact & Support"
            description="Whether you have a question, need assistance, or want to explore a partnership, we would love to hear from you."
            breadcrumbs={
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#A99DB4]">
                <Link
                  href={ROUTES.public.home}
                  className="transition-colors hover:text-purple-700 dark:hover:text-[#C4A7FF]"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">Contact</span>
              </div>
            }
          />

          {/* Intro Banner */}
          <div
            data-aos="fade-up"
            className="relative mt-10 overflow-hidden rounded-3xl bg-[#F3EDFC] p-6 sm:p-8 lg:p-10 dark:bg-[#21152F]"
          >
            <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/15" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:bg-white/10 dark:text-[#C4A7FF]">
                  <Sparkles className="h-3.5 w-3.5" />
                  We&apos;re Here to Listen
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-[#F9F5FF]">
                  Every conversation starts with a connection.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
                  Tell us what you need. From community questions to business support, we want to
                  make your BDSisters experience better.
                </p>
              </div>

              <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-purple-700 shadow-sm md:flex dark:bg-[#2B1D38] dark:text-[#C4A7FF]">
                <MessageCircle className="h-11 w-11" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Main Contact Content */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Side */}
            <div className="space-y-8 lg:col-span-5">
              <div data-aos="fade-up">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-700 dark:text-[#C4A7FF]">
                  <Headphones className="h-4 w-4" />
                  Contact Information
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF]">
                  How Can We Help You?
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  Choose the most relevant contact channel and reach the appropriate team.
                  We&apos;re building a supportive space where every sister feels heard.
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-3">
                {contactChannels.map((channel, index) => {
                  const Icon = channel.icon;

                  return (
                    <a
                      key={channel.title}
                      href={channel.href}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="group flex items-center gap-4 rounded-2xl bg-[#F8F5FC] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-lg hover:shadow-purple-900/5 dark:bg-[#21152F] dark:hover:bg-[#2B1D38] dark:hover:shadow-black/10"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${channel.iconStyle}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-gray-900 transition-colors group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                          {channel.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-[#A99DB4]">
                          {channel.description}
                        </p>

                        <p className="mt-1 break-all text-xs font-semibold text-purple-700 dark:text-[#C4A7FF]">
                          {channel.value}
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-700 dark:text-[#9F94AC] dark:group-hover:text-[#C4A7FF]" />
                    </a>
                  );
                })}
              </div>

              {/* FAQ Card */}
              <div
                data-aos="fade-up"
                className="rounded-2xl bg-[#F3EDFC] p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/5 dark:bg-[#21152F]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-700 dark:bg-[#2B1D38] dark:text-[#C4A7FF]">
                    <HelpCircle className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-[#F9F5FF]">
                      Looking for a Quick Answer?
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-[#B8AFC3]">
                      Find helpful information about membership, community guidelines, business
                      listings, and learning opportunities.
                    </p>

                    <Link
                      href={ROUTES.public.faq}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-purple-700 transition-all hover:gap-3 dark:text-[#C4A7FF]"
                    >
                      Browse Help & FAQs
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Response Expectations */}
              <div data-aos="fade-up" className="flex items-start gap-3 px-1">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F9F5FF]">
                    Response Expectations
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-gray-500 dark:text-[#A99DB4]">
                    Our response time may vary depending on the nature of your inquiry. For urgent
                    safety concerns, use the community safety contact channel.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-7" data-aos="fade-up" data-aos-delay="100">
              <Card className="h-full rounded-3xl border-0 bg-[#F8F5FC] shadow-none dark:bg-[#21152F]">
                <CardHeader className="p-6 pb-2 sm:p-8 sm:pb-3">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/15 dark:text-[#C4A7FF]">
                    <Send className="h-5 w-5" />
                  </div>

                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-[#F9F5FF]">
                    Send Us a Message
                  </CardTitle>

                  <CardDescription className="mt-2 text-sm leading-6 text-gray-500 dark:text-[#A99DB4]">
                    Share your question or tell us how we can assist you. Please provide enough
                    details so we can understand your inquiry.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-5 sm:p-8 sm:pt-5">
                  {submissionNotice && (
                    <Alert variant="info" title="Frontend Validation Complete" className="mb-6">
                      {submissionNotice}
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField label="Full Name" required error={errors.fullName?.message}>
                        {({ id, error, "aria-describedby": ariaDescribedBy }) => (
                          <Input
                            id={id}
                            error={error}
                            aria-describedby={ariaDescribedBy}
                            placeholder="e.g. Nusrat Jahan"
                            className="border-0 bg-white shadow-none focus-visible:ring-2 focus-visible:ring-purple-300 dark:bg-[#2B1D38] dark:text-[#F9F5FF]"
                            {...register("fullName")}
                          />
                        )}
                      </FormField>

                      <FormField label="Email Address" required error={errors.email?.message}>
                        {({ id, error, "aria-describedby": ariaDescribedBy }) => (
                          <Input
                            id={id}
                            type="email"
                            error={error}
                            aria-describedby={ariaDescribedBy}
                            placeholder="your.email@example.com"
                            className="border-0 bg-white shadow-none focus-visible:ring-2 focus-visible:ring-purple-300 dark:bg-[#2B1D38] dark:text-[#F9F5FF]"
                            {...register("email")}
                          />
                        )}
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField label="Inquiry Category" required error={errors.category?.message}>
                        {({ id, error }) => (
                          <Select
                            id={id}
                            error={error}
                            options={inquiryOptions}
                            className="border-0 bg-white shadow-none dark:bg-[#2B1D38] dark:text-[#F9F5FF]"
                            {...register("category")}
                          />
                        )}
                      </FormField>

                      <FormField label="Subject" required error={errors.subject?.message}>
                        {({ id, error, "aria-describedby": ariaDescribedBy }) => (
                          <Input
                            id={id}
                            error={error}
                            aria-describedby={ariaDescribedBy}
                            placeholder="Brief topic summary..."
                            className="border-0 bg-white shadow-none focus-visible:ring-2 focus-visible:ring-purple-300 dark:bg-[#2B1D38] dark:text-[#F9F5FF]"
                            {...register("subject")}
                          />
                        )}
                      </FormField>
                    </div>

                    <FormField label="Your Message" required error={errors.message?.message}>
                      {({ id, error, "aria-describedby": ariaDescribedBy }) => (
                        <Textarea
                          id={id}
                          rows={5}
                          error={error}
                          aria-describedby={ariaDescribedBy}
                          placeholder="Tell us how we can help you..."
                          className="min-h-36 resize-y border-0 bg-white shadow-none focus-visible:ring-2 focus-visible:ring-purple-300 dark:bg-[#2B1D38] dark:text-[#F9F5FF]"
                          {...register("message")}
                        />
                      )}
                    </FormField>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={isSubmitting}
                        leftIcon={<Send className="h-4 w-4" />}
                        className="w-full border-0 bg-purple-700 text-white shadow-md shadow-purple-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 sm:w-auto dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                      >
                        Submit Inquiry
                      </Button>

                      <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-[#9F94AC]">
                        Your information should only be used to respond to your inquiry. Please
                        avoid sharing passwords or sensitive account details.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Closing CTA */}
          <div
            data-aos="fade-up"
            className="mt-14 rounded-3xl bg-[#F3EDFC] px-6 py-8 text-center sm:px-10 dark:bg-[#21152F]"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-700 dark:bg-[#2B1D38] dark:text-[#C4A7FF]">
              <HeartIcon />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl dark:text-[#F9F5FF]">
              Together, We Can Make a Difference.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
              BDSisters is built around connection, collaboration, and shared growth. We look
              forward to hearing from you.
            </p>

            <Link
              href={ROUTES.public.home}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-700 transition-all hover:gap-3 dark:text-[#C4A7FF]"
            >
              Explore BDSisters
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MainContainer>
      </Section>
    </div>
  );
}

function HeartIcon() {
  return <MessageCircle className="h-5 w-5" />;
}
