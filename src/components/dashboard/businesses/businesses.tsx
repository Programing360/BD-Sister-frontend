"use client";

import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Store,
  Plus,
  Trash2,
  Camera,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Tag,
  ArrowUpRight,
  AlertCircle,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { Button, Input, TextArea, Description, Select, Label, ListBox } from "@heroui/react";

// --- Types ---
type BusinessRole =
  "Founder" | "Co-Founder" | "President" | "CEO" | "Managing Director" | "Partner" | "Other";

interface BrandProfile {
  id: string;
  brandName: string;
  logoUrl: string;
  category: string;
  summary: string;
  role: BusinessRole;
  customRole: string;
  isPublished: boolean;
  createdAt: string;
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description: string;
}

// --- Constants ---
const BUSINESS_CATEGORIES = [
  "Fashion, Boutiques & Handloom",
  "Organic Food, Bakery & Catering",
  "Skincare, Cosmetics & Wellness",
  "Handicrafts & Home Decor",
  "IT, Software & Digital Agency",
  "Education, Coaching & EdTech",
  "Event Management & Photography",
  "Import, Export & Wholesale",
];

const BUSINESS_ROLES: BusinessRole[] = [
  "Founder",
  "Co-Founder",
  "President",
  "CEO",
  "Managing Director",
  "Partner",
  "Other",
];

const ANNUAL_SUBSCRIPTION_BDT = 1500;

export default function BusinessProfilesBuilderPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // --- Subscription & Payment State ---
  const [isSubscriptionPaid, setIsSubscriptionPaid] = useState(false);
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);

  // --- Brands State ---
  const [brands, setBrands] = useState<BrandProfile[]>([
    {
      id: "brand-1",
      brandName: "Deshi Craft Studio",
      logoUrl:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80",
      category: "Fashion, Boutiques & Handloom",
      summary:
        "Handcrafted Jamdani, Nakshi Kantha, and heritage Bangladeshi womenswear curated directly from rural women artisans.",
      role: "Founder",
      customRole: "",
      isPublished: false,
      createdAt: "Nov 2026",
    },
  ]);

  // --- New / Active Brand Form State ---
  const [brandName, setBrandName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [category, setCategory] = useState<string | null>(BUSINESS_CATEGORIES[0]);
  const [summary, setSummary] = useState("");
  const [role, setRole] = useState<BusinessRole>("Founder");
  const [customRole, setCustomRole] = useState("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const logoInputRef = useRef<HTMLInputElement | null>(null);

  // --- Toast Notification Queue ---
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = (type: ToastMessage["type"], title: string, description: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Cloudinary Logo Upload Handler ---
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
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
          setLogoUrl(data.secure_url);
          pushToast("success", "Brand Logo Uploaded", "Your square brand logo is ready.");
        }
      } else {
        const previewUrl = URL.createObjectURL(file);
        setLogoUrl(previewUrl);
        pushToast(
          "info",
          "Logo Preview Ready",
          "Local preview loaded (configure Cloudinary keys in .env for cloud persistence)."
        );
      }
    } catch (error) {
      console.error("Logo upload error:", error);
      pushToast("error", "Upload Failed", "Could not upload brand logo. Please try again.");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // --- Add New Brand Handler ---
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();

    if (!brandName.trim()) {
      pushToast("error", "Brand Name Required", "Please enter your business or brand name.");
      return;
    }

    if (!category) {
      pushToast("error", "Category Required", "Please select a business category.");
      return;
    }

    if (role === "Other" && !customRole.trim()) {
      pushToast(
        "error",
        "Custom Role Required",
        "Please specify your custom role in the business."
      );
      return;
    }

    const newBrand: BrandProfile = {
      id: `brand-${Date.now()}`,
      brandName: brandName.trim(),
      logoUrl:
        logoUrl ||
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
      category,
      summary:
        summary.trim() ||
        "Proudly women-led Bangladeshi enterprise serving the Sisterhood community.",
      role,
      customRole: role === "Other" ? customRole.trim() : "",
      isPublished: isSubscriptionPaid,
      createdAt: "Just now",
    };

    setBrands((prev) => [newBrand, ...prev]);

    // Reset form
    setBrandName("");
    setLogoUrl("");
    setSummary("");
    setRole("Founder");
    setCustomRole("");

    pushToast(
      "success",
      "Brand Added to Portfolio",
      isSubscriptionPaid
        ? `${newBrand.brandName} has been published live to the directory!`
        : `${newBrand.brandName} saved as Unpublished. Pay subscription to publish all brands.`
    );
  };

  // --- Remove Brand Handler ---
  const handleDeleteBrand = (id: string, name: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    pushToast("info", "Brand Removed", `${name} has been removed from your profile.`);
  };

  // --- SSLCommerz Subscription Payment Trigger (/api/payment/init) ---
  const handleInitiateSslCommerzPayment = async () => {
    if (brands.length === 0) {
      pushToast(
        "error",
        "No Brands Added",
        "Create at least one business brand profile before activating your subscription."
      );
      return;
    }

    setIsInitiatingPayment(true);

    try {
      const response = await fetch("/api/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "ANNUAL_BUSINESS_SUBSCRIPTION",
          amount: ANNUAL_SUBSCRIPTION_BDT,
          currency: "BDT",
          brandIds: brands.map((b) => b.id),
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment initialization failed (${response.status})`);
      }

      const data: { gatewayPageURL?: string; message?: string } = await response.json();

      if (data.gatewayPageURL) {
        pushToast(
          "success",
          "Redirecting to SSLCommerz...",
          "Opening secure payment gateway to publish your brands."
        );
        window.location.href = data.gatewayPageURL;
      } else {
        throw new Error(data.message || "Missing gatewayPageURL from server");
      }
    } catch (error) {
      console.error("SSLCommerz init error:", error);
      pushToast(
        "error",
        "Gateway Connection Notice",
        "Could not reach /api/payment/init. Use the 'Simulate Paid Callback' button below to preview the Active state."
      );
    } finally {
      setIsInitiatingPayment(false);
    }
  };

  // Demo helper to preview post-payment published state without live SSLCommerz credentials
  const handleSimulatePaymentSuccess = () => {
    setIsSubscriptionPaid(true);
    setBrands((prev) => prev.map((b) => ({ ...b, isPublished: true })));
    pushToast(
      "success",
      "Subscription Active (Paid)",
      "All linked business profiles are now Published on BDSisters.org!"
    );
  };

  const unpublishedCount = brands.filter((b) => !b.isPublished).length;

  return (
    <div className="min-h-screen bg-slate-50/90 px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
      {/* Floating Toast Stack */}
      <div
        aria-live="polite"
        className="fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2.5 sm:right-6 sm:bottom-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-purple-950/20 transition-all"
          >
            {toast.type === "success" && (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
            )}
            {toast.type === "info" && (
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-800" />
            )}
            <div className="flex-1">
              <p className="text-sm font-bold text-purple-950">{toast.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* 1. Top Banner & Subscription Status Card */}
        <header
          data-aos="fade-down"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-6 text-white shadow-xl shadow-purple-950/25 sm:p-9"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-purple-100 backdrop-blur-md">
                  <Store className="h-3.5 w-3.5 text-purple-300" />
                  <span>MULTI-BRAND STOREFRONT BUILDER</span>
                </span>

                {/* Subscription Status Badge */}
                {isSubscriptionPaid ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-200 shadow-sm backdrop-blur-md">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                    Subscription: Active (Paid)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-200 shadow-sm backdrop-blur-md">
                    <Clock className="h-3.5 w-3.5 text-amber-300" />
                    Subscription: Unpaid
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Business Profiles & Brand Directory
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-purple-100/90 sm:text-base">
                Create unlimited business profiles for free. Activate your annual Sisterhood
                Merchant Subscription (৳{ANNUAL_SUBSCRIPTION_BDT}/year) to publish all your brands
                live to the marketplace.
              </p>
            </div>

            {/* SSLCommerz Payment CTA Box */}
            <div className="flex shrink-0 flex-col gap-2.5 rounded-2xl bg-white/10 p-4 shadow-lg shadow-purple-950/30 backdrop-blur-md sm:min-w-[290px]">
              <div className="flex items-center justify-between text-xs text-purple-200">
                <span>Annual Merchant Pass</span>
                <span className="font-mono text-sm font-bold text-white">
                  ৳{ANNUAL_SUBSCRIPTION_BDT} BDT
                </span>
              </div>

              {isSubscriptionPaid ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md">
                  <ShieldCheck className="h-4 w-4" />
                  <span>All Brands Published Live</span>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onPress={handleInitiateSslCommerzPayment}
                    isDisabled={isInitiatingPayment}
                    className="w-full rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-purple-950 shadow-lg shadow-purple-950/30 transition hover:bg-purple-50"
                  >
                    {isInitiatingPayment ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Connecting SSLCommerz...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Pay Subscription & Publish Brands
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={handleSimulatePaymentSuccess}
                    className="text-center text-[11px] font-medium text-purple-200 underline-offset-2 hover:text-white hover:underline"
                  >
                    Preview Active (Paid) State
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 2. Main Two-Column Grid: Add Brand Form (Left) + Brand Portfolio (Right) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT: Add New Brand Form (5 Columns) */}
          <section
            data-aos="fade-up"
            className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-8 lg:col-span-5"
          >
            <div className="mb-6">
              <span className="text-xs font-bold tracking-wider text-purple-800 uppercase">
                Add New Venture
              </span>
              <h2 className="text-xl font-bold text-purple-950">Register a Business Brand</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Draft as many brands as you lead. New brands start as{" "}
                <strong className="text-purple-950">Unpublished</strong> until your subscription is
                active.
              </p>
            </div>

            <form onSubmit={handleAddBrand} className="space-y-5">
              {/* Brand Logo Upload */}
              <div className="flex items-center gap-4 rounded-2xl bg-purple-50/70 p-4 shadow-sm shadow-purple-950/5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md shadow-purple-950/10">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Brand logo preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-purple-300">
                      <Store className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <p className="text-xs font-bold text-purple-950">Brand Logo (Square)</p>
                  <p className="text-[11px] text-slate-500">PNG or JPG • Uploaded via Cloudinary</p>
                  <Button
                    type="button"
                    size="sm"
                    onPress={() => logoInputRef.current?.click()}
                    isDisabled={isUploadingLogo}
                    className="rounded-xl bg-purple-950 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-950/20 hover:bg-purple-900"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    {isUploadingLogo ? "Uploading..." : "Upload Logo"}
                  </Button>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Brand Name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="brand-name" className="text-xs font-bold text-purple-950">
                  Brand / Business Name <span className="text-purple-700">*</span>
                </Label>
                <Input
                  id="brand-name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g., Aroshia Organic Kitchen"
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                  required
                />
              </div>

              {/* Category Select (HeroUI v3 Compound Pattern) */}
              <Select
                className="w-full"
                value={category}
                onChange={(val) => setCategory(val ? String(val) : null)}
                placeholder="Select business category"
              >
                <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                  Business Category <span className="text-purple-700">*</span>
                </Label>
                <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5">
                  <Select.Value />
                  <Select.Indicator className="text-purple-900" />
                </Select.Trigger>
                <Select.Popover className="z-50 max-h-60 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                  <ListBox>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <ListBox.Item
                        key={cat}
                        id={cat}
                        textValue={cat}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                      >
                        <span>{cat}</span>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Role Selection (HeroUI v3 Compound Pattern) */}
              <Select
                className="w-full"
                value={role}
                onChange={(val) => {
                  if (val) {
                    const selectedRole = String(val) as BusinessRole;
                    setRole(selectedRole);
                    if (selectedRole !== "Other") {
                      setCustomRole("");
                    }
                  }
                }}
                placeholder="Select your role"
              >
                <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                  Your Role in the Business <span className="text-purple-700">*</span>
                </Label>
                <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5">
                  <Select.Value />
                  <Select.Indicator className="text-purple-900" />
                </Select.Trigger>
                <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                  <ListBox>
                    {BUSINESS_ROLES.map((r) => (
                      <ListBox.Item
                        key={r}
                        id={r}
                        textValue={r}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                      >
                        <span>{r}</span>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Dynamic Custom Role Input when "Other" is selected */}
              {role === "Other" && (
                <div className="flex flex-col gap-1.5 rounded-2xl bg-purple-50/80 p-3.5 shadow-sm shadow-purple-950/5">
                  <Label htmlFor="custom-role" className="text-xs font-bold text-purple-950">
                    Specify Your Custom Role <span className="text-purple-700">*</span>
                  </Label>
                  <Input
                    id="custom-role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="e.g., Creative Director, Head Baker, Lead Architect"
                    className="w-full rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:outline-none"
                    required
                  />
                </div>
              )}

              {/* Short Summary (HeroUI v3 TextArea + Description) */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="brand-summary" className="text-xs font-bold text-purple-950">
                  Short Brand Summary
                </Label>
                <TextArea
                  id="brand-summary"
                  aria-describedby="brand-summary-desc"
                  rows={3}
                  maxLength={260}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Describe your products, mission, and what makes your brand special..."
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-sm leading-relaxed text-slate-900 shadow-sm shadow-purple-950/5 transition focus:bg-white focus:shadow-md focus:shadow-purple-900/15 focus:outline-none"
                />
                <Description
                  id="brand-summary-desc"
                  className="text-right text-[11px] font-medium text-slate-500"
                >
                  {summary.length} / 260 characters
                </Description>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-purple-950 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/25 transition hover:bg-purple-900"
              >
                <Plus className="h-4 w-4" />
                Add Brand to My Profile
              </Button>
            </form>
          </section>

          {/* RIGHT: Linked Business Profiles List (7 Columns) */}
          <section data-aos="fade-up" data-aos-delay="100" className="space-y-5 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-6 py-4 shadow-md shadow-purple-950/5">
              <div>
                <h2 className="text-lg font-bold text-purple-950">
                  Your Linked Brands ({brands.length})
                </h2>
                <p className="text-xs text-slate-500">
                  {unpublishedCount > 0
                    ? `${unpublishedCount} brand(s) waiting for subscription activation`
                    : "All brands are live and visible in the Sisterhood Directory"}
                </p>
              </div>

              {!isSubscriptionPaid && brands.length > 0 && (
                <Button
                  type="button"
                  size="sm"
                  onPress={handleInitiateSslCommerzPayment}
                  isDisabled={isInitiatingPayment}
                  className="rounded-xl bg-purple-950 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-950/20 hover:bg-purple-900"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Pay & Publish All
                </Button>
              )}
            </div>

            {brands.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-lg shadow-purple-950/10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-900">
                  <Store className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-purple-950">No Business Brands Yet</h3>
                <p className="mt-1 max-w-sm text-sm text-slate-600">
                  Use the form on the left to add your first brand or venture. Creation is
                  completely free!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {brands.map((brand) => {
                  const displayRole =
                    brand.role === "Other" && brand.customRole ? brand.customRole : brand.role;

                  return (
                    <article
                      key={brand.id}
                      className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-lg shadow-purple-950/10 transition-all hover:shadow-xl hover:shadow-purple-950/15 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        {/* Square Brand Logo */}
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-purple-50 shadow-md shadow-purple-950/10">
                          <img
                            src={brand.logoUrl}
                            alt={brand.brandName}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Brand Details */}
                        <div className="min-w-0 flex-1 space-y-2.5">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-extrabold text-purple-950">
                                {brand.brandName}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 rounded-lg bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-950">
                                  <Briefcase className="h-3 w-3" />
                                  {displayRole}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                  <Tag className="h-3 w-3" />
                                  {brand.category}
                                </span>
                              </div>
                            </div>

                            {/* Publish Status Pill */}
                            {brand.isPublished ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 shadow-sm">
                                <Clock className="h-3.5 w-3.5 text-amber-600" />
                                Unpublished
                              </span>
                            )}
                          </div>

                          <p className="text-sm leading-relaxed text-slate-600">{brand.summary}</p>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-medium text-slate-400">
                              Added {brand.createdAt}
                            </span>

                            <div className="flex items-center gap-2">
                              {!brand.isPublished && (
                                <Button
                                  type="button"
                                  size="sm"
                                  onPress={handleInitiateSslCommerzPayment}
                                  className="rounded-xl bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-950 hover:bg-purple-200"
                                >
                                  Publish Now
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </Button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleDeleteBrand(brand.id, brand.brandName)}
                                className="rounded-xl bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100"
                                aria-label={`Delete ${brand.brandName}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
