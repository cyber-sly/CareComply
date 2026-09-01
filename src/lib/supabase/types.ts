export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price: number;
  type: "Bundle" | "Single template" | "Mini bundle";
  tag: string | null;
  description: string;
  contents: string[];
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  resource_requested: string | null;
  created_at: string;
};
