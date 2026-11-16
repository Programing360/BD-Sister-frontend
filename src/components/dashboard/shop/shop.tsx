"use client";

import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  Sparkles,
  Tag,
  Store,
  CreditCard,
  Banknote,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Layers,
} from "lucide-react";
import { Button, Input, TextArea, Select, Label, ListBox, Checkbox } from "@heroui/react";

// --- Types ---
type OfferingType = "Products" | "Services";
type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";
type PaymentMethod = "SSLCommerz" | "Cash on Delivery";

interface CatalogItem {
  id: string;
  name: string;
  brandName: string;
  type: OfferingType;
  subCategory: string;
  imageUrl: string;
  mrpPrice: number;
  discountPrice: number;
  isWholesale: boolean;
  minWholesaleQty?: number;
  rating: number;
  sellerDistrict: string;
}

interface CartItem {
  product: CatalogItem;
  quantity: number;
}

interface OrderRecord {
  id: string;
  date: string;
  itemsSummary: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  status: OrderStatus;
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description: string;
}

// --- Mock Catalog Data ---
const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "prod-1",
    name: "Handloom Half-Silk Dhakai Jamdani Saree",
    brandName: "Deshi Craft Studio",
    type: "Products",
    subCategory: "Fashion & Handloom",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    mrpPrice: 6800,
    discountPrice: 5450,
    isWholesale: false,
    rating: 4.9,
    sellerDistrict: "Narayanganj",
  },
  {
    id: "prod-2",
    name: "Pure Lichu Flower Raw Honey (1kg Jar)",
    brandName: "Organic Sunnah Pantry",
    type: "Products",
    subCategory: "Organic Food",
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    mrpPrice: 1250,
    discountPrice: 980,
    isWholesale: true,
    minWholesaleQty: 5,
    rating: 4.8,
    sellerDistrict: "Sirajganj",
  },
  {
    id: "prod-3",
    name: "Full-Stack E-Commerce Website & Brand Identity Setup",
    brandName: "NariTech Digital Solutions",
    type: "Services",
    subCategory: "IT & Web Design",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    mrpPrice: 25000,
    discountPrice: 18500,
    isWholesale: false,
    rating: 5.0,
    sellerDistrict: "Dhaka",
  },
  {
    id: "prod-4",
    name: "Cold-Pressed Extra Virgin Mustard Oil (5L Bulk)",
    brandName: "Organic Sunnah Pantry",
    type: "Products",
    subCategory: "Organic Food",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    mrpPrice: 1900,
    discountPrice: 1520,
    isWholesale: true,
    minWholesaleQty: 3,
    rating: 4.9,
    sellerDistrict: "Sirajganj",
  },
  {
    id: "prod-5",
    name: "Saffron & Rosewater Bridal Herbal Glow Kit",
    brandName: "Aroshia Botanicals",
    type: "Products",
    subCategory: "Skincare & Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
    mrpPrice: 2400,
    discountPrice: 1890,
    isWholesale: true,
    minWholesaleQty: 6,
    rating: 4.7,
    sellerDistrict: "Sylhet",
  },
  {
    id: "prod-6",
    name: "Social Media Meta Ads & Content Strategy Audit",
    brandName: "NariTech Digital Solutions",
    type: "Services",
    subCategory: "Digital Marketing",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    mrpPrice: 6500,
    discountPrice: 4500,
    isWholesale: false,
    rating: 4.9,
    sellerDistrict: "Chattogram",
  },
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "BDS-ORD-9421",
    date: "14 Nov 2026",
    itemsSummary: "Handloom Half-Silk Dhakai Jamdani Saree (x1)",
    totalAmount: 5530,
    paymentMethod: "SSLCommerz",
    shippingAddress: "House 14, Road 7, Dhanmondi, Dhaka",
    status: "Shipped",
  },
  {
    id: "BDS-ORD-9388",
    date: "08 Nov 2026",
    itemsSummary: "Pure Lichu Flower Raw Honey (x2), Saffron Glow Kit (x1)",
    totalAmount: 3930,
    paymentMethod: "Cash on Delivery",
    shippingAddress: "Sector 11, Uttara, Dhaka",
    status: "Delivered",
  },
];

