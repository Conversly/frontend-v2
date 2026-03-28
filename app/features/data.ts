import fs from "node:fs";
import path from "node:path";

export const FEATURES_PAGE_CONTENT = {
  title: "Features | VerlyAI",
  intro:
    "Explore every VerlyAI feature in one place. Browse by category, compare capabilities, and open any feature to see how it helps your support team automate faster and serve customers better.",
};

export type ThemeKey =
  | "purple"
  | "blue"
  | "teal"
  | "orange"
  | "green"
  | "violet"
  | "indigo"
  | "sky"
  | "slate"
  | "rose"
  | "amber"
  | "cyan";

export type FeatureItem = {
  title: string;
  slug: string;
  shortDescription: string;
  iconName?: string;
};

export type FeatureCategory = {
  name: string;
  slug: string;
  summary: string;
  theme: ThemeKey;
  imagePath?: string;
  features: FeatureItem[];
};

export type FeatureDetail = {
  title: string;
  slug: string;
  shortDescription: string;
  iconName?: string;
  categoryName: string;
  categorySlug: string;
  categorySummary: string;
  theme: ThemeKey;
  subtitle: string;
  tags: string[];
  overview: string;
  introParagraphs: string[];
  definitionPoints: string[];
  usageList: string[];
  workflowHint: string;
  howItWorksIntro: string[];
  functionBlocks: {
    name: string;
    description: string;
    imageAlt: string;
    imagePath?: string;
    notes?: string[];
  }[];
  setupSteps: {
    title: string;
    items: string[];
  }[];
  valuePoints: string[];
  useCases: string[];
  faqItems: {
    question: string;
    answer: string;
  }[];
  heroImagePath?: string;
  heroImageAlt?: string;
  overviewImagePath?: string;
  workflowImagePaths: string[];
};

type FeatureMeta = {
  description: string;
  image: string;
  link: string;
  status: string;
};

type FeatureIconMeta = {
  title: string;
  iconName: string;
};

type ParsedCatalogFeature = Omit<
  FeatureDetail,
  "theme" | "categorySlug" | "categorySummary"
>;

const CATEGORY_THEMES: ThemeKey[] = [
  "purple",
  "blue",
  "teal",
  "orange",
  "green",
  "violet",
  "indigo",
  "sky",
  "slate",
  "rose",
  "amber",
  "cyan",
];

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "ai-features-for-customer-support": "/svg/feature_ai_chatbot.svg",
  "ticketing-system-features": "/svg/feature_ticketing.svg",
  "live-chat-features": "/svg/feature_live_chat.svg",
  "call-center-features": "/svg/feature_call_center.svg",
  "customer-service-reports-features": "/svg/feature_reports.svg",
  "multilingual-support-features": "/svg/feature_knowledge_base.svg",
  "customer-portal-features": "/svg/feature_knowledge_base.svg",
  "help-desk-security-features": "/svg/feature_security.svg",
  "help-desk-integrations": "/svg/feature_integrations.svg",
  "gamification-features": "/svg/feature_reports.svg",
  "mobile-help-desk-apps": "/svg/feature_live_chat.svg",
  "web-contact-cards-features": "/svg/feature_sla_compliance.svg",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeBullets(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim());
}

function extractImagePaths(value: string) {
  return [...value.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((match) => ({
    alt: match[1].trim(),
    path: match[2].trim(),
  }));
}

function extractBetween(source: string, start: string, end: string) {
  const startIndex = source.indexOf(start);
  if (startIndex === -1) return "";
  const from = startIndex + start.length;
  const endIndex = end ? source.indexOf(end, from) : -1;
  return source.slice(from, endIndex === -1 ? undefined : endIndex).trim();
}

function parseFeaturesList() {
  const filePath = path.resolve(process.cwd(), "../docs/FEATURES-LIST.md");
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const categories: Array<{ name: string; summary: string; features: string[] }> = [];
  let currentCategory: { name: string; summary: string; features: string[] } | null = null;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentCategory) categories.push(currentCategory);
      currentCategory = { name: line.replace(/^## /, "").trim(), summary: "", features: [] };
      continue;
    }

    if (!currentCategory) continue;

    if (line.startsWith("*") && line.endsWith("*")) {
      currentCategory.summary = line.replace(/^\*|\*$/g, "").trim();
      continue;
    }

    if (line.startsWith("- ")) {
      currentCategory.features.push(line.replace(/^- /, "").trim());
    }
  }

  if (currentCategory) categories.push(currentCategory);
  return categories;
}

