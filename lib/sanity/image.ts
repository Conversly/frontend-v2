import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/lib/sanity/config";
import type { SanityImage } from "@/lib/sanity/types";

const imageBuilder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source?: SanityImage) {
  const ref = source?.asset?._ref;

  if (!imageBuilder || !ref) {
    return undefined;
  }

  const dimensions = ref.split("-")[2];

  if (!dimensions) {
    return undefined;
  }

  const [width, height] = dimensions
    .split("x")
    .map((value) => Number.parseInt(value, 10));

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return undefined;
  }

  const src = imageBuilder
    .image(source)
    .auto("format")
    .fit("max")
    .width(Math.min(width, 2000))
    .url();

  return {
    src,
    width,
    height,
  };
}
