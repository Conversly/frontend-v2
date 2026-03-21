export interface SanitySlug {
  current: string;
}

export interface SanityImageAsset {
  _ref?: string;
}

export interface SanityImage {
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  blurDataURL?: string;
  ImageColor?: string;
}

export interface SanityAuthor {
  _id?: string;
  name?: string;
  slug?: SanitySlug;
  image?: SanityImage;
}

export interface SanityCategory {
  _id?: string;
  title?: string;
  slug?: SanitySlug;
}

export interface SanityPostPreview {
  _id: string;
  _createdAt: string;
  publishedAt?: string;
  date: string;
  estReadingTime?: number;
  excerpt?: string;
  featured?: boolean;
  mainImage?: SanityImage;
  slug: SanitySlug;
  title: string;
  author?: SanityAuthor;
  categories?: SanityCategory[];
}

export interface SanityRelatedPost {
  title: string;
  slug: SanitySlug;
  date: string;
  image?: SanityImage;
}

export interface SanityPost extends SanityPostPreview {
  body?: Array<Record<string, unknown>>;
  estReadingTime?: number;
  related?: SanityRelatedPost[];
}
