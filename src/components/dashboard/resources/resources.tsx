"use client";

import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FileText,
  PlayCircle,
  BookOpen,
  Download,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
  X,
  ExternalLink,
  FolderOpen,
} from "lucide-react";
import { Button, Input, Modal, Chip } from "@heroui/react";

// --- Types ---
type ResourceType = "PDF" | "Video" | "Article";

interface LibraryResource {
  id: string;
  title: string;
  type: ResourceType;
  wingCategory: string;
  author: string;
  durationOrSize: string;
  description: string;
  thumbnailUrl: string;
  downloadCount: number;
  previewContent: string;
}

interface ToastMessage {
  id: string;
  title: string;
  description: string;
}

// --- Mock Curated Resources ---
const RESOURCES_DATA: LibraryResource[] = [
  {
    id: "res-1",
    title: "Trade License, TIN & Women SME Bank Loan Checklist (Bangladesh 2026)",
    type: "PDF",
    wingCategory: "Sisters in Business",
    author: "Barrister Nabila Chowdhury",
    durationOrSize: "2.4 MB • 18 Pages",
    description:
      "Step-by-step legal and financial handbook covering City Corporation Trade Licenses, e-TIN registration, and collateral-free SME loans for Bangladeshi women founders.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    downloadCount: 412,
    previewContent:
      "Includes downloadable document checklists for Dhaka North/South City Corporations, Bangladesh Bank SME refinance schemes, and DBID registration steps.",
  },
  {
    id: "res-2",
    title: "Masterclass: Product Photography at Home Using Only Natural Window Light",
    type: "Video",
    wingCategory: "Skills Exchange",
    author: "Raisa Tabassum (Studio Dhaka)",
    durationOrSize: "34 mins • 1080p HD",
    description:
      "Learn how to style and shoot sarees, jewelry, and baked goods with your smartphone and a simple white reflector board—no expensive studio gear required.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    downloadCount: 689,
    previewContent:
      "Chapters: (00:00) Setting up side window lighting, (11:20) Flat-lay composition for fabrics & food, (24:10) Free mobile color-grading workflow.",
  },
  {
    id: "res-3",
    title: "Prophetic Du'as & Emotional Resilience for Overwhelmed Mothers",
    type: "Article",
    wingCategory: "Faith & Personal Growth",
    author: "Ustadha Maryam Siddiqua",
    durationOrSize: "7 min read",
    description:
      "A grounding spiritual reflection pairing authentic Sunnah supplications with practical emotional regulation habits during demanding seasons of motherhood.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80",
    downloadCount: 530,
    previewContent:
      "Explores the prophetic practice of Tasbih Fatimi before sleep, setting compassionate household boundaries, and turning daily caretaking into active ibadah.",
  },
  {
    id: "res-4",
    title: "Monthly Profit, Cost & Inventory Tracker Spreadsheet + Guide",
    type: "PDF",
    wingCategory: "Sisters in Business",
    author: "Tania Islam, FCMA",
    durationOrSize: "1.8 MB • Workbook + PDF",
    description:
      "Stop guessing your real profit margins. Calculate unit COGS, packaging, courier return losses, and net monthly profit with clear examples.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    downloadCount: 375,
    previewContent:
      "Covers fixed vs. variable cost separation, pricing formulas for retail vs. wholesale buyers, and cashflow buffer planning.",
  },
  {
    id: "res-5",
    title: "PCOS & Postpartum Nutrition: Balanced Bangladeshi Home Meal Blueprint",
    type: "Article",
    wingCategory: "Health & Wellness",
    author: "Dr. Samia Rahman (Clinical Nutritionist)",
    durationOrSize: "9 min read",
    description:
      "Sustainable, affordable meal prep using everyday Bangladeshi staples—red rice, local fish, lentils, and seasonal greens—for hormone and energy balance.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
    downloadCount: 498,
    previewContent:
      "Includes a 7-day Sehri/Breakfast, Lunch, and Dinner plate guide tailored for busy homemakers and working professionals.",
  },
  {
    id: "res-6",
    title: "Workshop Recording: Launching Your Online Store on BDSisters Marketplace",
    type: "Video",
    wingCategory: "Skills Exchange",
    author: "BDSisters Onboarding Team",
    durationOrSize: "22 mins • Walkthrough",
    description:
      "Complete guided tour on setting up your Business Profile, configuring wholesale tiers, and fulfilling SSLCommerz & COD orders smoothly.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    downloadCount: 294,
    previewContent:
      "Walks through storefront branding, writing high-converting product descriptions, and packing standards for nationwide shipping.",
  },
];