const ORDER_STEPS: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"];

const DELIVERY_FEE_BDT = 80;

export default function MemberShopPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // --- Navigation Tab State ("shop" | "orders") ---
  const [activeTab, setActiveTab] = useState<"shop" | "orders">("shop");

  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [onlyWholesaleOrDeals, setOnlyWholesaleOrDeals] = useState(false);

  // --- Cart & Checkout Drawer States ---
  const [cart, setCart] = useState<CartItem[]>([{ product: CATALOG_ITEMS[1], quantity: 2 }]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState<"cart" | "checkout">("cart");

  // --- Checkout Form States ---
  const [shippingAddress, setShippingAddress] = useState(
    "Flat 4B, House 22, Block C, Banani, Dhaka"
  );
  const [contactPhone, setContactPhone] = useState("+880 1711-000000");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("SSLCommerz");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // --- Orders State ---
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);

  // --- Toast Notifications ---
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = (type: ToastMessage["type"], title: string, description: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- Derived Brands & Filtered Catalog ---
  const availableBrands = useMemo(() => {
    const unique = Array.from(new Set(CATALOG_ITEMS.map((item) => item.brandName)));
    return ["All", ...unique];
  }, []);

  const filteredProducts = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || item.type === selectedCategory;

      const matchesBrand = selectedBrand === "All" || item.brandName === selectedBrand;

      const matchesPrice = item.discountPrice <= maxPrice;

      const discountPercent = Math.round(
        ((item.mrpPrice - item.discountPrice) / item.mrpPrice) * 100
      );
      const matchesDeals = !onlyWholesaleOrDeals || item.isWholesale || discountPercent >= 20;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesDeals;
    });
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, onlyWholesaleOrDeals]);

  // --- Cart Helpers ---
  const totalCartItems = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.product.discountPrice * entry.quantity, 0),
    [cart]
  );

  const cartSavings = useMemo(
    () =>
      cart.reduce(
        (sum, entry) =>
          sum + (entry.product.mrpPrice - entry.product.discountPrice) * entry.quantity,
        0
      ),
    [cart]
  );

  const handleAddToCart = (product: CatalogItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    pushToast("success", "Added to Sisterhood Cart", `${product.name} has been added to your bag.`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // --- Checkout Submission ---
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim() || !contactPhone.trim()) {
      pushToast(
        "error",
        "Missing Delivery Details",
        "Please provide both your shipping address and phone number."
      );
      return;
    }

    setIsSubmittingOrder(true);

    setTimeout(() => {
      const itemsSummary = cart.map((c) => `${c.product.name} (x${c.quantity})`).join(", ");

      const newOrder: OrderRecord = {
        id: `BDS-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: "16 Nov 2026",
        itemsSummary,
        totalAmount: cartSubtotal + DELIVERY_FEE_BDT,
        paymentMethod,
        shippingAddress: shippingAddress.trim(),
        status: paymentMethod === "SSLCommerz" ? "Processing" : "Pending",
      };

      setOrders((prev) => [newOrder, ...prev]);
      setCart([]);
      setIsSubmittingOrder(false);
      setIsCartOpen(false);
      setDrawerStep("cart");
      setActiveTab("orders");

      pushToast(
        "success",
        `Order ${newOrder.id} Confirmed!`,
        paymentMethod === "SSLCommerz"
          ? "Online payment verified. Track your shipment below."
          : "Cash on Delivery order placed with the seller."
      );
    }, 700);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setMaxPrice(25000);
    setOnlyWholesaleOrDeals(false);
  };

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
            className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-purple-950/20"
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
              <p className="mt-0.5 text-xs text-slate-600">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        {/* 1. Hero Marketplace Banner */}
        <header
          data-aos="fade-down"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-6 text-white shadow-xl shadow-purple-950/25 sm:p-9"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-purple-100 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-purple-300" />
                <span>VERIFIED SISTERHOOD MARKETPLACE</span>
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Member Shop & Wholesale Hub
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-purple-100/90 sm:text-base">
                Shop authentic products and professional services created by verified Bangladeshi
                women entrepreneurs—with exclusive member and wholesale pricing.
              </p>
            </div>

            {/* Mode Switcher & Cart Trigger */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-2xl bg-white/10 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("shop")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    activeTab === "shop"
                      ? "bg-white text-purple-950 shadow-md"
                      : "text-purple-100 hover:text-white"
                  }`}
                >
                  Browse Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    activeTab === "orders"
                      ? "bg-white text-purple-950 shadow-md"
                      : "text-purple-100 hover:text-white"
                  }`}
                >
                  <span>Order Tracking</span>
                  <span className="rounded-full bg-purple-800 px-2 py-0.5 text-[11px] text-white">
                    {orders.length}
                  </span>
                </button>
              </div>

              <Button
                type="button"
                onPress={() => {
                  setDrawerStep("cart");
                  setIsCartOpen(true);
                }}
                className="relative rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-purple-950 shadow-lg shadow-purple-950/30 transition hover:bg-purple-50"
              >
                <ShoppingBag className="h-4 w-4 text-purple-900" />
                <span>Cart</span>
                <span className="ml-1 rounded-full bg-purple-950 px-2 py-0.5 font-mono text-xs font-bold text-white">
                  {totalCartItems}
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* TAB A: PRODUCT CATALOG & FILTERING */}
        {activeTab === "shop" && (
          <div className="space-y-8">
            {/* Filter Control Bar */}
            <section
              data-aos="fade-up"
              className="rounded-3xl bg-white p-5 shadow-lg shadow-purple-950/10 sm:p-7"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-purple-950">
                  <SlidersHorizontal className="h-4 w-4 text-purple-900" />
                  <span>Filter Offerings</span>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-purple-800 hover:text-purple-950 hover:underline"
                >
                  Reset All Filters
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
                {/* Search Input (4 Cols) */}
                <div className="lg:col-span-4">
                  <Label
                    htmlFor="shop-search"
                    className="mb-1.5 block text-xs font-bold text-purple-950"
                  >
                    Search Products or Services
                  </Label>
                  <div className="relative flex items-center">
                    <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="shop-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Jamdani, honey, web design..."
                      className="w-full rounded-xl bg-slate-50 py-2.5 pr-4 pl-10 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category Select: Products vs Services (HeroUI v3 Compound Pattern) */}
                <div className="lg:col-span-2">
                  <Select
                    className="w-full"
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val ? String(val) : "All")}
                    placeholder="All Types"
                  >
                    <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                      Category
                    </Label>
                    <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm shadow-purple-950/5">
                      <Select.Value />
                      <Select.Indicator className="text-purple-900" />
                    </Select.Trigger>
                    <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                      <ListBox>
                        {["All", "Products", "Services"].map((cat) => (
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
                </div>

                {/* Brand Select (HeroUI v3 Compound Pattern) */}
                <div className="lg:col-span-3">
                  <Select
                    className="w-full"
                    value={selectedBrand}
                    onChange={(val) => setSelectedBrand(val ? String(val) : "All")}
                    placeholder="All Brands"
                  >
                    <Label className="mb-1.5 block text-xs font-bold text-purple-950">
                      Shop by Brand
                    </Label>
                    <Select.Trigger className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm shadow-purple-950/5">
                      <Select.Value />
                      <Select.Indicator className="text-purple-900" />
                    </Select.Trigger>
                    <Select.Popover className="z-50 rounded-2xl bg-white p-1.5 shadow-xl shadow-purple-950/15">
                      <ListBox>
                        {availableBrands.map((brand) => (
                          <ListBox.Item
                            key={brand}
                            id={brand}
                            textValue={brand}
                            className="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-purple-50 hover:text-purple-950"
                          >
                            <span>{brand}</span>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Max Price Slider (3 Cols) */}
                <div className="rounded-xl bg-purple-50/70 px-3.5 py-2 lg:col-span-3">
                  <div className="mb-1 flex items-center justify-between text-xs font-bold text-purple-950">
                    <span>Max Price</span>
                    <span className="font-mono">৳{maxPrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={25000}
                    step={500}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-purple-200 accent-purple-950"
                  />
                </div>
              </div>

              {/* Wholesale & Special Discounts Toggle */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                <Checkbox
                  isSelected={onlyWholesaleOrDeals}
                  onChange={setOnlyWholesaleOrDeals}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox.Control className="flex h-4 w-4 items-center justify-center rounded bg-slate-100 shadow-sm shadow-slate-400/50 transition data-[selected=true]:bg-purple-950 data-[selected=true]:text-white">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <span className="text-xs font-bold text-purple-950">
                      Show only Wholesale Bulk Offers & 20%+ Sisterhood Deals
                    </span>
                  </Checkbox.Content>
                </Checkbox>

                <span className="text-xs font-medium text-slate-500">
                  Showing <strong className="text-purple-950">{filteredProducts.length}</strong> of{" "}
                  {CATALOG_ITEMS.length} verified listings
                </span>
              </div>
            </section>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-14 text-center shadow-lg shadow-purple-950/10">
                <ShoppingBag className="mb-3 h-12 w-12 text-purple-300" />
                <h3 className="text-lg font-bold text-purple-950">No Matching Listings Found</h3>
                <p className="mt-1 max-w-md text-sm text-slate-600">
                  Try increasing the max price slider or clearing your brand and category filters.
                </p>
                <Button
                  type="button"
                  onPress={resetFilters}
                  className="mt-5 rounded-xl bg-purple-950 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-950/20"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((item, idx) => {
                  const discountPct = Math.round(
                    ((item.mrpPrice - item.discountPrice) / item.mrpPrice) * 100
                  );

                  return (
                    <article
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-delay={(idx % 3) * 80}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg shadow-purple-950/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/15"
                    >
                      <div>
                        {/* Product Image & Floating Pills */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-50">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className="rounded-full bg-purple-950/90 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                              {discountPct}% OFF
                            </span>
                            {item.isWholesale && (
                              <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-purple-950 shadow-md backdrop-blur-md">
                                Wholesale ({item.minWholesaleQty}+ units)
                              </span>
                            )}
                          </div>

                          <span className="absolute right-3 bottom-3 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-md">
                            {item.type}
                          </span>
                        </div>

                        {/* Card Details */}
                        <div className="space-y-2.5 p-5">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="inline-flex items-center gap-1.5 font-bold text-purple-900">
                              <Store className="h-3.5 w-3.5" />
                              {item.brandName}
                            </span>
                            <span className="text-slate-500">{item.sellerDistrict}</span>
                          </div>

                          <h3 className="line-clamp-2 text-base font-extrabold leading-snug text-slate-900 group-hover:text-purple-950">
                            {item.name}
                          </h3>

                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            <Tag className="h-3 w-3" />
                            {item.subCategory}
                          </span>
                        </div>
                      </div>

                      {/* Price & Add to Cart Footer */}
                      <div className="flex items-center justify-between gap-3 bg-slate-50/70 px-5 py-4">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-lg font-extrabold text-purple-950">
                              ৳{item.discountPrice.toLocaleString()}
                            </span>
                            <span className="font-mono text-xs text-slate-400 line-through">
                              ৳{item.mrpPrice.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-emerald-700">
                            Sisterhood Special Price
                          </p>
                        </div>

                        <Button
                          type="button"
                          onPress={() => handleAddToCart(item)}
                          className="rounded-xl bg-purple-950 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-950/25 transition hover:bg-purple-900"
                        >
                          <Plus className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </section>
            )}
          </div>
        )}

        {/* TAB B: ORDER TRACKING & VISUAL TIMELINE */}
        {activeTab === "orders" && (
          <section data-aos="fade-up" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-6 py-4 shadow-md shadow-purple-950/5">
              <div>
                <h2 className="text-lg font-bold text-purple-950">
                  Your Recent Orders & Live Shipment Milestones
                </h2>
                <p className="text-xs text-slate-500">
                  Track fulfillment stages across Sisterhood sellers in Bangladesh.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onPress={() => setActiveTab("shop")}
                className="rounded-xl bg-purple-100 px-4 py-2 text-xs font-bold text-purple-950 hover:bg-purple-200"
              >
                Continue Shopping
              </Button>
            </div>

            <div className="space-y-5">
              {orders.map((order) => {
                const currentStepIndex = ORDER_STEPS.indexOf(order.status);

                return (
                  <article
                    key={order.id}
                    className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-950/10 sm:p-8"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-base font-extrabold text-purple-950">
                            {order.id}
                          </span>
                          <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-purple-950">
                            {order.status}
                          </span>
                          <span className="text-xs text-slate-400">Placed on {order.date}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800">{order.itemsSummary}</p>
                        <p className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="h-3.5 w-3.5 text-purple-800" />
                          <span>{order.shippingAddress}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="font-mono text-xl font-extrabold text-purple-950">
                          ৳{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-xs font-medium text-slate-500">
                          Paid via{" "}
                          <strong className="text-purple-950">{order.paymentMethod}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Visual Timeline Badges */}
                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {ORDER_STEPS.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                          <div
                            key={step}
                            className={`flex items-center gap-2.5 rounded-2xl p-3.5 transition ${
                              isCurrent
                                ? "bg-purple-950 text-white shadow-lg shadow-purple-950/25"
                                : isCompleted
                                  ? "bg-purple-100/80 text-purple-950"
                                  : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                isCurrent
                                  ? "bg-white text-purple-950"
                                  : isCompleted
                                    ? "bg-purple-950 text-white"
                                    : "bg-slate-200 text-slate-500"
                              }`}
                            >
                              {step === "Pending" && <Clock className="h-3.5 w-3.5" />}
                              {step === "Processing" && <Layers className="h-3.5 w-3.5" />}
                              {step === "Shipped" && <Truck className="h-3.5 w-3.5" />}
                              {step === "Delivered" && <PackageCheck className="h-3.5 w-3.5" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold">{step}</p>
                              <p
                                className={`text-[10px] ${
                                  isCurrent
                                    ? "text-purple-200"
                                    : isCompleted
                                      ? "text-purple-800"
                                      : "text-slate-400"
                                }`}
                              >
                                {isCurrent
                                  ? "Current Stage"
                                  : isCompleted
                                    ? "Completed"
                                    : "Upcoming"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* SLIDE-OVER CART & CHECKOUT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-purple-950/50 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl shadow-purple-950/40">
            {/* Drawer Header */}
            <div className="flex items-center justify-between bg-purple-950 px-6 py-5 text-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-purple-300" />
                <div>
                  <h2 className="text-base font-extrabold">
                    {drawerStep === "cart"
                      ? `Sisterhood Cart (${totalCartItems})`
                      : "Express Checkout"}
                  </h2>
                  <p className="text-[11px] text-purple-200">
                    {drawerStep === "cart"
                      ? "Review quantities & special discounts"
                      : "Confirm delivery & payment method"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* STEP 1: CART ITEMS */}
            {drawerStep === "cart" && (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <ShoppingBag className="mb-3 h-12 w-12 text-purple-200" />
                      <p className="text-base font-bold text-purple-950">Your Cart is Empty</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Add products or services from sister-owned businesses to get started.
                      </p>
                    </div>
                  ) : (
                    cart.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="flex gap-3.5 rounded-2xl bg-slate-50 p-3.5 shadow-sm shadow-purple-950/5"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-purple-800">
                            {product.brandName}
                          </p>
                          <h3 className="truncate text-sm font-bold text-slate-900">
                            {product.name}
                          </h3>
                          <p className="mt-0.5 font-mono text-sm font-extrabold text-purple-950">
                            ৳{(product.discountPrice * quantity).toLocaleString()}
                          </p>

                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-2 py-1 shadow-sm">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(product.id, -1)}
                                className="rounded-lg p-1 text-purple-950 hover:bg-purple-100"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[20px] text-center font-mono text-xs font-bold">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(product.id, 1)}
                                className="rounded-lg p-1 text-purple-950 hover:bg-purple-100"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveCartItem(product.id)}
                              className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="space-y-4 bg-slate-50 p-6 shadow-inner">
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-emerald-700">
                        <span className="font-medium">Sisterhood Discount Saved</span>
                        <span className="font-mono font-bold">
                          -৳{cartSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-purple-950">
                        <span>Subtotal</span>
                        <span className="font-mono">৳{cartSubtotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onPress={() => setDrawerStep("checkout")}
                      className="w-full rounded-2xl bg-purple-950 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/25 hover:bg-purple-900"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT SIMULATION FORM */}
            {drawerStep === "checkout" && (
              <form
                onSubmit={handlePlaceOrder}
                className="flex flex-1 flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-5 p-6">
                  <button
                    type="button"
                    onClick={() => setDrawerStep("cart")}
                    className="text-xs font-bold text-purple-900 hover:underline"
                  >
                    ← Back to Cart Items
                  </button>

                  {/* Shipping Address */}
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="checkout-address"
                      className="flex items-center gap-1.5 text-xs font-bold text-purple-950"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Delivery / Shipping Address *</span>
                    </Label>
                    <TextArea
                      id="checkout-address"
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="House, Road, Area, District..."
                      className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm shadow-purple-950/5 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  {/* Contact Phone */}
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="checkout-phone"
                      className="flex items-center gap-1.5 text-xs font-bold text-purple-950"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Receiver Phone Number *</span>
                    </Label>
                    <Input
                      id="checkout-phone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-sm shadow-purple-950/5 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-2">
                    <Label className="block text-xs font-bold text-purple-950">
                      Select Payment Method
                    </Label>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("SSLCommerz")}
                        className={`flex items-center justify-between rounded-2xl p-3.5 text-left transition ${
                          paymentMethod === "SSLCommerz"
                            ? "bg-purple-950 text-white shadow-lg shadow-purple-950/20"
                            : "bg-slate-50 text-slate-800 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="text-xs font-bold">SSLCommerz Online Payment</p>
                            <p
                              className={`text-[11px] ${
                                paymentMethod === "SSLCommerz"
                                  ? "text-purple-200"
                                  : "text-slate-500"
                              }`}
                            >
                              bKash, Nagad, Visa & Mastercard
                            </p>
                          </div>
                        </div>
                        {paymentMethod === "SSLCommerz" && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Cash on Delivery")}
                        className={`flex items-center justify-between rounded-2xl p-3.5 text-left transition ${
                          paymentMethod === "Cash on Delivery"
                            ? "bg-purple-950 text-white shadow-lg shadow-purple-950/20"
                            : "bg-slate-50 text-slate-800 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Banknote className="h-5 w-5" />
                          <div>
                            <p className="text-xs font-bold">Cash on Delivery (COD)</p>
                            <p
                              className={`text-[11px] ${
                                paymentMethod === "Cash on Delivery"
                                  ? "text-purple-200"
                                  : "text-slate-500"
                              }`}
                            >
                              Pay upon receiving your parcel
                            </p>
                          </div>
                        </div>
                        {paymentMethod === "Cash on Delivery" && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Summary & Submit */}
                <div className="space-y-4 bg-slate-50 p-6">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Subtotal</span>
                      <span className="font-mono font-bold">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Standard Delivery</span>
                      <span className="font-mono font-bold">৳{DELIVERY_FEE_BDT}</span>
                    </div>
                    <div className="flex justify-between pt-1.5 text-base font-extrabold text-purple-950">
                      <span>Total Payable</span>
                      <span className="font-mono">
                        ৳{(cartSubtotal + DELIVERY_FEE_BDT).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    isDisabled={isSubmittingOrder}
                    className="w-full rounded-2xl bg-purple-950 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/25 hover:bg-purple-900"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>
                      {isSubmittingOrder
                        ? "Placing Order..."
                        : `Confirm Order • ৳${(cartSubtotal + DELIVERY_FEE_BDT).toLocaleString()}`}
                    </span>
                  </Button>
                </div>
              </form>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
