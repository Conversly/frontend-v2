import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId, useCdn } from "@/lib/sanity/config";
import type { SanityPost, SanityPostPreview } from "@/lib/sanity/types";

const postsQuery = `
*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  "date": coalesce(publishedAt, _createdAt),
  "estReadingTime": round(length(pt::text(body)) / 5 / 180),
  mainImage {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]-> {
    _id,
    title,
    slug
  }
}
`;

const postBySlugQuery = `
*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  _id,
  _createdAt,
  publishedAt,
  "date": coalesce(publishedAt, _createdAt),
  mainImage {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background
  },
  featured,
  excerpt,
  slug,
  title,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]-> {
    _id,
    title,
    slug
  },
  "estReadingTime": round(length(pt::text(body)) / 5 / 180),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc)[0...5] {
    title,
    slug,
    "date": coalesce(publishedAt, _createdAt),
    "image": mainImage
  }
}
`;

const postSlugsQuery = `
*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current
`;

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

async function fetchSanity<T>(query: string, params?: Record<string, string>) {
  if (!client) {
    return null;
  }

  return client.fetch<T>(query, params ?? {});
}

export async function getAllPosts(): Promise<SanityPostPreview[]> {
  const posts = (await fetchSanity<SanityPostPreview[]>(postsQuery)) ?? [];

  return posts.filter((post) => Boolean(post.slug?.current));
}

export async function getPostBySlug(
  slug: string,
): Promise<SanityPost | null> {
  return await fetchSanity<SanityPost>(postBySlugQuery, { slug });
}

export async function getAllPostsSlugs(): Promise<Array<{ slug: string }>> {
  const slugs = (await fetchSanity<string[]>(postSlugsQuery)) ?? [];

  return slugs.map((slug) => ({ slug }));
}
