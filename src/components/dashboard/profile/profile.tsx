"use client";

import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Camera,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Plus,
  Trash2,
  Lock,
  Globe,
  Link2,
  GraduationCap,
  Wrench,
  Laptop,
  Target,
  Download,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  Input,
  TextArea,
  Description,
  Checkbox,
  Select,
  Label,
  ListBox,
  Chip,
} from "@heroui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

// --- Types ---
interface EmailEntry {
  id: string;
  address: string;
  isPublic: boolean;
}

type SocialPlatform = "linkedin" | "facebook" | "instagram" | "youtube" | "website";

interface WebProfileEntry {
  id: string;
  platform: SocialPlatform;
  url: string;
}

interface SkillEntry {
  id: string;
  name: string;
  level: number;
}

interface GoalEntry {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
}

// --- Constants & Options ---
const COUNTRIES = ["Bangladesh", "United Kingdom", "United States", "Canada", "UAE", "Australia"];

const DISTRICTS_BY_COUNTRY: Record<string, string[]> = {
  Bangladesh: [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ],
  "United Kingdom": ["London", "Birmingham", "Manchester", "Leeds"],
  "United States": ["New York", "Texas", "California", "Michigan"],
  Canada: ["Ontario", "British Columbia", "Alberta", "Quebec"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
  Australia: ["New South Wales", "Victoria", "Queensland"],
};

const EDUCATIONAL_GENRES = [
  "Islamic Studies & Fiqh",
  "Business & Entrepreneurship",
  "Software Engineering & AI",
  "Digital Marketing & E-Commerce",
  "Graphic Design & UI/UX",
  "Culinary Arts & Baking",
  "Fashion & Textile Design",
  "Finance & Accounting",
  "Healthcare & Nutrition",
  "Parenting & Child Psychology",
];

const PLATFORM_META: Record<
  SocialPlatform,
  { label: string; icon: React.ElementType; placeholder: string; badgeClass: string }
> = {
  linkedin: {
    label: "LinkedIn",
    icon: FaLinkedin,
    placeholder: "https://linkedin.com/in/username",
    badgeClass: "bg-purple-950 text-white shadow-md shadow-purple-950/25",
  },
  facebook: {
    label: "Facebook",
    icon: FaFacebook,
    placeholder: "https://facebook.com/username",
    badgeClass: "bg-purple-900 text-white shadow-md shadow-purple-900/25",
  },
  instagram: {
    label: "Instagram",
    icon: FaInstagram,
    placeholder: "https://instagram.com/username",
    badgeClass: "bg-purple-800 text-white shadow-md shadow-purple-800/25",
  },
  youtube: {
    label: "YouTube",
    icon: FaYoutube,
    placeholder: "https://youtube.com/@channel",
    badgeClass: "bg-purple-950 text-white shadow-md shadow-purple-950/25",
  },
  website: {
    label: "Personal / Brand Website",
    icon: Globe,
    placeholder: "https://yourbrand.com",
    badgeClass: "bg-purple-900 text-white shadow-md shadow-purple-900/25",
  },
};

export default function MemberProfileBuilderPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // --- 1. Basic Info State ---
  const [fullName, setFullName] = useState("Nusrat Jahan Chowdhury");
  const [bio, setBio] = useState(
    "Founder of Deshi Craft Studio & Tech Community Mentor. Passionate about empowering Bangladeshi women entrepreneurs through ethical e-commerce and digital literacy."
  );
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Location (Strictly District, State/Division, Country — No Street Address)
  const [country, setCountry] = useState<string | null>("Bangladesh");
  const [stateDivision, setStateDivision] = useState("Dhaka Division");
  const [district, setDistrict] = useState<string | null>("Dhaka");

  // --- 2. Contact & Privacy Toggles (Default: Private / false) ---
  const [phone, setPhone] = useState("+880 1711-000000");
  const [isPhonePublic, setIsPhonePublic] = useState(false);

  const [whatsapp, setWhatsapp] = useState("+880 1711-000000");
  const [isWhatsappPublic, setIsWhatsappPublic] = useState(false);

  const [emails, setEmails] = useState<EmailEntry[]>([
    { id: "e-1", address: "nusrat@bdsisters.org", isPublic: false },
  ]);

  // --- 3. Web Profiles & New Media ---
  const [webProfiles, setWebProfiles] = useState<WebProfileEntry[]>([
    { id: "w-1", platform: "linkedin", url: "https://linkedin.com/in/nusrat-jahan" },
    { id: "w-2", platform: "website", url: "https://deshicraftstudio.com" },
  ]);

  // --- 4. Educational Subjects & Skill Bars ---
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Business & Entrepreneurship",
    "Digital Marketing & E-Commerce",
    "Software Engineering & AI",
  ]);

  const [vocationalSkills, setVocationalSkills] = useState<SkillEntry[]>([
    { id: "v-1", name: "Handloom & Boutique Merchandising", level: 90 },
    { id: "v-2", name: "Supply Chain & Vendor Negotiation", level: 75 },
  ]);
  const [newVocationalSkill, setNewVocationalSkill] = useState("");

  const [softwareSkills, setSoftwareSkills] = useState<SkillEntry[]>([
    { id: "s-1", name: "Canva & Brand Design", level: 85 },
    { id: "s-2", name: "Shopify / WooCommerce Management", level: 80 },
  ]);
  const [newSoftwareSkill, setNewSoftwareSkill] = useState("");

  // --- 5. Goal Mapping ---
  const [goals, setGoals] = useState<GoalEntry[]>([
    {
      id: "g-1",
      title: "Launch B2B Wholesale Catalog on BDSisters Marketplace",
      targetDate: "2026-12-30",
      progress: 70,
    },
    {
      id: "g-2",
      title: "Mentor 15 New Sister-Led Startups in Dhaka & Sylhet",
      targetDate: "2027-03-15",
      progress: 40,
    },
  ]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Handlers ---
  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    try {
      if (cloudName && uploadPreset) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          setAvatarUrl(data.secure_url);
        }
      } else {
        const localUrl = URL.createObjectURL(file);
        setAvatarUrl(localUrl);
      }
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Email handlers
  const addEmailField = () => {
    setEmails((prev) => [...prev, { id: `e-${Date.now()}`, address: "", isPublic: false }]);
  };

  const updateEmail = (id: string, field: keyof EmailEntry, value: string | boolean) => {
    setEmails((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeEmail = (id: string) => {
    if (emails.length > 1) {
      setEmails((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Web Profile handlers
  const addWebProfile = () => {
    setWebProfiles((prev) => [...prev, { id: `w-${Date.now()}`, platform: "instagram", url: "" }]);
  };

  const updateWebProfile = (id: string, field: keyof WebProfileEntry, value: string) => {
    setWebProfiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeWebProfile = (id: string) => {
    setWebProfiles((prev) => prev.filter((item) => item.id !== id));
  };

  const isValidUrl = (url: string) => {
    if (!url.trim()) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Skill handlers
  const addSkill = (type: "vocational" | "software") => {
    if (type === "vocational" && newVocationalSkill.trim()) {
      setVocationalSkills((prev) => [
        ...prev,
        { id: `v-${Date.now()}`, name: newVocationalSkill.trim(), level: 65 },
      ]);
      setNewVocationalSkill("");
    }
    if (type === "software" && newSoftwareSkill.trim()) {
      setSoftwareSkills((prev) => [
        ...prev,
        { id: `s-${Date.now()}`, name: newSoftwareSkill.trim(), level: 65 },
      ]);
      setNewSoftwareSkill("");
    }
  };

  const updateSkillLevel = (type: "vocational" | "software", id: string, level: number) => {
    const updater = (list: SkillEntry[]) => list.map((s) => (s.id === id ? { ...s, level } : s));
    if (type === "vocational") setVocationalSkills(updater);
    else setSoftwareSkills(updater);
  };

  const removeSkill = (type: "vocational" | "software", id: string) => {
    if (type === "vocational") {
      setVocationalSkills((prev) => prev.filter((s) => s.id !== id));
    } else {
      setSoftwareSkills((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Goal handlers
  const addGoal = () => {
    if (!newGoalTitle.trim()) return;
    setGoals((prev) => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        title: newGoalTitle.trim(),
        targetDate: newGoalDate || "2027-01-01",
        progress: 15,
      },
    ]);
    setNewGoalTitle("");
    setNewGoalDate("");
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, progress } : g)));
  };

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const availableDistricts = country
    ? DISTRICTS_BY_COUNTRY[country] || []
    : DISTRICTS_BY_COUNTRY.Bangladesh;

  return (
    <div className="min-h-screen  px-4 py-6 text-slate-900 sm:px-6 lg:px-10 print:bg-white print:p-0">
      <div className="mx-auto max-w-6xl">
        {/* Top Hero Banner (Borderless with Deep Purple Elevation Shadow) */}
        <header
          data-aos="fade-down"
          className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-6 text-white shadow-xl shadow-purple-950/25 sm:p-9 print:bg-white print:text-purple-950 print:shadow-none"
        >
          {/* Decorative Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl print:hidden" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-purple-100 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-purple-300" />
                <span>BDSISTERS.ORG • SISTERHOOD DOSSIER</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Member Profile & Privacy Vault
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-purple-100/90 sm:text-base print:text-slate-700">
                Present your story, showcase your skills, and decide with one click which contact
                details stay private or open to verified sisters.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 print:hidden">
              <Button
                type="button"
                onPress={handleDownloadPdf}
                className="rounded-xl bg-white/15 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 backdrop-blur-md transition hover:bg-white/25"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>

              <Button
                type="submit"
                form="member-profile-form"
                className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-purple-950 shadow-lg shadow-purple-950/35 transition hover:bg-purple-50"
              >
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
            </div>
          </div>

          {saveSuccess && (
            <div
              role="status"
              className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-purple-950 shadow-lg shadow-purple-950/20"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span>Your profile and privacy settings have been updated successfully.</span>
            </div>
          )}
        </header>

        {/* Main Form */}
        <form id="member-profile-form" onSubmit={handleSaveProfile} className="space-y-9">
          {/* SECTION 1: BASIC INFO & SAFE LOCATION */}
          <section
            data-aos="fade-up"
            className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-9"
          >
            <div className="mb-7 flex flex-col gap-1">
              <span className="text-xs font-bold tracking-wider text-purple-800 uppercase">
                Step 01
              </span>
              <h2 className="text-xl font-bold text-purple-950 sm:text-2xl">
                Basic Information & Safe Region
              </h2>
              <p className="text-sm text-slate-600">
                To protect member privacy, street-level addresses are never requested or stored.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {/* Square Avatar Card */}
              <div className="flex flex-col items-center md:col-span-4 lg:col-span-3">
                <div className="group relative aspect-square w-full max-w-[240px] overflow-hidden rounded-3xl bg-purple-100 shadow-lg shadow-purple-950/15">
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-2xl bg-purple-950/90 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-950/40 backdrop-blur-md transition hover:bg-purple-900 print:hidden"
                  >
                    <Camera className="h-4 w-4" />
                    <span>{isUploadingImage ? "Uploading..." : "Change Square Photo"}</span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCloudinaryUpload}
                  className="hidden"
                />
                <span className="mt-3 text-center text-xs font-medium text-slate-500">
                  1:1 Square JPG or PNG • Auto-synced to Cloudinary
                </span>
              </div>

              {/* Name, Bio & Region */}
              <div className="space-y-6 md:col-span-8 lg:col-span-9">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="full-name" className="text-sm font-bold text-purple-950">
                    Full Name <span className="text-purple-700">*</span>
                  </Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                    required
                  />
                </div>

                {/* Controlled HeroUI v3 TextArea + Description */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="short-bio" className="text-sm font-bold text-purple-950">
                    Short Bio Summary
                  </Label>
                  <TextArea
                    id="short-bio"
                    aria-describedby="bio-controlled-description"
                    aria-label="Short Bio Summary"
                    placeholder="Share your background, venture, or community interests..."
                    rows={3}
                    maxLength={320}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                  />
                  <Description
                    id="bio-controlled-description"
                    className="text-right text-xs font-medium text-slate-500"
                  >
                    Characters: {bio.length} / 320
                  </Description>
                </div>

                {/* Safe Location Sub-card */}
                <div className="rounded-2xl bg-purple-50/70 p-5 shadow-md shadow-purple-950/5">
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-purple-950">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-950 text-white shadow-sm shadow-purple-950/20">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span>Current Region (District, State/Division, Country)</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Country Select */}
                    <Select
                      className="w-full"
                      value={country}
                      onChange={(val) => {
                        const nextCountry = val ? String(val) : null;
                        setCountry(nextCountry);
                        if (nextCountry) {
                          setDistrict(DISTRICTS_BY_COUNTRY[nextCountry]?.[0] || null);
                        } else {
                          setDistrict(null);
                        }
                      }}
                      placeholder="Select country"
                    >
                      <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                        Country
                      </Label>
                      <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-md shadow-purple-950/5">
                        <Select.Value />
                        <div className="flex items-center gap-1 text-purple-900">
                          <Select.ClearButton />
                          <Select.Indicator />
                        </div>
                      </Select.Trigger>
                      <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                        <ListBox>
                          {COUNTRIES.map((c) => (
                            <ListBox.Item
                              key={c}
                              id={c}
                              textValue={c}
                              className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                            >
                              <span>{c}</span>
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    {/* State / Division */}
                    <div className="flex flex-col">
                      <Label
                        htmlFor="state-division"
                        className="mb-1.5 block text-xs font-bold text-purple-950"
                      >
                        State / Division
                      </Label>
                      <Input
                        id="state-division"
                        value={stateDivision}
                        onChange={(e) => setStateDivision(e.target.value)}
                        placeholder="e.g., Dhaka Division"
                        className="w-full rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-md shadow-purple-950/5 focus:shadow-purple-900/15 focus:outline-none"
                      />
                    </div>

                    {/* District Select */}
                    <Select
                      className="w-full"
                      value={district}
                      onChange={(val) => setDistrict(val ? String(val) : null)}
                      placeholder="Select district"
                    >
                      <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                        District / City
                      </Label>
                      <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-md shadow-purple-950/5">
                        <Select.Value />
                        <div className="flex items-center gap-1 text-purple-900">
                          <Select.ClearButton />
                          <Select.Indicator />
                        </div>
                      </Select.Trigger>
                      <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                        <ListBox>
                          {availableDistricts.map((dist) => (
                            <ListBox.Item
                              key={dist}
                              id={dist}
                              textValue={dist}
                              className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                            >
                              <span>{dist}</span>
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: CONTACT INFORMATION & PRIVACY CONTROLS */}
          <section
            data-aos="fade-up"
            className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-9"
          >
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-bold tracking-wider text-purple-800 uppercase">
                  Step 02
                </span>
                <h2 className="text-xl font-bold text-purple-950 sm:text-2xl">
                  Contact & Privacy Controls
                </h2>
                <p className="text-sm text-slate-600">
                  Every contact field is{" "}
                  <strong className="text-purple-950">Private by default</strong>. Tick the checkbox
                  only if you want fellow sisters to see it.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-purple-950 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-950/20">
                <ShieldCheck className="h-4 w-4 text-purple-300" />
                Private by Default
              </span>
            </div>

            <div className="space-y-6">
              {/* Phone & WhatsApp Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Phone Card */}
                <div className="rounded-2xl bg-slate-50/90 p-5 shadow-md shadow-purple-950/5">
                  <div className="mb-3 flex items-center justify-between">
                    <Label
                      htmlFor="phone-number"
                      className="flex items-center gap-2 text-sm font-bold text-purple-950"
                    >
                      <Phone className="h-4 w-4 text-purple-900" />
                      <span>Phone Number</span>
                    </Label>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        isPhonePublic
                          ? "bg-purple-950 text-white shadow-purple-950/20"
                          : "bg-white text-slate-700 shadow-slate-300/40"
                      }`}
                    >
                      {isPhonePublic ? (
                        <>
                          <Globe className="h-3.5 w-3.5" /> Public
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5" /> Private
                        </>
                      )}
                    </span>
                  </div>

                  <Input
                    id="phone-number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                  />

                  <div className="mt-3.5">
                    <Checkbox
                      isSelected={isPhonePublic}
                      onChange={setIsPhonePublic}
                      className="flex cursor-pointer items-center gap-2.5"
                    >
                      <Checkbox.Control className="flex h-4 w-4 items-center justify-center rounded bg-white shadow-sm shadow-slate-400/50 transition data-[selected=true]:bg-purple-950 data-[selected=true]:text-white">
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Content>
                        <span className="text-xs font-semibold text-slate-700">
                          Show phone number on my public profile
                        </span>
                      </Checkbox.Content>
                    </Checkbox>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="rounded-2xl bg-slate-50/90 p-5 shadow-md shadow-purple-950/5">
                  <div className="mb-3 flex items-center justify-between">
                    <Label
                      htmlFor="whatsapp-number"
                      className="flex items-center gap-2 text-sm font-bold text-purple-950"
                    >
                      <MessageCircle className="h-4 w-4 text-purple-900" />
                      <span>WhatsApp Number</span>
                    </Label>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        isWhatsappPublic
                          ? "bg-purple-950 text-white shadow-purple-950/20"
                          : "bg-white text-slate-700 shadow-slate-300/40"
                      }`}
                    >
                      {isWhatsappPublic ? (
                        <>
                          <Globe className="h-3.5 w-3.5" /> Public
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5" /> Private
                        </>
                      )}
                    </span>
                  </div>

                  <Input
                    id="whatsapp-number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                  />

                  <div className="mt-3.5">
                    <Checkbox
                      isSelected={isWhatsappPublic}
                      onChange={setIsWhatsappPublic}
                      className="flex cursor-pointer items-center gap-2.5"
                    >
                      <Checkbox.Control className="flex h-4 w-4 items-center justify-center rounded bg-white shadow-sm shadow-slate-400/50 transition data-[selected=true]:bg-purple-950 data-[selected=true]:text-white">
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Content>
                        <span className="text-xs font-semibold text-slate-700">
                          Allow direct WhatsApp button on my public card
                        </span>
                      </Checkbox.Content>
                    </Checkbox>
                  </div>
                </div>
              </div>

              {/* Multiple Emails Card */}
              <div className="rounded-2xl bg-purple-50/60 p-5 shadow-md shadow-purple-950/5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-950 text-white shadow-md shadow-purple-950/20">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-purple-950">Email Addresses</h3>
                      <p className="text-xs text-slate-600">
                        Add personal, brand, or customer support emails
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onPress={addEmailField}
                    className="rounded-xl bg-purple-950 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-950/25 transition hover:bg-purple-900 print:hidden"
                  >
                    <Plus className="h-4 w-4" />
                    Add Email
                  </Button>
                </div>

                <div className="space-y-3">
                  {emails.map((emailItem, index) => (
                    <div
                      key={emailItem.id}
                      className="flex flex-col justify-between gap-3 rounded-2xl bg-white p-4 shadow-md shadow-purple-950/5 sm:flex-row sm:items-center"
                    >
                      <div className="flex-1">
                        <Input
                          type="email"
                          aria-label={`Email address ${index + 1}`}
                          value={emailItem.address}
                          onChange={(e) => updateEmail(emailItem.id, "address", e.target.value)}
                          placeholder="sister@example.com"
                          className="w-full rounded-xl bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-900 focus:bg-purple-50/40 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <Checkbox
                          isSelected={emailItem.isPublic}
                          onChange={(val) => updateEmail(emailItem.id, "isPublic", val)}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Checkbox.Control className="flex h-4 w-4 items-center justify-center rounded bg-slate-100 shadow-sm shadow-slate-400/50 transition data-[selected=true]:bg-purple-950 data-[selected=true]:text-white">
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Content>
                            <span className="text-xs font-bold text-purple-950">
                              {emailItem.isPublic ? "Public" : "Private"}
                            </span>
                          </Checkbox.Content>
                        </Checkbox>

                        {emails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEmail(emailItem.id)}
                            className="rounded-xl bg-rose-50 p-2 text-rose-700 shadow-sm transition hover:bg-rose-100 print:hidden"
                            aria-label="Remove email"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: WEB PROFILES & NEW MEDIA LINKS */}
          <section
            data-aos="fade-up"
            className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-9"
          >
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-bold tracking-wider text-purple-800 uppercase">
                  Step 03
                </span>
                <h2 className="text-xl font-bold text-purple-950 sm:text-2xl">
                  Web Profiles & New Media Links
                </h2>
                <p className="text-sm text-slate-600">
                  Connect your portfolio, social pages, or online store with live URL validation.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onPress={addWebProfile}
                className="self-start rounded-xl bg-purple-950 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-950/25 transition hover:bg-purple-900 print:hidden"
              >
                <Plus className="h-4 w-4" />
                Add Web Link
              </Button>
            </div>

            <div className="space-y-4">
              {webProfiles.map((profile) => {
                const meta = PLATFORM_META[profile.platform];
                const PlatformIcon = meta.icon;
                const valid = isValidUrl(profile.url);

                return (
                  <div
                    key={profile.id}
                    className="grid grid-cols-1 gap-4 rounded-2xl bg-slate-50/90 p-4 shadow-md shadow-purple-950/5 lg:grid-cols-12 lg:items-center"
                  >
                    {/* Platform Selector */}
                    <div className="lg:col-span-3">
                      <Select
                        aria-label="Select social platform"
                        className="w-full"
                        value={profile.platform}
                        onChange={(val) => {
                          if (val) {
                            updateWebProfile(profile.id, "platform", String(val) as SocialPlatform);
                          }
                        }}
                      >
                        <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-950 shadow-sm shadow-purple-950/5">
                          <div className="flex items-center gap-2">
                            <PlatformIcon className="h-4 w-4 text-purple-900" />
                            <Select.Value />
                          </div>
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                          <ListBox>
                            {Object.entries(PLATFORM_META).map(([key, info]) => {
                              const ItemIcon = info.icon;
                              return (
                                <ListBox.Item
                                  key={key}
                                  id={key}
                                  textValue={info.label}
                                  className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                                >
                                  <span className="flex items-center gap-2.5">
                                    <ItemIcon className="h-4 w-4 text-purple-900" />
                                    {info.label}
                                  </span>
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              );
                            })}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* URL Input */}
                    <div className="lg:col-span-5">
                      <div className="relative flex items-center">
                        <Link2 className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                        <Input
                          aria-label="Profile URL"
                          value={profile.url}
                          onChange={(e) => updateWebProfile(profile.id, "url", e.target.value)}
                          placeholder={meta.placeholder}
                          className="w-full rounded-xl bg-white py-2.5 pr-4 pl-10 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Live Inset Badge Preview */}
                    <div className="flex items-center justify-between gap-2.5 lg:col-span-4">
                      <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-white px-3.5 py-2 shadow-sm shadow-purple-950/5">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${meta.badgeClass}`}
                        >
                          <PlatformIcon className="h-3.5 w-3.5" />
                        </span>
                        {valid ? (
                          <a
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 truncate text-xs font-bold text-purple-950 hover:underline"
                          >
                            <span className="truncate">{profile.url}</span>
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="flex items-center gap-1.5 truncate text-xs font-medium text-slate-500">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                            <span>Valid https:// link required</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeWebProfile(profile.id)}
                        className="rounded-xl bg-rose-50 p-2.5 text-rose-700 shadow-sm transition hover:bg-rose-100 print:hidden"
                        aria-label="Delete web profile"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 4: EDUCATIONAL SUBJECTS & SKILL PROFICIENCY */}
          <section
            data-aos="fade-up"
            className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-9"
          >
            <div className="mb-7">
              <span className="text-xs font-bold tracking-wider text-purple-800 uppercase">
                Step 04
              </span>
              <h2 className="text-xl font-bold text-purple-950 sm:text-2xl">
                Educational Interests & Skill Bars
              </h2>
              <p className="text-sm text-slate-600">
                Highlight your learning tracks and slide to set proficiency across craft and digital
                tools.
              </p>
            </div>

            {/* Multi-Select Subjects */}
            <div className="mb-8 rounded-2xl bg-purple-50/70 p-5 shadow-md shadow-purple-950/5 sm:p-6">
              <Select
                aria-label="Subjects of Interest"
                className="w-full"
                selectionMode="multiple"
                value={selectedSubjects}
                onChange={(keys) => {
                  if (Array.isArray(keys)) {
                    setSelectedSubjects(keys.map(String));
                  }
                }}
                placeholder="Choose educational genres..."
              >
                <Label className="mb-2 flex items-center gap-2 text-sm font-bold text-purple-950">
                  <GraduationCap className="h-4 w-4 text-purple-900" />
                  <span>Subjects of Interest (Multi-Select Genres)</span>
                </Label>
                <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-md shadow-purple-950/5">
                  <Select.Value />
                  <div className="flex items-center gap-1.5 text-purple-900">
                    <Select.ClearButton />
                    <Select.Indicator />
                  </div>
                </Select.Trigger>
                <Select.Popover className="z-50 max-h-64 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                  <ListBox>
                    {EDUCATIONAL_GENRES.map((genre) => (
                      <ListBox.Item
                        key={genre}
                        id={genre}
                        textValue={genre}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                      >
                        <span>{genre}</span>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Selected Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedSubjects.map((subject) => (
                  <Chip
                    key={subject}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-purple-950 shadow-sm shadow-purple-950/10"
                  >
                    <span>{subject}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSubjects((prev) => prev.filter((item) => item !== subject))
                      }
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-purple-950 transition hover:bg-purple-950 hover:text-white print:hidden"
                      aria-label={`Remove ${subject}`}
                    >
                      ×
                    </button>
                  </Chip>
                ))}
              </div>
            </div>

            {/* Two-Column Skill Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Vocational Skills */}
              <div className="rounded-2xl bg-slate-50/90 p-5 shadow-md shadow-purple-950/5 sm:p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-950 text-white shadow-md shadow-purple-950/20">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-purple-950">Vocational & Craft Skills</h3>
                </div>

                <div className="mb-5 flex gap-2 print:hidden">
                  <Input
                    value={newVocationalSkill}
                    onChange={(e) => setNewVocationalSkill(e.target.value)}
                    placeholder="e.g., Tailoring, Baking, Event Styling"
                    className="w-full rounded-xl bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm shadow-purple-950/5 focus:outline-none"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onPress={() => addSkill("vocational")}
                    className="shrink-0 rounded-xl bg-purple-950 px-4 font-semibold text-white shadow-md shadow-purple-950/20 hover:bg-purple-900"
                  >
                    Add
                  </Button>
                </div>

                <div className="space-y-4">
                  {vocationalSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="rounded-2xl bg-white p-4 shadow-md shadow-purple-950/5"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-purple-100 px-2.5 py-0.5 font-mono text-xs font-bold text-purple-950">
                            {skill.level}%
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSkill("vocational", skill.id)}
                            className="rounded-lg p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-700 print:hidden"
                            aria-label="Remove vocational skill"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={skill.level}
                        onChange={(e) =>
                          updateSkillLevel("vocational", skill.id, Number(e.target.value))
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-purple-100 accent-purple-950"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Software Skills */}
              <div className="rounded-2xl bg-slate-50/90 p-5 shadow-md shadow-purple-950/5 sm:p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-950 text-white shadow-md shadow-purple-950/20">
                    <Laptop className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-purple-950">Software & Digital Skills</h3>
                </div>

                <div className="mb-5 flex gap-2 print:hidden">
                  <Input
                    value={newSoftwareSkill}
                    onChange={(e) => setNewSoftwareSkill(e.target.value)}
                    placeholder="e.g., Excel, Figma, Meta Ads, React"
                    className="w-full rounded-xl bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm shadow-purple-950/5 focus:outline-none"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onPress={() => addSkill("software")}
                    className="shrink-0 rounded-xl bg-purple-950 px-4 font-semibold text-white shadow-md shadow-purple-950/20 hover:bg-purple-900"
                  >
                    Add
                  </Button>
                </div>

                <div className="space-y-4">
                  {softwareSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="rounded-2xl bg-white p-4 shadow-md shadow-purple-950/5"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-purple-100 px-2.5 py-0.5 font-mono text-xs font-bold text-purple-950">
                            {skill.level}%
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSkill("software", skill.id)}
                            className="rounded-lg p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-700 print:hidden"
                            aria-label="Remove software skill"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={skill.level}
                        onChange={(e) =>
                          updateSkillLevel("software", skill.id, Number(e.target.value))
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-purple-100 accent-purple-950"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: GOAL MAPPING & PDF EXPORT */}
          <section
            data-aos="fade-up"
            className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-9"
          >
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-bold tracking-wider text-purple-800 uppercase">
                  Step 05
                </span>
                <h2 className="flex items-center gap-2 text-xl font-bold text-purple-950 sm:text-2xl">
                  <Target className="h-6 w-6 text-purple-900" />
                  <span>Goal Mapping & Milestone Tracker</span>
                </h2>
                <p className="text-sm text-slate-600">
                  Track your upcoming personal or business milestones and export your dossier
                  anytime.
                </p>
              </div>

              <Button
                type="button"
                onPress={handleDownloadPdf}
                className="self-start rounded-xl bg-purple-100 px-4 py-2.5 text-xs font-bold text-purple-950 shadow-md shadow-purple-950/10 transition hover:bg-purple-200 print:hidden"
              >
                <Download className="h-4 w-4" />
                Download Profile as PDF
              </Button>
            </div>

            {/* Add New Goal Bar */}
            <div className="mb-7 grid grid-cols-1 gap-3 rounded-2xl bg-purple-50/70 p-4 shadow-md shadow-purple-950/5 sm:grid-cols-12 print:hidden">
              <div className="sm:col-span-7">
                <Input
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Write a new milestone (e.g., Export first 500 units)"
                  className="w-full rounded-xl bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm shadow-purple-950/5 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  type="date"
                  aria-label="Goal target date"
                  value={newGoalDate}
                  onChange={(e) => setNewGoalDate(e.target.value)}
                  className="w-full rounded-xl bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm shadow-purple-950/5 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  type="button"
                  onPress={addGoal}
                  className="h-full w-full rounded-xl bg-purple-950 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-950/25 transition hover:bg-purple-900"
                >
                  <Plus className="h-4 w-4" />
                  Add Goal
                </Button>
              </div>
            </div>

            {/* Goals Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex flex-col justify-between rounded-2xl bg-slate-50/90 p-5 shadow-md shadow-purple-950/5"
                >
                  <div>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900">{goal.title}</h3>
                      <button
                        type="button"
                        onClick={() => removeGoal(goal.id)}
                        className="rounded-lg bg-white p-1.5 text-slate-400 shadow-sm transition hover:bg-rose-50 hover:text-rose-700 print:hidden"
                        aria-label="Remove goal"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mb-4 text-xs font-medium text-slate-500">
                      Target Date:{" "}
                      <span className="font-bold text-purple-950">{goal.targetDate}</span>
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-950">
                      <span>Milestone Progress</span>
                      <span className="rounded-md bg-white px-2 py-0.5 shadow-sm">
                        {goal.progress}%
                      </span>
                    </div>

                    {/* Borderless Shadowed Progress Bar */}
                    <div
                      role="progressbar"
                      aria-label={goal.title}
                      aria-valuenow={goal.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-3 w-full overflow-hidden rounded-full bg-white p-0.5 shadow-inner shadow-purple-950/10"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-950 to-purple-700 transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={goal.progress}
                      onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                      className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-purple-100 accent-purple-950 print:hidden"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky / Floating-Style Bottom Action Bar */}
            <div className="mt-9 flex flex-col items-center justify-between gap-4 rounded-2xl bg-purple-950 p-5 text-white shadow-xl shadow-purple-950/25 sm:flex-row print:hidden">
              <div className="flex items-center gap-2.5 text-xs text-purple-100 sm:text-sm">
                <ShieldCheck className="h-5 w-5 shrink-0 text-purple-300" />
                <span>
                  Your private contact fields remain encrypted and hidden unless explicitly shared.
                </span>
              </div>

              <div className="flex w-full gap-3 sm:w-auto">
                <Button
                  type="button"
                  onPress={handleDownloadPdf}
                  className="flex-1 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25 sm:flex-initial"
                >
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-purple-950 shadow-lg shadow-purple-950/30 transition hover:bg-purple-50 sm:flex-initial"
                >
                  <Save className="h-4 w-4" />
                  Save Member Profile
                </Button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