const TYPE_BADGE_STYLES: Record<
  ResourceType,
  { icon: React.ElementType; badgeClass: string; actionLabel: string }
> = {
  PDF: {
    icon: FileText,
    badgeClass: "bg-white text-purple-950 shadow-lg shadow-purple-950/20",
    actionLabel: "Download PDF",
  },
  Video: {
    icon: PlayCircle,
    badgeClass: "bg-purple-950 text-white shadow-lg shadow-purple-950/30",
    actionLabel: "Watch Now",
  },
  Article: {
    icon: BookOpen,
    badgeClass: "bg-purple-100 text-purple-950 shadow-lg shadow-purple-950/15",
    actionLabel: "Read Guide",
  },
};

export default function ResourceLibraryPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<LibraryResource[]>(RESOURCES_DATA);
  const [activeResourceModal, setActiveResourceModal] = useState<LibraryResource | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = (title: string, description: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesType = selectedType === "All" || item.type === selectedType;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.wingCategory.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [resources, selectedType, searchQuery]);

  const handleResourceAction = (resource: LibraryResource) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );

    if (resource.type === "PDF") {
      const blob = new Blob(
        [
          `BDSISTERS.ORG CURATED RESOURCE\n\nTitle: ${resource.title}\nAuthor: ${resource.author}\nCategory: ${resource.wingCategory}\n\nSummary:\n${resource.description}\n\nHighlights:\n${resource.previewContent}`,
        ],
        { type: "text/plain;charset=utf-8" }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      pushToast("Download Started", `"${resource.title}" has been saved to your device.`);
    } else {
      setActiveResourceModal(resource);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50/40 px-4 py-6 text-purple-950 sm:px-6 lg:px-10">
      {/* Floating Toast Stack */}
      <div
        aria-live="polite"
        className="fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2.5 sm:right-6 sm:bottom-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-purple-950/20"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-900" />
            <div className="flex-1">
              <p className="text-sm font-bold text-purple-950">{toast.title}</p>
              <p className="mt-0.5 text-xs text-purple-900/75">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="rounded-lg p-1 text-purple-900/60 transition hover:bg-purple-100 hover:text-purple-950"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        {/* 1. Hero Header Banner */}
        <header
          data-aos="fade-down"
          className="relative overflow-hidden rounded-3xl bg-purple-950 p-6 text-white shadow-xl shadow-purple-950/25 sm:p-9"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-800/40 blur-3xl" />

          <div className="relative space-y-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-purple-100 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>KNOWLEDGE VAULT & PLAYBOOKS</span>
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Sisterhood Resource Library
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-purple-100/90 sm:text-base">
              Curated PDF checklists, video workshops, and practical guides created by experienced
              Bangladeshi women leaders and mentors.
            </p>
          </div>
        </header>

        {/* 2. Category Tabs & Search */}
        <section
          data-aos="fade-up"
          className="flex flex-col justify-between gap-4 rounded-3xl bg-white p-5 shadow-lg shadow-purple-950/10 sm:flex-row sm:items-center sm:p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            {["All", "PDF", "Video", "Article"].map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    isActive
                      ? "bg-purple-950 text-white shadow-lg shadow-purple-950/25"
                      : "bg-purple-50 text-purple-950 hover:bg-purple-100"
                  }`}
                >
                  {type === "All" ? "All Formats" : `${type}s`}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-purple-900/50" />
            <Input
              aria-label="Search resource library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, PDFs, videos..."
              className="w-full rounded-2xl bg-purple-50/60 py-2.5 pr-4 pl-11 text-sm font-medium text-purple-950 placeholder:text-purple-900/45 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-lg focus:shadow-purple-950/15 focus:outline-none"
            />
          </div>
        </section>

        {/* 3. Resource Cards Grid */}
        {filteredResources.length === 0 ? (
          <div className="rounded-3xl bg-white p-14 text-center shadow-lg shadow-purple-950/10">
            <FolderOpen className="mx-auto mb-3 h-12 w-12 text-purple-300" />
            <h3 className="text-lg font-bold text-purple-950">No Matching Resources</h3>
            <p className="mt-1 text-sm text-purple-900/75">
              Try switching to &ldquo;All Formats&rdquo; or clearing your search term.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, idx) => {
              const meta = TYPE_BADGE_STYLES[resource.type];
              const TypeIcon = meta.icon;

              return (
                <article
                  key={resource.id}
                  data-aos="fade-up"
                  data-aos-delay={(idx % 3) * 70}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg shadow-purple-950/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20"
                >
                  <div>
                    {/* Thumbnail & Format Badge */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-purple-100">
                      <img
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <Chip
                        className={`absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-md ${meta.badgeClass}`}
                      >
                        <TypeIcon className="h-3.5 w-3.5" />
                        <span>{resource.type}</span>
                      </Chip>

                      <span className="absolute right-3.5 bottom-3.5 rounded-xl bg-white/95 px-3 py-1 text-[11px] font-bold text-purple-950 shadow-lg shadow-purple-950/15 backdrop-blur-md">
                        {resource.wingCategory}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 p-6">
                      <h2 className="line-clamp-2 text-base font-extrabold leading-snug text-purple-950 sm:text-lg">
                        {resource.title}
                      </h2>

                      <p className="line-clamp-3 text-xs leading-relaxed text-purple-950/75 sm:text-sm">
                        {resource.description}
                      </p>

                      <div className="space-y-1.5 pt-1 text-xs font-semibold text-purple-900/75">
                        <p className="flex items-center gap-1.5">
                          <UserCheck className="h-3.5 w-3.5 text-purple-950" />
                          <span>{resource.author}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-purple-950" />
                          <span>{resource.durationOrSize}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="flex items-center justify-between gap-3 bg-purple-50/50 px-6 py-4">
                    <span className="text-xs font-semibold text-purple-900/70">
                      {resource.downloadCount} accesses
                    </span>

                    <Button
                      type="button"
                      size="sm"
                      onPress={() => handleResourceAction(resource)}
                      className="rounded-xl bg-purple-950 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-950/25 transition hover:bg-purple-900"
                    >
                      {resource.type === "PDF" ? (
                        <Download className="h-3.5 w-3.5" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      {meta.actionLabel}
                    </Button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>

      {/* VIDEO / ARTICLE VIEWER MODAL (HeroUI v3 Compound Modal) */}
      <Modal
        isOpen={!!activeResourceModal}
        onOpenChange={(open) => {
          if (!open) setActiveResourceModal(null);
        }}
      >
        <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/55 p-4 backdrop-blur-sm">
          <Modal.Container className="w-full max-w-2xl">
            {activeResourceModal && (
              <Modal.Dialog className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-950/35">
                <div className="relative aspect-video w-full bg-purple-950">
                  <img
                    src={activeResourceModal.thumbnailUrl}
                    alt={activeResourceModal.title}
                    className="h-full w-full object-cover opacity-55"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {activeResourceModal.type === "Video" ? (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-purple-950 shadow-xl shadow-purple-950/40">
                        <PlayCircle className="h-9 w-9" />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-purple-950 shadow-xl shadow-purple-950/40">
                        <BookOpen className="h-8 w-8" />
                      </div>
                    )}
                    <span className="mt-3 rounded-full bg-purple-950/90 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-purple-950/30">
                      {activeResourceModal.type} • {activeResourceModal.durationOrSize}
                    </span>
                  </div>

                  <Modal.CloseTrigger
                    className="absolute top-4 right-4 rounded-xl bg-white/95 p-2 text-purple-950 shadow-lg shadow-purple-950/20 transition hover:bg-white"
                    aria-label="Close viewer"
                  >
                    <X className="h-4 w-4" />
                  </Modal.CloseTrigger>
                </div>

                <div className="space-y-4 p-6 sm:p-8">
                  <Modal.Header className="block">
                    <span className="text-xs font-bold text-purple-900">
                      {activeResourceModal.wingCategory} • By {activeResourceModal.author}
                    </span>
                    <Modal.Heading className="mt-1 text-xl font-extrabold text-purple-950">
                      {activeResourceModal.title}
                    </Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="space-y-4">
                    <p className="text-sm leading-relaxed text-purple-950/80">
                      {activeResourceModal.description}
                    </p>

                    <div className="rounded-2xl bg-purple-50 p-4 shadow-md shadow-purple-950/5">
                      <p className="text-xs font-bold tracking-wider text-purple-950 uppercase">
                        Key Highlights & Outline
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-purple-950/85">
                        {activeResourceModal.previewContent}
                      </p>
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onPress={() => setActiveResourceModal(null)}
                      className="rounded-xl bg-purple-950 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-950/25 hover:bg-purple-900"
                    >
                      Done Reading
                    </Button>
                  </Modal.Footer>
                </div>
              </Modal.Dialog>
            )}
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
