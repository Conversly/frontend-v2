import { ApiConfig, HttpMethod } from '@/types/customActions';

/**
 * Header classification for smart filtering
 */
export type HeaderCategory = 'essential' | 'optional' | 'browser';

export interface ClassifiedHeader {
    key: string;
    value: string;
    category: HeaderCategory;
}

export interface ParsedCurlResult {
    config: Partial<ApiConfig>;
    classifiedHeaders: ClassifiedHeader[];
    detectedVariables: string[];
}

/**
 * Headers that are essential for API calls
 */
const ESSENTIAL_HEADERS = new Set([
    'authorization',
    'content-type',
    'accept',
    'x-api-key',
    'api-key',
    'x-auth-token',
    'x-access-token',
]);

/**
 * Headers that might be useful but are optional
 */
const OPTIONAL_HEADERS = new Set([
    'cookie',
    'accept-language',
    'accept-encoding',
    'cache-control',
    'x-request-id',
    'x-correlation-id',
    'x-forwarded-for',
    'x-real-ip',
]);

/**
 * Browser-specific headers that are typically noise for API calls
 */
const BROWSER_NOISE_HEADERS = new Set([
    'sec-ch-ua',
    'sec-ch-ua-mobile',
    'sec-ch-ua-platform',
    'sec-fetch-dest',
    'sec-fetch-mode',
    'sec-fetch-site',
    'sec-fetch-user',
    'sec-gpc',
    'user-agent',
    'referer',
    'origin',
    'priority',
    'pragma',
    'upgrade-insecure-requests',
    'dnt',
    // Next.js specific headers
    'next-router-prefetch',
    'next-router-state-tree',
    'next-url',
    'rsc',
]);

/**
 * Classify a header into essential, optional, or browser noise
 */
function classifyHeader(headerKey: string): HeaderCategory {
    const lowerKey = headerKey.toLowerCase();

    if (ESSENTIAL_HEADERS.has(lowerKey)) {
        return 'essential';
    }

    if (OPTIONAL_HEADERS.has(lowerKey)) {
        return 'optional';
    }

    if (BROWSER_NOISE_HEADERS.has(lowerKey) ||
        lowerKey.startsWith('sec-') ||
        lowerKey.startsWith('x-next-')) {
        return 'browser';
    }

    // Custom headers (x-*) are likely useful
    if (lowerKey.startsWith('x-')) {
        return 'optional';
    }

    // Default to optional for unknown headers
    return 'optional';
}

/**
 * Extract {{variable}} patterns from a string
 */
function extractVariables(str: string): string[] {
    const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
    return matches.map(m => m.replace(/\{\{|\}\}/g, '').trim());
}

/**
 * Tokenize a curl command string, properly handling quoted strings
 * This handles single quotes, double quotes, and escaped characters
 */
function tokenizeCurlCommand(curlString: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let escape = false;

    // Normalize: join backslash-continued lines
    const normalized = curlString.replace(/\\\r?\n/g, ' ');

    for (let i = 0; i < normalized.length; i++) {
        const char = normalized[i];

        if (escape) {
            current += char;
            escape = false;
            continue;
        }

        if (char === '\\' && !inSingleQuote) {
            escape = true;
            continue;
        }

        if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote;
            continue;
        }

        if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote;
            continue;
        }

        if ((char === ' ' || char === '\t') && !inSingleQuote && !inDoubleQuote) {
            if (current) {
                tokens.push(current);
                current = '';
            }
            continue;
        }

        current += char;
    }

    if (current) {
        tokens.push(current);
    }

    return tokens;
}

/**
 * Parse a header string like "Content-Type: application/json"
 * Properly handles values that contain colons (e.g., "accept-language: en-GB,en-US;q=0.9,en;q=0.8")
 */
function parseHeader(headerStr: string): { key: string; value: string } | null {
    const colonIndex = headerStr.indexOf(':');
    if (colonIndex === -1) return null;

    const key = headerStr.substring(0, colonIndex).trim();
    const value = headerStr.substring(colonIndex + 1).trim();

    if (!key) return null;

    return { key, value };
}

/**
 * Normalize curl -d/--data payload tokens.
 *
 * Chrome/Firefox "Copy as cURL" sometimes uses Bash ANSI-C quoting: $'{"json":"..."}'
 * Our tokenizer removes the quotes but keeps the leading '$', producing strings like:
 *   ${"json":"..."}
 * which is not valid JSON and breaks downstream JSON parsing/formatting.
 *
 * We only strip the leading '$' when it directly prefixes a JSON object/array.
 */
function normalizeCurlDataPayload(raw: string): string {
    const trimmed = raw.trim();
    if (trimmed.startsWith('$') && (trimmed[1] === '{' || trimmed[1] === '[')) {
        return trimmed.slice(1);
    }
    return raw;
}

