"use client";

import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  MessageSquare,
  Heart,
  Plus,
  Search,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
} from "lucide-react";
import { Button, Input, TextArea, Description, Select, Label, ListBox, Modal } from "@heroui/react";

// --- Types ---
type CommunityWing =
  | "Faith & Personal Growth"
  | "Family & Parenting"
  | "Sisters in Business"
  | "Health & Wellness"
  | "Skills Exchange";

interface ForumComment {
  id: string;
  authorName: string;
  authorRole: string;
  timestamp: string;
  content: string;
}

interface ForumTopic {
  id: string;
  title: string;
  wing: CommunityWing;
  authorName: string;
  authorWingBadge: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: ForumComment[];
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description: string;
}

// --- Constants ---
const COMMUNITY_WINGS: CommunityWing[] = [
  "Faith & Personal Growth",
  "Family & Parenting",
  "Sisters in Business",
  "Health & Wellness",
  "Skills Exchange",
];

const INITIAL_TOPICS: ForumTopic[] = [
  {
    id: "topic-1",
    title: "Best nationwide courier partners for fragile handmade products in Bangladesh?",
    wing: "Sisters in Business",
    authorName: "Nusrat Jahan Chowdhury",
    authorWingBadge: "Verified Founder",
    timestamp: "2 hours ago",
    content:
      "Assalamu Alaikum sisters! We are scaling our Jamdani and terracotta home decor orders outside Dhaka (especially Sylhet, Rajshahi, and Khulna). Which courier services have given you the lowest return rates and safest fragile handling this year?",
    likes: 34,
    isLiked: true,
    comments: [
      {
        id: "c-101",
        authorName: "Farhana Yasmin",
        authorRole: "Organic Sunnah Pantry",
        timestamp: "1 hour ago",
        content:
          "Wa Alaikum Assalam! For our glass honey jars, Steadfast and Pathao Merchant with double bubble-wrap + 'Fragile' stickers have kept our breakage under 1%.",
      },
      {
        id: "c-102",
        authorName: "Sadia Afrin",
        authorRole: "Aroshia Botanicals",
        timestamp: "42 mins ago",
        content:
          "Make sure to enable automated WhatsApp delivery confirmation before dispatch—it reduced our COD cancellations by nearly 30%.",
      },
    ],
  },
  {
    id: "topic-2",
    title: "Balancing Fajr routine, toddler homeschooling, and remote freelance deadlines",
    wing: "Family & Parenting",
    authorName: "Dr. Tahmina Akter",
    authorWingBadge: "TSPP Mentor",
    timestamp: "5 hours ago",
    content:
      "For mothers working from home: what does your realistic daily block schedule look like? Looking for practical tips on protecting deep-work hours after Fajr without burning out by Maghrib.",
    likes: 52,
    isLiked: false,
    comments: [
      {
        id: "c-201",
        authorName: "Maliha Rahman",
        authorRole: "UI/UX Designer",
        timestamp: "3 hours ago",
        content:
          "Blocking 6:00 AM to 8:30 AM right after Fajr for high-focus client work before the kids wake up completely changed my stress levels.",
      },
    ],
  },
  {
    id: "topic-3",
    title: "Weekly Tafsir & Journaling Circle — Reflections on Surah Al-Hujurat",
    wing: "Faith & Personal Growth",
    authorName: "Ustadha Maryam Siddiqua",
    authorWingBadge: "CoP Lead",
    timestamp: "Yesterday",
    content:
      "As our sisterhood grows across districts, Surah Al-Hujurat reminds us of adab, verifying news before sharing, and avoiding suspicion. Share one ayah or lesson you are actively practicing this week.",
    likes: 68,
    isLiked: false,
    comments: [],
  },
  {
    id: "topic-4",
    title:
      "Skill Swap: Offering Next.js / React portfolio audits in exchange for Bangla copywriting",
    wing: "Skills Exchange",
    authorName: "Tasnim Ferdous",
    authorWingBadge: "Full-Stack Dev",
    timestamp: "2 days ago",
    content:
      "I would love to help 3 sister-led brands optimize their landing page speed and mobile UI. In return, I am looking for help refining warm, natural Bengali product storytelling.",
    likes: 29,
    isLiked: false,
    comments: [],
  },
];

