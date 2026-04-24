import OpenGraphImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from "./opengraph-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = ogAlt;

export default OpenGraphImage;