export function parseCurlCommand(curlString: string): Partial<ApiConfig> {
    const headers: Record<string, string> = {};
    const config: Partial<ApiConfig> = {
        staticHeaders: headers,
    };

    const tokens = tokenizeCurlCommand(curlString);

    if (tokens.length === 0 || tokens[0] !== 'curl') {
        throw new Error('Invalid curl command');
    }

    let method: HttpMethod | undefined;
    let url: string | undefined;
    let body: string | undefined;

    // Process tokens
    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i];

        // Skip empty tokens
        if (!token) continue;

        // Handle flags
        if (token.startsWith('-')) {
            switch (token) {
                case '-X':
                case '--request':
                    if (i + 1 < tokens.length) {
                        method = tokens[++i].toUpperCase() as HttpMethod;
                    }
                    break;

                case '-H':
                case '--header':
                    if (i + 1 < tokens.length) {
                        const headerStr = tokens[++i];
                        const parsed = parseHeader(headerStr);
                        if (parsed) {
                            headers[parsed.key] = parsed.value;

                            // Check for Auth headers
                            if (parsed.key.toLowerCase() === 'authorization') {
                                if (parsed.value.startsWith('Bearer ')) {
                                    config.authType = 'bearer';
                                    config.authValue = parsed.value.replace('Bearer ', '');
                                } else if (parsed.value.startsWith('Basic ')) {
                                    config.authType = 'basic';
                                    config.authValue = parsed.value.replace('Basic ', '');
                                }
                            }
                        }
                    }
                    break;

                case '-b':
                case '--cookie':
                    if (i + 1 < tokens.length) {
                        const cookieStr = tokens[++i];
                        // Add cookies as Cookie header
                        headers['Cookie'] = cookieStr;
                    }
                    break;

                case '-d':
                case '--data':
                case '--data-raw':
                case '--data-binary':
                case '--data-urlencode':
                    if (i + 1 < tokens.length) {
                        body = tokens[++i];
                    }
                    break;

                case '-u':
                case '--user':
                    if (i + 1 < tokens.length) {
                        const userPass = tokens[++i];
                        config.authType = 'basic';
                        // Base64 encode user:pass for basic auth
                        config.authValue = btoa(userPass);
                    }
                    break;

                case '-A':
                case '--user-agent':
                    if (i + 1 < tokens.length) {
                        const userAgent = tokens[++i];
                        headers['User-Agent'] = userAgent;
                    }
                    break;

                case '-e':
                case '--referer':
                    if (i + 1 < tokens.length) {
                        const referer = tokens[++i];
                        headers['Referer'] = referer;
                    }
                    break;

                case '-L':
                case '--location':
                    config.followRedirects = true;
                    break;

                case '-k':
                case '--insecure':
                    config.verifySsl = false;
                    break;


                case '--compressed':
                    // Just skip, we'll handle compression automatically
                    break;

                default:
                    // Handle combined short flags or flags with = values
                    if (token.startsWith('--')) {
                        // Long flag with value like --header=value
                        const eqIndex = token.indexOf('=');
                        if (eqIndex !== -1) {
                            const flag = token.substring(0, eqIndex);
                            const value = token.substring(eqIndex + 1);

                            if (flag === '--header' || flag === '-H') {
                                const parsed = parseHeader(value);
                                if (parsed) {
                                    headers[parsed.key] = parsed.value;
                                }
                            }
                        }
                    }
                    // Skip unknown flags
                    break;
            }
        } else if (!url) {
            // This should be the URL
            url = token;
        }
    }

    // Parse URL
    if (url) {
        try {
            const urlObj = new URL(url);
            config.baseUrl = urlObj.origin;
            config.endpoint = `${urlObj.pathname}${urlObj.search || ''}`;
        } catch (e) {
            // If URL parsing fails, just set what we found as endpoint
            config.endpoint = url;
        }
    }

    // Set method
    if (method) {
        config.method = method;
    } else {
        // Default to POST if body is present, otherwise GET
        config.method = body ? 'POST' : 'GET';
    }

    // Set body
    if (body) {
        const normalized = normalizeCurlDataPayload(body);
        try {
            const parsed = JSON.parse(normalized);
            config.staticBody = parsed;
        } catch {
            // Not JSON; store as a JSON string (still valid JSON)
            config.staticBody = normalized;
        }
    }

    return config;
}

/**
 * Enhanced curl parser that returns classified headers and detected variables
 * Use this for the improved UX experience
 */
export function parseCurlCommandEnhanced(curlString: string): ParsedCurlResult {
    // First, get the basic config
    const config = parseCurlCommand(curlString);

    // Classify all headers
    const classifiedHeaders: ClassifiedHeader[] = [];
    const essentialHeaders: Record<string, string> = {};

    const headerSource = config.staticHeaders ?? {};
    for (const [key, value] of Object.entries(headerSource)) {
            const category = classifyHeader(key);
            classifiedHeaders.push({ key, value, category });

            // Only include essential and optional headers in the config
            // Browser noise headers are excluded by default
            if (category === 'essential' || category === 'optional') {
                essentialHeaders[key] = value;
            }
    }

    // Sort headers: essential first, then optional, then browser
    classifiedHeaders.sort((a, b) => {
        const order = { essential: 0, optional: 1, browser: 2 };
        return order[a.category] - order[b.category];
    });

    // Detect variables from URL endpoint and body template
    const detectedVariables: string[] = [];

    if (config.endpoint) {
        detectedVariables.push(...extractVariables(config.endpoint));
    }

    if (typeof config.staticBody === 'string') {
        detectedVariables.push(...extractVariables(config.staticBody));
    }

    // Remove duplicates
    const uniqueVariables = [...new Set(detectedVariables)];

    // Update config headers to only include non-browser headers
    const cleanConfig = {
        ...config,
        staticHeaders: essentialHeaders,
    };

    return {
        config: cleanConfig,
        classifiedHeaders,
        detectedVariables: uniqueVariables,
    };
}

/**
 * Filter headers by category
 */
export function filterHeadersByCategory(
    headers: ClassifiedHeader[],
    categories: HeaderCategory[]
): ClassifiedHeader[] {
    return headers.filter(h => categories.includes(h.category));
}

/**
 * Convert classified headers back to a Record
 */
export function headersToRecord(headers: ClassifiedHeader[]): Record<string, string> {
    return headers.reduce((acc, h) => {
        acc[h.key] = h.value;
        return acc;
    }, {} as Record<string, string>);
}
