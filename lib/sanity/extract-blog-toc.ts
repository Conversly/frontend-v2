/** H2/H3 entries parsed from portable text (used for anchors + sidebar). */
export interface BlogBodyHeadingTocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Sidebar row: article title (level 1) or a body heading. */
export type BlogTocItem =
  | { id: string; text: string; level: 1 }
  | BlogBodyHeadingTocItem;

function spanTextFromChildren(children: unknown): string {
  if (!Array.isArray(children)) {
    return "";
  }

  return children
    .map((child) => {
      if (
        child &&
        typeof child === "object" &&
        "text" in child &&
        typeof (child as { text: string }).text === "string"
      ) {
        return (child as { text: string }).text;
      }
      return "";
    })
    .join("");
}

function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return base || "section";
}

function assignUniqueIds(
  items: Omit<BlogBodyHeadingTocItem, "id">[],
): BlogBodyHeadingTocItem[] {
  const used = new Map<string, number>();

  return items.map((item) => {
    let slug = slugifyHeading(item.text);
    const count = used.get(slug) ?? 0;
    used.set(slug, count + 1);
    if (count > 0) {
      slug = `${slug}-${count + 1}`;
    }
    return { ...item, id: slug } satisfies BlogBodyHeadingTocItem;
  });
}

/**
 * Builds ordered TOC entries from Sanity portable text (block nodes with style h2 / h3).
 */
export function extractBlogTocFromBody(
  body?: Array<Record<string, unknown>> | null,
): BlogBodyHeadingTocItem[] {
  if (!body?.length) {
    return [];
  }

  const raw: Omit<BlogBodyHeadingTocItem, "id">[] = [];

  for (const block of body) {
    if (block._type !== "block") {
      continue;
    }
    const style = block.style;
    if (style !== "h2" && style !== "h3") {
      continue;
    }
    const text = spanTextFromChildren(block.children);
    if (!text.trim()) {
      continue;
    }
    raw.push({
      text: text.trim(),
      level: style === "h2" ? 2 : 3,
    });
  }

  return assignUniqueIds(raw);
}
