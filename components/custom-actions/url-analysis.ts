// ============================================
// URL ANALYSIS — pure utility functions
// Detects opaque IDs in URL paths and builds
// "extract as parameter" suggestions.
// ============================================

export interface DetectedId {
  segment: string;     // e.g. "abvdxqfpdqoktdkunixglzkw"
  position: number;    // 0-based index in the path segments array
  suggestedName: string; // e.g. "workspace_id"
}

export interface ExtractSuggestion {
  segment: string;
  suggestedName: string;
  replacedEndpoint: string; // endpoint with segment replaced by {paramName}
  paramName: string;        // snake_case param name
  defaultValue: string;     // the original literal value
}

// Matches: standard UUID, CUID/ULID-style (16+ mixed-alphanum), long numeric IDs (5+ digits)
const ID_REGEX =
  /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[a-zA-Z0-9]{16,}|\d{5,})$/i;

// Skip segments that are already {paramName} template tokens
const TEMPLATE_TOKEN_REGEX = /^\{[^}]+\}$/;

function toSnakeCase(value: string): string {
  const normalized = value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_')
    .toLowerCase();

  if (!normalized.length) return '';
  if (/^[a-z]/.test(normalized)) return normalized;
  return `field_${normalized}`;
}

function stripPlural(word: string): string {
  if (word.endsWith('ies') && word.length > 4) return word.slice(0, -3) + 'y';
  if (word.endsWith('ses') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('s') && word.length > 2) return word.slice(0, -1);
  return word;
}

function suggestNameFromContext(segments: string[], idPosition: number): string {
  const prev = segments[idPosition - 1];
  if (prev && !ID_REGEX.test(prev) && !TEMPLATE_TOKEN_REGEX.test(prev)) {
    const singular = stripPlural(prev);
    const base = toSnakeCase(singular);
    if (base) return `${base}_id`;
  }
  return 'resource_id';
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Scan a URL endpoint string for path segments that look like opaque/hardcoded IDs.
 * Skips existing {template} tokens. Only inspects the pathname portion.
 */
export function detectFixedIdSegments(endpoint: string): DetectedId[] {
  const qIndex = endpoint.indexOf('?');
  const pathname = qIndex === -1 ? endpoint : endpoint.slice(0, qIndex);

  const segments = pathname.split('/').filter(Boolean);
  const results: DetectedId[] = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    if (TEMPLATE_TOKEN_REGEX.test(seg)) continue;
    if (ID_REGEX.test(seg)) {
      results.push({
        segment: seg,
        position: i,
        suggestedName: suggestNameFromContext(segments, i),
      });
    }
  }

  return results;
}

/**
 * Given a detected ID, produce a concrete extract suggestion:
 * - the replaced endpoint string (ID replaced by {paramName})
 * - the param name and literal default value
 */
export function buildExtractSuggestion(
  endpoint: string,
  detected: DetectedId,
): ExtractSuggestion {
  const paramName = detected.suggestedName;
  const token = `{${paramName}}`;

  const qIndex = endpoint.indexOf('?');
  const pathname = qIndex === -1 ? endpoint : endpoint.slice(0, qIndex);
  const queryPart = qIndex === -1 ? '' : endpoint.slice(qIndex);

  // Replace the segment as a standalone path component (surrounded by / or at end)
  const replacedPath = pathname.replace(
    new RegExp(`(^|/)${escapeRegex(detected.segment)}(/|$)`),
    `$1${token}$2`,
  );

  return {
    segment: detected.segment,
    suggestedName: detected.suggestedName,
    replacedEndpoint: `${replacedPath}${queryPart}`,
    paramName,
    defaultValue: detected.segment,
  };
}