function parseContentMeta() {
  const filePath = path.resolve(process.cwd(), "content/features/content.md");
  const content = fs.readFileSync(filePath, "utf8");
  const matches = content.matchAll(
    /- id:\s*([^\n]+)\n\s+title:\s*"([^"]+)"\n\s+description:\s*"([^"]+)"\n\s+image:\s*"([^"]+)"\n\s+link:\s*"([^"]+)"\n\s+status:\s*"([^"]+)"/g
  );
  const meta = new Map<string, FeatureMeta>();

  for (const match of matches) {
    const title = match[2].trim();
    meta.set(slugify(title), {
      description: match[3].trim(),
      image: match[4].trim(),
      link: match[5].trim(),
      status: match[6].trim(),
    });
  }

  return meta;
}

function parseFeatureIcons() {
  const filePath = path.resolve(process.cwd(), "docs/verly-features-icons.md");
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const iconMap = new Map<string, FeatureIconMeta>();
  let currentTitle: string | null = null;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      currentTitle = line.replace(/^### /, "").trim();
      continue;
    }

    if (currentTitle && line.startsWith("**Lucide Icon:**")) {
      const iconName = line.match(/`([^`]+)`/)?.[1]?.trim();
      if (iconName) {
        iconMap.set(slugify(currentTitle), { title: currentTitle, iconName });
      }
      currentTitle = null;
    }
  }

  return iconMap;
}

function parseCatalog() {
  const filePath = path.resolve(process.cwd(), "../docs/VERLY-FEATURES-CATALOG.md");
  const content = fs.readFileSync(filePath, "utf8");
  const sections = content.split(/^## /m).slice(1);
  const catalog = new Map<string, ParsedCatalogFeature>();

  for (const rawSection of sections) {
    const [titleLine, ...restLines] = rawSection.split("\n");
    const title = titleLine.trim();
    if (!title || title === "Table of contents (categories)") continue;

    const section = restLines.join("\n").trim();
    const categoryName =
      section.match(/- \*\*Category:\*\* (.+)/)?.[1]?.trim() ?? "Features";
    const categorySlug =
      section.match(/- \*\*Category slug:\*\* `([^`]+)`/)?.[1]?.trim() ??
      slugify(categoryName);
    const subtitle = section.match(/\*\*Subtitle:\*\* (.+)/)?.[1]?.trim() ?? "";
    const tagsLine = section.match(/\*\*Tags:\*\* (.+)/)?.[1]?.trim() ?? "";
    const tags = tagsLine
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const shortDescriptionBlock = extractBetween(
      section,
      "### Q: What is the short description for listings?",
      "### Q: What should readers know first (introduction)?"
    );
    const introBlock = extractBetween(
      section,
      "### Q: What should readers know first (introduction)?",
      "---"
    );
    const whatIsBlock = extractBetween(
      section,
      "### Q: What is this feature?",
      "### Q: How can my team use this feature?"
    );
    const definitionBlock = extractBetween(
      whatIsBlock,
      "**Definition highlights:**",
      ""
    );
    const usageBlock = extractBetween(
      section,
      "### Q: How can my team use this feature?",
      "### Q: What is the workflow hint?"
    );
    const workflowBlock = extractBetween(
      section,
      "### Q: What is the workflow hint?",
      "### Q: How does this feature work?"
    );
    const howItWorksBlock = extractBetween(
      section,
      "### Q: How does this feature work?",
      "### Q: How do I set this up?"
    );
    const setupBlock = extractBetween(
      section,
      "### Q: How do I set this up?",
      "### Q: What outcomes or value should we expect?"
    );
    const valueBlock = extractBetween(
      section,
      "### Q: What outcomes or value should we expect?",
      "### Q: Which teams or situations is this best for?"
    );
    const useCasesBlock = extractBetween(
      section,
      "### Q: Which teams or situations is this best for?",
      "### Frequently asked questions (FAQ)"
    );
    const faqBlock = extractBetween(
      section,
      "### Frequently asked questions (FAQ)",
      ""
    );

    const sectionImages = extractImagePaths(section);
    const workflowImages = extractImagePaths(workflowBlock);
    const overviewImages = extractImagePaths(whatIsBlock);

    const functionPart = howItWorksBlock.split(/^#### Function: /m).slice(1);
    const functionBlocks = functionPart.map((part) => {
      const [nameLine, ...bodyLines] = part.split("\n");
      const body = bodyLines.join("\n").trim();
      const image = extractImagePaths(body)[0];
      const notes = normalizeBullets(body);
      const description = body
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) => line && !line.startsWith("- ") && !line.startsWith("![")
        )
        .join(" ")
        .trim();

      return {
        name: nameLine.trim(),
        description,
        imageAlt: image?.alt ?? `${title} ${nameLine.trim()} image`,
        imagePath: image?.path,
        notes: notes.length > 0 ? notes : undefined,
      };
    });

    const setupSteps = setupBlock
      .split(/^#### /m)
      .slice(1)
      .map((part) => {
        const [heading, ...bodyLines] = part.split("\n");
        return {
          title: heading.trim(),
          items: normalizeBullets(bodyLines.join("\n")),
        };
      });

    const faqItems = faqBlock
      .split(/^#### Q: /m)
      .slice(1)
      .map((part) => {
        const [questionLine, ...answerLines] = part.split("\n");
        return {
          question: questionLine.trim(),
          answer: answerLines.join(" ").trim(),
        };
      });

    catalog.set(slugify(title), {
      title,
      slug: slugify(title),
      shortDescription:
        normalizeBullets(shortDescriptionBlock)[0] ??
        shortDescriptionBlock.replace(/\n/g, " ").trim(),
      categoryName,
      categorySlug,
      shortDescriptionSource: shortDescriptionBlock,
      subtitle,
      tags,
      overview: whatIsBlock
        .split("**Definition highlights:**")[0]
        .replace(/\n+/g, " ")
        .trim(),
      introParagraphs: normalizeParagraphs(introBlock),
      definitionPoints: normalizeBullets(definitionBlock),
      usageList: normalizeBullets(usageBlock),
      workflowHint: workflowBlock
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("!["))
        .join(" ")
        .trim(),
      howItWorksIntro: normalizeParagraphs(
        howItWorksBlock.split(/^#### Function: /m)[0]
      ),
      functionBlocks,
      setupSteps,
      valuePoints: normalizeBullets(valueBlock),
      useCases: normalizeBullets(useCasesBlock),
      faqItems,
      heroImagePath: sectionImages[0]?.path,
      heroImageAlt: sectionImages[0]?.alt,
      overviewImagePath: overviewImages[0]?.path,
      workflowImagePaths: workflowImages.map((image) => image.path),
    } as ParsedCatalogFeature & { shortDescriptionSource?: string });
  }

  return catalog;
}

const parsedCategories = parseFeaturesList();
const contentMeta = parseContentMeta();
const catalog = parseCatalog();
const featureIcons = parseFeatureIcons();

export const FEATURE_CATEGORIES: FeatureCategory[] = parsedCategories.map(
  (category, index) => ({
    name: category.name,
    slug: slugify(category.name),
    summary: category.summary,
    theme: CATEGORY_THEMES[index % CATEGORY_THEMES.length],
    imagePath: CATEGORY_IMAGE_MAP[slugify(category.name)],
    features: category.features.map((featureTitle) => {
      const slug = slugify(featureTitle);
      const catalogFeature = catalog.get(slug);
      const meta = contentMeta.get(slug);

      return {
        title: featureTitle,
        slug,
        shortDescription:
          meta?.description ??
          catalogFeature?.shortDescription ??
          `${featureTitle} helps teams work faster and more consistently.`,
        iconName: featureIcons.get(slug)?.iconName,
      };
    }),
  })
);

export const ALL_FEATURES: FeatureDetail[] = FEATURE_CATEGORIES.flatMap((category) =>
  category.features.map((feature) => {
    const catalogFeature = catalog.get(feature.slug);
    const meta = contentMeta.get(feature.slug);

    if (!catalogFeature) {
      return {
        title: feature.title,
        slug: feature.slug,
        shortDescription: feature.shortDescription,
        iconName: feature.iconName,
        categoryName: category.name,
        categorySlug: category.slug,
        categorySummary: category.summary,
        theme: category.theme,
        subtitle: meta?.description ?? feature.shortDescription,
        tags: [category.name, "Customer support", "VerlyAI"],
        overview: feature.shortDescription,
        introParagraphs: [feature.shortDescription],
        definitionPoints: [],
        usageList: [],
        workflowHint: "",
        howItWorksIntro: [],
        functionBlocks: [],
        setupSteps: [],
        valuePoints: [],
        useCases: [],
        faqItems: [],
        heroImagePath: meta?.image,
        heroImageAlt: feature.title,
        overviewImagePath: meta?.image,
        workflowImagePaths: [],
      };
    }

    return {
      ...catalogFeature,
      shortDescription: meta?.description ?? catalogFeature.shortDescription,
      iconName: feature.iconName,
      categoryName: category.name,
      categorySlug: category.slug,
      categorySummary: category.summary,
      theme: category.theme,
      heroImagePath: meta?.image ?? catalogFeature.heroImagePath,
      overviewImagePath: meta?.image ?? catalogFeature.overviewImagePath,
    };
  })
);

export function getFeatureBySlug(slug: string) {
  return ALL_FEATURES.find((feature) => feature.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return FEATURE_CATEGORIES.find((category) => category.slug === slug);
}
