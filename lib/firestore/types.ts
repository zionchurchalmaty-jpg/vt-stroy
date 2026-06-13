export type ContentType = "content" | "projects" | "leads" | "testimonials";
export type ContentStatus = "draft" | "published";

export interface LocalizedText {
  ru: string;
  kz: string;
}

export interface ServiceApprovalGroup {
  title: LocalizedText;
  items: LocalizedText[];
}

export interface ServiceLocation {
  cityId: string;
  address: LocalizedText;
  phone: string;
  schedule: LocalizedText;
  link2gis: string;
}

export interface ProjectCase {
  title: LocalizedText;
  duration: LocalizedText;
  price: string;
  beforeImage: string;
  afterImage: string;
  description: LocalizedText;
}

export interface ServiceCertificate {
  url?: string;
  name?: string;
}

export interface ServiceReview {
  authorName: LocalizedText;
  text: LocalizedText;
  rating: number;
  date: string;
}

export interface ServiceFAQ {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  schemaMarkup?: string;
  imageAlt?: string;
  imageTitle?: string;
  imageDescription?: string;
}

export interface Content {
  id: string;
  slug?: string;
  contentType: ContentType;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  coverImage?: string;
  tags?: string[];
  status: ContentStatus;
  seo?: SEOData;
  date?: { toDate: () => Date };
  createdAt?: { toDate: () => Date };
  updatedAt?: { toDate: () => Date };
  createdBy?: string;
  authorName?: string;
  password?: string;
  previewContent?: string;
  isSeo?: boolean;
  serviceId?: string;
  readingTime?: string;
  role?: string;
  rating?: number;
}

export interface ContentInput extends Partial<Content> {
  contentType: ContentType;
  title: string;
  status: ContentStatus;
  isSeo?: boolean;
  serviceId?: string;
  serviceSlug?: string;
}

export interface SerializedContent extends Omit<
  Content,
  "date" | "createdAt" | "updatedAt"
> {
  date?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  isSeo?: boolean;
}