export default function CommunityForumsPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // --- Filter & Search States ---
  const [selectedWing, setSelectedWing] = useState<string>("All Wings");
  const [searchQuery, setSearchQuery] = useState("");

  // --- Topics & Comments State ---
  const [topics, setTopics] = useState<ForumTopic[]>(INITIAL_TOPICS);
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({
    "topic-1": true,
  });
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  // --- Create Topic Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newWing, setNewWing] = useState<CommunityWing>("Sisters in Business");
  const [newContent, setNewContent] = useState("");

  // --- Toast Notifications ---
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = (type: ToastMessage["type"], title: string, description: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- Filtered Topics ---
  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesWing = selectedWing === "All Wings" || topic.wing === selectedWing;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        topic.title.toLowerCase().includes(q) ||
        topic.content.toLowerCase().includes(q) ||
        topic.authorName.toLowerCase().includes(q);
      return matchesWing && matchesSearch;
    });
  }, [topics, selectedWing, searchQuery]);

  // --- Handlers ---
  const toggleLike = (topicId: string) => {
    setTopics((prev) =>
      prev.map((topic) => {
        if (topic.id !== topicId) return topic;
        const nextLiked = !topic.isLiked;
        return {
          ...topic,
          isLiked: nextLiked,
          likes: nextLiked ? topic.likes + 1 : topic.likes - 1,
        };
      })
    );
  };

  const toggleComments = (topicId: string) => {
    setExpandedTopicIds((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleAddComment = (topicId: string) => {
    const text = (commentDrafts[topicId] || "").trim();
    if (!text) return;

    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      authorName: "Nusrat Jahan (You)",
      authorRole: "Verified Member",
      timestamp: "Just now",
      content: text,
    };

    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId ? { ...topic, comments: [...topic.comments, newComment] } : topic
      )
    );

    setCommentDrafts((prev) => ({ ...prev, [topicId]: "" }));
    setExpandedTopicIds((prev) => ({ ...prev, [topicId]: true }));

    pushToast("success", "Reply Posted", "Your response has been added to the sisterhood thread.");
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim() || !newContent.trim()) {
      pushToast(
        "error",
        "Incomplete Discussion",
        "Please enter both a topic title and your message."
      );
      return;
    }

    const created: ForumTopic = {
      id: `topic-${Date.now()}`,
      title: newTitle.trim(),
      wing: newWing,
      authorName: "Nusrat Jahan Chowdhury",
      authorWingBadge: "Verified Member",
      timestamp: "Just now",
      content: newContent.trim(),
      likes: 1,
      isLiked: true,
      comments: [],
    };

    setTopics((prev) => [created, ...prev]);
    setNewTitle("");
    setNewContent("");
    setIsModalOpen(false);
    setSelectedWing("All Wings");

    pushToast("success", "Discussion Published", `Your thread is now live in ${created.wing}.`);
  };

  return (
    <div className="min-h-screen px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
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
            {toast.type === "success" && (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
            )}
            <div className="flex-1">
              <p className="text-sm font-bold text-purple-950">{toast.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* 1. Hero Header Banner */}
        <header
          data-aos="fade-down"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-6 text-white shadow-xl shadow-purple-950/25 sm:p-9"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-purple-100 backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 text-purple-300" />
                <span>VERIFIED SISTERHOOD CIRCLES</span>
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Community Forums & Wing Discussions
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-purple-100/90 sm:text-base">
                A safe, respectful space for Bangladeshi women to seek advice, exchange skills, and
                grow together across specialized wings.
              </p>
            </div>

            <Button
              type="button"
              onPress={() => setIsModalOpen(true)}
              className="shrink-0 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-purple-950 shadow-lg shadow-purple-950/35 transition hover:bg-purple-50"
            >
              <Plus className="h-4 w-4 text-purple-900" />
              Create New Topic
            </Button>
          </div>
        </header>

        {/* 2. Wing Filter Tabs & Search Bar */}
        <section
          data-aos="fade-up"
          className="space-y-4 rounded-3xl bg-white p-5 shadow-lg shadow-purple-950/10 sm:p-7"
        >
          {/* Wing Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {["All Wings", ...COMMUNITY_WINGS].map((wing) => {
              const isActive = selectedWing === wing;
              return (
                <button
                  key={wing}
                  type="button"
                  onClick={() => setSelectedWing(wing)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    isActive
                      ? "bg-purple-950 text-white shadow-md shadow-purple-950/25"
                      : "bg-purple-50/80 text-purple-950 hover:bg-purple-100"
                  }`}
                >
                  {wing}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
            <Input
              aria-label="Search discussions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions by keyword, advice topic, or sister's name..."
              className="w-full rounded-2xl bg-slate-50 py-2.5 pr-4 pl-11 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
            />
          </div>
        </section>

        {/* 3. Discussion Feed */}
        <section className="space-y-6">
          {filteredTopics.length === 0 ? (
            <div className="rounded-3xl bg-white p-14 text-center shadow-lg shadow-purple-950/10">
              <MessageSquare className="mx-auto mb-3 h-11 w-11 text-purple-300" />
              <h3 className="text-lg font-bold text-purple-950">No Discussions Found</h3>
              <p className="mt-1 text-sm text-slate-600">
                Be the first to start a conversation in this wing!
              </p>
            </div>
          ) : (
            filteredTopics.map((topic, index) => {
              const isExpanded = !!expandedTopicIds[topic.id];
              const draft = commentDrafts[topic.id] || "";

              return (
                <article
                  key={topic.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 60}
                  className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 transition-all hover:shadow-xl hover:shadow-purple-950/15 sm:p-8"
                >
                  {/* Author & Wing Metadata */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-950 text-sm font-extrabold text-white shadow-md shadow-purple-950/20">
                        {topic.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold text-purple-950">
                            {topic.authorName}
                          </span>
                          <span className="rounded-lg bg-purple-100 px-2.5 py-0.5 text-[11px] font-bold text-purple-900">
                            {topic.authorWingBadge}
                          </span>
                        </div>
                        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-slate-500">
                          <Clock className="h-3 w-3 text-purple-800" />
                          <span>{topic.timestamp}</span>
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1.5 text-xs font-bold text-purple-950 shadow-sm shadow-purple-950/5">
                      <Layers className="h-3.5 w-3.5 text-purple-800" />
                      {topic.wing}
                    </span>
                  </div>

                  {/* Topic Title & Body */}
                  <div className="space-y-2.5">
                    <h2 className="text-lg font-extrabold leading-snug text-slate-900 sm:text-xl">
                      {topic.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                      {topic.content}
                    </p>
                  </div>

                  {/* Engagement Action Bar */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleLike(topic.id)}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                          topic.isLiked
                            ? "bg-purple-950 text-white shadow-md shadow-purple-950/20"
                            : "bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-950"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${topic.isLiked ? "fill-white text-white" : ""}`}
                        />
                        <span>{topic.likes} Helpful</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleComments(topic.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-purple-50 px-4 py-2 text-xs font-bold text-purple-950 transition hover:bg-purple-100"
                      >
                        <MessageSquare className="h-4 w-4 text-purple-800" />
                        <span>{topic.comments.length} Replies</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Threaded Comments Section */}
                  {isExpanded && (
                    <div className="mt-5 space-y-4 rounded-2xl bg-purple-50/60 p-4 shadow-inner shadow-purple-950/5 sm:p-5">
                      {topic.comments.length === 0 ? (
                        <p className="text-xs font-medium text-slate-600">
                          No replies yet. Be the first sister to share your thoughts below!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {topic.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="rounded-2xl bg-white p-4 shadow-md shadow-purple-950/5"
                            >
                              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-extrabold text-purple-950">
                                    {comment.authorName}
                                  </span>
                                  <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-900">
                                    {comment.authorRole}
                                  </span>
                                </div>
                                <span className="text-[11px] font-medium text-slate-400">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                                {comment.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="flex flex-col gap-2.5 sm:flex-row">
                        <Input
                          aria-label="Write a reply"
                          value={draft}
                          onChange={(e) =>
                            setCommentDrafts((prev) => ({
                              ...prev,
                              [topic.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddComment(topic.id);
                            }
                          }}
                          placeholder="Write a supportive reply..."
                          className="flex-1 rounded-xl bg-white px-4 py-2.5 text-xs font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:shadow-md focus:shadow-purple-900/15 focus:outline-none sm:text-sm"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onPress={() => handleAddComment(topic.id)}
                          className="rounded-xl bg-purple-950 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-950/20 hover:bg-purple-900"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>
      </div>

      {/* CREATE NEW TOPIC MODAL (HeroUI v3 Compound Modal) */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/50 p-4 backdrop-blur-sm">
          <Modal.Container className="w-full max-w-xl">
            <Modal.Dialog className="rounded-3xl bg-white p-6 shadow-2xl shadow-purple-950/30 sm:p-8">
              <Modal.Header className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-950 text-white shadow-md shadow-purple-950/25">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <Modal.Heading className="text-lg font-extrabold text-purple-950">
                      Start a New Discussion
                    </Modal.Heading>
                    <p className="text-xs font-medium text-slate-500">
                      Visible to verified BDSisters members
                    </p>
                  </div>
                </div>

                <Modal.CloseTrigger
                  className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-purple-100 hover:text-purple-950"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </Modal.CloseTrigger>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleCreateTopic} className="space-y-5">
                  {/* Wing Select (HeroUI v3 Compound Pattern) */}
                  <Select
                    className="w-full"
                    value={newWing}
                    onChange={(val) => {
                      if (val) setNewWing(String(val) as CommunityWing);
                    }}
                    placeholder="Select community wing"
                  >
                    <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                      Select Wing <span className="text-purple-700">*</span>
                    </Label>
                    <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm shadow-purple-950/5">
                      <Select.Value />
                      <Select.Indicator className="text-purple-900" />
                    </Select.Trigger>
                    <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/20">
                      <ListBox>
                        {COMMUNITY_WINGS.map((w) => (
                          <ListBox.Item
                            key={w}
                            id={w}
                            textValue={w}
                            className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                          >
                            <span>{w}</span>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Topic Title */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="topic-title" className="text-xs font-bold text-purple-950">
                      Discussion Title <span className="text-purple-700">*</span>
                    </Label>
                    <Input
                      id="topic-title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Ask a question, share a win, or propose a topic..."
                      className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Topic Body (HeroUI v3 TextArea + Description) */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="topic-body" className="text-xs font-bold text-purple-950">
                      Message / Details (Markdown supported){" "}
                      <span className="text-purple-700">*</span>
                    </Label>
                    <TextArea
                      id="topic-body"
                      aria-describedby="topic-body-desc"
                      rows={5}
                      maxLength={1200}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Share context, links, or questions clearly so sisters can give helpful feedback..."
                      className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                      required
                    />
                    <Description
                      id="topic-body-desc"
                      className="text-right text-[11px] font-medium text-slate-500"
                    >
                      {newContent.length} / 1200 characters
                    </Description>
                  </div>

                  <Modal.Footer className="flex items-center justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      onPress={() => setIsModalOpen(false)}
                      className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-xl bg-purple-950 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-950/25 hover:bg-purple-900"
                    >
                      Publish Thread
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
