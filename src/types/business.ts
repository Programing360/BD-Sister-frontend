export type BusinessCategory =
  | "fashion_apparel"
  | "handicrafts_art"
  | "culinary_catering"
  | "tech_digital_services"
  | "education_tutoring"
  | "beauty_wellness"
  | "consulting_finance"
  | "other";

export interface BusinessListing {
  id: string;
  ownerId: string;
  name: string;
  tagline: string;
  description: string;
  category: BusinessCategory;
  district: string;
  logoUrl?: string;
  bannerUrl?: string;
  contactEmail: string;
  contactPhone?: string;
  websiteUrl?: string;
  socialHandles?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface MarketplaceProduct {
  id: string;
  businessId: string;
  title: string;
  description: string;
  price: number;
  currency: "BDT" | "USD";
  images: string[];
  inStock: boolean;
  category: string;
  createdAt: string;
}
