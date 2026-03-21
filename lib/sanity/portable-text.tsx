"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { urlForImage } from "@/lib/sanity/image";

export type PortableTextTocAnchor = { id: string; level: 2 | 3 };

function getInternalSlug(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "slug" in value &&
    value.slug &&
    typeof value.slug === "object" &&
    "current" in value.slug &&
    typeof value.slug.current === "string"
  ) {
    return value.slug.current;
  }

  return undefined;
}

function createPortableTextComponents(
  tocAnchors?: PortableTextTocAnchor[],
): PortableTextComponents {
  let anchorIndex = 0;

  return {
    types: {
      image: ({ value }) => {
        const image = urlForImage(value);

        if (!image) {
          return null;
        }

        return (
          <figure className="my-10 overflow-hidden rounded-2xl border border-border/50 bg-card/40 shadow-sm">
            <Image
              src={image.src}
              alt={typeof value?.alt === "string" ? value.alt : "Blog image"}
              width={image.width}
              height={image.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
            {typeof value?.caption === "string" && value.caption ? (
              <figcaption className="px-4 py-3 text-center text-sm text-muted-foreground">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
    },
    block: {
      h2: ({ children }) => {
        const next = tocAnchors?.[anchorIndex];
        const id = next?.level === 2 ? next.id : undefined;
        if (next?.level === 2) {
          anchorIndex += 1;
        }
        return (
          <h2
            id={id}
            className="mt-14 scroll-mt-28 text-3xl font-bold tracking-tight text-foreground first:mt-0"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        const next = tocAnchors?.[anchorIndex];
        const id = next?.level === 3 ? next.id : undefined;
        if (next?.level === 3) {
          anchorIndex += 1;
        }
        return (
          <h3
            id={id}
            className="mt-10 scroll-mt-28 text-2xl font-semibold tracking-tight text-foreground"
          >
            {children}
          </h3>
        );
      },
      normal: ({ children }) => (
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-primary/70 bg-primary/5 px-6 py-4 italic text-foreground">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 ml-6 list-disc space-y-3 text-lg leading-relaxed text-muted-foreground marker:text-muted-foreground/60">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-6 ml-6 list-decimal space-y-3 text-lg leading-relaxed text-muted-foreground">
          {children}
        </ol>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const href = typeof value?.href === "string" ? value.href : "#";
        const isExternal = href.startsWith("http");

        return (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer noopener" : undefined}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {children}
          </a>
        );
      },
      internalLink: ({ children, value }) => {
        const slug = getInternalSlug(value);

        if (!slug) {
          return <>{children}</>;
        }

        return (
          <Link
            href={`/blogs/${slug}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {children}
          </Link>
        );
      },
    },
  };
}

export function SanityPortableText({
  value,
  tocAnchors,
}: {
  value?: Array<Record<string, unknown>>;
  tocAnchors?: PortableTextTocAnchor[];
}) {
  if (!value?.length) {
    return null;
  }

  const components = createPortableTextComponents(tocAnchors);

  return <PortableText value={value as never} components={components} />;
}
